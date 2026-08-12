-- Clean mateuscosta bootstrap for the LUMO portfolio CMS only.
-- Deliberately excludes the legacy CRM, its data, and its tables.

create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  role text not null default 'viewer' check (role in ('viewer', 'admin', 'super_admin')),
  access_level text not null default 'viewer' check (access_level in ('viewer', 'admin', 'super_admin')),
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.admin_users enable row level security;

create policy "Profiles read own record" on public.profiles for select to authenticated using (auth_user_id = (select auth.uid()));
create policy "Admin users read own record" on public.admin_users for select to authenticated using (user_id = (select auth.uid()));

grant select on public.profiles, public.admin_users to authenticated;


-- Source migration consolidated from LUMO: 20260710192407_portfolio_cms_v2.sql
begin;

-- Portfolio CMS v2 runs in parallel with the current public.cases system.
-- This migration intentionally does not alter public.cases, public.is_admin(),
-- public.admin_users, CRM tables, existing case pages, or the case-images bucket.
--
-- Idempotency model: this migration is intended for a database where Portfolio
-- CMS v2 objects do not exist yet. It uses CREATE TABLE/CREATE FUNCTION without
-- IF NOT EXISTS so a partially-created v2 schema fails clearly instead of
-- continuing with missing columns, constraints, triggers, or policies.

create extension if not exists pgcrypto;

create function public.can_manage_portfolio()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, auth
as $$
  select
    auth.uid() is not null
    and (
      exists (
        select 1
        from public.profiles p
        where p.auth_user_id = auth.uid()
          and p.status = 'active'
          and (
            p.role in ('admin', 'super_admin')
            or p.access_level in ('admin', 'super_admin')
          )
      )
      or exists (
        select 1
        from public.admin_users au
        where au.user_id = auth.uid()
      )
    );
$$;

comment on function public.can_manage_portfolio() is
'Portfolio CMS v2 authorization helper. Primary source is active public.profiles bound to auth.uid() with explicit admin/super_admin role or access_level. public.admin_users is temporary bootstrap fallback. SECURITY DEFINER has explicit search_path; execute is revoked from PUBLIC.';

revoke all on function public.can_manage_portfolio() from public;
grant execute on function public.can_manage_portfolio() to authenticated;

create table public.portfolio_cases (
  id uuid primary key default gen_random_uuid(),
  legacy_id text,
  legacy_slug text,
  slug text not null,
  title text not null,
  status text not null default 'draft',
  categories text[] not null default '{}',
  excerpt text not null default '',
  content_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  content_html text not null default '',
  cover_url text not null default '',
  cover_storage_bucket text,
  cover_storage_path text,
  external_url text not null default '',
  featured_on_home boolean not null default false,
  home_order integer not null default 999,
  portfolio_order integer not null default 999,
  seo_title text not null default '',
  seo_description text not null default '',
  published_at timestamptz,
  created_by uuid null references auth.users(id) on delete set null,
  updated_by uuid null references auth.users(id) on delete set null,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint portfolio_cases_slug_key unique (slug),
  constraint portfolio_cases_slug_not_blank_check check (length(btrim(slug)) > 0),
  constraint portfolio_cases_slug_route_safe_check check (slug !~ '[[:space:]/?#]'),
  constraint portfolio_cases_status_check check (status in ('draft', 'published', 'archived')),
  constraint portfolio_cases_categories_check check (categories <@ array['Branding', 'Desenvolvimento', 'Editorial', 'UI/UX Design']::text[]),
  constraint portfolio_cases_home_order_check check (home_order >= 0),
  constraint portfolio_cases_portfolio_order_check check (portfolio_order >= 0),
  constraint portfolio_cases_version_check check (version > 0),
  constraint portfolio_cases_external_url_check check (external_url = '' or external_url ~* '^https?://[^[:space:]]+$'),
  constraint portfolio_cases_published_at_check check (status <> 'published' or published_at is not null),
  constraint portfolio_cases_content_json_object_check check (jsonb_typeof(content_json) = 'object'),
  constraint portfolio_cases_cover_bucket_check check (
    cover_storage_bucket is null
    or cover_storage_bucket in ('portfolio-drafts', 'portfolio-media', 'case-images')
  ),
  constraint portfolio_cases_cover_path_bucket_check check (
    cover_storage_path is null
    or cover_storage_bucket is not null
  ),
  constraint portfolio_cases_cover_path_object_only_check check (
    cover_storage_path is null
    or cover_storage_path !~ '^(portfolio-drafts|portfolio-media|case-images)/'
  ),
  constraint portfolio_cases_cover_published_check check (
    status <> 'published'
    or (
      cover_storage_bucket in ('portfolio-media', 'case-images')
      and cover_storage_path is not null
      and btrim(cover_storage_path) <> ''
    )
    or cover_url ~* '^https?://[^[:space:]]+$'
  )
);

