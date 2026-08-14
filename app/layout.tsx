import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PointerGlow } from "@/components/effects/PointerGlow";
import { siteConfig } from "@/lib/content/site";
import { cookies } from "next/headers";
import { isLocale } from "@/lib/i18n";

const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "./fonts/satoshi-light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/satoshi-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/satoshi-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/satoshi-bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Matt Design — Design inteligente", template: "%s | Matt Design" },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon-light.png", type: "image/png", sizes: "64x64", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", type: "image/png", sizes: "64x64", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/apple-touch-icon-light.png", type: "image/png", sizes: "180x180", media: "(prefers-color-scheme: light)" },
      { url: "/apple-touch-icon-dark.png", type: "image/png", sizes: "180x180", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: "Matt Design — Design inteligente",
    description: siteConfig.description,
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "Matt Design — Design inteligente focado em resultados" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matt Design — Design inteligente",
    description: siteConfig.description,
    images: ["/social-preview.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05020d",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const selected = (await cookies()).get("portfolio_locale")?.value;
  const locale = isLocale(selected ?? "") ? selected : "pt-br";
  return (
    <html lang={locale === "pt-br" ? "pt-BR" : locale} className={satoshi.variable}>
      <body>
        <a className="skip-link" href="#conteudo">{locale === "en" ? "Skip to content" : locale === "es" ? "Saltar al contenido" : "Pular para o conteúdo"}</a>
        <PointerGlow />
        {children}
      </body>
    </html>
  );
}
