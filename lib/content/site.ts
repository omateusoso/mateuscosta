import { assetPath } from "@/lib/asset";

export const siteConfig = {
  name: "Mateus Costa",
  description:
    "Design inteligente, estratégia digital e tecnologia para marcas que querem crescer.",
  email: "contato@mateuscosta.design",
  phoneLabel: "(51) 98115.9150",
  whatsapp: "https://wa.me/5551981159150",
  social: {
    instagram: "https://www.instagram.com/raksadesign/",
    facebook: "https://www.facebook.com/raksadesign",
    linkedin: "https://www.linkedin.com/company/raksadesign",
  },
} as const;

export const services = [
  {
    title: "Product Design",
    description:
      "Do problema à interface final. Tradução de requisitos complexos de negócio em jornadas de usuário intuitivas. Criação de produtos digitais escaláveis, unindo estética e funcionalidade.",
    image: assetPath("/images/services/product-design.jpg"),
  },
  {
    title: "UX Research & Discovery",
    description:
      "Decisões baseadas em dados e pessoas. Entendimento profundo das necessidades do usuário através de pesquisas, entrevistas e testes de usabilidade para mitigar riscos antes do código.",
    image: assetPath("/images/services/ux-research-discovery.jpg"),
  },
  {
    title: "UX Audit & Redesign",
    description:
      "Evolução de interfaces existentes. Avaliação heurística e análise crítica de produtos para identificar atritos, reduzir a carga cognitiva e modernizar a experiência do usuário.",
    image: assetPath("/images/services/ux-audit-redesign.jpg"),
  },
  {
    title: "Design Systems & Ops",
    description:
      "Escalabilidade e consistência visual. Construção e manutenção de bibliotecas de componentes e UI Guidelines, acelerando a prototipação e garantindo um handoff impecável para a engenharia.",
    image: assetPath("/images/services/design-systems-ops.jpg"),
  },
  {
    title: "Prototipação e Interação",
    description:
      "Validação visual e fluxos dinâmicos. Criação de protótipos de alta fidelidade e microinterações para tangibilizar ideias, facilitar o alinhamento com stakeholders e testar hipóteses rapidamente.",
    image: assetPath("/images/services/prototipacao-interacao.jpg"),
  },
  {
    title: "Growth Design & IA",
    description:
      "Design focado em conversão e resultados. Otimização de métricas de negócio (CRO) e integração de ferramentas de inteligência artificial para potencializar a eficiência e a experiência do produto.",
    image: assetPath("/images/services/growth-design-ai.jpg"),
  },
] as const;

export const processItems = [
  {
    title: "Qualidade Premium",
    description: "Designs de alto impacto que elevam sua marca e geram resultados",
    showDescription: false,
  },
  {
    title: "AI Power",
    description: "Design acelerado e inovador com o poder da IA.",
    showDescription: true,
  },
  {
    title: "Foco em Resultados",
    description: "Design que não só encanta, mas que impulsiona suas vendas e engajamento",
    showDescription: true,
  },
  {
    title: "Inovação Constante",
    description: "Sempre à frente, explorando as últimas tendências e tecnologias de design",
    showDescription: true,
  },
  {
    title: "Desburocratização",
    description: "Diga adeus aos processos lentos e complexos. Sua experiência é fluida",
    showDescription: false,
  },
  {
    title: "Criatividade Otimizada",
    description: "IA potencializa as ideias. Visão humana garante o impacto e o resultado.",
    showDescription: true,
  },
  {
    title: "Estratégia",
    description: "Minha experiência permite criar um ecossistema completo de soluções para marcas e projetos.",
    showDescription: true,
  },
] as const;

export const faqItems = [
  {
    question: "Você está disponível para contratação ou projetos pontuais?",
    answer:
      "Estou disponível tanto para contratação quanto para projetos mais pontuais.",
  },
  {
    question: "Quais são suas principais habilidades de design?",
    answer:
      "Ofereço um portfólio completo para marcas brilharem no digital e no físico. Minhas principais habilidades incluem: Posts para redes sociais, Landing Pages de alta conversão, Materiais Gráficos diversos (flyers, banners, cards, etc.) e serviços de Diagramação e Editoração, mas, sendo meu foco principal o UI/UX Design",
  },
  {
    question: "Como a Inteligência Artificial é usada no seu processo de criação?",
    answer:
      "A IA é meu braço estratégico e criativo, mas a decisão final é sempre minha e baseada na estratégia. Uso a IA para explorar mais caminhos criativos, otimizar processos internos e garantir que o design seja altamente eficaz. É a união da capacidade analítica da tecnologia com minha visão estratégica e expertise. Isso significa mais qualidade em menos tempo.",
  },
  {
    question: "Você trabalha de forma presencial ou remota?",
    answer:
      "Atualmente trabalho de forma remota, atendendo clientes e empresas.",
  },
] as const;

export const clientLogos = [
  "atitus",
  "blenduca",
  "candy",
  "capri",
  "clickimpresso",
  "impresul",
  "jaq",
  "leylaw",
  "polvilho",
  "trirs",
  "ufrgs",
  "vallor",
  "valor",
] as const;
