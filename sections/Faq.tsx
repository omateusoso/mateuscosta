import { BlurText } from "@/components/motion/BlurText";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";
import { Section } from "@/components/ui/Section";
import { localizedLandingContent } from "@/lib/content/localized-landing";
import { copy, type Locale } from "@/lib/i18n";

export function Faq({ locale }: { locale: Locale }) {
  return (
    <Section id="faq" className="faq-section" labelledBy="faq-title">
      <ScrollReveal>
        <BlurText
          text={copy[locale].faqTitle}
          animateBy="words"
          delay={58}
          direction="top"
          as="h2"
          id="faq-title"
        />
      </ScrollReveal>
      <FaqAccordion items={localizedLandingContent[locale].faq} />
    </Section>
  );
}
