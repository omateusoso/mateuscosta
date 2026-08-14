import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CaseFilters } from "@/components/cases/CaseFilters";
import { LandingBackground } from "@/components/effects/LandingBackground";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BlurText } from "@/components/motion/BlurText";
import { getPublishedCases } from "@/lib/queries/cases";
import { getPortfolioCategories } from "@/lib/queries/portfolio-categories";
import { copy, isLocale } from "@/lib/i18n";

export default async function LocalizedCasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [cases, categories] = await Promise.all([getPublishedCases(locale), getPortfolioCategories()]);
  const text = copy[locale].cases;
  return <main id="conteudo" className="listing-page site-background-page"><LandingBackground /><Container><ScrollReveal><header className="listing-page__header"><p className="section-label section-label--cases">Portfolio</p><BlurText text={text.title} animateBy="words" delay={58} direction="top" as="h1" /><BlurText text={text.description} animateBy="words" delay={28} startDelay={420} direction="top" /></header></ScrollReveal><CaseFilters cases={cases} categories={categories} locale={locale} /></Container></main>;
}
