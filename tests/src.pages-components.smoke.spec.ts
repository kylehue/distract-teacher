import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { parse } from "@vue/compiler-sfc";
import { pageAndComponentVueFiles } from "./support/source-files";

describe("src pages/components syntax coverage", () => {
   it("parses all vue files under src/app/pages and src/app/components", () => {
      const files = pageAndComponentVueFiles();
      for (const file of files) {
         const abs = path.resolve(process.cwd(), file);
         const source = fs.readFileSync(abs, "utf8");
         const parsed = parse(source, { filename: file });
         expect(parsed.errors).toEqual([]);
      }

      expect(files.length).toBeGreaterThan(0);
   });
});
