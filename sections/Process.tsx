import { Gem, Rocket, Scan } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MagicBentoCard, MagicBentoGrid } from "@/components/ui/MagicBentoCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localizedLandingContent } from "@/lib/content/localized-landing";
import { copy, type Locale } from "@/lib/i18n";

export function Process({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const processItems = localizedLandingContent[locale].process;
  return (
    <Section id="processo" className="differentials-section" labelledBy="process-title">
      <ScrollReveal>
        <SectionHeading
          id="process-title"
          label={text.labels.differentiators}
          title={text.process.title}
          description={text.process.description}
        />
      </ScrollReveal>
      <MagicBentoGrid className="process-grid" spotlightRadius={150} glowColor="132, 0, 255">
        {processItems.map((item, index) => (
          <MagicBentoCard className={`process-item process-item--${index + 1}`} clickEffect={false} key={item.title}>
            {index === 0 ? <Gem className="process-item__icon" aria-hidden="true" /> : null}
            {index === 4 ? <Scan className="process-item__icon" aria-hidden="true" /> : null}
            <h3>{item.title}</h3>
            {item.showDescription ? <p>{item.description}</p> : null}
          </MagicBentoCard>
        ))}
        <MagicBentoCard className="process-item process-item--metric" clickEffect={false}>
          <Rocket className="process-item__icon" aria-hidden="true" />
          <h3>{text.process.metric}</h3>
        </MagicBentoCard>
      </MagicBentoGrid>
    </Section>
  );
}
