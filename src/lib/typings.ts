export interface MonitorLog {
   id: string | number;
   roomId: string | number;
   studentId: string | number;
   warningLevel: WarningLevel;
   createdAt: number;

   integrityScore: number;
   rfScoreAvg: number;
   ifScoreAvg: number;

   recordingPath: string;
   recordingUrl: string;
}

export type WarningLevel = "low" | "moderate" | "severe";

export interface RoomInfo {
   id: string | number;
   teacherId: string | number;
   title: string;
   code: string;
   studentCount: number;
   studentCapacity: number;
   status: "paused" | "monitoring" | "concluded";
   timeStarted?: number;
   timeEnded?: number;
   evidenceWarningLevel: WarningLevel;
   severeWarningPunishment: boolean;
   allowLateStudents: boolean;
   joinConfirmation: boolean;
   createdAt: number;
}

export interface RoomStudentInfo {
   id: string | number;
   roomId: string | number;
   studentUuid: string;
   studentName: string;
   totalLogs: number;
   timeJoined: number;
   timeLeft?: number;
   active: boolean;
   createdAt: number;
}
