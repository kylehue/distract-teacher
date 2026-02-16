import { describe, expect, it } from "vitest";
import { toCamelCase, toTitleCase } from "@/lib/string";

describe("lib/string", () => {
   it("converts to title case", () => {
      expect(toTitleCase("hELLo woRLD")).toBe("Hello World");
   });

   it("normalizes whitespace for title case", () => {
      expect(toTitleCase("  hELLo   woRLD  ")).toBe("Hello World");
      expect(toTitleCase("   ")).toBe("");
   });

   it("converts separators to camel case", () => {
      expect(toCamelCase("hello_world-test value")).toBe("helloWorldTestValue");
      expect(toCamelCase("AlreadyCamel")).toBe("alreadyCamel");
   });

   it("handles edge formatting in camel case conversion", () => {
      expect(toCamelCase("___HELLO-world__TEST  value")).toBe("helloWorldTestValue");
      expect(toCamelCase("   ")).toBe("");
      expect(toCamelCase("--")).toBe("");
   });
});
