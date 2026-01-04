import { reactive, ref } from "vue";
import type { MonitorLog, RoomInfo, RoomStudentInfo } from "@/lib/typings";
import { useSocketEvent } from "@/app/composables/use-socket-event";
import { useSocket } from "./use-socket";
import { getWithDefault } from "@/lib/object";
import { defineStore } from "pinia";

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

   const { execute: _loadRoom, isLoading: isLoadRoomLoading } = useSocketEvent<
      {
         room: RoomInfo;
         students: RoomStudentInfo[];
         monitorLogs: MonitorLog[];
      },
      {
         message: string;
      }
   >({
      executeEvent: "teacher:load_room",
      successEvent: "teacher:load_room_success",
      autoClean: false,
      onSuccess(data) {
         allRooms.set(data.room.id, data.room);
         for (let student of data.students) {
            allStudents.set(student.id, student);

            getWithDefault(
               studentsGroupedByRoomId,
               data.room.id,
               reactive(new Map())
            ).set(student.id, student);
         }

         for (let monitorLog of data.monitorLogs) {
            allMonitorLogs.set(monitorLog.id, monitorLog);

            getWithDefault(
               monitorLogsGroupedByRoomId,
               data.room.id,
               reactive(new Map())
            ).set(monitorLog.id, monitorLog);
         }
      },
   });

   async function loadRoom(roomId: string | number) {
      await _loadRoom({ roomId });
   }

   const { execute: _loadRooms, isLoading: isLoadRoomsLoading } =
      useSocketEvent<{
         rooms: RoomInfo[];
      }>({
         executeEvent: "teacher:load_rooms",
         successEvent: "teacher:load_rooms_success",
         autoClean: false,
         onSuccess(data) {
            for (let room of data.rooms) {
               allRooms.set(room.id, room);
            }
         },
      });

   async function loadRooms() {
      await _loadRooms();
   }

   const { execute: _loadStudent, isLoading: isLoadStudentLoading } =
      useSocketEvent<{
         student: RoomStudentInfo;
      }>({
         executeEvent: "teacher:load_student",
         successEvent: "teacher:load_student_success",
         autoClean: false,
         onSuccess(data) {
            allStudents.set(data.student.id, data.student);

            getWithDefault(
               studentsGroupedByRoomId,
               data.student.roomId,
               reactive(new Map())
            ).set(data.student.id, data.student);
         },
      });

   async function loadStudent(studentId: string | number) {
      await _loadStudent({ studentId });
   }

   const { execute: _loadStudents, isLoading: isLoadStudentsLoading } =
      useSocketEvent<{
         students: RoomStudentInfo[];
      }>({
         executeEvent: "teacher:load_students",
         successEvent: "teacher:load_students_success",
         autoClean: false,
         onSuccess(data) {
            for (let student of data.students) {
               allStudents.set(student.id, student);

               getWithDefault(
                  studentsGroupedByRoomId,
                  student.roomId,
                  reactive(new Map())
               ).set(student.id, student);
            }
         },
      });

   async function loadStudents(roomId: string | number) {
      await _loadStudents({ roomId });
   }

   const { execute: _loadMonitorLog, isLoading: isLoadMonitorLogLoading } =
      useSocketEvent<{
         monitorLog: MonitorLog;
      }>({
         executeEvent: "teacher:load_monitor_log",
         successEvent: "teacher:load_monitor_log_success",
         autoClean: false,
         onSuccess(data) {
            allMonitorLogs.set(data.monitorLog.id, data.monitorLog);

            getWithDefault(
               monitorLogsGroupedByRoomId,
               data.monitorLog.roomId,
               reactive(new Map())
            ).set(data.monitorLog.id, data.monitorLog);
         },
      });

   async function loadMonitorLog(monitorLogId: string | number) {
      await _loadMonitorLog({ monitorLogId });
   }

   const { execute: _loadMonitorLogs, isLoading: isLoadMonitorLogsLoading } =
      useSocketEvent<{
         monitorLogs: MonitorLog[];
      }>({
         executeEvent: "teacher:load_monitor_logs",
         successEvent: "teacher:load_monitor_logs_success",
         autoClean: false,
         onSuccess(data) {
            for (let monitorLog of data.monitorLogs) {
               allMonitorLogs.set(monitorLog.id, monitorLog);

               getWithDefault(
                  monitorLogsGroupedByRoomId,
                  monitorLog.roomId,
                  reactive(new Map())
               ).set(monitorLog.id, monitorLog);
            }
         },
      });

   async function loadMonitorLogs(
      roomId: string | number,
      studentId?: string | number
   ) {
      await _loadMonitorLogs({ roomId, studentId });
   }

   // real-time updates
   const socket = useSocket();
   socket.on("teacher:update_room", (data) => {
      const room = data.room as RoomInfo;
      allRooms.set(room.id, room);
   }, { autoClean: false });

   socket.on(
      "teacher:create_student",
      (data) => {
         const student = data.student as RoomStudentInfo;
         allStudents.set(student.id, student);

         getWithDefault(
            studentsGroupedByRoomId,
            student.roomId,
            reactive(new Map())
         ).set(student.id, student);
      },
      { autoClean: false }
   );

   socket.on(
      "teacher:update_student",
      (data) => {
         const student = data.student as RoomStudentInfo;
         allStudents.set(student.id, student);

         getWithDefault(
            studentsGroupedByRoomId,
            student.roomId,
            reactive(new Map())
         ).set(student.id, student);
      },
      { autoClean: false }
   );

   socket.on(
      "teacher:create_monitor_log",
      (data) => {
         allMonitorLogs.set(data.monitorLog.id, data.monitorLog);

         getWithDefault(
            monitorLogsGroupedByRoomId,
            data.monitorLog.roomId,
            reactive(new Map())
         ).set(data.monitorLog.id, data.monitorLog);
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
      isLoadRoomLoading,
      loadRooms,
      isLoadRoomsLoading,
      loadStudent,
      isLoadStudentLoading,
      loadStudents,
      isLoadStudentsLoading,
      loadMonitorLog,
      isLoadMonitorLogLoading,
      loadMonitorLogs,
      isLoadMonitorLogsLoading,
   };
});
