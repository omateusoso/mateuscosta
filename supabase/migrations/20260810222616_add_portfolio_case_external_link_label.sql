-- Stores the per-case copy for the public official-project link.
-- Existing cases keep a useful label as soon as the migration is applied.
alter table public.portfolio_cases
  add column if not exists external_link_label text not null default 'Acessar projeto oficial';

alter table public.portfolio_cases
  drop constraint if exists portfolio_cases_external_link_label_length_check;

alter table public.portfolio_cases
  add constraint portfolio_cases_external_link_label_length_check
  check (char_length(external_link_label) <= 80);
