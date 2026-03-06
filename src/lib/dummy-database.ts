import {
   createCorrelatedData,
   createNotification,
   createRoom,
} from "@/lib/dummy-data";
import type {
   MonitorLog,
   NotificationInfo,
   RoomInfo,
   StudentInfo,
   TeacherInfo,
} from "@/lib/typings";

export type DummyResponse<T> = {
   message: string;
   data?: T;
};

export type DummyError = {
   message: string;
   fieldErrors?: Record<string, string>;
};

export type DummyRequestOptions = {
   body?: Record<string, any> | FormData | null;
   params?: Record<string, any>;
};

type DummyDb = {
   teacher: TeacherInfo;
   rooms: Map<string, RoomInfo>;
   deletedRooms: Map<string, RoomInfo>;
   students: Map<string, StudentInfo>;
   monitorLogs: Map<string, MonitorLog>;
   notifications: Map<string, NotificationInfo>;
};

let dummyDb: DummyDb | null = null;

export function isDummyModeEnabled() {
   return import.meta.env.DEV && !!localStorage["dummyData"];
}

function createSuccess<T>(message: string, data?: T): DummyResponse<T> {
   const response: DummyResponse<T> = { message };
   if (typeof data !== "undefined") {
      response.data = data;
   }
   return response;
}

function throwDummyError(
   message: string,
   fieldErrors?: Record<string, string>,
): never {
   const error: DummyError = { message, fieldErrors };
   throw error;
}

function asBodyObject(body: DummyRequestOptions["body"]): Record<string, any> {
   if (!body) return {};

   if (body instanceof FormData) {
      const out: Record<string, any> = {};
      body.forEach((value, key) => {
         out[key] = value;
      });
      return out;
   }

   return body;
}

function resolveRouteUrl(
   template: string,
   params?: Record<string, string | number>,
): string {
   if (!params) return template;

   let url = template;

   for (const [key, value] of Object.entries(params)) {
      url = url.replace(
         new RegExp(`:${key}\\b`, "g"),
         encodeURIComponent(String(value)),
      );
   }

   if (import.meta.env.DEV) {
      const unresolved = url.match(/:[a-zA-Z_]\w*/g);
      if (unresolved) {
         throw new Error(
            `Unresolved URL params: ${unresolved.join(", ")} in ${template}`,
         );
      }
   }

   return url;
}

function pathFromTemplate(
   urlTemplate: string,
   options: DummyRequestOptions,
): string {
   const resolved = resolveRouteUrl(
      urlTemplate,
      options.params as Record<string, any>,
   );
   return new URL(resolved, "http://dummy.local").pathname;
}

function getRoomFromAny(db: DummyDb, roomId: string): RoomInfo | undefined {
   return db.rooms.get(roomId) ?? db.deletedRooms.get(roomId);
}

function getStudentsByRoomId(db: DummyDb, roomId: string): StudentInfo[] {
   return Array.from(db.students.values()).filter((s) => s.roomId === roomId);
}

function getMonitorLogsByRoomId(db: DummyDb, roomId: string): MonitorLog[] {
   return Array.from(db.monitorLogs.values()).filter(
      (l) => l.roomId === roomId,
   );
}

function getMonitorLogsByStudentId(
   db: DummyDb,
   studentId: string,
): MonitorLog[] {
   return Array.from(db.monitorLogs.values()).filter(
      (l) => l.studentId === studentId,
   );
}

function hasDuplicateRoomCode(
   db: DummyDb,
   code: string,
   ignoreRoomId?: string,
): boolean {
   const normalized = code.trim().toUpperCase();

   for (const room of db.rooms.values()) {
      if (room.id === ignoreRoomId) continue;
      if (room.code.toUpperCase() === normalized) return true;
   }

   for (const room of db.deletedRooms.values()) {
      if (room.id === ignoreRoomId) continue;
      if (room.code.toUpperCase() === normalized) return true;
   }

   return false;
}

