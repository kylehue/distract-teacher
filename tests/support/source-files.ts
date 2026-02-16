import fs from "node:fs";
import path from "node:path";

export function listSourceFiles(): string[] {
   const root = path.resolve(process.cwd(), "src");
   const out: string[] = [];

   function walk(dir: string) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
         const abs = path.join(dir, entry.name);
         if (entry.isDirectory()) {
            walk(abs);
            continue;
         }

         const rel = abs.replace(root + path.sep, "").replace(/\\/g, "/");
         out.push(`src/${rel}`);
      }
   }

   walk(root);
   return out;
}

export function nonPageSourceFiles(): string[] {
   return listSourceFiles().filter((file) => !file.startsWith("src/app/pages/"));
}

export function pageAndComponentVueFiles(): string[] {
   return listSourceFiles().filter(
      (file) =>
         file.endsWith(".vue") &&
         (file.startsWith("src/app/pages/") ||
            file.startsWith("src/app/components/")),
   );
}
