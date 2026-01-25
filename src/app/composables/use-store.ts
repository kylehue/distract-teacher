import { computed, reactive, ref, watch } from "vue";
import type {
   MonitorLog,
   RoomInfo,
   StudentInfo,
   TeacherInfo,
} from "@/lib/typings";
import { useSocket } from "./use-socket";
import { getWithDefault } from "@/lib/object";
import { defineStore } from "pinia";
import { useFetch } from "./use-fetch";

export const useStore = defineStore("main-store", () => {
   // --- cache ---
   const allRooms = reactive(new Map<string | number, RoomInfo>());
   const allStudents = reactive(new Map<string | number, StudentInfo>());
   const allMonitorLogs = reactive(new Map<string | number, MonitorLog>());
   const studentsGroupedByRoomId = reactive(
      new Map<string | number, Map<string | number, StudentInfo>>(),
   );
   const monitorLogsGroupedByRoomId = reactive(
      new Map<string | number, Map<string | number, MonitorLog>>(),
   );
   const monitorLogsGroupedByStudentId = reactive(
      new Map<string | number, Map<string | number, MonitorLog>>(),
   );
   const allTeachers = reactive(new Map<string | number, TeacherInfo>());

   // --- data loaders ---
   const getRoom = useFetch<{
      room: RoomInfo;
      students: StudentInfo[];
      monitorLogs: MonitorLog[];
      teacher: any;
   }>("/api/rooms/:roomId");

   async function loadRoom(roomId: string | number) {
      try {
         await getRoom.execute({ params: { roomId } });

         const data = getRoom.data?.data;
         if (!data) throw new Error("No data");
         upsertRooms([data.room]);
         upsertStudents(data.students);
         upsertMonitorLogs(data.monitorLogs);
         upsertTeachers([data.teacher]);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const getRooms = useFetch<{
      rooms: RoomInfo[];
   }>("/api/rooms");

   async function loadRooms() {
      try {
         await getRooms.execute();

         const data = getRooms.data?.data;
         if (!data) throw new Error("No data");
         upsertRooms(data.rooms);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const getStudent = useFetch<{
      student: StudentInfo;
      monitorLogs: MonitorLog[];
      room: RoomInfo;
      teacher: TeacherInfo;
   }>("/api/students/:studentId");

   async function loadStudent(studentId: string | number) {
      try {
         await getStudent.execute({ params: { studentId } });

         const data = getStudent.data?.data;
         if (!data) throw new Error("No data");
         upsertStudents([data.student]);
         upsertMonitorLogs(data.monitorLogs);
         upsertRooms([data.room]);
         upsertTeachers([data.teacher]);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const getRoomStudents = useFetch<{
      students: StudentInfo[];
   }>("/api/rooms/:roomId/students");

   async function loadStudents(roomId: string | number) {
      try {
         await getRoomStudents.execute({ params: { roomId } });

         const data = getRoomStudents.data?.data;
         if (!data) throw new Error("No data");
         upsertStudents(data.students);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const getMonitorLog = useFetch<{
      monitorLog: MonitorLog;
      room: RoomInfo;
      student: StudentInfo;
      teacher: TeacherInfo;
   }>("/api/monitor_logs/:monitorLogId");

   async function loadMonitorLog(monitorLogId: string | number) {
      try {
         await getMonitorLog.execute({ params: { monitorLogId } });

         const data = getMonitorLog.data?.data;
         if (!data) throw new Error("No data");
         upsertRooms([data.room]);
         upsertMonitorLogs([data.monitorLog]);
         upsertStudents([data.student]);
         upsertTeachers([data.teacher]);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const getRoomMonitorLogs = useFetch<{
      monitorLogs: MonitorLog[];
   }>("/api/rooms/:roomId/monitor_logs");

   async function loadMonitorLogs(roomId: string | number) {
      try {
         await getRoomMonitorLogs.execute({
            params: { roomId },
         });

         const data = getRoomMonitorLogs.data?.data;
         if (!data) throw new Error("No data");

         upsertMonitorLogs(data.monitorLogs);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   // --- upsert functions ---
   function upsertRooms(rooms: RoomInfo[]) {
      for (const incoming of rooms) {
         const existing = allRooms.get(incoming.id);

         if (!existing) {
            // new room
            allRooms.set(incoming.id, incoming);
         } else {
            // room already exists so just mutate in place
            for (const key in incoming) {
               // @ts-ignore
               if (existing[key] !== incoming[key]) {
                  // @ts-ignore
                  existing[key] = incoming[key];
               }
            }
         }
      }
   }

   function upsertStudents(students: StudentInfo[]) {
      for (const incoming of students) {
         const existing = allStudents.get(incoming.id);

         if (!existing) {
            // new student
            allStudents.set(incoming.id, incoming);
            getWithDefault(
               studentsGroupedByRoomId,
               incoming.roomId,
               reactive(new Map()),
            ).set(incoming.id, incoming);
         } else {
            // student already exists so just mutate in place
            for (const key in incoming) {
               // @ts-ignore
               if (existing[key] !== incoming[key]) {
                  // @ts-ignore
                  existing[key] = incoming[key];
               }
            }
         }

         // *roomId is immutable so no need to move between groups
      }
   }

   function upsertMonitorLogs(monitorLogs: MonitorLog[]) {
      for (const incoming of monitorLogs) {
         const existing = allMonitorLogs.get(incoming.id);

         if (!existing) {
            // new monitor log
            allMonitorLogs.set(incoming.id, incoming);

            getWithDefault(
               monitorLogsGroupedByRoomId,
               incoming.roomId,
               reactive(new Map()),
            ).set(incoming.id, incoming);

            getWithDefault(
               monitorLogsGroupedByStudentId,
               incoming.studentId,
               reactive(new Map()),
            ).set(incoming.id, incoming);

            continue;
         } else {
            // log already exists so just mutate in place
            for (const key in incoming) {
               // @ts-ignore
               if (existing[key] !== incoming[key]) {
                  // @ts-ignore
                  existing[key] = incoming[key];
               }
            }
         }

         // *roomId and studentId are immutable so no need to move between groups
      }
   }

   function upsertTeachers(teachers: TeacherInfo[]) {
      for (const incoming of teachers) {
         const existing = allTeachers.get(incoming.id);

         if (!existing) {
            // new teacher
            allTeachers.set(incoming.id, incoming);
         } else {
            // teacher already exists so just mutate in place
            for (const key in incoming) {
               // @ts-ignore
               if (existing[key] !== incoming[key]) {
                  // @ts-ignore
                  existing[key] = incoming[key];
               }
            }
         }
      }
   }

   // --- delete functions ---
   function deleteRoom(roomId: string | number) {
      allRooms.delete(roomId);
      studentsGroupedByRoomId.delete(roomId);
      monitorLogsGroupedByRoomId.delete(roomId);
   }

   function deleteStudent(studentId: string | number) {
      // remove from studentsGroupedByRoomId
      for (let [_, studentsMap] of studentsGroupedByRoomId) {
         if (studentsMap.has(studentId)) {
            studentsMap.delete(studentId);
            break;
         }
      }

      // remove from monitorLogsGroupedByStudentId
      monitorLogsGroupedByStudentId.delete(studentId);

      // remove from monitorLogsGroupedByRoomId
      let student = allStudents.get(studentId);
      if (student) {
         let roomId = student.roomId;
         let monitorLogsMap = monitorLogsGroupedByRoomId.get(roomId);
         if (monitorLogsMap) {
            for (let [monitorLogId, monitorLog] of monitorLogsMap) {
               if (monitorLog.studentId === studentId) {
                  monitorLogsMap.delete(monitorLogId);
               }
            }
         }
      }

      // remove from allMonitorLogs
      for (let [monitorLogId, monitorLog] of allMonitorLogs) {
         if (monitorLog.studentId === studentId) {
            allMonitorLogs.delete(monitorLogId);
         }
      }

      // remove from allStudents
      allStudents.delete(studentId);
   }

   function clear() {
      allRooms.clear();
      allStudents.clear();
      allMonitorLogs.clear();
      studentsGroupedByRoomId.clear();
      monitorLogsGroupedByRoomId.clear();
      monitorLogsGroupedByStudentId.clear();
      allTeachers.clear();
   }

   // --- count functions ---
   function countStudentsOfRoom(roomId: string | number) {
      const students = studentsGroupedByRoomId.get(roomId);
      let count = 0;
      for (let [_, student] of students ?? []) {
         if (student.active && student.permitted) count++;
      }
      return count;
   }

   function countMonitorLogsOfStudent(studentId: string | number) {
      let count = 0;
      let student = allStudents.get(studentId);
      if (!student) return count;
      let roomId = student.roomId;
      let monitorLogs = monitorLogsGroupedByRoomId.get(roomId);
      if (!monitorLogs) return count;
      for (let [_, monitorLog] of monitorLogs) {
         if (monitorLog.studentId !== studentId) continue;
         count++;
      }

      return count;
   }

   // --- real-time update listeners ---
   const socket = useSocket();
   socket.on(
      "teacher:upsert_room",
      (data) => {
         const room = data.room as RoomInfo;
         upsertRooms([room]);
      },
      { autoClean: false },
   );

   socket.on(
      "teacher:upsert_student",
      (data) => {
         const student = data.student as StudentInfo;
         upsertStudents([student]);
      },
      { autoClean: false },
   );

   socket.on(
      "teacher:upsert_monitor_log",
      (data) => {
         const monitorLog = data.monitorLog as MonitorLog;
         upsertMonitorLogs([monitorLog]);
      },
      { autoClean: false },
   );

   socket.on(
      "teacher:delete_student",
      (data) => {
         const student = data.student as StudentInfo;
         deleteStudent(student.id);
      },
      { autoClean: false },
   );

   return {
      allRooms,
      allStudents,
      allMonitorLogs,
      allTeachers,
      studentsGroupedByRoomId,
      monitorLogsGroupedByRoomId,
      monitorLogsGroupedByStudentId,
      loadRoom,
      isLoadRoomLoading: computed(() => getRoom.isLoading),
      loadRooms,
      isLoadRoomsLoading: computed(() => getRooms.isLoading),
      loadStudent,
      isLoadStudentLoading: computed(() => getStudent.isLoading),
      loadStudents,
      isLoadStudentsLoading: computed(() => getRoomStudents.isLoading),
      loadMonitorLog,
      isLoadMonitorLogLoading: computed(() => getMonitorLog.isLoading),
      loadMonitorLogs,
      isLoadMonitorLogsLoading: computed(() => getRoomMonitorLogs.isLoading),
      upsertRooms,
      upsertStudents,
      upsertMonitorLogs,
      upsertTeachers,
      deleteRoom,
      deleteStudent,
      clear,
      countStudentsOfRoom,
      countMonitorLogsOfStudent,
   };
});
