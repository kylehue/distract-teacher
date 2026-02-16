import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { reactive, ref, nextTick } from "vue";
import { THEME_INJECTION_KEY } from "@/lib/injection-keys";

const state = vi.hoisted(() => ({
   route: { params: { studentId: "s1" } },
   store: {} as any,
   teacher: { id: "t1", displayName: "Teacher A" } as any,
   loadStudent: vi.fn(),
   loadStudents: vi.fn(),
   exportToExcel: vi.fn(),
   printElement: vi.fn(),
}));

vi.mock("vue-router", () => ({
   useRoute: () => state.route,
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

vi.mock("naive-ui", () => ({
   NButton: {
      props: ["disabled", "loading", "secondary"],
      emits: ["click"],
      template:
         "<button type='button' :disabled='disabled' @click=\"$emit('click')\"><slot /></button>",
   },
   NText: { template: "<span><slot /></span>" },
   NEmpty: {
      props: ["description"],
      template: "<div>{{ description }}<slot /></div>",
   },
   NConfigProvider: { template: "<div><slot /></div>" },
   lightTheme: {},
}));

vi.mock("@phosphor-icons/vue", () => ({
   PhArrowLeft: { template: "<i />" },
   PhPrinter: { template: "<i />" },
   PhFileXls: { template: "<i />" },
}));

import StudentReportsIndexPage from "@/app/pages/dashboard/student-reports/index.vue";

function setDefaultStoreState() {
   const students = reactive(
      new Map([
         [
            "s1",
            {
               id: "s1",
               roomId: "r1",
               name: "Alice",
               monitorLogCount: 1,
            },
         ],
      ]),
   );

   const rooms = reactive(
      new Map([
         [
            "r1",
            {
               id: "r1",
               code: "RM01",
               title: "Room 1",
            },
         ],
      ]),
   );

   const monitorLogsByStudent = reactive(
      new Map([
         [
            "s1",
            reactive(
               new Map([
                  [
                     "m1",
                     {
                        id: "m1",
                        studentId: "s1",
                        roomId: "r1",
                        createdAt: "2026-01-01T00:00:00.000Z",
                        integrityScore: 0.9,
                        isPhonePresent: false,
                     },
                  ],
               ]),
            ),
         ],
      ]),
   );

   state.store = {
      allStudents: students,
      allRooms: rooms,
      monitorLogsGroupedByStudentId: monitorLogsByStudent,
      isLoadStudentLoading: false,
      loadStudent: state.loadStudent,
      loadStudents: state.loadStudents,
   };
}

describe("Student Reports Index Page", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      setDefaultStoreState();
      state.teacher = { id: "t1", displayName: "Teacher A" };
      state.loadStudent.mockResolvedValue(undefined);
      state.loadStudents.mockResolvedValue(undefined);
      state.printElement.mockResolvedValue({ save: vi.fn() });
   });

   it("loads student data on mount and exports report data", async () => {
      const wrapper = mount(StudentReportsIndexPage, {
         global: {
            provide: {
               [THEME_INJECTION_KEY as symbol]: ref("light"),
            },
            stubs: {
               Layout: {
                  template: "<div><slot name='header' /><slot /></div>",
               },
               Dashboard: {
                  template: "<div>dashboard</div>",
               },
               Loader: {
                  template: "<div>loader</div>",
               },
            },
            mocks: {
               $router: {
                  back: vi.fn(),
               },
            },
         },
      });

      await nextTick();
      await Promise.resolve();

      expect(state.loadStudent).toHaveBeenCalledWith("s1");
      expect(state.loadStudents).toHaveBeenCalledWith("r1");

      const exportButton = wrapper
         .findAll("button")
         .find((b) => b.text().includes("Export Student Data"));
      expect(exportButton).toBeTruthy();
      await exportButton!.trigger("click");

      expect(state.exportToExcel).toHaveBeenCalled();
   });

   it("shows not found state when required data is missing", () => {
      state.teacher = null;
      const wrapper = mount(StudentReportsIndexPage, {
         global: {
            provide: {
               [THEME_INJECTION_KEY as symbol]: ref("light"),
            },
            stubs: {
               Layout: {
                  template: "<div><slot name='header' /><slot /></div>",
               },
               Dashboard: {
                  template: "<div>dashboard</div>",
               },
               Loader: {
                  template: "<div>loader</div>",
               },
            },
            mocks: {
               $router: {
                  back: vi.fn(),
               },
            },
         },
      });

      expect(wrapper.text()).toContain("Data not found.");
   });

   it("shows loading state while student report is being loaded", () => {
      state.store.isLoadStudentLoading = true;

      const wrapper = mount(StudentReportsIndexPage, {
         global: {
            provide: {
               [THEME_INJECTION_KEY as symbol]: ref("light"),
            },
            stubs: {
               Layout: {
                  template: "<div><slot name='header' /><slot /></div>",
               },
               Dashboard: {
                  template: "<div>dashboard</div>",
               },
               Loader: {
                  template: "<div>loader</div>",
               },
            },
            mocks: {
               $router: {
                  back: vi.fn(),
               },
            },
         },
      });

      expect(wrapper.text()).toContain("loader");
      expect(wrapper.findAll("button").length).toBe(1);
   });
});
