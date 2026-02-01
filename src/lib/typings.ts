const FEATURE_COLUMNS = [
   "faceX",
   "faceY",
   "faceW",
   "faceH",
   "faceConf",
   "eyeGazeX",
   "eyeGazeY",
   "headYaw",
   "headPitch",
   "headRoll",
   "wristLeftX",
   "wristLeftY",
   "wristRightX",
   "wristRightY",
   "faceCount",
   "handCount",
   "facePresent",
] as const;

export interface MonitorLog {
   id: string;
   roomId: string;
   studentId: string;
   warningLevel: WarningLevel;
   createdAt: string;

   integrityScore: number;
   rfScore: number;
   ifScore: number;
   featureImpacts: Record<(typeof FEATURE_COLUMNS)[number], number>;
   isPhonePresent: boolean;

   recordingPath: string;
   recordingUrl: string;
}

export type WarningLevel = "none" | "low" | "moderate" | "severe";

export interface RoomInfo {
   id: string;
   teacherAccountId: string;
   title: string;
   code: string;
   studentCount: number;
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
   id: string;
   roomId: string;
   uuid: string;
   name: string;
   timeJoined: string;
   timeLeft?: string;
   active: boolean;
   permitted: boolean;
   lockMonitorLogId?: string;
   createdAt: string;
}

export interface TeacherInfo {
   id: string;
   displayName: string;
   username: string;
   createdAt: string;
}
