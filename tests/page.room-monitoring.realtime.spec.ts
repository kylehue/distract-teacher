import { mount } from "@vue/test-utils";
import { computed, defineComponent, h, nextTick, ref } from "vue";
import type { Ref } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import {
   IS_LOADING_INJECTION_KEY,
   MONITOR_LOGS_INJECTION_KEY,
   MONITOR_LOGS_MAP_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
} from "@/lib/injection-keys";

const state = vi.hoisted(() => ({
   route: {
      query: {} as Record<string, any>,
   },
   routerReplace: vi.fn(),
   unlockExecute: vi.fn(),
}));

const socketHandlers = new Map<string, Function>();
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

vi.mock("vue-router", () => ({
   useRoute: () => state.route,
   useRouter: () => ({ replace: state.routerReplace }),
   RouterLink: defineComponent({
      name: "RouterLink",
      setup(_, { slots }) {
         return () => h("a", slots.default?.());
      },
   }),
}));

vi.mock("@/app/composables/use-fetch", () => ({
   useFetch: () => ({
      isLoading: false,
      execute: state.unlockExecute,
   }),
}));

vi.mock("@/app/composables/use-socket", () => ({
   useSocket: () => socketApi,
}));

import MonitoringPage from "@/app/pages/dashboard/room/monitoring.vue";
import { useStore } from "@/app/composables/use-store";

const DataViewExposeStub = defineComponent({
   name: "DataView",
   props: {
      items: { type: Array, default: () => [] },
      loading: { type: Boolean, default: false },
   },
   setup(props, { expose, slots }) {
      expose({
         addSpecialFilter: vi.fn(),
      });

      return () => {
         const items = props.items as any[];

         if (props.loading) {
            return h("section", { class: "data-view data-view-loading" }, [
               slots.loading?.() ?? "loading",
            ]);
         }

         if (!items.length) {
            return h("section", { class: "data-view data-view-empty" }, [
               slots.empty?.(),
            ]);
         }

         return h(
            "section",
            { class: "data-view" },
            items.map((item, index) =>
               h(
                  "div",
                  { class: "data-view-item", "data-index": String(index) },
                  slots.item?.({
                     item,
                     index,
                     localIndex: index,
                     visibleCount: items.length,
                  }),
               ),
            ),
         );
      };
   },
});

const RowCardSlotStub = defineComponent({
   name: "RowCard",
   props: {
      tags: { type: Array, default: () => [] },
   },
   setup(props, { slots }) {
      return () =>
         h("article", { class: "row-card" }, [
            h("div", { class: "row-card-title" }, slots.title?.()),
            h(
               "div",
               { class: "row-card-tags" },
               (props.tags as any[]).map((tag, index) =>
                  h(
                     "span",
                     { class: "row-card-tag", "data-index": String(index) },
                     String((tag as any)?.label ?? ""),
                  ),
               ),
            ),
            h("div", { class: "row-card-content" }, slots.content?.()),
            h("div", { class: "row-card-footer" }, slots.footer?.()),
            h("div", { class: "row-card-action" }, slots.action?.()),
         ]);
   },
});

const StatisticStub = defineComponent({
   name: "Statistic",
   props: {
      title: { type: String, default: "" },
   },
   setup(props, { slots }) {
      return () =>
         h("div", { class: "statistic" }, [
            h("span", { class: "statistic-title" }, props.title),
            h("span", { class: "statistic-value" }, slots.default?.()),
         ]);
   },
});

function createStudent(id: string, name: string, overrides: Record<string, any> = {}) {
   return {
      id,
      roomId: "r1",
      uuid: `uuid-${id}`,
      name,
      timeJoined: "2026-01-01T00:00:00.000Z",
      active: true,
      permitted: true,
      lockMonitorLogId: null,
      monitorLogCount: 0,
      createdAt: "2026-01-01T00:00:00.000Z",
      ...overrides,
   } as any;
}

function createMonitorLog(
   id: string,
   studentId: string,
   overrides: Record<string, any> = {},
) {
   return {
      id,
      roomId: "r1",
      studentId,
      warningLevel: "moderate",
      createdAt: "2026-01-01T00:00:00.000Z",
      integrityScore: 0.42,
      rfScore: 0.42,
      ifScore: 0.42,
      featureImpacts: {},
      isPhonePresent: false,
      recordingPath: "",
      recordingUrl: "",
      ...overrides,
   } as any;
}

