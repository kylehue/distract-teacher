import { MonitorLog } from "./typings";

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
