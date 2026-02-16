import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { parse } from "@vue/compiler-sfc";
import { nonPageSourceFiles } from "./support/source-files";

describe("src non-page module syntax coverage", () => {
   it("parses all non-page ts/vue files", () => {
      const files = nonPageSourceFiles().filter(
         (f) =>
            (f.endsWith(".ts") || f.endsWith(".vue")) &&
            !f.endsWith(".d.ts"),
      );

      for (const file of files) {
         const abs = path.resolve(process.cwd(), file);
         const source = fs.readFileSync(abs, "utf8");

         if (file.endsWith(".ts")) {
            const out = ts.transpileModule(source, {
               compilerOptions: {
                  target: ts.ScriptTarget.ESNext,
                  module: ts.ModuleKind.ESNext,
               },
               fileName: file,
            });
            expect(out.diagnostics?.length ?? 0).toBe(0);
         } else {
            const parsed = parse(source, { filename: file });
            expect(parsed.errors).toEqual([]);
         }
      }

      expect(files.length).toBeGreaterThan(0);
   });
});
