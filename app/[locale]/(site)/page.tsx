import { notFound } from "next/navigation";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Cases } from "@/sections/Cases";
import { Process } from "@/sections/Process";
import { Faq } from "@/sections/Faq";
import { Contact } from "@/sections/Contact";
import { LandingBackground } from "@/components/effects/LandingBackground";
import { HomeHashScroll } from "@/components/navigation/HomeHashScroll";
import { getFeaturedCases } from "@/lib/queries/cases";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const cases = await getFeaturedCases(locale);
  return <main id="conteudo" className="home-page site-background-page"><LandingBackground /><Hero locale={locale} /><Services locale={locale} /><Cases cases={cases} locale={locale} /><Process locale={locale} /><Faq locale={locale} /><Contact locale={locale} /><HomeHashScroll /></main>;
}
