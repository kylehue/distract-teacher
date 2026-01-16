export interface MonitorLog {
   id: string | number;
   roomId: string | number;
   studentId: string | number;
   warningLevel: WarningLevel;
   createdAt: string;

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
   studentCapacity: number;
   status: "paused" | "monitoring" | "concluded";
   timeStarted?: string;
   timeEnded?: string;
   evidenceWarningLevel: WarningLevel;
   severeWarningPunishment: boolean;
   allowLateStudents: boolean;
   joinConfirmation: boolean;
   createdAt: string;
}

export interface StudentInfo {
   id: string | number;
   roomId: string | number;
   uuid: string;
   name: string;
   timeJoined: string;
   timeLeft?: string;
   active: boolean;
   createdAt: string;
}

export interface TeacherInfo {
   id: string | number;
   displayName: string;
   createdAt: string;
}
