import { computed, reactive, ref, watch } from "vue";
import type { MonitorLog, RoomInfo, RoomStudentInfo } from "@/lib/typings";
import { useSocket } from "./use-socket";
import { getWithDefault } from "@/lib/object";
import { defineStore } from "pinia";
import { useFetch } from "./use-fetch";

export const useStore = defineStore("main-store", () => {
   const allRooms = reactive(new Map<string | number, RoomInfo>());
   const allStudents = reactive(new Map<string | number, RoomStudentInfo>());
   const allMonitorLogs = reactive(new Map<string | number, MonitorLog>());
   const studentsGroupedByRoomId = reactive(
      new Map<string | number, Map<string | number, RoomStudentInfo>>()
   );
   const monitorLogsGroupedByRoomId = reactive(
      new Map<string | number, Map<string | number, MonitorLog>>()
   );

   const getRoom = useFetch<{
      room: RoomInfo;
      students: RoomStudentInfo[];
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
      student: RoomStudentInfo;
   }>("/api/students/:studentId");

   async function loadStudent(studentId: string | number) {
      try {
         await getStudent.execute({ params: { studentId } });

         const data = getStudent.data?.data;
         if (!data) throw new Error("No data");
         upsertStudents([data.student]);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const getRoomStudents = useFetch<{
      students: RoomStudentInfo[];
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
      student: RoomStudentInfo;
   }>("/api/monitor_logs/:monitorLogId");

   async function loadMonitorLog(monitorLogId: string | number) {
      try {
         await getMonitorLog.execute({ params: { monitorLogId } });

         const data = getMonitorLog.data?.data;
         if (!data) throw new Error("No data");
         upsertRooms([data.room]);
         upsertMonitorLogs([data.monitorLog]);
         upsertStudents([data.student]);

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

   function upsertRooms(rooms: RoomInfo[]) {
      for (let room of rooms) {
         allRooms.set(room.id, room);
      }
   }

   function upsertStudents(students: RoomStudentInfo[]) {
      for (let student of students) {
         allStudents.set(student.id, student);

         getWithDefault(
            studentsGroupedByRoomId,
            student.roomId,
            reactive(new Map())
         ).set(student.id, student);
      }
   }

   function upsertMonitorLogs(monitorLogs: MonitorLog[]) {
      for (let monitorLog of monitorLogs) {
         allMonitorLogs.set(monitorLog.id, monitorLog);
         getWithDefault(
            monitorLogsGroupedByRoomId,
            monitorLog.roomId,
            reactive(new Map())
         ).set(monitorLog.id, monitorLog);
      }
   }

   function clear() {
      allRooms.clear();
      allStudents.clear();
      allMonitorLogs.clear();
      studentsGroupedByRoomId.clear();
      monitorLogsGroupedByRoomId.clear();
   }

   // real-time updates
   const socket = useSocket();
   socket.on(
      "teacher:update_room",
      (data) => {
         const room = data.room as RoomInfo;
         upsertRooms([room]);
      },
      { autoClean: false }
   );

   socket.on(
      "teacher:create_student",
      (data) => {
         const student = data.student as RoomStudentInfo;
         upsertStudents([student]);
      },
      { autoClean: false }
   );

   socket.on(
      "teacher:update_student",
      (data) => {
         const student = data.student as RoomStudentInfo;
         upsertStudents([student]);
      },
      { autoClean: false }
   );

   socket.on(
      "teacher:create_monitor_log",
      (data) => {
         const monitorLog = data.monitorLog as MonitorLog;
         upsertMonitorLogs([monitorLog]);
      },
      { autoClean: false }
   );

   return {
      allRooms,
      allStudents,
      allMonitorLogs,
      studentsGroupedByRoomId,
      monitorLogsGroupedByRoomId,
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
      clear,
   };
});
