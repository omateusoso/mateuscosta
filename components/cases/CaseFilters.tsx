"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { PortfolioCase } from "@/lib/supabase/database.types";

export function CaseFilters({ cases, categories }: { cases: PortfolioCase[]; categories: string[] }) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const visibleCases = useMemo(() => activeCategories.length === 0 ? cases : cases.filter((item) => item.categories.some((category) => activeCategories.includes(category))), [activeCategories, cases]);

  function toggleCategory(category: string) {
    setActiveCategories((currentCategories) => currentCategories.includes(category)
      ? currentCategories.filter((currentCategory) => currentCategory !== category)
      : [...currentCategories, category]);
  }

  return (
    <>
      <nav className="case-category-filters" aria-label="Filtrar cases por categoria">
        {categories.map((category) => (
          <button key={category} type="button" className={`button button--secondary${activeCategories.includes(category) ? " active" : ""}`} aria-pressed={activeCategories.includes(category)} onClick={() => toggleCategory(category)}>{category}</button>
        ))}
      </nav>
      <div className="cases-grid cases-grid--listing" aria-live="polite">
        {visibleCases.map((item) => (
          <a className="case-card" href={`/cases/${item.slug}`} key={item.id}>
            {item.cover_url ? <Image src={item.cover_url} alt={`Capa do case ${item.title}`} fill sizes="(max-width: 809px) 100vw, (max-width: 1279px) 50vw, 33vw" /> : null}
            <span className="case-card__meta">
              <strong>{item.title}</strong>
              <span className="case-card__categories" aria-label={`Categorias: ${item.categories.join(", ")}`}>
                {item.categories.map((category) => <span className="badge case-card__badge" key={category}>{category}</span>)}
              </span>
            </span>
          </a>
        ))}
      </div>
      {!visibleCases.length ? <p className="cases-filter-empty">Ainda não há cases publicados nas categorias selecionadas.</p> : null}
    </>
  );
}
