import { describe, expect, it } from "vitest";
import { normalizeMediaUrl } from "@/lib/portfolio/media-url";

describe("normalizeMediaUrl", () => {
  it.each([
    "https://framerusercontent.com/images/example.jpg",
    "https://example.com/image.jpg",
  ])("preserves configured media URLs: %s", (url) => {
    expect(normalizeMediaUrl(url)).toBe(url);
  });

  it("keeps current media URLs unchanged", () => {
    const url = "https://framerusercontent.com/images/current.jpg?width=1920";
    expect(normalizeMediaUrl(url)).toBe(url);
  });
});
