import { BlurText } from "@/components/motion/BlurText";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { ClientLogoLoop } from "@/components/ui/ClientLogoLoop";
import { clientLogos, siteConfig } from "@/lib/content/site";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 className="hero-title" id="hero-title">
          <BlurText
            text="Design inteligente"
            animateBy="words"
            delay={95}
            direction="top"
            as="span"
            className="hero-title__line"
          />
          <BlurText
            text="focado em resultados"
            animateBy="words"
            delay={95}
            startDelay={285}
            direction="top"
            as="span"
            className="hero-title__line"
          />
        </h1>
        <div className="hero__description" aria-label="Transformo problemas complexos de negócio em jornadas de usuário intuitivas, funcionais e escaláveis.">
          <BlurText
            text="Transformo problemas complexos de negócio em jornadas de"
            animateBy="words"
            delay={38}
            startDelay={650}
            direction="top"
            as="span"
            className="hero__description-line"
          />
          <BlurText
            text="usuário intuitivas, funcionais e escaláveis."
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
          Entrar em contato
        </SpecularButton>
        <div className="hero-client-logos">
          <ClientLogoLoop names={clientLogos} />
        </div>
      </div>
    </section>
  );
}