comment on table public.portfolio_cases is 'Portfolio CMS v2 case records. Parallel to public.cases; no legacy data is migrated by this migration.';
comment on column public.portfolio_cases.slug is 'Unicode slugs are allowed, including existing values such as atitus-educação. The application must normalize to NFC because PostgreSQL does not normalize Unicode text automatically.';
comment on column public.portfolio_cases.content_json is 'Tiptap-compatible empty document by default: {"type":"doc","content":[]}.';
comment on column public.portfolio_cases.cover_storage_bucket is 'Cover bucket only: portfolio-drafts, portfolio-media, case-images, or null. Never store this bucket inside cover_storage_path.';
comment on column public.portfolio_cases.cover_storage_path is 'Cover object path inside cover_storage_bucket. Never include the bucket prefix in this field.';

create table public.portfolio_case_media (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.portfolio_cases(id) on delete cascade,
  source_url text not null default '',
  storage_bucket text,
  storage_path text,
  media_type text not null default 'image',
  alt_text text not null default '',
  caption text not null default '',
  width integer,
  height integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint portfolio_case_media_media_type_check check (media_type in ('image', 'video')),
  constraint portfolio_case_media_sort_order_check check (sort_order >= 0),
  constraint portfolio_case_media_dimensions_check check ((width is null or width > 0) and (height is null or height > 0)),
  constraint portfolio_case_media_storage_bucket_check check (
    storage_bucket is null
    or storage_bucket in ('portfolio-drafts', 'portfolio-media', 'case-images')
  ),
  constraint portfolio_case_media_storage_path_bucket_check check (
    storage_path is null
    or storage_bucket is not null
  ),
  constraint portfolio_case_media_storage_path_object_only_check check (
    storage_path is null
    or storage_path !~ '^(portfolio-drafts|portfolio-media|case-images)/'
  ),
  constraint portfolio_case_media_source_url_check check (
    source_url = ''
    or source_url ~* '^https?://[^[:space:]]+$'
  ),
  constraint portfolio_case_media_source_or_storage_check check (
    (storage_bucket is not null and storage_path is not null and btrim(storage_path) <> '')
    or (storage_bucket is null and storage_path is null and source_url <> '')
  )
);

comment on table public.portfolio_case_media is 'Portfolio CMS v2 media records. Media is linked by case UUID, never by slug.';
comment on column public.portfolio_case_media.storage_bucket is 'Allowed buckets are portfolio-drafts, portfolio-media, case-images, or null. case-images is legacy read compatibility only.';
comment on column public.portfolio_case_media.storage_path is 'Object path inside storage_bucket. Never include the bucket prefix in this field.';
comment on column public.portfolio_case_media.source_url is 'External media URL. When present it must be HTTP/HTTPS.';

create table public.portfolio_case_slug_history (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.portfolio_cases(id) on delete cascade,
  old_slug text not null,
  created_at timestamptz not null default now(),

  constraint portfolio_case_slug_history_old_slug_key unique (old_slug),
  constraint portfolio_case_slug_history_old_slug_not_blank_check check (length(btrim(old_slug)) > 0),
  constraint portfolio_case_slug_history_old_slug_route_safe_check check (old_slug !~ '[[:space:]/?#]')
);

comment on table public.portfolio_case_slug_history is 'Old slugs for future case redirects. Records are created when portfolio_cases.slug changes and cannot collide with current slugs.';

create index portfolio_cases_status_idx on public.portfolio_cases (status);
create index portfolio_cases_portfolio_order_idx on public.portfolio_cases (portfolio_order);
create index portfolio_cases_featured_home_order_idx on public.portfolio_cases (featured_on_home, home_order);
create index portfolio_cases_updated_at_idx on public.portfolio_cases (updated_at);
create index portfolio_cases_published_at_idx on public.portfolio_cases (published_at);
create index portfolio_cases_categories_gin_idx on public.portfolio_cases using gin (categories);

