import { describe, expect, it } from "vitest";
import { normalizeCaseSlug } from "@/lib/portfolio/slug";

describe("normalizeCaseSlug", () => {
  it("normaliza acentos, espaços e pontuação", () => {
    expect(normalizeCaseSlug("  Identidade Ágil — Mateus 2026! ")).toBe("identidade-agil-mateus-2026");
  });

  it("não cria hífens vazios", () => {
    expect(normalizeCaseSlug("---///---")).toBe("");
  });
});
