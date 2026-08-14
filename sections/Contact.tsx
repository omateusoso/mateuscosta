import { Mail, MessageCircle } from "lucide-react";
import { BlurText } from "@/components/motion/BlurText";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MagicBentoCard, MagicBentoGrid } from "@/components/ui/MagicBentoCard";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/content/site";
import { copy, type Locale } from "@/lib/i18n";

export function Contact({ locale }: { locale: Locale }) {
  const text = copy[locale].contact;
  return (
    <Section id="contato" className="contact-section" labelledBy="contact-title">
      <ScrollReveal>
        <h2 id="contact-title">
          <BlurText
            text={text.title[0]}
            animateBy="words"
            delay={58}
            direction="top"
            as="span"
            className="contact-title__line"
          />
          <BlurText
            text={text.title[1]}
            animateBy="words"
            delay={58}
            startDelay={420}
            direction="top"
            as="span"
            className="contact-title__line"
          />
        </h2>
      </ScrollReveal>
      <MagicBentoGrid className="contact-grid" spotlightRadius={150} glowColor="132, 0, 255">
        <MagicBentoCard className="contact-card" clickEffect={false}>
          <a href={`mailto:${siteConfig.email}`} className="contact-card__link">
            <span className="contact-card__icon"><Mail aria-hidden="true" /></span>
            <span className="contact-card__title">{text.email}</span>
            <small>{siteConfig.email}</small>
          </a>
        </MagicBentoCard>
        <MagicBentoCard className="contact-card" clickEffect={false}>
          <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="contact-card__link">
            <span className="contact-card__icon"><MessageCircle aria-hidden="true" /></span>
            <span className="contact-card__title">{text.whatsapp}</span>
            <small>{siteConfig.phoneLabel}</small>
          </a>
        </MagicBentoCard>
      </MagicBentoGrid>
    </Section>
  );
}
