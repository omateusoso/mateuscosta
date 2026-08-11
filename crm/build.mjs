import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const outputDirectory = new URL("./dist/", import.meta.url);
const excluded = new Set(["dist", "build.mjs", "package.json", "vercel.json", "supabase-config.js", "supabase-config.example.js"]);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const entry of ["app.js", "data", "index.html", "modules", "styles.css"]) {
  await cp(new URL(`./${entry}`, import.meta.url), new URL(`./${entry}`, outputDirectory), { recursive: true });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !anonKey) {
  console.warn("CRM built without Supabase configuration; provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to enable authentication.");
}

await writeFile(
  new URL("./supabase-config.js", outputDirectory),
  `window.MATEUSCOSTA_SUPABASE = ${JSON.stringify(url && anonKey ? { url, anonKey } : {})};\n`,
  "utf8",
);
