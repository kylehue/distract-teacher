import { describe, expect, it } from "vitest";
import { isUrlRelatedToParent } from "@/lib/url";

describe("lib/url", () => {
   it("checks direct and nested parent urls", () => {
      expect(isUrlRelatedToParent("/a", "/a")).toBe(true);
      expect(isUrlRelatedToParent("/a/b", "/a")).toBe(true);
      expect(isUrlRelatedToParent("/a/b/c", "/a")).toBe(true);
      expect(isUrlRelatedToParent("/ab", "/a")).toBe(false);
   });

   it("normalizes trailing and duplicate slashes", () => {
      expect(isUrlRelatedToParent("/a/", "/a")).toBe(true);
      expect(isUrlRelatedToParent("/a/b/", "/a/")).toBe(true);
      expect(isUrlRelatedToParent("/a//b", "/a")).toBe(true);
   });

   it("ignores query/hash parts before relationship checks", () => {
      expect(isUrlRelatedToParent("/a/b?tab=details#top", "/a")).toBe(true);
      expect(isUrlRelatedToParent("/ab?tab=details", "/a")).toBe(false);
   });

   it("treats blank values as unrelated", () => {
      expect(isUrlRelatedToParent("", "/a")).toBe(false);
      expect(isUrlRelatedToParent("/a", "")).toBe(false);
      expect(isUrlRelatedToParent("   ", " /a ")).toBe(false);
   });

   it("keeps root matching strict to only root path", () => {
      expect(isUrlRelatedToParent("/", "/")).toBe(true);
      expect(isUrlRelatedToParent("/dashboard", "/")).toBe(false);
   });
});
