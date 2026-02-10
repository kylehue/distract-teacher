import { computed, reactive } from "vue";
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

// whether to only load data once and then rely on real-time updates
// this is an optimization to reduce the number of fetch requests
const LOAD_ONCE = true;
export const useStore = defineStore("main-store", () => {
   // --- cache ---
   const deletedRooms = reactive(new Map<string, RoomInfo>());
   const allRooms = reactive(new Map<string, RoomInfo>());
   const allStudents = reactive(new Map<string, StudentInfo>());
   const allMonitorLogs = reactive(new Map<string, MonitorLog>());
   const studentsGroupedByRoomId = reactive(
      new Map<string, Map<string, StudentInfo>>(),
   );
   const monitorLogsGroupedByRoomId = reactive(
      new Map<string, Map<string, MonitorLog>>(),
   );
   const monitorLogsGroupedByStudentId = reactive(
      new Map<string, Map<string, MonitorLog>>(),
   );

   // --- data loaders ---
   const getRooms = useFetch<{
      rooms: RoomInfo[];
   }>("/api/rooms");
   let isRoomsLoaded = false;
   async function loadRooms() {
      if (LOAD_ONCE && isRoomsLoaded) return;
      isRoomsLoaded = true;

      await getRooms.execute();

      const data = getRooms.data?.data;
      if (!data) throw new Error("No data");
      upsertRooms(data.rooms);
   }

   const getDeletedRooms = useFetch<{
      rooms: RoomInfo[];
   }>("/api/deleted_rooms");

   let isDeletedRoomsLoaded = false;
   async function loadDeletedRooms() {
      if (LOAD_ONCE && isDeletedRoomsLoaded) return;
      isDeletedRoomsLoaded = true;

      await getDeletedRooms.execute();

      const data = getDeletedRooms.data?.data;
      if (!data) throw new Error("No data");
      upsertDeletedRooms(data.rooms);
   }

   const getRoom = useFetch<{
      room: RoomInfo;
      students: StudentInfo[];
      monitorLogs: MonitorLog[];
   }>("/api/rooms/:roomId");
   const loadRoomSet = new Set<string>();
   async function loadRoom(roomId: string) {
      if (LOAD_ONCE && loadRoomSet.has(roomId)) return;
      loadRoomSet.add(roomId);

      await getRoom.execute({ params: { roomId } });

      const data = getRoom.data?.data;
      if (!data) throw new Error("No data");
      upsertRooms([data.room]);
      upsertStudents(data.students);
      upsertMonitorLogs(data.monitorLogs);
   }

   const getStudent = useFetch<{
      student: StudentInfo;
      monitorLogs: MonitorLog[];
      room: RoomInfo;
      teacher: TeacherInfo;
   }>("/api/students/:studentId");
   const loadStudentSet = new Set<string>();
   async function loadStudent(studentId: string) {
      if (LOAD_ONCE && loadStudentSet.has(studentId)) return;
      loadStudentSet.add(studentId);

      await getStudent.execute({ params: { studentId } });

      const data = getStudent.data?.data;
      if (!data) throw new Error("No data");
      upsertStudents([data.student]);
      upsertMonitorLogs(data.monitorLogs);
      upsertRooms([data.room]);
   }

   const getRoomStudents = useFetch<{
      students: StudentInfo[];
   }>("/api/rooms/:roomId/students");
   const loadRoomStudentsSet = new Set<string>();
   async function loadStudents(roomId: string) {
      if (LOAD_ONCE && loadRoomStudentsSet.has(roomId)) return;
      loadRoomStudentsSet.add(roomId);

      await getRoomStudents.execute({ params: { roomId } });

      const data = getRoomStudents.data?.data;
      if (!data) throw new Error("No data");
      upsertStudents(data.students);
   }

   const getMonitorLog = useFetch<{
      monitorLog: MonitorLog;
      room: RoomInfo;
      student: StudentInfo;
      teacher: TeacherInfo;
   }>("/api/monitor_logs/:monitorLogId");
   const loadMonitorLogSet = new Set<string>();
   async function loadMonitorLog(monitorLogId: string) {
      if (LOAD_ONCE && loadMonitorLogSet.has(monitorLogId)) return;
      loadMonitorLogSet.add(monitorLogId);

      await getMonitorLog.execute({ params: { monitorLogId } });

      const data = getMonitorLog.data?.data;
      if (!data) throw new Error("No data");
      upsertRooms([data.room]);
      upsertMonitorLogs([data.monitorLog]);
      upsertStudents([data.student]);
   }

   const getRoomMonitorLogs = useFetch<{
      monitorLogs: MonitorLog[];
   }>("/api/rooms/:roomId/monitor_logs");
   const loadRoomMonitorLogsSet = new Set<string>();
   async function loadMonitorLogs(roomId: string) {
      loadRoomMonitorLogsSet.add(roomId);
      if (LOAD_ONCE && loadRoomMonitorLogsSet.has(roomId)) return;

      await getRoomMonitorLogs.execute({
         params: { roomId },
      });

      const data = getRoomMonitorLogs.data?.data;
      if (!data) throw new Error("No data");

      upsertMonitorLogs(data.monitorLogs);
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

   function upsertDeletedRooms(rooms: RoomInfo[]) {
      for (const incoming of rooms) {
         const existing = deletedRooms.get(incoming.id);

         if (!existing) {
            // new room
            deletedRooms.set(incoming.id, incoming);
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

   // --- delete functions ---
   function deleteRoom(roomId: string) {
      allRooms.delete(roomId);
      studentsGroupedByRoomId.delete(roomId);
      monitorLogsGroupedByRoomId.delete(roomId);
   }

   function deleteDeletedRoom(roomId: string) {
      deletedRooms.delete(roomId);
   }

   function deleteStudent(studentId: string) {
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
      deletedRooms.clear();
      isRoomsLoaded = false;
      isDeletedRoomsLoaded = false;
      loadRoomSet.clear();
      loadStudentSet.clear();
      loadRoomStudentsSet.clear();
      loadMonitorLogSet.clear();
      loadRoomMonitorLogsSet.clear();
   }

   // --- count functions ---
   function countMonitorLogsOfStudent(studentId: string) {
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

   socket.on(
      "teacher:delete_room",
      (data) => {
         const room = data.room as RoomInfo;
         deleteRoom(room.id);
         upsertDeletedRooms([room]);
      },
      { autoClean: false },
   );

   socket.on(
      "teacher:restore_room",
      (data) => {
         const room = data.room as RoomInfo;
         const students = data.students as StudentInfo[];
         const monitorLogs = data.monitorLogs as MonitorLog[];
         deleteDeletedRoom(room.id);
         upsertRooms([room]);
         upsertStudents(students);
         upsertMonitorLogs(monitorLogs);
      },
      { autoClean: false },
   );

   return {
      allRooms,
      deletedRooms,
      allStudents,
      allMonitorLogs,
      studentsGroupedByRoomId,
      monitorLogsGroupedByRoomId,
      monitorLogsGroupedByStudentId,
      loadRoom,
      isLoadRoomLoading: computed(() => getRoom.isLoading),
      loadRooms,
      isLoadRoomsLoading: computed(() => getRooms.isLoading),
      loadDeletedRooms,
      isLoadDeletedRoomsLoading: computed(() => getDeletedRooms.isLoading),
      loadStudent,
      isLoadStudentLoading: computed(() => getStudent.isLoading),
      loadStudents,
      isLoadStudentsLoading: computed(() => getRoomStudents.isLoading),
      loadMonitorLog,
      isLoadMonitorLogLoading: computed(() => getMonitorLog.isLoading),
      loadMonitorLogs,
      isLoadMonitorLogsLoading: computed(() => getRoomMonitorLogs.isLoading),
      upsertRooms,
      upsertDeletedRooms,
      upsertStudents,
      upsertMonitorLogs,
      deleteRoom,
      deleteDeletedRoom,
      deleteStudent,
      clear,
      countMonitorLogsOfStudent,
   };
});
