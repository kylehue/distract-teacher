import { describe, expect, it } from "vitest";
import {
   createMappingById,
   deepMerge,
   getWithDefault,
   isObject,
   keysToCamel,
} from "@/lib/object";

describe("lib/object", () => {
   it("creates mapping by id", () => {
      const map = createMappingById([
         { id: "a", value: 1 },
         { id: "a", value: 9 },
         { id: "b", value: 2 },
      ]);
      expect(map.get("a")?.value).toBe(9);
      expect(map.size).toBe(2);
   });

   it("gets default and memoizes map value", () => {
      const map = new Map<string, number>();
      expect(getWithDefault(map, "x", 42)).toBe(42);
      expect(getWithDefault(map, "x", 100)).toBe(42);
   });

   it("converts nested keys to camel case", () => {
      const input = { some_key: [{ inner_key: 1 }], deep_obj: { next_key: 2 } };
      expect(keysToCamel(input)).toEqual({
         someKey: [{ innerKey: 1 }],
         deepObj: { nextKey: 2 },
      });
   });

   it("converts mixed arrays and keeps non-plain objects intact", () => {
      const date = new Date("2025-01-01T00:00:00.000Z");
      const input = [{ snake_key: 1 }, "x", 2, date] as const;
      const out = keysToCamel(input);
      expect(out[0]).toEqual({ snakeKey: 1 });
      expect(out[1]).toBe("x");
      expect(out[2]).toBe(2);
      expect(out[3]).toBe(date);
   });

   it("deep merges objects", () => {
      expect(deepMerge({ a: 1, b: { c: 1 } }, { b: { d: 2 } })).toEqual({
         a: 1,
         b: { c: 1, d: 2 },
      });
   });

   it("deep merges safely when target or source is non-object", () => {
      expect(deepMerge(undefined, { a: { b: 1 } })).toEqual({ a: { b: 1 } });
      expect(deepMerge({ a: 1 }, undefined)).toEqual({ a: 1 });
   });

   it("checks plain object", () => {
      expect(isObject({})).toBe(true);
      expect(isObject([])).toBe(false);
      expect(isObject(null)).toBeFalsy();
   });
});
