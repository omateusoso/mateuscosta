begin;

create table public.portfolio_case_translations (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.portfolio_cases(id) on delete cascade,
  locale text not null,
  slug text not null,
  title text not null default '',
  excerpt text not null default '',
  content_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  content_html text not null default '',
  seo_title text not null default '',
  seo_description text not null default '',
  external_link_label text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (case_id, locale),
  unique (locale, slug),
  constraint portfolio_case_translations_locale_check check (locale in ('en', 'es')),
  constraint portfolio_case_translations_slug_check check (length(btrim(slug)) between 2 and 140 and slug !~ '[[:space:]/?#]'),
  constraint portfolio_case_translations_content_json_check check (jsonb_typeof(content_json) = 'object'),
  constraint portfolio_case_translations_status_check check (status in ('draft', 'published')),
  constraint portfolio_case_translations_version_check check (version > 0),
  constraint portfolio_case_translations_title_length_check check (length(btrim(title)) <= 120),
  constraint portfolio_case_translations_excerpt_length_check check (length(excerpt) <= 320),
  constraint portfolio_case_translations_content_html_length_check check (length(content_html) <= 200000),
  constraint portfolio_case_translations_seo_title_length_check check (length(seo_title) <= 70),
  constraint portfolio_case_translations_seo_description_length_check check (length(seo_description) <= 170)
);

alter table public.portfolio_case_translations enable row level security;

create policy "Published translations are public"
on public.portfolio_case_translations for select to anon, authenticated
using (status = 'published' and exists (select 1 from public.portfolio_cases c where c.id = case_id and c.status = 'published' and c.deleted_at is null));

create policy "Portfolio managers manage translations"
on public.portfolio_case_translations for all to authenticated
using (public.can_manage_portfolio())
with check (public.can_manage_portfolio());

create trigger portfolio_case_translations_set_updated_at
before update on public.portfolio_case_translations
for each row execute function public.portfolio_touch_case_updated_at();

commit;
