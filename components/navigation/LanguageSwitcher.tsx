"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { localeDetails, locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const suffix = pathname.replace(/^\/(pt-br|en|es)(?=\/|$)/, "") || "/";
  const current = localeDetails[locale];

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return <div className="language-switcher" ref={rootRef}>
    <button type="button" aria-expanded={open} aria-controls={menuId} aria-label={`Idioma atual: ${current.label}`} onClick={() => setOpen((value) => !value)}>
      <span aria-hidden="true">{current.flag}</span><span>{current.code}</span><span className="language-switcher__chevron" aria-hidden="true" />
    </button>
    {open ? <div className="language-switcher__menu" id={menuId} role="menu" aria-label="Escolher idioma">
      {locales.filter((entry) => entry !== locale).map((entry) => <a key={entry} href={`/${entry}${suffix === "/" ? "" : suffix}`} role="menuitem" aria-label={localeDetails[entry].label} onClick={() => setOpen(false)}><span aria-hidden="true">{localeDetails[entry].flag}</span><span>{localeDetails[entry].label}</span></a>)}
    </div> : null}
  </div>;
}
