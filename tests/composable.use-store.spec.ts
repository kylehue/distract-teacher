import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

const socketHandlers = new Map<string, Function>();
const fetchCallCount = new Map<string, number>();
const failOnce = new Map<string, number>();

const socketApi = {
   on: vi.fn((event: string, handler: Function) => {
      socketHandlers.set(event, handler);
   }),
   emit: vi.fn(),
   socket: {
      connected: false,
      connect: vi.fn(),
      disconnect: vi.fn(),
   },
};

vi.mock("@/app/composables/use-socket", () => ({
   useSocket: () => socketApi,
}));

vi.mock("@/app/composables/use-fetch", () => ({
   useFetch: (url: string) => {
      fetchCallCount.set(url, 0);
      const state: any = {
         data: null,
         isLoading: false,
         async execute(args?: any) {
            fetchCallCount.set(url, (fetchCallCount.get(url) ?? 0) + 1);
            const fail = failOnce.get(url) ?? 0;
            if (fail > 0) {
               failOnce.set(url, fail - 1);
               throw new Error(`transient ${url}`);
            }
            if (url === "/api/rooms") {
               state.data = {
                  data: {
                     rooms: [
                        { id: "r1", title: "Room", teacherAccountId: "t1" },
                     ],
                  },
               };
            } else if (url === "/api/deleted_rooms") {
               state.data = {
                  data: {
                     rooms: [
                        { id: "r2", title: "Trash", teacherAccountId: "t1" },
                     ],
                  },
               };
            } else if (url === "/api/rooms/:roomId") {
               state.data = {
                  data: {
                     room: {
                        id: args?.params?.roomId,
                        title: "Room",
                        teacherAccountId: "t1",
                     },
                     students: [
                        {
                           id: "s1",
                           roomId: args?.params?.roomId,
                           monitorLogCount: 0,
                        },
                     ],
                     monitorLogs: [
                        {
                           id: "m1",
                           roomId: args?.params?.roomId,
                           studentId: "s1",
                           integrityScore: 0.8,
                           isPhonePresent: false,
                        },
                     ],
                  },
               };
            } else if (url === "/api/students/:studentId") {
               state.data = {
                  data: {
                     student: {
                        id: args?.params?.studentId,
                        roomId: "r1",
                        monitorLogCount: 1,
                     },
                     monitorLogs: [
                        {
                           id: "m2",
                           roomId: "r1",
                           studentId: args?.params?.studentId,
                           integrityScore: 0.4,
                           isPhonePresent: true,
                        },
                     ],
                     room: { id: "r1", title: "Room", teacherAccountId: "t1" },
                     teacher: { id: "t1" },
                  },
               };
            } else if (url === "/api/rooms/:roomId/students") {
               state.data = {
                  data: {
                     students: [
                        {
                           id: "s2",
                           roomId: args?.params?.roomId,
                           monitorLogCount: 0,
                        },
                     ],
                  },
               };
            } else if (url === "/api/monitor_logs/:monitorLogId") {
               state.data = {
                  data: {
                     monitorLog: {
                        id: args?.params?.monitorLogId,
                        roomId: "r1",
                        studentId: "s1",
                        integrityScore: 0.1,
                        isPhonePresent: false,
                     },
                     room: { id: "r1", title: "Room", teacherAccountId: "t1" },
                     student: { id: "s1", roomId: "r1", monitorLogCount: 1 },
                     teacher: { id: "t1" },
                  },
               };
            } else if (url === "/api/rooms/:roomId/monitor_logs") {
               state.data = {
                  data: {
                     monitorLogs: [
                        {
                           id: "m3",
                           roomId: args?.params?.roomId,
                           studentId: "s1",
                           integrityScore: 0.3,
                           isPhonePresent: false,
                        },
                     ],
                  },
               };
            }

            return state.data;
         },
      };
      return state;
   },
}));

import { useStore } from "@/app/composables/use-store";

