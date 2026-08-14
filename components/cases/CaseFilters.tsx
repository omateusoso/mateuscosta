"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { PortfolioCase } from "@/lib/supabase/database.types";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { copy, type Locale, withLocale } from "@/lib/i18n";

export function CaseFilters({ cases, categories, locale }: { cases: PortfolioCase[]; categories: string[]; locale: Locale }) {
  const text = copy[locale].cases;
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const visibleCases = useMemo(() => activeCategories.length === 0 ? cases : cases.filter((item) => item.categories.some((category) => activeCategories.includes(category))), [activeCategories, cases]);

  function toggleCategory(category: string) {
    setActiveCategories((currentCategories) => currentCategories.includes(category)
      ? currentCategories.filter((currentCategory) => currentCategory !== category)
      : [...currentCategories, category]);
  }

  return (
    <>
      <nav className="case-category-filters" aria-label={text.filters}>
        {categories.map((category, index) => (
          <ScrollReveal delay={index * 0.025} key={category}>
            <button type="button" className={`button button--secondary${activeCategories.includes(category) ? " active" : ""}`} aria-pressed={activeCategories.includes(category)} onClick={() => toggleCategory(category)}>{category}</button>
          </ScrollReveal>
        ))}
      </nav>
      <div className="cases-grid cases-grid--listing" aria-live="polite">
        {visibleCases.map((item, index) => (
          <ScrollReveal delay={index * 0.025} key={item.id}>
            <a className="case-card" href={withLocale(locale, `/cases/${item.slug}`)}>
              {item.cover_url ? <Image src={item.cover_url} alt={`Capa do case ${item.title}`} fill sizes="(max-width: 809px) 100vw, (max-width: 1279px) 50vw, 33vw" /> : null}
              <span className="case-card__meta">
                <strong>{item.title}</strong>
                <span className="case-card__categories" aria-label={`Categorias: ${item.categories.join(", ")}`}>
                  {item.categories.map((category) => <span className="badge case-card__badge" key={category}>{category}</span>)}
                </span>
              </span>
            </a>
          </ScrollReveal>
        ))}
      </div>
      {!visibleCases.length ? <p className="cases-filter-empty">{text.empty}</p> : null}
    </>
  );
}
