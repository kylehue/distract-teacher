import type {
   MonitorLog,
   NotificationInfo,
   RoomInfo,
   StudentInfo,
   TeacherInfo,
   WarningLevel,
} from "./typings";

export type Room = RoomInfo;
export type Student = StudentInfo;
export type Notification = NotificationInfo;
export type Teacher = TeacherInfo;

const WARNING_LEVELS: WarningLevel[] = ["none", "low", "moderate", "severe"];
const ROOM_STATUSES: Room["status"][] = ["paused", "monitoring", "concluded"];
const WARNING_LEVEL_RANK: Record<WarningLevel, number> = {
   none: 0,
   low: 1,
   moderate: 2,
   severe: 3,
};

const FIRST_NAMES = [
   "Alex",
   "Jordan",
   "Taylor",
   "Morgan",
   "Sam",
   "Riley",
   "Casey",
   "Avery",
   "Cameron",
   "Jamie",
];

const LAST_NAMES = [
   "Reyes",
   "Kim",
   "Patel",
   "Garcia",
   "Santos",
   "Walker",
   "Nguyen",
   "Lee",
   "Cruz",
   "Bennett",
];

const ROOM_TOPICS = [
   "Math Quiz",
   "Science Exam",
   "History Test",
   "Programming Lab",
   "Physics Assessment",
   "English Drill",
];

const FEATURE_KEYS: Array<keyof MonitorLog["featureImpacts"]> = [
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
];

function randInt(min: number, max: number): number {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 2): number {
   const raw = Math.random() * (max - min) + min;
   return Number(raw.toFixed(decimals));
}

function randBool(): boolean {
   return Math.random() >= 0.5;
}

function pick<T>(list: readonly T[]): T {
   return list[randInt(0, list.length - 1)]!;
}