function getDummyDb(): DummyDb {
   if (dummyDb) return dummyDb;

   const correlated = createCorrelatedData({
      roomCount: 5,
      minStudentsPerRoom: 8,
      maxStudentsPerRoom: 18,
      minLogsPerStudent: 1,
      maxLogsPerStudent: 6,
   });

   const rooms = new Map<string, RoomInfo>();
   const deletedRooms = new Map<string, RoomInfo>();
   const students = new Map<string, StudentInfo>();
   const monitorLogs = new Map<string, MonitorLog>();
   const notifications = new Map<string, NotificationInfo>();

   correlated.rooms.forEach((entry, index) => {
      const room =
         index === correlated.rooms.length - 1
            ? {
                 ...entry.room,
                 status: "concluded" as const,
                 deletedAt: new Date().toISOString(),
                 timeEnded: entry.room.timeEnded ?? new Date().toISOString(),
              }
            : entry.room;

      if (room.deletedAt) {
         deletedRooms.set(room.id, room);
      } else {
         rooms.set(room.id, room);
      }

      for (const student of entry.students) {
         students.set(student.id, student);
      }

      for (const log of entry.monitorLogs) {
         monitorLogs.set(log.id, log);
      }
   });

   const warningLogs = Array.from(monitorLogs.values())
      .filter((log) => log.warningLevel !== "none")
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .slice(0, 20);

   for (const log of warningLogs) {
      const student = students.get(log.studentId);
      const room = getRoomFromAny(
         {
            teacher: correlated.teacher,
            rooms,
            deletedRooms,
            students,
            monitorLogs,
            notifications,
         },
         log.roomId,
      );

      const notification = createNotification({
         title: `${log.warningLevel.toUpperCase()} Warning`,
         body: `${student?.name ?? "Unknown Student"} in ${room?.title ?? "Unknown Room"} triggered a warning.`,
         isRead: Math.random() > 0.65,
         url: student ? `/dashboard/student-reports/${student.id}` : undefined,
         createdAt: log.createdAt,
      });

      notifications.set(notification.id, notification);
   }

   if (notifications.size === 0) {
      const fallback = createNotification({
         title: "Welcome to dummy mode",
         body: "Dummy data is enabled via localStorage['dummyData'].",
         isRead: false,
         createdAt: new Date().toISOString(),
      });
      notifications.set(fallback.id, fallback);
   }

   dummyDb = {
      teacher: correlated.teacher,
      rooms,
      deletedRooms,
      students,
      monitorLogs,
      notifications,
   };

   return dummyDb;
}

