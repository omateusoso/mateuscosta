# Cores da landing page LUMO

Levantamento das cores efetivamente usadas na rota inicial (`/`). Inclui cabeçalho, rodapé, seções, estados de interação e os efeitos visuais carregados nessa página. Não inclui as cores exclusivas do CMS/admin nem das páginas internas de cases.

## Tokens principais

| Papel | Token | Valor de origem | Hex equivalente |
| --- | --- | --- | --- |
| Fundo principal | `--color-bg` | `rgb(11, 3, 18)` | `#0B0312` |
| Fundo elevado dos cards de serviços | `--color-bg-raised` / `--color-surface-strong` | `rgb(22, 6, 41)` | `#160629` |
| Superfície translúcida | `--color-surface` | `rgba(22, 6, 41, 0.20)` | `#160629` a 20% |
| Texto e ícones principais | `--color-ink` / `--color-text-button` | `rgb(255, 255, 255)` | `#FFFFFF` |
| Texto secundário | `--color-ink-muted`, `--color-ink-subtle`, `--color-text-body` | `rgb(153, 161, 175)` / `#99A1AF` | `#99A1AF` |
| Marca | `--color-brand` | `rgb(139, 81, 255)` | `#8B51FF` |
| Marca clara (hover) | `--color-brand-bright` | `rgb(156, 105, 255)` | `#9C69FF` |
| Borda padrão | `--color-border`, `--color-border-soft` | `rgba(255, 255, 255, 0.15)` | `#FFFFFF` a 15% |

## Cores sólidas e gradientes

| Uso | Cores |
| --- | --- |
| CTA principal | `#5A3CFF` → `#2D197B` |
| CTA principal em hover | `#735BFF` → `#3A2499` |
| Foco visível e ícone aberto do FAQ | `#A99CFF` |
| Ícone do FAQ fechado | `#F7F5FB` |
| Rótulo de seção | `#848EFF` |
| Fundo do menu mobile | `#100923` |
| Fundo do skip link e máscara das linhas dos cards | `#FFFFFF`; texto do skip link: `#05020D` |
| Fade da faixa de logos e `theme-color` do navegador | `#05020D` |
| Gradiente de overlay dos cases | transparente → `#1D1353` |
| Linhas animadas nos cards de serviço | `#FFFFFF` com opacidade máxima de 10% |
| Destaque especular do botão | texto `#F5F5F5`, linha `#EBEFFF`, base `#2F208F` |

## Transparências, profundidade e efeitos

| Contexto | Cor de origem e opacidade |
| --- | --- |
| Superfície de vidro do header | `rgb(17, 12, 35)` a 66%; borda branca a 8% |
| Brilho que segue o cursor | `rgb(91, 60, 255)` a 8% |
| Borda/luz dos cards de serviço | `rgb(90, 60, 255)` em até 88% da intensidade de interação |
| Sombra e máscara sobre imagens de serviço | `rgb(3, 2, 9)` a 96% → 5% |
| Faixas de preenchimento dos cards de serviço | `rgb(29, 19, 83)` a 20% |
| Fundo sutil da seção de cases | `rgb(44, 20, 144)` a 16% |
| Destaque residual das seções sobrepostas | `rgb(74, 38, 213)` a 24%; `rgb(69, 37, 192)` a 32%; `rgb(62, 31, 172)` a 20% |
| Cards de processo | `rgb(11, 6, 27)` a 48% |
| Cards de FAQ | `rgb(11, 6, 27)` a 32%; aberto: 42%, com borda `rgb(146, 120, 255)` a 42% |
| Cards de contato | `rgb(12, 7, 28)` a 42% |
| Glow de processo e contato | `rgb(132, 0, 255)` em 80% e 40% da intensidade do ponteiro |
| Sombras do CTA | branco a 18% no brilho interno; `rgb(45, 25, 123)` a 32% na sombra externa |
| Sombra dos cards de serviço | preto a 20%; brilho `rgb(90, 60, 255)` a 16% |

## Regras presentes, mas neutralizadas na home atual

Estas cores continuam declaradas em `app/globals.css`, porém a regra `.home-page` remove os backgrounds das seções e substitui o background composto do `body`. Elas não aparecem na renderização atual da landing, mas estão registradas aqui para evitar que uma futura alteração de CSS as reintroduza sem contexto.

| Regra | Cores declaradas |
| --- | --- |
| Gradiente ambiental do `body` | `rgb(61, 35, 197)` a 28%; `rgb(59, 30, 172)` a 19% |
| Fundo da seção de cases | `rgb(44, 20, 144)` a 16% |
| Fundo da seção sobre a empresa | `rgb(74, 38, 213)` a 24% |
| Fundo da seção de diferenciais | `rgb(69, 37, 192)` a 32% |
| Fundo da seção de contato | `rgb(62, 31, 172)` a 20% |

## Fundo líquido (WebGL)

Quando WebGL está disponível e o usuário não prefere redução de movimento, a landing usa esta paleta no componente `LandingBackground`:

| Cor | Hex |
| --- | --- |
| Roxo profundo | `#1D1353` |
| Magenta-violeta | `#9A3CFF` |

`#9A3CFF` é enviado duas vezes ao efeito para manter o peso visual dessa ponta do gradiente. O canvas é transparente: essas cores se compõem sobre `#0B0312`, em vez de substituir o fundo da página.

## Fontes auditadas

- `app/globals.css`
- `components/effects/LandingBackground.tsx`
- `components/ui/SpecularButton.tsx` e `components/ui/SpecularButton.css`
- `components/ui/LogoLoop.css` e `components/ui/ClientLogoLoop.tsx`
- `sections/Services.tsx`
