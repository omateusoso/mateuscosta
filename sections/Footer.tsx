import { Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { siteConfig } from "@/lib/content/site";
import { copy, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <Logo compact />
        <p>© {new Date().getFullYear()} Mateus Costa. {copy[locale].footer}</p>
        <nav aria-label="Mídias sociais">
          <a className="button button--secondary button--icon" href={siteConfig.whatsapp} aria-label="WhatsApp"><SocialIcon name="whatsapp" /></a>
          <a className="button button--secondary button--icon" href={`mailto:${siteConfig.email}`} aria-label="E-mail"><Mail aria-hidden="true" /></a>
        </nav>
      </Container>
    </footer>
  );
}