create index portfolio_case_media_case_id_idx on public.portfolio_case_media (case_id);
create index portfolio_case_media_case_sort_idx on public.portfolio_case_media (case_id, sort_order);
create index portfolio_case_media_storage_idx on public.portfolio_case_media (storage_bucket, storage_path);

create index portfolio_case_slug_history_case_id_idx on public.portfolio_case_slug_history (case_id);
create index portfolio_case_slug_history_old_slug_idx on public.portfolio_case_slug_history (old_slug);

create function public.portfolio_set_case_audit_fields()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public, auth
as $$
declare
  current_user_id uuid := auth.uid();
begin
  if tg_op = 'INSERT' then
    if current_user_id is not null then
      new.created_by := coalesce(new.created_by, current_user_id);
      new.updated_by := coalesce(new.updated_by, current_user_id);
    end if;
  elsif tg_op = 'UPDATE' then
    if current_user_id is not null then
      new.updated_by := current_user_id;
    end if;
  end if;

  return new;
end;
$$;

create function public.portfolio_touch_case_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create function public.portfolio_increment_case_version()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  new.version := old.version + 1;
  return new;
end;
$$;

create function public.portfolio_sync_case_published_at()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if new.status = 'published' then
    if new.published_at is null then
      new.published_at := now();
    end if;
  else
    new.published_at := null;
  end if;

  return new;
end;
$$;

comment on function public.portfolio_sync_case_published_at() is
'When a case becomes published, published_at is filled if null. When it leaves published, published_at is cleared.';

create function public.portfolio_validate_case_slug()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if tg_op = 'INSERT' or old.slug is distinct from new.slug then
    if exists (
      select 1
      from public.portfolio_case_slug_history history
      where history.old_slug = new.slug
    ) then
      raise exception 'Portfolio case slug "%" is already reserved in slug history', new.slug;
    end if;
  end if;

  return new;
end;
$$;

create function public.portfolio_validate_case_publication()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if new.status = 'published' then
    if new.cover_storage_bucket = 'portfolio-drafts' then
      raise exception 'Published portfolio cases cannot reference portfolio-drafts cover assets';
    end if;

    if new.cover_storage_path is not null and new.cover_storage_bucket is null then
      raise exception 'cover_storage_path requires cover_storage_bucket';
    end if;

    if new.cover_storage_bucket is not null
      and new.cover_storage_path is not null
      and new.cover_storage_path ~ '^(portfolio-drafts|portfolio-media|case-images)/'
    then
      raise exception 'cover_storage_path must contain only the object path, not the bucket';
    end if;

    if new.cover_url <> '' and new.cover_url !~* '^https?://[^[:space:]]+$' then
      raise exception 'Published portfolio cases require HTTP/HTTPS cover_url when an external cover URL is used';
    end if;

    if not (
      (
        new.cover_storage_bucket in ('portfolio-media', 'case-images')
        and new.cover_storage_path is not null
        and btrim(new.cover_storage_path) <> ''
      )
      or new.cover_url ~* '^https?://[^[:space:]]+$'
    ) then
      raise exception 'Published portfolio cases require a valid cover in portfolio-media, case-images, or an HTTP/HTTPS cover_url';
    end if;

    if exists (
      select 1
      from public.portfolio_case_media media
      where media.case_id = new.id
        and media.storage_bucket = 'portfolio-drafts'
    ) then
      raise exception 'Published portfolio cases cannot reference portfolio-drafts media';
    end if;

    if exists (
      select 1
      from public.portfolio_case_media media
      where media.case_id = new.id
        and not (
          media.storage_bucket in ('portfolio-media', 'case-images')
          or (
            media.storage_bucket is null
            and media.storage_path is null
            and media.source_url ~* '^https?://[^[:space:]]+$'
          )
        )
    ) then
      raise exception 'Published portfolio cases can only expose portfolio-media, case-images, or HTTP/HTTPS external media';
    end if;
  end if;

  return new;
end;
$$;

