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

   const fetchRoom = useFetch<{
      room: RoomInfo;
      students: RoomStudentInfo[];
      monitorLogs: MonitorLog[];
      teacher: any;
   }>("/api/rooms/:roomId");

   async function loadRoom(roomId: string | number) {
      try {
         await fetchRoom.execute({ params: { roomId } });

         const data = fetchRoom.data?.data;
         if (!data) throw new Error("No data");
         upsertRooms([data.room]);
         upsertStudents(data.students);
         upsertMonitorLogs(data.monitorLogs);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const fetchRooms = useFetch<{
      rooms: RoomInfo[];
   }>("/api/rooms");

   async function loadRooms() {
      try {
         await fetchRooms.execute();

         const data = fetchRooms.data?.data;
         if (!data) throw new Error("No data");
         upsertRooms(data.rooms);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const fetchStudent = useFetch<{
      student: RoomStudentInfo;
   }>("/api/students/:studentId");

   async function loadStudent(studentId: string | number) {
      try {
         await fetchStudent.execute({ params: { studentId } });

         const data = fetchStudent.data?.data;
         if (!data) throw new Error("No data");
         upsertStudents([data.student]);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const fetchRoomStudents = useFetch<{
      students: RoomStudentInfo[];
   }>("/api/rooms/:roomId/students");

   async function loadStudents(roomId: string | number) {
      try {
         await fetchRoomStudents.execute({ params: { roomId } });

         const data = fetchRoomStudents.data?.data;
         if (!data) throw new Error("No data");
         upsertStudents(data.students);
         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const fetchMonitorLog = useFetch<{
      monitorLog: MonitorLog;
      room: RoomInfo;
      student: RoomStudentInfo;
   }>("/api/monitor_logs/:monitorLogId");

   async function loadMonitorLog(monitorLogId: string | number) {
      try {
         await fetchMonitorLog.execute({ params: { monitorLogId } });

         const data = fetchMonitorLog.data?.data;
         if (!data) throw new Error("No data");
         upsertRooms([data.room]);
         upsertMonitorLogs([data.monitorLog]);
         upsertStudents([data.student]);

         return data;
      } catch {
         // ignore fetch errors
      }
   }

   const fetchRoomMonitorLogs = useFetch<{
      monitorLogs: MonitorLog[];
   }>("/api/rooms/:roomId/monitor_logs");

   async function loadMonitorLogs(roomId: string | number) {
      try {
         await fetchRoomMonitorLogs.execute({
            params: { roomId },
         });

         const data = fetchRoomMonitorLogs.data?.data;
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
      isLoadRoomLoading: computed(() => fetchRoom.isLoading),
      loadRooms,
      isLoadRoomsLoading: computed(() => fetchRooms.isLoading),
      loadStudent,
      isLoadStudentLoading: computed(() => fetchStudent.isLoading),
      loadStudents,
      isLoadStudentsLoading: computed(() => fetchRoomStudents.isLoading),
      loadMonitorLog,
      isLoadMonitorLogLoading: computed(() => fetchMonitorLog.isLoading),
      loadMonitorLogs,
      isLoadMonitorLogsLoading: computed(() => fetchRoomMonitorLogs.isLoading),
      upsertRooms,
      upsertStudents,
      upsertMonitorLogs,
      clear,
   };
});
