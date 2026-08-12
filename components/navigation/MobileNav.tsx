"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/content/site";

const links = [
  ["Home", "/"],
  ["Serviços", "/#servicos"],
  ["Cases", "/cases"],
  ["FAQ", "/#faq"],
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <div className="mobile-nav" data-open={open}>
      <button
        className="mobile-nav__trigger"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span /><span />
      </button>
      <nav id="mobile-menu" className="mobile-nav__panel" aria-label="Navegação mobile" aria-hidden={!open}>
        <div className="mobile-nav__panel-content">
          <div className="mobile-nav__links">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="button button--tertiary" onClick={() => setOpen(false)}>{label}</a>
            ))}
          </div>
          <a className="button button--secondary mobile-nav__cta" href={siteConfig.whatsapp} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            Entre em contato
          </a>
        </div>
      </nav>
    </div>
  );
}