create function public.portfolio_record_slug_history()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if old.slug is not distinct from new.slug or length(btrim(old.slug)) = 0 then
    return new;
  end if;

  if exists (
    select 1
    from public.portfolio_cases c
    where c.id <> old.id
      and c.slug = old.slug
  ) then
    raise exception 'Cannot record old slug "%" because it is used by another current case', old.slug;
  end if;

  if exists (
    select 1
    from public.portfolio_case_slug_history history
    where history.old_slug = old.slug
      and history.case_id <> old.id
  ) then
    raise exception 'Cannot record old slug "%" because it belongs to another case history', old.slug;
  end if;

  if exists (
    select 1
    from public.portfolio_case_slug_history history
    where history.old_slug = old.slug
      and history.case_id = old.id
  ) then
    return new;
  end if;

  insert into public.portfolio_case_slug_history (case_id, old_slug)
  values (old.id, old.slug);

  return new;
end;
$$;

create function public.portfolio_touch_media_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create function public.portfolio_validate_media_publication()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if exists (
    select 1
    from public.portfolio_cases c
    where c.id = new.case_id
      and c.status = 'published'
  ) then
    if new.storage_bucket = 'portfolio-drafts' then
      raise exception 'Published portfolio cases cannot reference portfolio-drafts media';
    end if;

    if not (
      new.storage_bucket in ('portfolio-media', 'case-images')
      or (
        new.storage_bucket is null
        and new.storage_path is null
        and new.source_url ~* '^https?://[^[:space:]]+$'
      )
    ) then
      raise exception 'Published portfolio media must use portfolio-media, case-images, or an HTTP/HTTPS source_url';
    end if;
  end if;

  return new;
end;
$$;

create function public.portfolio_validate_slug_history()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if exists (
    select 1
    from public.portfolio_cases c
    where c.slug = new.old_slug
  ) then
    raise exception 'Slug history old_slug "%" collides with a current case slug', new.old_slug;
  end if;

  return new;
end;
$$;

create trigger portfolio_cases_10_validate_slug
before insert or update of slug on public.portfolio_cases
for each row execute function public.portfolio_validate_case_slug();

create trigger portfolio_cases_20_audit_fields
before insert or update on public.portfolio_cases
for each row execute function public.portfolio_set_case_audit_fields();

create trigger portfolio_cases_30_touch_updated_at
before update on public.portfolio_cases
for each row execute function public.portfolio_touch_case_updated_at();

create trigger portfolio_cases_40_increment_version
before update on public.portfolio_cases
for each row execute function public.portfolio_increment_case_version();

create trigger portfolio_cases_50_sync_published_at
before insert or update of status, published_at on public.portfolio_cases
for each row execute function public.portfolio_sync_case_published_at();

create trigger portfolio_cases_60_validate_publication
before insert or update on public.portfolio_cases
for each row execute function public.portfolio_validate_case_publication();

create trigger portfolio_cases_70_record_slug_history
after update of slug on public.portfolio_cases
for each row
when (old.slug is distinct from new.slug)
execute function public.portfolio_record_slug_history();

create trigger portfolio_case_media_10_touch_updated_at
before update on public.portfolio_case_media
for each row execute function public.portfolio_touch_media_updated_at();

create trigger portfolio_case_media_20_validate_publication
before insert or update on public.portfolio_case_media
for each row execute function public.portfolio_validate_media_publication();

create trigger portfolio_case_slug_history_10_validate
before insert or update on public.portfolio_case_slug_history
for each row execute function public.portfolio_validate_slug_history();

alter table public.portfolio_cases enable row level security;
alter table public.portfolio_case_media enable row level security;
alter table public.portfolio_case_slug_history enable row level security;

create policy "Portfolio cases public published read"
on public.portfolio_cases
for select
to anon, authenticated
using (status = 'published');

create policy "Portfolio cases admin read"
on public.portfolio_cases
for select
to authenticated
using (public.can_manage_portfolio());

create policy "Portfolio cases admin insert"
on public.portfolio_cases
for insert
to authenticated
with check (public.can_manage_portfolio());

create policy "Portfolio cases admin update"
on public.portfolio_cases
for update
to authenticated
using (public.can_manage_portfolio())
with check (public.can_manage_portfolio());

create policy "Portfolio cases admin delete"
on public.portfolio_cases
for delete
to authenticated
using (public.can_manage_portfolio());

create policy "Portfolio media public published read"
on public.portfolio_case_media
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.portfolio_cases c
    where c.id = portfolio_case_media.case_id
      and c.status = 'published'
  )
  and (
    storage_bucket in ('portfolio-media', 'case-images')
    or (
      storage_bucket is null
      and storage_path is null
      and source_url ~* '^https?://[^[:space:]]+$'
    )
  )
);

