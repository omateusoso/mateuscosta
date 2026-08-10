-- Distinguishes links explicitly configured in the current CMS from imported legacy URLs.
alter table public.portfolio_cases
  add column if not exists external_link_enabled boolean not null default false;