function uid(prefix: string): string {
   return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function randomRoomCode(): string {
   return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function randomStudentName(): string {
   return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
}

function isoWithinHours(hours: number): string {
   const now = Date.now();
   const millisAgo = randInt(0, hours * 60 * 60 * 1000);
   return new Date(now - millisAgo).toISOString();
}

function addMinutes(isoDate: string, minutes: number): string {
   const base = new Date(isoDate).getTime();
   return new Date(base + minutes * 60 * 1000).toISOString();
}

function randomFeatureImpacts(): MonitorLog["featureImpacts"] {
   const impacts = {} as MonitorLog["featureImpacts"];

   for (const key of FEATURE_KEYS) {
      impacts[key] = randFloat(-1, 1, 4);
   }

   return impacts;
}

function maxWarningLevel(
   current: WarningLevel,
   incoming: WarningLevel,
): WarningLevel {
   return WARNING_LEVEL_RANK[incoming] > WARNING_LEVEL_RANK[current]
      ? incoming
      : current;
}

function normalizeRange(
   minValue: number | undefined,
   maxValue: number | undefined,
   fallbackMin: number,
   fallbackMax: number,
): { min: number; max: number } {
   const min = Math.max(0, Math.floor(minValue ?? fallbackMin));
   const maxCandidate = Math.max(0, Math.floor(maxValue ?? fallbackMax));
   return {
      min: Math.min(min, maxCandidate),
      max: Math.max(min, maxCandidate),
   };
}

export function createMonitorLog(
   overrides: Partial<MonitorLog> = {},
): MonitorLog {
   const createdAt = overrides.createdAt ?? isoWithinHours(24);

   const base: MonitorLog = {
      id: uid("log"),
      roomId: uid("room"),
      studentId: uid("student"),
      warningLevel: overrides.warningLevel ?? pick(WARNING_LEVELS),
      createdAt,
      integrityScore: randFloat(40, 100),
      rfScore: randFloat(0, 100),
      ifScore: randFloat(0, 100),
      featureImpacts: randomFeatureImpacts(),
      isPhonePresent: randBool(),
      recordingPath: `temp/recordings/${uid("clip")}.webm`,
      recordingUrl: `https://cdn.example.com/recordings/${uid("clip")}.webm`,
   };

   return { ...base, ...overrides };
}

export function createRoom(overrides: Partial<Room> = {}): Room {
   const createdAt = overrides.createdAt ?? isoWithinHours(72);
   const studentCapacity = overrides.studentCapacity ?? randInt(20, 60);
   const studentCount = Math.min(
      overrides.studentCount ?? randInt(0, studentCapacity),
      studentCapacity,
   );
   const status = overrides.status ?? pick(ROOM_STATUSES);

   const timeStarted =
      overrides.timeStarted ??
      (status === "paused" ? undefined : addMinutes(createdAt, randInt(2, 90)));

   const timeEnded =
      overrides.timeEnded ??
      (status === "concluded" && timeStarted
         ? addMinutes(timeStarted, randInt(20, 120))
         : undefined);

   const base: Room = {
      id: uid("room"),
      teacherAccountId: uid("teacher"),
      title: pick(ROOM_TOPICS),
      code: randomRoomCode(),
      studentCount,
      studentCapacity,
      status,
      timeStarted,
      timeEnded,
      evidenceWarningLevel: pick(WARNING_LEVELS),
      enablePunishments: randBool(),
      allowLateStudents: randBool(),
      joinConfirmation: randBool(),
      createdAt,
      deletedAt: undefined,
      seatColumnCount: 4,
      seatOrders: {},
   };

   return { ...base, ...overrides };
}

export function createStudent(overrides: Partial<Student> = {}): Student {
   const createdAt = overrides.createdAt ?? isoWithinHours(24);
   const active = overrides.active ?? randBool();
   const timeJoined =
      overrides.timeJoined ?? addMinutes(createdAt, randInt(1, 30));

   const timeLeft =
      overrides.timeLeft ??
      (active ? undefined : addMinutes(timeJoined, randInt(5, 90)));

   const base: Student = {
      id: uid("student"),
      roomId: uid("room"),
      uuid: uid("uuid"),
      name: randomStudentName(),
      timeJoined,
      timeLeft,
      active,
      permitted: randBool(),
      lockMonitorLogId: randBool() ? uid("log") : undefined,
      monitorLogCount: randInt(0, 40),
      createdAt,
   };

   return { ...base, ...overrides };
}

export function createNotification(
   overrides: Partial<Notification> = {},
): Notification {
   const base: Notification = {
      id: uid("notif"),
      title: "Monitoring Alert",
      body: "A student triggered a suspicious-behavior warning.",
      isRead: false,
      url: `/dashboard/student-reports/${uid("student")}`,
      createdAt: isoWithinHours(48),
   };

   return { ...base, ...overrides };
}

export function createTeacher(overrides: Partial<Teacher> = {}): Teacher {
   const displayName = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
   const username = `${displayName.toLowerCase().replace(/\s+/g, ".")}${randInt(10, 99)}`;

   const base: Teacher = {
      id: uid("teacher"),
      displayName,
      username,
      createdAt: isoWithinHours(240),
   };

   return { ...base, ...overrides };
}

export interface TeacherRoomCorrelatedData {
   room: Room;
   students: Student[];
   monitorLogs: MonitorLog[];
}

export interface TeacherCorrelatedData {
   teacher: Teacher;
   rooms: TeacherRoomCorrelatedData[];
}

export interface TeacherCorrelatedDataOptions {
   roomCount?: number;
   minStudentsPerRoom?: number;
   maxStudentsPerRoom?: number;
   minLogsPerStudent?: number;
   maxLogsPerStudent?: number;
   teacherOverrides?: Partial<Teacher>;
   roomOverrides?: Partial<Room>;
   studentOverrides?: Partial<Student>;
   monitorLogOverrides?: Partial<MonitorLog>;
}

export function createCorrelatedData(
   options: TeacherCorrelatedDataOptions = {},
): TeacherCorrelatedData {
   const roomCount = Math.max(0, Math.floor(options.roomCount ?? 3));
   const studentsRange = normalizeRange(
      options.minStudentsPerRoom,
      options.maxStudentsPerRoom,
      8,
      20,
   );
   const logsRange = normalizeRange(
      options.minLogsPerStudent,
      options.maxLogsPerStudent,
      1,
      5,
   );

   const teacher = createTeacher(options.teacherOverrides ?? {});
   const rooms: TeacherRoomCorrelatedData[] = [];

   for (let i = 0; i < roomCount; i++) {
      const studentsInRoom =
         options.roomOverrides?.studentCount ??
         randInt(studentsRange.min, studentsRange.max);
      const minCapacity = Math.max(1, studentsInRoom);
      const studentCapacity =
         options.roomOverrides?.studentCapacity ??
         randInt(minCapacity, Math.max(minCapacity, minCapacity + 30));

      let room = createRoom({
         ...options.roomOverrides,
         teacherAccountId: teacher.id,
         studentCapacity,
         studentCount: studentsInRoom,
      });

      const students: Student[] = [];
      const monitorLogs: MonitorLog[] = [];
      let highestWarning: WarningLevel = "none";

      for (let j = 0; j < studentsInRoom; j++) {
         const logsForStudent =
            options.studentOverrides?.monitorLogCount ??
            randInt(logsRange.min, logsRange.max);

         const studentCreatedAt = addMinutes(room.createdAt, randInt(1, 60));
         const studentTimeJoined = addMinutes(studentCreatedAt, randInt(0, 15));

         const student = createStudent({
            ...options.studentOverrides,
            roomId: room.id,
            createdAt: studentCreatedAt,
            timeJoined: studentTimeJoined,
            monitorLogCount: logsForStudent,
         });

         const studentLogs = Array.from({ length: logsForStudent }, () =>
            createMonitorLog({
               ...options.monitorLogOverrides,
               roomId: room.id,
               studentId: student.id,
               createdAt: addMinutes(student.timeJoined, randInt(1, 180)),
            }),
         );

         const severeLog = studentLogs.find((x) => x.warningLevel === "severe");
         const correlatedStudent =
            options.studentOverrides?.lockMonitorLogId !== undefined
               ? student
               : {
                    ...student,
                    lockMonitorLogId: severeLog?.id,
                 };

         for (const log of studentLogs) {
            highestWarning = maxWarningLevel(highestWarning, log.warningLevel);
         }

         students.push(correlatedStudent);
         monitorLogs.push(...studentLogs);
      }

      room = {
         ...room,
         studentCount: students.length,
         evidenceWarningLevel:
            options.roomOverrides?.evidenceWarningLevel ?? highestWarning,
      };

      rooms.push({ room, students, monitorLogs });
   }

   return { teacher, rooms };
}

export function createMonitorLogs(
   count: number,
   overrides: Partial<MonitorLog> = {},
): MonitorLog[] {
   return Array.from({ length: Math.max(0, count) }, () =>
      createMonitorLog(overrides),
   );
}

export function createRooms(
   count: number,
   overrides: Partial<Room> = {},
): Room[] {
   return Array.from({ length: Math.max(0, count) }, () =>
      createRoom(overrides),
   );
}

export function createStudents(
   count: number,
   overrides: Partial<Student> = {},
): Student[] {
   return Array.from({ length: Math.max(0, count) }, () =>
      createStudent(overrides),
   );
}

export function createNotifications(
   count: number,
   overrides: Partial<Notification> = {},
): Notification[] {
   return Array.from({ length: Math.max(0, count) }, () =>
      createNotification(overrides),
   );
}