create policy "Portfolio media admin read"
on public.portfolio_case_media
for select
to authenticated
using (public.can_manage_portfolio());

create policy "Portfolio media admin insert"
on public.portfolio_case_media
for insert
to authenticated
with check (public.can_manage_portfolio());

create policy "Portfolio media admin update"
on public.portfolio_case_media
for update
to authenticated
using (public.can_manage_portfolio())
with check (public.can_manage_portfolio());

create policy "Portfolio media admin delete"
on public.portfolio_case_media
for delete
to authenticated
using (public.can_manage_portfolio());

create policy "Portfolio slug history public published read"
on public.portfolio_case_slug_history
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.portfolio_cases c
    where c.id = portfolio_case_slug_history.case_id
      and c.status = 'published'
  )
);

create policy "Portfolio slug history admin read"
on public.portfolio_case_slug_history
for select
to authenticated
using (public.can_manage_portfolio());

create policy "Portfolio slug history admin insert"
on public.portfolio_case_slug_history
for insert
to authenticated
with check (public.can_manage_portfolio());

create policy "Portfolio slug history admin update"
on public.portfolio_case_slug_history
for update
to authenticated
using (public.can_manage_portfolio())
with check (public.can_manage_portfolio());

create policy "Portfolio slug history admin delete"
on public.portfolio_case_slug_history
for delete
to authenticated
using (public.can_manage_portfolio());

grant select on public.portfolio_cases to anon, authenticated;
grant insert, update, delete on public.portfolio_cases to authenticated;

grant select on public.portfolio_case_media to anon, authenticated;
grant insert, update, delete on public.portfolio_case_media to authenticated;

grant select on public.portfolio_case_slug_history to anon, authenticated;
grant insert, update, delete on public.portfolio_case_slug_history to authenticated;

insert into storage.buckets (id, name, public)
values ('portfolio-drafts', 'portfolio-drafts', false);

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true);

create policy "Portfolio drafts admin read"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'portfolio-drafts'
  and public.can_manage_portfolio()
);

create policy "Portfolio drafts admin insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'portfolio-drafts'
  and public.can_manage_portfolio()
  and position('/' in name) > 0
  and split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

create policy "Portfolio drafts admin update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'portfolio-drafts'
  and public.can_manage_portfolio()
)
with check (
  bucket_id = 'portfolio-drafts'
  and public.can_manage_portfolio()
  and position('/' in name) > 0
  and split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

create policy "Portfolio drafts admin delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'portfolio-drafts'
  and public.can_manage_portfolio()
);

create policy "Portfolio media public read"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'portfolio-media');

create policy "Portfolio media admin insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'portfolio-media'
  and public.can_manage_portfolio()
  and position('/' in name) > 0
  and split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

create policy "Portfolio media admin update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'portfolio-media'
  and public.can_manage_portfolio()
)
with check (
  bucket_id = 'portfolio-media'
  and public.can_manage_portfolio()
  and position('/' in name) > 0
  and split_part(name, '/', 1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
);

create policy "Portfolio media admin delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'portfolio-media'
  and public.can_manage_portfolio()
);

commit;
-- Source migration consolidated from LUMO: 20260711152024_harden_portfolio_admin_function_acl.sql
begin;

-- Hardening only: tighten execution ACL for the existing Portfolio CMS v2
-- authorization helper. This intentionally does not recreate or alter the
-- function body, volatility, SECURITY DEFINER setting, or search_path.
revoke all on function public.can_manage_portfolio() from public;
revoke execute on function public.can_manage_portfolio() from anon;
grant execute on function public.can_manage_portfolio() to authenticated;

commit;
-- Source migration consolidated from LUMO: 20260717140934_nextjs_platform_case_fields.sql
begin;

-- Incremental, non-destructive compatibility layer for the Next.js platform.
-- Portfolio CMS v2 must already exist. Re-running this migration is safe.
do $$
declare
  client_name_type text;
  archived_at_type text;
