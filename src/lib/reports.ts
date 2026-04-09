import { MonitorLog, StudentInfo } from "./typings";

export function computeStdDev(values: number[]): number {
   if (!values.length) return 0;

   const mean = values.reduce((sum, v) => sum + v, 0) / values.length;

   const variance =
      values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;

   return Math.sqrt(variance);
}

export function explainIntegrityAndStdDev(std: number, score: number) {
   let integrityDesc: string;
   let consistencyDesc: string;
   let diagnosis: string;

   // Integrity (overall behavior)
   if (score >= 0.85) {
      integrityDesc = "high integrity";
   } else if (score >= 0.65) {
      integrityDesc = "moderate integrity";
   } else {
      integrityDesc = "low integrity";
   }

   // Consistency (stability of behavior)
   if (std < 0.05) {
      consistencyDesc = "very consistent";
   } else if (std < 0.1) {
      consistencyDesc = "mostly consistent";
   } else if (std < 0.2) {
      consistencyDesc = "inconsistent at times";
   } else {
      consistencyDesc = "highly inconsistent";
   }

   // Combined diagnosis (this is the important part)
   if (score >= 0.85 && std < 0.1) {
      diagnosis =
         "The student remained focused and stable throughout the session with no meaningful signs of suspicious behavior.";
   } else if (score >= 0.85 && std >= 0.1) {
      diagnosis =
         "The student was generally attentive, but there were noticeable moments of distraction or irregular behavior.";
   } else if (score >= 0.65 && std < 0.1) {
      diagnosis =
         "The student showed steady but only moderate focus, suggesting consistent but not fully attentive behavior.";
   } else if (score >= 0.65 && std >= 0.1) {
      diagnosis =
         "The student's behavior fluctuated between attentive and distracted, indicating inconsistent focus.";
   } else if (score < 0.65 && std < 0.1) {
      diagnosis =
         "The student consistently showed signs of low integrity, indicating persistent suspicious or distracted behavior.";
   } else {
      diagnosis =
         "The student frequently switched between normal and suspicious behavior, which may indicate attempts to avoid detection.";
   }

   return `The student showed ${consistencyDesc} behavior with an overall level of ${integrityDesc}. ${diagnosis}`;
}

export function explainIntegrity(score: number): string {
   if (score >= 0.9)
      return "The student maintained a very high level of focus and showed no noticeable signs of suspicious behavior.";

   if (score >= 0.75)
      return "The student was generally focused, with only minor moments that may indicate brief distractions.";

   if (score >= 0.5)
      return "The student showed inconsistent focus, with several moments that may indicate distraction or unusual behavior.";

   if (score > 0)
      return "The student frequently showed signs of distraction or suspicious behavior throughout the session.";

   return "There is not enough data to assess the student's behavior.";
}

export function explainStdDev(std: number): string {
   if (std < 0.05)
      return "The student's behavior was very stable and consistent from start to finish.";

   if (std < 0.1)
      return "The student's behavior was mostly consistent, with only small changes over time.";

   if (std < 0.2)
      return "The student's behavior changed at several points, suggesting periods of distraction or irregular activity.";

   if (std >= 0.2)
      return "The student's behavior was highly inconsistent, with frequent changes that may indicate ongoing distractions or issues.";

   return "There is not enough data to determine how consistent the student's behavior was.";
}

export const FEATURE_GROUPS_MAP: Record<
   keyof MonitorLog["featureImpacts"],
   string
> = {
   faceX: "Face Bounds",
   faceY: "Face Bounds",
   faceW: "Face Bounds",
   faceH: "Face Bounds",
   faceConf: "Face Bounds",
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

export function createMonitorLogsReports(
   student: StudentInfo | undefined | null,
   monitorLogs: MonitorLog[],
) {
   const integrityScoreAverage =
      student && student.monitorLogCount > 0
         ? student.integrityScoreSum / student.monitorLogCount
         : 0;
   const standardDeviation = computeStdDev(
      monitorLogs.map((log) => log.integrityScore),
   );

   const findings = explainIntegrityAndStdDev(
      standardDeviation,
      integrityScoreAverage,
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

   if (
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      !Number.isFinite(monitorIntervalMs) ||
      monitorIntervalMs <= 0 ||
      end <= start
   )
      return 0;

   const durationMs = end - start;

   return Math.floor(durationMs / monitorIntervalMs);
}

export function explainLogCountRatio(ratio: number): string {
   if (ratio >= 0.95) {
      return "The student's monitoring data was recorded consistently throughout the session, indicating stable connectivity and no signs of monitoring interruption.";
   }

   if (ratio >= 0.8) {
      return "The student's monitoring data was mostly complete, with only minor gaps that may be due to brief connectivity issues.";
   }

   if (ratio >= 0.6) {
      return "The student's monitoring data shows noticeable gaps, suggesting periods where monitoring may have been interrupted.";
   }

   if (ratio >= 0.4) {
      return "The student's monitoring data is incomplete, with several missing intervals that may indicate repeated disconnections or interruptions during the session.";
   }

   if (ratio > 0) {
      return "The student's monitoring data is significantly incomplete, indicating frequent or prolonged interruptions that may have affected continuous monitoring.";
   }

   return "No monitoring data was recorded for this student, suggesting a complete loss of connection or absence during the session.";
}

export function getAndExplainZScores(
   students: StudentInfo[],
): Map<string, { zScore: number; explanation: string }> {
   if (!students.length) return new Map();

   const counts = students.map((s) => s.monitorLogCount);

   const mean = counts.reduce((sum, c) => sum + c, 0) / counts.length;
   const stdDev = computeStdDev(counts);

   if (stdDev === 0) {
      return new Map(
         students.map((s) => [
            s.id,
            {
               zScore: 0,
               explanation:
                  "All students showed nearly identical activity levels, so there are no noticeable differences in monitoring behavior.",
            },
         ]),
      );
   }

   return new Map(
      students.map((s) => {
         const z = (s.monitorLogCount - mean) / stdDev;

         let explanation: string;

         if (z <= -3) {
            explanation =
               "This student recorded far fewer activity logs than the rest of the class. This strongly suggests long periods without monitoring, possibly due to disconnection or leaving the session.";
         } else if (z <= -2) {
            explanation =
               "This student recorded significantly fewer logs than most students. This may indicate repeated disconnections or unstable participation during the session.";
         } else if (z <= -1) {
            explanation =
               "This student recorded slightly fewer logs than average. While still within a normal range, it may reflect minor interruptions or brief disconnections.";
         } else if (z < 1) {
            explanation =
               "This student's activity level is in line with the rest of the class, showing consistent participation and monitoring.";
         } else if (z < 2) {
            explanation =
               "This student recorded slightly more logs than average. This may indicate more movement or slightly higher activity, but it is still within a normal range.";
         } else if (z < 3) {
            explanation =
               "This student recorded significantly more logs than most of the class. This could indicate frequent movement or unusual behavior being captured.";
         } else {
            explanation =
               "This student recorded far more logs than others. This suggests consistently high activity or repeated detection events that may require closer review.";
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
