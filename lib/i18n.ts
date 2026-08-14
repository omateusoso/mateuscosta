export const locales = ["pt-br", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const localeDetails: Record<Locale, { code: string; label: string; flag: string }> = {
  "pt-br": { code: "PT", label: "Português (Brasil)", flag: "🇧🇷" },
  en: { code: "EN", label: "English", flag: "🇺🇸" },
  es: { code: "ES", label: "Español", flag: "🇪🇸" },
};

type Copy = {
  nav: { home: string; expertise: string; cases: string; faq: string; contact: string; language: string };
  labels: { about: string; expertise: string; portfolio: string; differentiators: string };
  hero: { title: [string, string]; description: [string, string]; contact: string };
  services: { title: string; description: string; more: string };
  cases: { title: string; description: string; all: string; view: string; filters: string; empty: string };
  process: { title: string; description: string; metric: string };
  about: { title: string; description: string };
  faqTitle: string;
  contact: { title: [string, string]; email: string; whatsapp: string };
  footer: string;
};

const pt: Copy = {
  nav: { home: "Home", expertise: "Expertise", cases: "Cases", faq: "FAQ", contact: "Entre em contato", language: "Idioma" }, labels: { about: "Sobre", expertise: "Expertise", portfolio: "Portfólio", differentiators: "Diferenciais" },
  hero: { title: ["Design inteligente", "focado em resultados"], description: ["Transformo problemas complexos de negócio em jornadas de", "usuário intuitivas, funcionais e escaláveis."], contact: "Entrar em contato" },
  services: { title: "Projetando Produtos Digitais Orientados a Resultados", description: "Construir produtos escaláveis exige mais do que boas interfaces; exige alinhar as necessidades do usuário aos objetivos de negócio. Minha atuação foca em transformar problemas complexos em jornadas intuitivas, ponta a ponta. Do discovery à validação, cada decisão de design é tomada para gerar valor real, usabilidade e impacto nas métricas da empresa.", more: "Saiba mais" },
  cases: { title: "O Futuro do Design em meus cases", description: "Confira algumas das minhas criações", all: "Ver todos os cases", view: "Ver case", filters: "Filtrar cases por categoria", empty: "Ainda não há cases publicados nas categorias selecionadas." },
  process: { title: "Agilidade que transforma ideias em realidade", description: "Utilizo IA para refinar conceitos e automatizar tarefas repetitivas, resultando em projetos de design de alta qualidade entregues com uma agilidade que surpreende.", metric: "+200 negócios acelerados" },
  about: { title: "Criatividade humana, amplificada por tecnologia.", description: "Utilizo IA para refinar conceitos e automatizar tarefas repetitivas. A visão humana continua no centro das decisões, garantindo projetos de alta qualidade entregues com uma agilidade que surpreende." },
  faqTitle: "Respostas inteligentes para o seu design",
  contact: { title: ["Seu design pode ser mais inteligente.", "Fale comigo:"], email: "Por E-Mail", whatsapp: "No WhatsApp" },
  footer: "Todos os direitos reservados.",
};
const en: Copy = {
  nav: { home: "Home", expertise: "Expertise", cases: "Case studies", faq: "FAQ", contact: "Get in touch", language: "Language" }, labels: { about: "About", expertise: "Expertise", portfolio: "Portfolio", differentiators: "What sets me apart" },
  hero: { title: ["Smart design", "built for results"], description: ["I turn complex business problems into intuitive, functional", "and scalable user journeys."], contact: "Get in touch" },
  services: { title: "Designing Results-Driven Digital Products", description: "Building scalable products takes more than great interfaces. It means aligning user needs with business goals. I turn complex problems into intuitive end-to-end journeys, from discovery to validation, with every design decision focused on real value, usability, and measurable impact.", more: "Learn more" },
  cases: { title: "A look at design with purpose", description: "Explore a selection of my work", all: "View all case studies", view: "View case study", filters: "Filter case studies by category", empty: "There are no published case studies in the selected categories yet." },
  process: { title: "Agility that turns ideas into reality", description: "I use AI to refine concepts and automate repetitive tasks, delivering high-quality design projects with surprising agility.", metric: "+200 businesses accelerated" },
  about: { title: "Human creativity, amplified by technology.", description: "I use AI to sharpen concepts and automate repetitive work, while human judgment remains at the center of every decision—so high-quality work moves faster without losing intention." },
  faqTitle: "Smart answers for your design",
  contact: { title: ["Your design can be smarter.", "Let's talk:"], email: "By email", whatsapp: "On WhatsApp" },
  footer: "All rights reserved.",
};
const es: Copy = {
  nav: { home: "Inicio", expertise: "Especialidades", cases: "Casos", faq: "FAQ", contact: "Hablemos", language: "Idioma" }, labels: { about: "Sobre mí", expertise: "Especialidades", portfolio: "Portafolio", differentiators: "Diferenciales" },
  hero: { title: ["Diseño inteligente", "enfocado en resultados"], description: ["Transformo problemas de negocio complejos en recorridos de usuario", "intuitivos, funcionales y escalables."], contact: "Hablemos" },
  services: { title: "Diseñando productos digitales orientados a resultados", description: "Construir productos escalables exige más que buenas interfaces: requiere alinear las necesidades de las personas con los objetivos del negocio. Transformo problemas complejos en recorridos intuitivos de punta a punta, desde el discovery hasta la validación.", more: "Saber más" },
  cases: { title: "Diseño con propósito, en la práctica", description: "Conoce una selección de mi trabajo", all: "Ver todos los casos", view: "Ver caso", filters: "Filtrar casos por categoría", empty: "Aún no hay casos publicados en las categorías seleccionadas." },
  process: { title: "Agilidad que convierte ideas en realidad", description: "Uso IA para refinar conceptos y automatizar tareas repetitivas, entregando proyectos de diseño de alta calidad con una agilidad sorprendente.", metric: "+200 negocios acelerados" },
  about: { title: "Creatividad humana, potenciada por tecnología.", description: "Uso IA para afinar conceptos y automatizar tareas repetitivas, pero el criterio humano sigue en el centro de cada decisión. Así, el trabajo gana calidad y velocidad sin perder intención." },
  faqTitle: "Respuestas inteligentes para tu diseño",
  contact: { title: ["Tu diseño puede ser más inteligente.", "Hablemos:"], email: "Por email", whatsapp: "Por WhatsApp" },
  footer: "Todos los derechos reservados.",
};
export const copy: Record<Locale, Copy> = { "pt-br": pt, en, es };

export function isLocale(value: string): value is Locale { return locales.includes(value as Locale); }
export function withLocale(locale: Locale, path = "/") { return `/${locale}${path === "/" ? "" : path}`; }
