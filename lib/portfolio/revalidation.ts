export function portfolioPathsForSlugs(...slugs: Array<string | null | undefined>) {
  const casePaths = [...new Set(slugs.filter(Boolean).flatMap((slug) => [
    `/cases/${slug}`,
    `/pt-br/cases/${slug}`,
    `/en/cases/${slug}`,
    `/es/cases/${slug}`,
  ]))];
  return ["/", "/cases", "/pt-br", "/en", "/es", "/pt-br/cases", "/en/cases", "/es/cases", ...casePaths];
}