export function resolveDummyResponse<T>(
   urlTemplate: string,
   method: string,
   options: DummyRequestOptions = {},
): DummyResponse<T> {
   const db = getDummyDb();
   const path = pathFromTemplate(urlTemplate, options);
   const body = asBodyObject(options.body);

   // GET
   if (method === "GET" && path === "/api/notifications") {
      return createSuccess("Notifications loaded", {
         notifications: Array.from(db.notifications.values()),
      } as T);
   }

   if (method === "GET" && path === "/api/rooms") {
      return createSuccess("Rooms loaded", {
         rooms: Array.from(db.rooms.values()),
      } as T);
   }

   if (method === "GET" && path === "/api/deleted_rooms") {
      return createSuccess("Deleted rooms loaded", {
         rooms: Array.from(db.deletedRooms.values()),
      } as T);
   }

   {
      const match = path.match(/^\/api\/rooms\/([^/]+)\/students$/);
      if (method === "GET" && match) {
         const roomId = decodeURIComponent(match[1]!);
         return createSuccess("Students loaded", {
            students: getStudentsByRoomId(db, roomId),
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/rooms\/([^/]+)\/monitor_logs$/);
      if (method === "GET" && match) {
         const roomId = decodeURIComponent(match[1]!);
         return createSuccess("Monitor logs loaded", {
            monitorLogs: getMonitorLogsByRoomId(db, roomId),
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/rooms\/([^/]+)$/);
      if (method === "GET" && match) {
         const roomId = decodeURIComponent(match[1]!);
         const room = db.rooms.get(roomId);
         if (!room) {
            throwDummyError("Room not found");
         }

         return createSuccess("Room loaded", {
            room,
            students: getStudentsByRoomId(db, roomId),
            monitorLogs: getMonitorLogsByRoomId(db, roomId),
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/students\/([^/]+)$/);
      if (method === "GET" && match) {
         const studentId = decodeURIComponent(match[1]!);
         const student = db.students.get(studentId);
         if (!student) {
            throwDummyError("Student not found");
         }

         const room = getRoomFromAny(db, student.roomId);
         if (!room) {
            throwDummyError("Room not found for student");
         }

         return createSuccess("Student loaded", {
            student,
            monitorLogs: getMonitorLogsByStudentId(db, studentId),
            room,
            teacher: db.teacher,
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/monitor_logs\/([^/]+)$/);
      if (method === "GET" && match) {
         const monitorLogId = decodeURIComponent(match[1]!);
         const monitorLog = db.monitorLogs.get(monitorLogId);
         if (!monitorLog) {
            throwDummyError("Monitor log not found");
         }

         const room = getRoomFromAny(db, monitorLog.roomId);
         const student = db.students.get(monitorLog.studentId);
         if (!room || !student) {
            throwDummyError("Monitor log relation not found");
         }

         return createSuccess("Monitor log loaded", {
            monitorLog,
            room,
            student,
            teacher: db.teacher,
         } as T);
      }
   }

   // POST
   if (method === "POST" && path === "/api/login") {
      const fieldErrors: Record<string, string> = {};
      if (!String(body.username ?? "").trim()) {
         fieldErrors.username = "Username is required";
      }
      if (!String(body.password ?? "").trim()) {
         fieldErrors.password = "Password is required";
      }
      if (Object.keys(fieldErrors).length > 0) {
         throwDummyError("Invalid credentials", fieldErrors);
      }

      return createSuccess("Login successful", {
         teacher: db.teacher,
      } as T);
   }

   if (method === "POST" && path === "/api/validate_session") {
      return createSuccess("Session validated", {
         teacher: db.teacher,
      } as T);
   }

   if (method === "POST" && path === "/api/logout") {
      return createSuccess("Logged out");
   }

   if (method === "POST" && path === "/api/logout_all") {
      return createSuccess("Logged out all sessions");
   }

   if (method === "POST" && path === "/api/clear_cache") {
      return createSuccess("Cache cleared");
   }

   if (method === "POST" && path === "/api/account") {
      const username = String(body.username ?? "").trim();
      const password1 = String(body.password1 ?? "");
      const password2 = String(body.password2 ?? "");
      const fieldErrors: Record<string, string> = {};

      if (!username) {
         fieldErrors.username = "Username is required";
      }
      if (password1.length < 6) {
         fieldErrors.password1 = "Password must be at least 6 characters";
      }
      if (password1 !== password2) {
         fieldErrors.password2 = "Passwords do not match";
      }

      if (Object.keys(fieldErrors).length > 0) {
         throwDummyError("Invalid registration details", fieldErrors);
      }

      return createSuccess("Account created", {
         teacher: db.teacher,
      } as T);
   }

   if (method === "POST" && path === "/api/rooms") {
      const title = String(body.title ?? "").trim();
      const autoGenerateCode = Boolean(body.autoGenerateCode);
      const requestedCode = String(body.code ?? "")
         .trim()
         .toUpperCase();
      const studentCapacity = Number(body.studentCapacity);
      const fieldErrors: Record<string, string> = {};

      if (!title) {
         fieldErrors.title = "Room title is required";
      }
      if (!Number.isFinite(studentCapacity) || studentCapacity <= 0) {
         fieldErrors.studentCapacity =
            "Student capacity must be greater than 0";
      }

      let roomCode = requestedCode;
      if (!autoGenerateCode && !roomCode) {
         fieldErrors.code = "Room code is required";
      }

      if (Object.keys(fieldErrors).length > 0) {
         throwDummyError("Invalid room details", fieldErrors);
      }

      if (autoGenerateCode) {
         roomCode = createRoom().code;
      }

      if (hasDuplicateRoomCode(db, roomCode)) {
         throwDummyError("Room code already exists", {
            code: "Room code already exists",
         });
      }

      const room = createRoom({
         teacherAccountId: db.teacher.id,
         title,
         code: roomCode,
         studentCapacity,
         studentCount: 0,
         status: "paused",
         timeStarted: undefined,
         timeEnded: undefined,
         createdAt: new Date().toISOString(),
         deletedAt: undefined,
      });

      db.rooms.set(room.id, room);

      return createSuccess("Room created", {
         room,
      } as T);
   }

   {
      const match = path.match(/^\/api\/rooms\/([^/]+)\/announcement$/);
      if (method === "POST" && match) {
         const roomId = decodeURIComponent(match[1]!);
         const room = db.rooms.get(roomId);
         if (!room) {
            throwDummyError("Room not found", { roomCode: "Room not found" });
         }

         const message = String(body.message ?? "").trim();
         if (!message) {
            throwDummyError("Invalid announcement", {
               message: "Message is required",
            });
         }

         return createSuccess("Announcement sent", {
            success: true,
         } as T);
      }
   }

   // PATCH
   if (method === "PATCH" && path === "/api/account") {
      const fieldErrors: Record<string, string> = {};

      if (Object.prototype.hasOwnProperty.call(body, "displayName")) {
         const displayName = String(body.displayName ?? "").trim();
         if (!displayName) {
            fieldErrors.displayName = "Display name is required";
         }
      }

      if (Object.prototype.hasOwnProperty.call(body, "username")) {
         const username = String(body.username ?? "").trim();
         if (!username) {
            fieldErrors.username = "Username is required";
         }
      }

      const hasPassword1 = Object.prototype.hasOwnProperty.call(
         body,
         "password1",
      );
      const hasPassword2 = Object.prototype.hasOwnProperty.call(
         body,
         "password2",
      );
      if (hasPassword1 || hasPassword2) {
         const password1 = String(body.password1 ?? "");
         const password2 = String(body.password2 ?? "");

         if (password1.length < 6) {
            fieldErrors.password1 = "Password must be at least 6 characters";
         }

         if (password1 !== password2) {
            fieldErrors.password2 = "Passwords do not match";
         }
      }

      if (Object.keys(fieldErrors).length > 0) {
         throwDummyError("Invalid account details", fieldErrors);
      }

      if (Object.prototype.hasOwnProperty.call(body, "displayName")) {
         db.teacher.displayName = String(body.displayName).trim();
      }
      if (Object.prototype.hasOwnProperty.call(body, "username")) {
         db.teacher.username = String(body.username).trim();
      }

      return createSuccess("Account updated", {
         teacher: db.teacher,
      } as T);
   }

   {
      const match = path.match(/^\/api\/rooms\/([^/]+)\/restore$/);
      if (method === "PATCH" && match) {
         const roomId = decodeURIComponent(match[1]!);
         const room = db.deletedRooms.get(roomId);
         if (!room) {
            throwDummyError("Room not found");
         }

         room.deletedAt = undefined;
         db.deletedRooms.delete(roomId);
         db.rooms.set(room.id, room);

         return createSuccess("Room restored", {
            room,
            students: getStudentsByRoomId(db, room.id),
            monitorLogs: getMonitorLogsByRoomId(db, room.id),
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/rooms\/([^/]+)$/);
      if (method === "PATCH" && match) {
         const roomId = decodeURIComponent(match[1]!);
         const room = db.rooms.get(roomId);
         if (!room) {
            throwDummyError("Room not found");
         }

         const fieldErrors: Record<string, string> = {};

         if (Object.prototype.hasOwnProperty.call(body, "title")) {
            const title = String(body.title ?? "").trim();
            if (!title) {
               fieldErrors.title = "Room title is required";
            }
         }

         if (Object.prototype.hasOwnProperty.call(body, "code")) {
            const code = String(body.code ?? "")
               .trim()
               .toUpperCase();
            if (!code) {
               fieldErrors.code = "Room code is required";
            } else if (hasDuplicateRoomCode(db, code, room.id)) {
               fieldErrors.code = "Room code already exists";
            }
         }

         if (Object.prototype.hasOwnProperty.call(body, "studentCapacity")) {
            const studentCapacity = Number(body.studentCapacity);
            const currentStudentCount = getStudentsByRoomId(db, room.id).length;
            if (!Number.isFinite(studentCapacity) || studentCapacity <= 0) {
               fieldErrors.studentCapacity =
                  "Student capacity must be greater than 0";
            } else if (studentCapacity < currentStudentCount) {
               fieldErrors.studentCapacity =
                  "Capacity cannot be less than current student count";
            }
         }

         if (Object.keys(fieldErrors).length > 0) {
            throwDummyError("Invalid room details", fieldErrors);
         }

         for (const [key, value] of Object.entries(body)) {
            (room as any)[key] = value;
         }

         return createSuccess("Room updated", {
            room,
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/start_monitoring\/([^/]+)$/);
      if (method === "PATCH" && match) {
         const roomId = decodeURIComponent(match[1]!);
         const room = db.rooms.get(roomId);
         if (!room) {
            throwDummyError("Room not found");
         }

         room.status = "monitoring";
         room.timeStarted = room.timeStarted ?? new Date().toISOString();

         return createSuccess("Monitoring started", {
            room,
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/pause_monitoring\/([^/]+)$/);
      if (method === "PATCH" && match) {
         const roomId = decodeURIComponent(match[1]!);
         const room = db.rooms.get(roomId);
         if (!room) {
            throwDummyError("Room not found");
         }

         room.status = "paused";

         return createSuccess("Monitoring paused", {
            room,
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/stop_monitoring\/([^/]+)$/);
      if (method === "PATCH" && match) {
         const roomId = decodeURIComponent(match[1]!);
         const room = db.rooms.get(roomId);
         if (!room) {
            throwDummyError("Room not found");
         }

         room.status = "concluded";
         room.timeEnded = new Date().toISOString();

         return createSuccess("Monitoring stopped", {
            room,
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/students\/([^/]+)\/unlock$/);
      if (method === "PATCH" && match) {
         const studentId = decodeURIComponent(match[1]!);
         const student = db.students.get(studentId);
         if (!student) {
            throwDummyError("Student not found");
         }

         student.lockMonitorLogId = undefined;

         return createSuccess("Student unlocked", {
            student,
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/students\/([^/]+)\/grant_permit$/);
      if (method === "PATCH" && match) {
         const studentId = decodeURIComponent(match[1]!);
         const student = db.students.get(studentId);
         if (!student) {
            throwDummyError("Student not found");
         }

         student.permitted = true;

         return createSuccess("Student permitted", {
            student,
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/students\/([^/]+)\/deny_permit$/);
      if (method === "PATCH" && match) {
         const studentId = decodeURIComponent(match[1]!);
         const student = db.students.get(studentId);
         if (!student) {
            throwDummyError("Student not found");
         }

         student.permitted = false;

         return createSuccess("Student permit denied", {
            student,
         } as T);
      }
   }

   if (method === "PATCH" && path === "/api/notifications") {
      const isRead = Boolean(body.isRead);
      for (const notification of db.notifications.values()) {
         notification.isRead = isRead;
      }

      return createSuccess("Notifications updated", {
         notifications: Array.from(db.notifications.values()),
      } as T);
   }

   {
      const match = path.match(/^\/api\/notifications\/([^/]+)$/);
      if (method === "PATCH" && match) {
         const notificationId = decodeURIComponent(match[1]!);
         const notification = db.notifications.get(notificationId);
         if (!notification) {
            throwDummyError("Notification not found");
         }

         if (Object.prototype.hasOwnProperty.call(body, "isRead")) {
            notification.isRead = Boolean(body.isRead);
         }

         return createSuccess("Notification updated", {
            notification,
         } as T);
      }
   }

   // DELETE
   if (method === "DELETE" && path === "/api/notifications") {
      db.notifications.clear();
      return createSuccess("Notifications deleted");
   }

   {
      const match = path.match(/^\/api\/notifications\/([^/]+)$/);
      if (method === "DELETE" && match) {
         const notificationId = decodeURIComponent(match[1]!);
         const notification = db.notifications.get(notificationId);
         if (!notification) {
            throwDummyError("Notification not found");
         }

         db.notifications.delete(notificationId);

         return createSuccess("Notification deleted", {
            notification,
         } as T);
      }
   }

   {
      const match = path.match(/^\/api\/rooms\/([^/]+)$/);
      if (method === "DELETE" && match) {
         const roomId = decodeURIComponent(match[1]!);
         const room = db.rooms.get(roomId);
         if (!room) {
            throwDummyError("Room not found");
         }

         room.deletedAt = new Date().toISOString();
         room.status = "concluded";
         room.timeEnded = room.timeEnded ?? new Date().toISOString();

         db.rooms.delete(roomId);
         db.deletedRooms.set(room.id, room);

         return createSuccess("Room deleted", {
            room,
         } as T);
      }
   }

   throwDummyError(`No dummy route configured for ${method} ${path}`);
}
