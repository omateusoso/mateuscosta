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
            text="Seu design pode"
            animateBy="words"
            delay={95}
            direction="top"
            as="span"
            className="hero-title__line"
          />
          <BlurText
            text="ser mais inteligente"
            animateBy="words"
            delay={95}
            startDelay={285}
            direction="top"
            as="span"
            className="hero-title__line"
          />
        </h1>
        <div className="hero__description" aria-label="Mateus Costa cria experiências de design com estratégia e tecnologia.">
          <BlurText
            text="Mateus Costa cria experiências de design com estratégia"
            animateBy="words"
            delay={38}
            startDelay={650}
            direction="top"
            as="span"
            className="hero__description-line"
          />
          <BlurText
            text="e tecnologia para transformar ideias em resultados."
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
          href={siteConfig.whatsapp || "/#contato"}
          external={Boolean(siteConfig.whatsapp)}
        >
          Fazer um orçamento
        </SpecularButton>
        <div className="hero-client-logos">
          <ClientLogoLoop names={clientLogos} />
        </div>
      </div>
    </section>
  );
}