begin
  if to_regclass('public.portfolio_cases') is null then
    raise exception 'public.portfolio_cases is required; apply Portfolio CMS v2 first';
  end if;

  select format_type(a.atttypid, a.atttypmod)
  into client_name_type
  from pg_attribute a
  where a.attrelid = 'public.portfolio_cases'::regclass
    and a.attname = 'client_name'
    and not a.attisdropped;

  if client_name_type is not null and client_name_type <> 'text' then
    raise exception 'public.portfolio_cases.client_name has incompatible type %', client_name_type;
  end if;

  select format_type(a.atttypid, a.atttypmod)
  into archived_at_type
  from pg_attribute a
  where a.attrelid = 'public.portfolio_cases'::regclass
    and a.attname = 'archived_at'
    and not a.attisdropped;

  if archived_at_type is not null and archived_at_type <> 'timestamp with time zone' then
    raise exception 'public.portfolio_cases.archived_at has incompatible type %', archived_at_type;
  end if;
end;
$$;

alter table public.portfolio_cases
  add column if not exists client_name text not null default '',
  add column if not exists archived_at timestamptz;

-- Normalize only a partially-applied schema. A clean application adds the
-- column with its final default/NOT NULL contract and does not update rows,
-- avoiding audit/version triggers on existing cases.
update public.portfolio_cases
set client_name = ''
where client_name is null;

alter table public.portfolio_cases
  alter column client_name set default '',
  alter column client_name set not null;

comment on column public.portfolio_cases.client_name is
'Client or organization name displayed in case metadata.';

comment on column public.portfolio_cases.archived_at is
'Timestamp maintained automatically while status is archived.';

-- Preserve an existing archive timestamp. For pre-existing archived rows with
-- no timestamp, updated_at is the closest durable historical approximation.
update public.portfolio_cases
set archived_at = coalesce(archived_at, updated_at, now())
where status = 'archived'
  and archived_at is null;

update public.portfolio_cases
set archived_at = null
where status <> 'archived'
  and archived_at is not null;

create index if not exists portfolio_cases_archived_at_idx
on public.portfolio_cases (archived_at)
where archived_at is not null;

create or replace function public.portfolio_sync_case_archived_at()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  if new.status = 'archived' then
    new.archived_at := coalesce(new.archived_at, now());
  else
    new.archived_at := null;
  end if;

  return new;
end;
$$;

comment on function public.portfolio_sync_case_archived_at() is
'Keeps archived_at populated only while a portfolio case has archived status.';

drop trigger if exists portfolio_cases_15_sync_archived_at on public.portfolio_cases;

create trigger portfolio_cases_15_sync_archived_at
before insert or update of status, archived_at on public.portfolio_cases
for each row execute function public.portfolio_sync_case_archived_at();

commit;
-- Source migration consolidated from LUMO: 20260717152107_harden_nextjs_portfolio_access.sql
begin;

-- Public buckets are readable by object URL without a SELECT policy. Removing
-- this broad policy prevents anonymous bucket listing while keeping published
-- assets publicly addressable.
drop policy if exists "Portfolio media public read" on storage.objects;

-- Trigger functions do not need to be directly callable through the Data API.
revoke all on function public.portfolio_sync_case_archived_at() from public;
revoke execute on function public.portfolio_sync_case_archived_at() from anon, authenticated;

create index if not exists portfolio_cases_created_by_idx
on public.portfolio_cases (created_by)
where created_by is not null;

create index if not exists portfolio_cases_updated_by_idx
on public.portfolio_cases (updated_by)
where updated_by is not null;

commit;
-- Source migration consolidated from LUMO: 20260717164059_constrain_portfolio_storage_uploads.sql
begin;

update storage.buckets
set
  file_size_limit = 10485760,
  allowed_mime_types = array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif'
  ]::text[]
where id in ('portfolio-drafts', 'portfolio-media');

commit;
-- Source migration consolidated from LUMO: 20260717190654_enforce_portfolio_content_limits.sql
-- Keep application validation enforceable when authenticated clients call the
-- Data API directly. Existing production rows were audited before adding these
-- constraints and are already within every limit below.

alter table public.portfolio_cases
  add constraint portfolio_cases_title_length_check
    check (length(btrim(title)) between 2 and 120),
  add constraint portfolio_cases_slug_length_check
    check (length(btrim(slug)) between 2 and 140),
  add constraint portfolio_cases_client_name_length_check
    check (length(client_name) <= 120),
  add constraint portfolio_cases_categories_count_check
    check (cardinality(categories) <= 6),
  add constraint portfolio_cases_excerpt_length_check
    check (length(excerpt) <= 320),
  add constraint portfolio_cases_content_html_length_check
    check (length(content_html) <= 200000),
  add constraint portfolio_cases_seo_title_length_check
    check (length(seo_title) <= 70),
  add constraint portfolio_cases_seo_description_length_check
    check (length(seo_description) <= 170),
  add constraint portfolio_cases_published_required_content_check
    check (
      status <> 'published'
      or (cardinality(categories) > 0 and length(btrim(content_html)) > 0)
    );

