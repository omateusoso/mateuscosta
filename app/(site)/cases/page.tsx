import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CaseFilters } from "@/components/cases/CaseFilters";
import { LandingBackground } from "@/components/effects/LandingBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BlurText } from "@/components/motion/BlurText";
import { getPublishedCases } from "@/lib/queries/cases";
import { getPortfolioCategories } from "@/lib/queries/portfolio-categories";

export const metadata: Metadata = {
  title: "Cases",
  description: "Conheça os projetos de design, branding e produto digital da LUMO.",
};

export default async function CasesPage() {
  const [cases, categories] = await Promise.all([getPublishedCases(), getPortfolioCategories()]);
  return (
    <main id="conteudo" className="listing-page site-background-page">
      <LandingBackground />
      <Container>
        <ScrollReveal>
          <header className="listing-page__header">
            <p className="section-label">Portfólio</p>
            <BlurText
              text="O futuro do design em nossos cases"
              animateBy="words"
              delay={58}
              direction="top"
              as="h1"
            />
            <BlurText
              text="Estratégia, identidade e produto digital construídos para gerar resultados."
              animateBy="words"
              delay={28}
              startDelay={420}
              direction="top"
            />
          </header>
        </ScrollReveal>
        <CaseFilters cases={cases} categories={categories} />
      </Container>
    </main>
  );
}
