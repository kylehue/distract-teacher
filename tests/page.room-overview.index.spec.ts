import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ref, nextTick } from "vue";
import {
   MONITOR_LOGS_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_INJECTION_KEY,
   THEME_INJECTION_KEY,
} from "@/lib/injection-keys";

const state = vi.hoisted(() => ({
   exportToExcel: vi.fn(),
   printElement: vi.fn(),
   teacher: { id: "t1", displayName: "Teacher A" } as any,
   store: { isLoadStudentLoading: false } as any,
}));

vi.mock("@/app/composables/use-store", () => ({
   useStore: () => state.store,
}));

vi.mock("@/app/composables/use-auth-store", () => ({
   useAuthStore: () => ({ teacher: state.teacher }),
}));

vi.mock("@/lib/excel", () => ({
   exportToExcel: (...args: any[]) => state.exportToExcel(...args),
}));

vi.mock("@/lib/dom", () => ({
   printElement: (...args: any[]) => state.printElement(...args),
}));

vi.mock("@/lib/reports", () => ({
   createMonitorLogsReports: vi.fn(() => ({ integrityScoreAverage: 0.9 })),
   createStudentsIndividualReports: vi.fn(
      () => new Map([["s1", { zScore: 0.2, explanation: "ok" }]]),
   ),
}));

import RoomOverviewIndexPage from "@/app/pages/dashboard/room/overview/index.vue";

describe("Room Overview Index Page", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      state.teacher = { id: "t1", displayName: "Teacher A" };
      state.printElement.mockResolvedValue({ save: vi.fn() });
   });

   it("exports room/student/log data and prints summary", async () => {
      const room = ref({ id: "r1", code: "RM01", title: "Room 1" } as any);
      const students = ref([
         {
            id: "s1",
            name: "Alice",
            monitorLogCount: 1,
         },
      ] as any[]);
      const monitorLogs = ref([
         {
            id: "m1",
            studentId: "s1",
            integrityScore: 0.9,
            isPhonePresent: false,
         },
      ] as any[]);

      const wrapper = mount(RoomOverviewIndexPage, {
         global: {
            provide: {
               [THEME_INJECTION_KEY as symbol]: ref("light"),
               [ROOM_INJECTION_KEY as symbol]: room,
               [STUDENTS_INJECTION_KEY as symbol]: students,
               [MONITOR_LOGS_INJECTION_KEY as symbol]: monitorLogs,
            },
            stubs: {
               Dashboard: {
                  template: "<div>dashboard</div>",
               },
            },
         },
      });

      const buttons = wrapper.findAll("button");
      await buttons[0].trigger("click");
      await nextTick();
      await Promise.resolve();

      expect(state.printElement).toHaveBeenCalled();

      await buttons[1].trigger("click");
      expect(state.exportToExcel).toHaveBeenCalled();
   });

   it("renders no-room state when injected room is missing", () => {
      const wrapper = mount(RoomOverviewIndexPage, {
         global: {
            provide: {
               [THEME_INJECTION_KEY as symbol]: ref("light"),
               [ROOM_INJECTION_KEY as symbol]: ref(null),
               [STUDENTS_INJECTION_KEY as symbol]: ref([]),
               [MONITOR_LOGS_INJECTION_KEY as symbol]: ref([]),
            },
            stubs: {
               Dashboard: {
                  template: "<div>dashboard</div>",
               },
            },
         },
      });

      expect(wrapper.text()).toContain("no room");
   });

   it("skips export when teacher context is unavailable", async () => {
      state.teacher = null;

      const wrapper = mount(RoomOverviewIndexPage, {
         global: {
            provide: {
               [THEME_INJECTION_KEY as symbol]: ref("light"),
               [ROOM_INJECTION_KEY as symbol]: ref({
                  id: "r1",
                  code: "RM01",
                  title: "Room 1",
               } as any),
               [STUDENTS_INJECTION_KEY as symbol]: ref([
                  { id: "s1", name: "Alice", monitorLogCount: 1 },
               ] as any[]),
               [MONITOR_LOGS_INJECTION_KEY as symbol]: ref([
                  {
                     id: "m1",
                     studentId: "s1",
                     integrityScore: 0.9,
                     isPhonePresent: false,
                  },
               ] as any[]),
            },
            stubs: {
               Dashboard: {
                  template: "<div>dashboard</div>",
               },
            },
         },
      });

      const exportButton = wrapper.findAll("button")[1];
      await exportButton.trigger("click");

      expect(state.exportToExcel).not.toHaveBeenCalled();
   });
});