alter table public.portfolio_case_media
  add constraint portfolio_case_media_alt_text_length_check
    check (length(alt_text) <= 300),
  add constraint portfolio_case_media_caption_length_check
    check (length(caption) <= 1000);
-- Source migration consolidated from LUMO: 20260722142211_add_portfolio_media_admin_read_policy.sql
create policy "Portfolio media admin read"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'portfolio-media'
  and can_manage_portfolio()
);
-- Source migration consolidated from LUMO: 20260723120000_add_portfolio_categories.sql
begin;

create table public.portfolio_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portfolio_categories_name_key unique (name),
  constraint portfolio_categories_slug_key unique (slug),
  constraint portfolio_categories_name_check check (length(btrim(name)) between 2 and 80),
  constraint portfolio_categories_slug_check check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

insert into public.portfolio_categories (name, slug) values
  ('Branding', 'branding'), ('Desenvolvimento', 'desenvolvimento'), ('Editorial', 'editorial'), ('UI/UX Design', 'ui-ux-design');

alter table public.portfolio_cases drop constraint if exists portfolio_cases_categories_check;

create function public.portfolio_touch_category_updated_at()
returns trigger language plpgsql security invoker set search_path = pg_catalog, public
as $$ begin new.updated_at := now(); return new; end; $$;

create trigger portfolio_touch_category_updated_at
before update on public.portfolio_categories for each row execute function public.portfolio_touch_category_updated_at();

create function public.portfolio_validate_case_categories()
returns trigger language plpgsql security definer set search_path = pg_catalog, public
as $$
begin
  if exists (
    select 1 from unnest(new.categories) as category(name)
    where not exists (select 1 from public.portfolio_categories pc where pc.name = category.name and pc.is_active)
  ) then
    raise exception 'portfolio case uses an unknown or inactive category';
  end if;
  return new;
end; $$;

revoke all on function public.portfolio_validate_case_categories() from public;

create trigger portfolio_validate_case_categories
before insert or update of categories on public.portfolio_cases
for each row execute function public.portfolio_validate_case_categories();

alter table public.portfolio_categories enable row level security;
create policy "Published portfolio categories are readable"
on public.portfolio_categories for select to anon, authenticated using (is_active);
create policy "Portfolio admins manage categories"
on public.portfolio_categories for all to authenticated using (public.can_manage_portfolio()) with check (public.can_manage_portfolio());

grant select on public.portfolio_categories to anon, authenticated;
grant insert, update, delete on public.portfolio_categories to authenticated;
commit;
-- Source migration consolidated from LUMO: 20260723183000_increase_portfolio_image_limit.sql
begin;

update storage.buckets
set file_size_limit = 26214400
where id in ('portfolio-drafts', 'portfolio-media');

commit;
-- Source migration consolidated from LUMO: 20260723203000_allow_partial_portfolio_drafts.sql
begin;

alter table public.portfolio_cases
  drop constraint if exists portfolio_cases_categories_check,
  drop constraint if exists portfolio_cases_slug_key,
  drop constraint if exists portfolio_cases_slug_length_check,
  drop constraint if exists portfolio_cases_slug_not_blank_check,
  drop constraint if exists portfolio_cases_title_length_check;

alter table public.portfolio_cases
  add constraint portfolio_cases_title_length_check
    check (
      length(btrim(title)) <= 120
      and (status <> 'published' or length(btrim(title)) >= 2)
    ),
  add constraint portfolio_cases_slug_length_check
    check (
      length(btrim(slug)) <= 140
      and (status <> 'published' or length(btrim(slug)) >= 2)
    );

create unique index if not exists portfolio_cases_slug_unique_nonblank_idx
  on public.portfolio_cases (slug)
  where length(btrim(slug)) > 0;

