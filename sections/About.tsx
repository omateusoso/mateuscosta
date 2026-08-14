import { BlurText } from "@/components/motion/BlurText";
import { Parallax } from "@/components/motion/Parallax";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { copy, type Locale } from "@/lib/i18n";

export function About({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <Section id="sobre" className="about-section" labelledBy="about-title">
      <Parallax amount={20}>
        <ScrollReveal className="about-copy">
          <p className="section-label">{text.labels.about}</p>
          <BlurText
            text={text.about.title}
            animateBy="words"
            delay={58}
            direction="top"
            as="h2"
            id="about-title"
          />
          <BlurText
            text={text.about.description}
            animateBy="words"
            delay={28}
            startDelay={420}
            direction="top"
          />
        </ScrollReveal>
      </Parallax>
    </Section>
  );
}
