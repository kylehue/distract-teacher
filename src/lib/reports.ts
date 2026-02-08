import { MonitorLog, StudentInfo } from "./typings";

export function computeStdDev(values: number[]): number {
   if (!values.length) return 0;

   const mean = values.reduce((sum, v) => sum + v, 0) / values.length;

   const variance =
      values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;

   return Math.sqrt(variance);
}

export function explainIntegrityAndStdDev(std: number, score: number) {
   let explanation: string;

   if (std < 0.05) {
      explanation =
         "The student exhibited consistent integrity behavior throughout the session, with minimal variation in integrity scores.";
   } else if (std < 0.15) {
      explanation =
         "The student showed moderate fluctuations in integrity scores, indicating occasional irregular behavior during the session.";
   } else {
      explanation =
         "The student demonstrated highly variable integrity scores, suggesting inconsistent behavior and potential integrity concerns.";
   }

   if (score >= 0.8) {
      explanation +=
         " Despite these variations, the overall integrity score remained relatively high.";
   } else if (score >= 0.6) {
      explanation +=
         " The overall integrity score falls within a moderate range.";
   } else {
      explanation +=
         " The overall integrity score was low, which may warrant further review.";
   }

   return explanation;
}

export function explainIntegrity(score: number): string {
   if (score >= 0.9)
      return "Excellent integrity, very attentive during sessions.";
   if (score >= 0.75) return "Good integrity, minor lapses observed.";
   if (score >= 0.5) return "Moderate integrity, some distractions detected.";
   if (score > 0) return "Low integrity, frequent lapses observed.";
   return "No data available to assess integrity.";
}

export function explainStdDev(std: number): string {
   if (std < 0.05) return "Student's behavior is very consistent.";
   if (std < 0.1) return "Student's behavior is mostly consistent.";
   if (std < 0.2) return "Student's behavior is somewhat inconsistent.";
   if (std > 0.2)
      return "Student's behavior is highly variable during sessions.";
   return "Insufficient data to determine variability.";
}

export const FEATURE_GROUPS_MAP: Record<
   keyof MonitorLog["featureImpacts"],
   string
> = {
   faceX: "Face Position",
   faceY: "Face Position",
   faceW: "Face Position",
   faceH: "Face Position",
   faceConf: "Face Position",
   eyeGazeX: "Eye Gaze",
   eyeGazeY: "Eye Gaze",
   headPitch: "Head Orientation",
   headYaw: "Head Orientation",
   headRoll: "Head Orientation",
   wristLeftX: "Hand Position",
   wristLeftY: "Hand Position",
   wristRightX: "Hand Position",
   wristRightY: "Hand Position",
   faceCount: "Face Count",
   facePresent: "Face Count",
   handCount: "Hand Count",
};

export function groupFeatureImpacts(
   featureImpacts: MonitorLog["featureImpacts"],
): Record<string, number> {
   const groupedImpacts: Record<string, number> = {};

   for (const [feature, impact] of Object.entries(featureImpacts)) {
      const group =
         FEATURE_GROUPS_MAP[feature as keyof MonitorLog["featureImpacts"]];
      if (group in groupedImpacts) {
         groupedImpacts[group] += impact;
      } else {
         groupedImpacts[group] = impact;
      }
   }
   return groupedImpacts;
}

export function createMonitorLogsReports(monitorLogs: MonitorLog[]) {
   const integrityScoreAverage = monitorLogs.length
      ? monitorLogs
           .map((log) => log.integrityScore)
           .reduce((a, b) => a + b, 0) / monitorLogs.length
      : 0;

   const standardDeviation = computeStdDev(
      monitorLogs.map((log) => log.integrityScore),
   );

   const findings = explainIntegrityAndStdDev(
      integrityScoreAverage,
      standardDeviation,
   );

   const integritySummary = explainIntegrity(integrityScoreAverage);

   const standardDeviationSummary = explainStdDev(standardDeviation);

   const phoneDetectionCount = monitorLogs.filter(
      (log) => log.isPhonePresent,
   ).length;

   return {
      integrityScoreAverage,
      standardDeviation,
      findings,
      integritySummary,
      standardDeviationSummary,
      phoneDetectionCount,
   };
}

export function computeExpectedMonitorLogCount(
   roomTimeStarted: string | Date,
   roomTimeEnded: string | Date,
   monitorIntervalMs = 6000, // TODO: always sync to student client
): number {
   const start =
      roomTimeStarted instanceof Date
         ? roomTimeStarted.getTime()
         : new Date(roomTimeStarted).getTime();

   const end =
      roomTimeEnded instanceof Date
         ? roomTimeEnded.getTime()
         : new Date(roomTimeEnded).getTime();

   if (!start || !end || end <= start) return 0;

   const durationMs = end - start;

   return Math.floor(durationMs / monitorIntervalMs);
}

export function createStudentsIndividualReports(
   students: StudentInfo[],
): Map<string, { zScore: number; explanation: string }> {
   if (!students.length) return new Map();

   const counts = students.map((s) => s.monitorLogCount);

   const mean = counts.reduce((sum, c) => sum + c, 0) / counts.length;
   const stdDev = computeStdDev(counts);

   // Everyone logged the same amount (no meaningful comparison)
   if (stdDev === 0) {
      return new Map(
         students.map((s) => [
            s.id,
            {
               zScore: 0,
               explanation:
                  "All students produced similar activity logs; no abnormal behavior detected.",
            },
         ]),
      );
   }

   return new Map(
      students.map((s) => {
         const z = (s.monitorLogCount - mean) / stdDev;

         let explanation: string;

         if (z < -3) {
            explanation =
               "Log activity is extremely low compared to the class, suggesting prolonged disconnection or monitoring avoidance.";
         } else if (z < -2) {
            explanation =
               "Log activity is significantly lower than most students and may indicate intermittent disconnection.";
         } else if (z < -1) {
            explanation =
               "Log activity is slightly below average but still within a normal range.";
         } else {
            explanation =
               "Log activity falls within the normal range for this session.";
         }

         return [
            s.id,
            {
               zScore: z,
               explanation,
            },
         ];
      }),
   );
}