create or replace function public.portfolio_validate_case_categories()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  if exists (
    select 1
    from unnest(new.categories) as category(name)
    where not exists (
      select 1
      from public.portfolio_categories registered
      where registered.name = category.name
        and registered.is_active
    )
  ) then
    raise exception 'portfolio case uses an unknown or inactive category';
  end if;
  return new;
end;
$$;

revoke all on function public.portfolio_validate_case_categories() from public;

drop trigger if exists portfolio_validate_case_categories on public.portfolio_cases;
create trigger portfolio_validate_case_categories
before insert or update of categories on public.portfolio_cases
for each row execute function public.portfolio_validate_case_categories();

commit;
-- Source migration consolidated from LUMO: 20260723210000_fix_portfolio_category_public_read.sql
begin;

drop policy if exists "Published portfolio categories are readable" on public.portfolio_categories;
create policy "Published portfolio categories are readable"
on public.portfolio_categories
for select
to anon, authenticated
using (is_active);

commit;
-- Source migration consolidated from LUMO: 20260723213000_harden_portfolio_category_trigger_acl.sql
begin;

revoke all on function public.portfolio_validate_case_categories() from public;
revoke execute on function public.portfolio_validate_case_categories() from anon;
revoke execute on function public.portfolio_validate_case_categories() from authenticated;

commit;
-- Source migration consolidated from LUMO: 20260803143000_add_portfolio_case_trash.sql
begin;

alter table public.portfolio_cases add column if not exists deleted_at timestamptz;
comment on column public.portfolio_cases.deleted_at is 'Soft-delete timestamp. Cases remain restorable for 30 days before a scheduled permanent purge.';
create index if not exists portfolio_cases_deleted_at_idx on public.portfolio_cases (deleted_at) where deleted_at is not null;

drop policy if exists "Portfolio cases public published read" on public.portfolio_cases;
create policy "Portfolio cases public published read" on public.portfolio_cases for select to anon, authenticated using (status = 'published' and deleted_at is null);

create or replace function public.purge_deleted_portfolio_cases()
returns integer language plpgsql security definer set search_path = pg_catalog, public, storage as $$
declare asset record; purged_count integer;
begin
  for asset in select distinct bucket_id, object_name from (
    select c.cover_storage_bucket as bucket_id, c.cover_storage_path as object_name from public.portfolio_cases c where c.deleted_at <= now() - interval '30 days'
    union
    select m.storage_bucket, m.storage_path from public.portfolio_case_media m join public.portfolio_cases c on c.id = m.case_id where c.deleted_at <= now() - interval '30 days'
  ) assets where bucket_id in ('portfolio-drafts', 'portfolio-media') and object_name is not null loop
    delete from storage.objects where bucket_id = asset.bucket_id and name = asset.object_name;
  end loop;
  delete from public.portfolio_cases where deleted_at <= now() - interval '30 days';
  get diagnostics purged_count = row_count;
  return purged_count;
end;
$$;
revoke all on function public.purge_deleted_portfolio_cases() from public;

create extension if not exists pg_cron;
do $$ declare existing_job bigint; begin
  select jobid into existing_job from cron.job where jobname = 'purge-deleted-portfolio-cases';
  if existing_job is not null then perform cron.unschedule(existing_job); end if;
  perform cron.schedule('purge-deleted-portfolio-cases', '17 3 * * *', 'select public.purge_deleted_portfolio_cases()');
end; $$;

commit;
-- Source migration consolidated from LUMO: 20260803211000_harden_portfolio_case_trash_purge_acl.sql
revoke execute on function public.purge_deleted_portfolio_cases() from anon, authenticated;
-- Source migration consolidated from LUMO: 20260810222616_add_portfolio_case_external_link_label.sql
-- Stores the per-case copy for the public official-project link.
-- Existing cases keep a useful label as soon as the migration is applied.
alter table public.portfolio_cases
  add column if not exists external_link_label text not null default 'Acessar projeto oficial';

alter table public.portfolio_cases
  drop constraint if exists portfolio_cases_external_link_label_length_check;

alter table public.portfolio_cases
  add constraint portfolio_cases_external_link_label_length_check
  check (char_length(external_link_label) <= 80);
-- Source migration consolidated from LUMO: 20260810223449_add_portfolio_case_external_link_enabled.sql
-- Distinguishes links explicitly configured in the current CMS from imported legacy URLs.
alter table public.portfolio_cases
  add column if not exists external_link_enabled boolean not null default false;