describe("useStore", () => {
   beforeEach(() => {
      setActivePinia(createPinia());
      socketHandlers.clear();
      fetchCallCount.clear();
      failOnce.clear();
      vi.clearAllMocks();
   });

   it("loads and upserts rooms/students/logs", async () => {
      const store = useStore();

      await store.loadRooms();
      expect(store.allRooms.get("r1")?.title).toBe("Room");

      await store.loadDeletedRooms();
      expect(store.deletedRooms.get("r2")?.title).toBe("Trash");

      await store.loadRoom("rx");
      expect(store.allRooms.get("rx")?.title).toBe("Room");
      expect(store.allStudents.get("s1")?.roomId).toBe("rx");
      expect(store.allMonitorLogs.get("m1")?.roomId).toBe("rx");

      await store.loadMonitorLogs("rx");
      await store.loadMonitorLogs("rx");
      expect(fetchCallCount.get("/api/rooms/:roomId/monitor_logs")).toBe(1);
      expect(store.allMonitorLogs.has("m3")).toBe(true);
   });

   it("handles realtime handlers for upsert/delete/restore", () => {
      const store = useStore();

      socketHandlers.get("teacher:upsert_room")?.({
         room: { id: "r1", title: "R" },
      });
      socketHandlers.get("teacher:upsert_student")?.({
         student: { id: "s1", roomId: "r1", monitorLogCount: 0 },
      });
      socketHandlers.get("teacher:upsert_monitor_log")?.({
         monitorLog: { id: "m1", roomId: "r1", studentId: "s1" },
      });

      expect(store.allRooms.has("r1")).toBe(true);
      expect(store.allStudents.has("s1")).toBe(true);
      expect(store.allMonitorLogs.has("m1")).toBe(true);

      socketHandlers.get("teacher:delete_student")?.({ student: { id: "s1" } });
      expect(store.allStudents.has("s1")).toBe(false);

      socketHandlers.get("teacher:delete_room")?.({
         room: { id: "r1", title: "R" },
      });
      expect(store.allRooms.has("r1")).toBe(false);
      expect(store.deletedRooms.has("r1")).toBe(true);

      socketHandlers.get("teacher:restore_room")?.({
         room: { id: "r1", title: "R" },
         students: [{ id: "s9", roomId: "r1", monitorLogCount: 0 }],
         monitorLogs: [{ id: "m9", roomId: "r1", studentId: "s9" }],
      });
      expect(store.deletedRooms.has("r1")).toBe(false);
      expect(store.allRooms.has("r1")).toBe(true);
   });

   it("clears all caches", async () => {
      const store = useStore();
      await store.loadRooms();
      store.clear();
      expect(store.allRooms.size).toBe(0);
      expect(store.allStudents.size).toBe(0);
      expect(store.deletedRooms.size).toBe(0);
   });

   it("retries loaders after transient failure instead of permanently caching failure", async () => {
      const store = useStore();

      failOnce.set("/api/rooms", 1);
      await expect(store.loadRooms()).rejects.toThrow(/transient/);
      await store.loadRooms();
      expect(fetchCallCount.get("/api/rooms")).toBe(2);
      expect(store.allRooms.has("r1")).toBe(true);

      failOnce.set("/api/rooms/:roomId", 1);
      await expect(store.loadRoom("r-fail")).rejects.toThrow(/transient/);
      await store.loadRoom("r-fail");
      expect(fetchCallCount.get("/api/rooms/:roomId")).toBe(2);
      expect(store.allRooms.has("r-fail")).toBe(true);

      failOnce.set("/api/rooms/:roomId/monitor_logs", 1);
      await expect(store.loadMonitorLogs("r-fail")).rejects.toThrow(
         /transient/,
      );
      await store.loadMonitorLogs("r-fail");
      expect(fetchCallCount.get("/api/rooms/:roomId/monitor_logs")).toBe(2);
      expect(store.allMonitorLogs.has("m3")).toBe(true);
   });

   it("counts monitor logs per student with missing-student guard", () => {
      const store = useStore();
      expect(store.countMonitorLogsOfStudent("missing")).toBe(0);

      store.upsertStudents([
         { id: "s1", roomId: "r1", monitorLogCount: 0 } as any,
         { id: "s2", roomId: "r1", monitorLogCount: 0 } as any,
      ]);
      store.upsertMonitorLogs([
         { id: "m1", roomId: "r1", studentId: "s1" } as any,
         { id: "m2", roomId: "r1", studentId: "s1" } as any,
         { id: "m3", roomId: "r1", studentId: "s2" } as any,
      ]);

      expect(store.countMonitorLogsOfStudent("s1")).toBe(2);
      expect(store.countMonitorLogsOfStudent("s2")).toBe(1);
   });
});
