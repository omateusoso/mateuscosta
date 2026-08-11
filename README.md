# Mateus Costa — portfólio e CMS

Portfólio pessoal e CMS administrativo construídos com Next.js App Router, React, TypeScript, Tailwind CSS e Supabase. A arquitetura, o painel e as migrations foram mantidos para serem conectados a um projeto Supabase exclusivo de `mateuscosta`.

## Requisitos

- Node.js 22 ou superior
- npm
- novo projeto Supabase com as migrations deste repositório aplicadas

## Configuração

```sh
cp .env.example .env.local
npm install
npm run dev
```

Acesse `http://localhost:3000`. O login administrativo fica em `http://localhost:3000/admin/login`.

Sem variáveis Supabase, não conecte o site a nenhum ambiente existente. Autenticação e operações administrativas permanecem indisponíveis até a configuração do novo projeto — não há sessão ou permissão simulada.

## Supabase novo

1. Crie um projeto Supabase exclusivo para `mateuscosta`.
2. Copie `.env.example` para `.env.local` e preencha somente as credenciais desse projeto.
3. Aplique as migrations de `supabase/migrations` no novo projeto, seguindo a ordem dos timestamps.
4. Crie o primeiro usuário administrador e ajuste o placeholder `admin@mateuscosta.local` nas migrations/schema antes de provisionar usuários, se necessário.

Não reutilize URL, chaves, buckets ou dados de projetos anteriores. Os buckets esperados pelo CMS são `portfolio-drafts`, `portfolio-media` e o bucket legado `case-images`.

## Comandos

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Estrutura

- `app/(site)`: rotas públicas e páginas de cases
- `app/admin`: login e CMS protegido
- `app/api/revalidate`: invalidação autenticada de cache
- `components`: primitives, navegação, motion e efeitos
- `sections`: seções da landing page
- `lib`: Supabase, autorização, queries e validação
- `supabase/migrations`: schema, RLS, storage e evolução dos cases
- `docs/nextjs-migration`: auditoria, arquitetura e relatório de validação

Consulte [a auditoria](docs/nextjs-migration/current-site-audit.md), [a arquitetura](docs/nextjs-migration/architecture.md) e [o relatório de validação](docs/nextjs-migration/validation-report.md).
