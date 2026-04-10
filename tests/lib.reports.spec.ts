import { describe, expect, it } from "vitest";
import {
   computeExpectedMonitorLogCount,
   computeStdDev,
   createMonitorLogsReports,
   getAndExplainZScores,
   explainIntegrity,
   explainIntegrityAndStdDev,
   explainStdDev,
   groupFeatureImpacts,
} from "@/lib/reports";

describe("lib/reports", () => {
   it("computes standard deviation", () => {
      expect(computeStdDev([])).toBe(0);
      expect(computeStdDev([1, 1, 1])).toBe(0);
      expect(computeStdDev([1, 2, 3])).toBeGreaterThan(0);
   });

   it("explains integrity metrics", () => {
      expect(explainIntegrity(0.95)).toMatch(/Excellent/);
      expect(explainStdDev(0.25)).toMatch(/highly variable/);
      expect(explainStdDev(0.2)).toMatch(/highly variable/);
      expect(explainIntegrityAndStdDev(0.1, 0.9)).toContain(
         "overall integrity score",
      );
   });

   it("groups feature impacts", () => {
      const grouped = groupFeatureImpacts({
         faceX: 0.2,
         faceY: 0.1,
         faceW: 0,
         faceH: 0,
         faceConf: 0,
         eyeGazeX: 0.3,
         eyeGazeY: 0.2,
         headYaw: 0,
         headPitch: 0,
         headRoll: 0,
         wristLeftX: 0,
         wristLeftY: 0,
         wristRightX: 0,
         wristRightY: 0,
         faceCount: 0,
         handCount: 0,
         facePresent: 0,
      });
      expect(grouped["Face Bounds"]).toBeCloseTo(0.3);
      expect(grouped["Eye Gaze"]).toBeCloseTo(0.5);
   });

   it("creates monitor log reports", () => {
      const out = createMonitorLogsReports(null, [
         { integrityScore: 0.8, isPhonePresent: false },
         { integrityScore: 0.6, isPhonePresent: true },
      ] as any);
      expect(out.integrityScoreAverage).toBeCloseTo(0.7);
      expect(out.phoneDetectionCount).toBe(1);
      expect(out.findings).toContain("moderate range");
   });

   it("creates safe defaults for empty monitor log reports", () => {
      const out = createMonitorLogsReports(null, [] as any);
      expect(out.integrityScoreAverage).toBe(0);
      expect(out.standardDeviation).toBe(0);
      expect(out.phoneDetectionCount).toBe(0);
      expect(out.integritySummary).toMatch(/No data available/);
   });

   it("computes expected monitor log count", () => {
      expect(
         computeExpectedMonitorLogCount(
            "2025-01-01T00:00:00.000Z",
            "2025-01-01T00:00:12.000Z",
            6000,
         ),
      ).toBe(2);
      expect(
         computeExpectedMonitorLogCount(new Date(0), new Date(12000), 6000),
      ).toBe(2);
      expect(computeExpectedMonitorLogCount("invalid", "2025-01-01")).toBe(0);
      expect(computeExpectedMonitorLogCount("2025-01-01", "2024-01-01")).toBe(
         0,
      );
   });

   it("returns 0 expected monitor logs for non-positive intervals", () => {
      expect(
         computeExpectedMonitorLogCount(
            "2025-01-01T00:00:00.000Z",
            "2025-01-01T00:00:12.000Z",
            0,
         ),
      ).toBe(0);
      expect(
         computeExpectedMonitorLogCount(
            "2025-01-01T00:00:00.000Z",
            "2025-01-01T00:00:12.000Z",
            -1000,
         ),
      ).toBe(0);
   });

   it("creates student individual z-score reports", () => {
      const out = getAndExplainZScores([
         { id: "s1", monitorLogCount: 10 },
         { id: "s2", monitorLogCount: 10 },
      ] as any);
      expect(out.get("s1")?.zScore).toBe(0);

      const varied = getAndExplainZScores([
         { id: "s1", monitorLogCount: 1 },
         { id: "s2", monitorLogCount: 20 },
         { id: "s3", monitorLogCount: 18 },
      ] as any);
      expect(varied.get("s1")?.zScore).toBeLessThan(0);
   });

   it("returns empty z-score report map for empty student list", () => {
      expect(getAndExplainZScores([] as any).size).toBe(0);
   });
});
