import { BlurText } from "@/components/motion/BlurText";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { ClientLogoLoop } from "@/components/ui/ClientLogoLoop";
import { clientLogos, siteConfig } from "@/lib/content/site";
import { copy, type Locale } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const text = copy[locale].hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 className="hero-title" id="hero-title">
          <BlurText
            text={text.title[0]}
            animateBy="words"
            delay={95}
            direction="top"
            as="span"
            className="hero-title__line"
          />
          <BlurText
            text={text.title[1]}
            animateBy="words"
            delay={95}
            startDelay={285}
            direction="top"
            as="span"
            className="hero-title__line"
          />
        </h1>
        <div className="hero__description" aria-label={text.description.join(" ")}>
          <BlurText
            text={text.description[0]}
            animateBy="words"
            delay={38}
            startDelay={650}
            direction="top"
            as="span"
            className="hero__description-line"
          />
          <BlurText
            text={text.description[1]}
            animateBy="words"
            delay={38}
            startDelay={1068}
            direction="top"
            as="span"
            className="hero__description-line"
          />
        </div>
        <SpecularButton
          className="hero-cta specular-button--primary"
          href={siteConfig.whatsapp}
          external
        >
          {text.contact}
        </SpecularButton>
        <div className="hero-client-logos">
          <ClientLogoLoop names={clientLogos} />
        </div>
      </div>
    </section>
  );
}
