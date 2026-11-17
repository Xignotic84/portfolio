import { readFile } from "node:fs/promises";
import { join } from "node:path";

const GEIST_DIR = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");

export async function geistFonts() {
  const [regular, semibold] = await Promise.all([
    readFile(join(GEIST_DIR, "Geist-Regular.ttf")),
    readFile(join(GEIST_DIR, "Geist-SemiBold.ttf")),
  ]);
  return [
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
  ];
}
