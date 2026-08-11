import { Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/lib/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <Logo compact />
        <p>© {new Date().getFullYear()} Mateus Costa. Todos os direitos reservados.</p>
        <nav aria-label="Mídias sociais">
          {siteConfig.whatsapp && <a className="button button--secondary button--icon" href={siteConfig.whatsapp} aria-label="WhatsApp"><SocialIcon name="whatsapp" /></a>}
          {siteConfig.social.instagram && <a className="button button--secondary button--icon" href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon name="instagram" /></a>}
          {siteConfig.email && <a className="button button--secondary button--icon" href={`mailto:${siteConfig.email}`} aria-label="E-mail"><Mail aria-hidden="true" /></a>}
        </nav>
      </Container>
    </footer>
  );
}
