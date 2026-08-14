import { siteConfig } from "@/lib/content/site";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "@/components/navigation/MobileNav";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { copy, type Locale, withLocale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <header className="site-header">
      <Container className="site-header__container">
        <GlassSurface className="site-header__surface">
          <Link href={withLocale(locale)} className="site-header__logo"><Logo /></Link>
          <nav className="site-header__nav" aria-label="Navegação principal">
            <Link href={withLocale(locale)} className="button button--tertiary">{text.nav.home}</Link>
            <Link href={withLocale(locale, "/#servicos")} className="button button--tertiary">{text.nav.expertise}</Link>
            <Link href={withLocale(locale, "/cases")} className="button button--tertiary">{text.nav.cases}</Link>
            <Link href={withLocale(locale, "/#faq")} className="button button--tertiary">{text.nav.faq}</Link>
          </nav>
          <div className="site-header__actions">
            <a className="button button--secondary site-header__cta" href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
              {text.nav.contact}
            </a>
            <LanguageSwitcher locale={locale} />
          </div>
          <MobileNav locale={locale} />
        </GlassSurface>
      </Container>
    </header>
  );
}
