import type { Locale } from "@/lib/i18n";

type Card = { title: string; description: string; showDescription?: boolean };

export const localizedLandingContent: Record<Locale, {
  services: Card[];
  process: Card[];
  faq: Array<{ question: string; answer: string }>;
}> = {
  "pt-br": {
    services: [
      { title: "Product Design", description: "Do problema à interface final. Tradução de requisitos complexos de negócio em jornadas de usuário intuitivas. Criação de produtos digitais escaláveis, unindo estética e funcionalidade." },
      { title: "UX Research & Discovery", description: "Decisões baseadas em dados e pessoas. Entendimento profundo das necessidades do usuário através de pesquisas, entrevistas e testes de usabilidade para mitigar riscos antes do código." },
      { title: "UX Audit & Redesign", description: "Evolução de interfaces existentes. Avaliação heurística e análise crítica de produtos para identificar atritos, reduzir a carga cognitiva e modernizar a experiência do usuário." },
      { title: "Design Systems & Ops", description: "Escalabilidade e consistência visual. Construção e manutenção de bibliotecas de componentes e UI Guidelines, acelerando a prototipação e garantindo um handoff impecável para a engenharia." },
      { title: "Prototipação e Interação", description: "Validação visual e fluxos dinâmicos. Criação de protótipos de alta fidelidade e microinterações para tangibilizar ideias, facilitar o alinhamento com stakeholders e testar hipóteses rapidamente." },
      { title: "Growth Design & IA", description: "Design focado em conversão e resultados. Otimização de métricas de negócio (CRO) e integração de ferramentas de inteligência artificial para potencializar a eficiência e a experiência do produto." },
    ],
    process: [
      { title: "Qualidade Premium", description: "Designs de alto impacto que elevam sua marca e geram resultados" }, { title: "AI Power", description: "Design acelerado e inovador com o poder da IA.", showDescription: true }, { title: "Foco em Resultados", description: "Design que não só encanta, mas que impulsiona suas vendas e engajamento", showDescription: true }, { title: "Inovação Constante", description: "Sempre à frente, explorando as últimas tendências e tecnologias de design", showDescription: true }, { title: "Desburocratização", description: "Diga adeus aos processos lentos e complexos. Sua experiência é fluida" }, { title: "Criatividade Otimizada", description: "IA potencializa as ideias. Visão humana garante o impacto e o resultado.", showDescription: true }, { title: "Estratégia", description: "Minha experiência permite criar um ecossistema completo de soluções para marcas e projetos.", showDescription: true },
    ],
    faq: [
      { question: "Você está disponível para contratação ou projetos pontuais?", answer: "Estou disponível tanto para contratação quanto para projetos mais pontuais." },
      { question: "Quais são suas principais habilidades de design?", answer: "Ofereço um repertório completo para marcas brilharem no digital e no físico: conteúdo para redes sociais, landing pages de alta conversão, materiais gráficos, diagramação e editoração. Meu foco principal é UI/UX Design." },
      { question: "Como a Inteligência Artificial é usada no seu processo de criação?", answer: "A IA é meu braço estratégico e criativo, mas a decisão final é sempre minha e orientada pela estratégia. Uso a tecnologia para explorar caminhos, otimizar processos e aumentar a eficácia do design — combinando análise, visão estratégica e expertise para entregar mais qualidade em menos tempo." },
      { question: "Você trabalha de forma presencial ou remota?", answer: "Atualmente trabalho de forma remota, atendendo clientes e empresas." },
    ],
  },
  en: {
    services: [
      { title: "Product Design", description: "From the problem to the final interface. I turn complex business requirements into intuitive user journeys and create scalable digital products where aesthetics and usability work together." },
      { title: "UX Research & Discovery", description: "Decisions grounded in evidence and people. Research, interviews, and usability testing uncover real user needs and reduce risk before anything goes into development." },
      { title: "UX Audit & Redesign", description: "A clearer path forward for existing interfaces. Heuristic evaluation and product analysis reveal friction, reduce cognitive load, and bring the experience up to date." },
      { title: "Design Systems & Ops", description: "Consistency that scales. I build and maintain component libraries and UI guidelines that speed up prototyping and make handoff to engineering seamless." },
      { title: "Prototyping & Interaction", description: "Ideas made tangible. High-fidelity prototypes and microinteractions help align stakeholders, validate assumptions, and test flows early." },
      { title: "Growth Design & AI", description: "Design that moves the needle. I improve conversion and business metrics while using AI tools to make both the product experience and delivery process more effective." },
    ],
    process: [
      { title: "Premium Quality", description: "High-impact design that elevates your brand and drives results" }, { title: "AI-Powered", description: "Faster, more inventive design powered by AI.", showDescription: true }, { title: "Results-Focused", description: "Design that does more than look good—it builds engagement and supports growth.", showDescription: true }, { title: "Always Evolving", description: "Constantly exploring new design approaches and technologies.", showDescription: true }, { title: "Less Friction", description: "Goodbye to slow, complicated processes. The experience stays straightforward." }, { title: "Creativity, Optimized", description: "AI expands the possibilities; human judgment protects the impact.", showDescription: true }, { title: "Strategic Thinking", description: "My experience helps connect the right solutions into a complete ecosystem for brands and projects.", showDescription: true },
    ],
    faq: [
      { question: "Are you available for full-time roles or project-based work?", answer: "Yes. I am available for both ongoing roles and focused project engagements." },
      { question: "What are your core design capabilities?", answer: "I help brands show up clearly across digital and physical touchpoints: social content, conversion-focused landing pages, graphic materials, editorial design, and layout. My primary focus is UI/UX design." },
      { question: "How do you use AI in your creative process?", answer: "AI is a strategic and creative collaborator, never a substitute for judgment. I use it to explore more directions, streamline internal work, and make design more effective—combining technology's analytical range with my own strategy and expertise to deliver better work, faster." },
      { question: "Do you work on-site or remotely?", answer: "I currently work remotely with clients and teams wherever they are." },
    ],
  },
  es: {
    services: [
      { title: "Diseño de Producto", description: "Del problema a la interfaz final. Convierto requisitos de negocio complejos en recorridos de usuario intuitivos y creo productos digitales escalables que equilibran estética y funcionalidad." },
      { title: "Investigación UX y Discovery", description: "Decisiones basadas en evidencia y en las personas. La investigación, las entrevistas y las pruebas de usabilidad revelan necesidades reales y reducen riesgos antes del desarrollo." },
      { title: "Auditoría y Rediseño UX", description: "Una evolución con criterio para interfaces existentes. La evaluación heurística y el análisis del producto detectan fricciones, reducen la carga cognitiva y actualizan la experiencia." },
      { title: "Sistemas de Diseño y Operaciones", description: "Consistencia que escala. Creo y mantengo bibliotecas de componentes y guías de interfaz que aceleran el prototipado y facilitan la colaboración con ingeniería." },
      { title: "Prototipado e Interacción", description: "Ideas que se pueden experimentar. Los prototipos de alta fidelidad y las microinteracciones ayudan a alinear equipos, validar hipótesis y probar flujos a tiempo." },
      { title: "Growth Design e IA", description: "Diseño que genera resultados. Optimizo conversión y métricas de negocio, integrando herramientas de IA para mejorar la experiencia del producto y la eficiencia del proceso." },
    ],
    process: [
      { title: "Calidad Premium", description: "Diseño de alto impacto que eleva tu marca y genera resultados" }, { title: "Impulso de IA", description: "Diseño más ágil e innovador, potenciado por IA.", showDescription: true }, { title: "Foco en Resultados", description: "Diseño que no solo atrae: también impulsa ventas y engagement.", showDescription: true }, { title: "Innovación Continua", description: "Siempre explorando nuevas tendencias y tecnologías de diseño.", showDescription: true }, { title: "Menos Burocracia", description: "Adiós a los procesos lentos y complejos. La experiencia fluye." }, { title: "Creatividad Optimizada", description: "La IA amplía las ideas; la visión humana cuida el impacto.", showDescription: true }, { title: "Estrategia", description: "Mi experiencia conecta soluciones en un ecosistema completo para marcas y proyectos.", showDescription: true },
    ],
    faq: [
      { question: "¿Estás disponible para contratación o proyectos puntuales?", answer: "Sí. Estoy disponible tanto para colaboraciones continuas como para proyectos puntuales." },
      { question: "¿Cuáles son tus principales habilidades de diseño?", answer: "Ayudo a las marcas a destacarse en canales digitales y físicos: contenido para redes, landing pages orientadas a conversión, piezas gráficas, diseño editorial y maquetación. Mi foco principal es el diseño UI/UX." },
      { question: "¿Cómo usas la inteligencia artificial en tu proceso creativo?", answer: "La IA es una aliada estratégica y creativa, pero nunca reemplaza el criterio. La uso para explorar más caminos, optimizar procesos y hacer que el diseño sea más efectivo; combino su capacidad analítica con mi visión estratégica y experiencia para entregar mejor trabajo en menos tiempo." },
      { question: "¿Trabajas de forma presencial o remota?", answer: "Actualmente trabajo de forma remota con clientes y equipos, sin importar dónde estén." },
    ],
  },
};
