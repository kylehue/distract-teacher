import { describe, expect, it } from "vitest";
import {
   compareTimestamps,
   timestampToDateString,
   timestampToTimeString,
   totalTime,
} from "@/lib/datetime";

describe("lib/datetime", () => {
   it("compares timestamp values with empty guard", () => {
      expect(compareTimestamps(undefined, undefined)).toBe(0);
      expect(compareTimestamps(undefined, "2025-01-01T00:00:00.000Z")).toBe(-1);
      expect(compareTimestamps("2025-01-01T00:00:00.000Z", undefined)).toBe(1);
      expect(compareTimestamps("2025-01-01T00:00:00.000Z", "2025-01-01T00:00:01.000Z")).toBeLessThan(0);
   });

   it("handles invalid timestamp comparisons deterministically", () => {
      expect(compareTimestamps("invalid-a", "invalid-b")).toBe(0);
      expect(compareTimestamps("invalid-a", "2025-01-01T00:00:00.000Z")).toBe(-1);
      expect(compareTimestamps("2025-01-01T00:00:00.000Z", "invalid-b")).toBe(1);
   });

   it("formats absolute time/date strings", () => {
      const ts = "2025-01-01T12:34:56.000Z";
      expect(timestampToTimeString(ts, false)).toMatch(/\d{2}:\d{2}/);
      expect(timestampToDateString(ts, false)).toMatch(/\d{2}\/\d{2}\/\d{2}/);
   });

   it("computes totalTime", () => {
      expect(totalTime("2025-01-01T00:00:00.000Z", "2025-01-01T00:00:30.000Z")).toBe("30s");
      expect(totalTime("2025-01-01T00:00:00.000Z", "2025-01-01T01:02:03.000Z")).toBe("1h 2m");
   });

   it("returns 0s for zero, negative, and invalid time deltas", () => {
      expect(totalTime("2025-01-01T00:00:00.000Z", "2025-01-01T00:00:00.000Z")).toBe("0s");
      expect(totalTime("2025-01-01T00:01:00.000Z", "2025-01-01T00:00:00.000Z")).toBe("0s");
      expect(totalTime("invalid", "2025-01-01T00:00:00.000Z")).toBe("0s");
   });
});