function mountMonitoringPage(params: {
   studentsMap: Ref<Map<string, any>>;
   monitorLogsMap: Ref<Map<string, any>>;
   monitorLogsArray: Ref<any[]>;
}) {
   return mount(MonitoringPage, {
      global: {
         provide: {
            [ROOM_INJECTION_KEY as symbol]: ref({
               id: "r1",
               status: "monitoring",
            }),
            [IS_LOADING_INJECTION_KEY as symbol]: ref(false),
            [STUDENTS_MAP_INJECTION_KEY as symbol]: params.studentsMap,
            [MONITOR_LOGS_MAP_INJECTION_KEY as symbol]: params.monitorLogsMap,
            [MONITOR_LOGS_INJECTION_KEY as symbol]: params.monitorLogsArray,
         },
         stubs: {
            DataView: DataViewExposeStub,
            RowCard: RowCardSlotStub,
            Statistic: StatisticStub,
            RouterLink: defineComponent({
               name: "RouterLink",
               setup(_, { slots }) {
                  return () => h("a", slots.default?.());
               },
            }),
         },
      },
   });
}

describe("Dashboard Room Monitoring Page (real-time and update expectations)", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      socketHandlers.clear();
      state.route.query = {};
      state.unlockExecute.mockResolvedValue({ data: { success: true } });
   });

   it("adds a new warning-log row when store receives teacher:upsert_monitor_log", async () => {
      setActivePinia(createPinia());
      const store = useStore();

      store.upsertRooms([
         {
            id: "r1",
            teacherAccountId: "t1",
            title: "Room 1",
            code: "RM01",
            studentCount: 1,
            studentCapacity: 30,
            status: "monitoring",
            evidenceWarningLevel: "moderate",
            enablePunishments: true,
            allowLateStudents: true,
            joinConfirmation: true,
            createdAt: "2026-01-01T00:00:00.000Z",
         } as any,
      ]);
      store.upsertStudents([createStudent("s1", "Alice")]);
      store.upsertMonitorLogs([createMonitorLog("m1", "s1")]);

      const studentsMap = computed(
         () =>
            store.studentsGroupedByRoomId.get("r1") ??
            (new Map<string, any>() as Map<string, any>),
      );
      const monitorLogsMap = computed(
         () =>
            store.monitorLogsGroupedByRoomId.get("r1") ??
            (new Map<string, any>() as Map<string, any>),
      );
      const monitorLogsArray = computed(() =>
         Array.from(monitorLogsMap.value.values()),
      );

      const wrapper = mountMonitoringPage({
         studentsMap,
         monitorLogsMap,
         monitorLogsArray,
      });

      await nextTick();
      expect(wrapper.findAll(".data-view-item").length).toBe(1);

      socketHandlers.get("teacher:upsert_monitor_log")?.({
         monitorLog: createMonitorLog("m2", "s1", {
            warningLevel: "severe",
            integrityScore: 0.11,
         }),
      });
      await nextTick();

      expect(wrapper.findAll(".data-view-item").length).toBe(2);
   });

   it("reacts to realtime log inserts and later student-name updates", async () => {
      const studentsMap = ref(
         new Map<string, any>([["s1", createStudent("s1", "Alice")]]),
      );
      const monitorLogsMap = ref(
         new Map<string, any>([["m1", createMonitorLog("m1", "s1")]]),
      );
      const monitorLogsArray = computed(() =>
         Array.from(monitorLogsMap.value.values()),
      );

      const wrapper = mountMonitoringPage({
         studentsMap,
         monitorLogsMap,
         monitorLogsArray,
      });

      await nextTick();
      expect(wrapper.findAll(".data-view-item").length).toBe(1);
      expect(wrapper.text()).toContain("Alice");

      monitorLogsMap.value.set(
         "m2",
         createMonitorLog("m2", "s2", { warningLevel: "severe" }),
      );
      studentsMap.value.set("s2", createStudent("s2", "Bob"));
      await nextTick();

      expect(wrapper.findAll(".data-view-item").length).toBe(2);
      expect(wrapper.text()).toContain("Bob");

      studentsMap.value.set("s2", createStudent("s2", "Bobby"));
      await nextTick();

      expect(wrapper.text()).toContain("Bobby");
      expect(wrapper.text()).not.toContain("<Unnamed>");
   });
});
