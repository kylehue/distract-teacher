import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick } from "vue";

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

const authState = {
   isLoading: false,
   teacher: { id: "t1" } as any,
   loginWithCookie: vi.fn().mockResolvedValue(undefined),
};

vi.mock("@/app/composables/use-socket", () => ({
   useSocket: () => socketApi,
}));

vi.mock("@/app/composables/use-auth-store", () => ({
   useAuthStore: () => authState,
}));

vi.mock("@/app/composables/use-fetch", () => ({
   useFetch: (url: string) => {
      const state = {
         isLoading: false,
         error: null as any,
         data: null as any,
         async execute() {
            if (url === "/api/deleted_rooms") {
               state.data = { data: { rooms: [] } };
            } else if (url === "/api/rooms/:roomId/restore") {
               state.data = { data: { success: true } };
            } else if (url === "/api/rooms") {
               state.data = { data: { rooms: [] } };
            } else if (url === "/api/rooms/:roomId") {
               state.data = {
                  data: { room: {}, students: [], monitorLogs: [] },
               };
            } else if (url === "/api/students/:studentId") {
               state.data = {
                  data: { student: {}, monitorLogs: [], room: {}, teacher: {} },
               };
            } else if (url === "/api/rooms/:roomId/students") {
               state.data = { data: { students: [] } };
            } else if (url === "/api/monitor_logs/:monitorLogId") {
               state.data = {
                  data: { monitorLog: {}, room: {}, student: {}, teacher: {} },
               };
            } else if (url === "/api/rooms/:roomId/monitor_logs") {
               state.data = { data: { monitorLogs: [] } };
            } else {
               state.data = { data: {} };
            }
            return state.data;
         },
      };
      return state;
   },
}));

vi.mock("@phosphor-icons/vue", () => ({
   PhArrowLeft: defineComponent({ setup: () => () => h("i") }),
   PhTrash: defineComponent({ setup: () => () => h("i") }),
}));

vi.mock("naive-ui", () => ({
   NLayout: defineComponent({
      setup(_, { slots }) {
         return () => h("div", slots.default?.());
      },
   }),
   NLayoutContent: defineComponent({
      setup(_, { slots }) {
         return () => h("div", slots.default?.());
      },
   }),
   NDivider: defineComponent({ setup: () => () => h("hr") }),
   NText: defineComponent({
      setup(_, { slots }) {
         return () => h("span", slots.default?.());
      },
   }),
   NButton: defineComponent({
      emits: ["click"],
      setup(_, { slots, emit }) {
         return () =>
            h("button", { onClick: () => emit("click") }, slots.default?.());
      },
   }),
   NEmpty: defineComponent({
      setup(_, { slots }) {
         return () => h("div", slots.default?.() ?? "empty");
      },
   }),
   NDataTable: defineComponent({
      props: { data: { type: Array, default: () => [] } },
      setup(props) {
         return () =>
            h(
               "div",
               { "data-testid": "trash-table" },
               (props.data as any[]).map((r) =>
                  h("p", { class: "trash-row" }, `${r.title}|${r.code}`),
               ),
            );
      },
   }),
   useMessage: () => ({ success: vi.fn(), error: vi.fn() }),
}));

import TrashPage from "@/app/pages/trash.vue";

describe("Trash Page (real-time)", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      socketHandlers.clear();
      authState.isLoading = false;
      authState.teacher = { id: "t1" };
      authState.loginWithCookie.mockResolvedValue(undefined);
   });

   it("updates table when rooms are deleted/restored via socket events", async () => {
      const wrapper = mount(TrashPage, {
         global: {
            plugins: [createPinia()],
            mocks: {
               $router: { back: vi.fn() },
            },
            stubs: {
               Loader: { template: "<div>loading</div>" },
            },
         },
      });

      await nextTick();
      expect(wrapper.findAll(".trash-row").length).toBe(0);

      const deletedRoom = {
         id: "r-del",
         title: "Deleted Room",
         code: "DEL1",
         status: "concluded",
         createdAt: "2026-01-01T00:00:00.000Z",
         deletedAt: "2026-01-02T00:00:00.000Z",
      };

      socketHandlers.get("teacher:delete_room")?.({ room: deletedRoom });
      await nextTick();
      expect(wrapper.findAll(".trash-row").map((x) => x.text())).toContain(
         "Deleted Room|DEL1",
      );

      socketHandlers.get("teacher:restore_room")?.({
         room: deletedRoom,
         students: [],
         monitorLogs: [],
      });
      await nextTick();
      expect(wrapper.findAll(".trash-row").length).toBe(0);
   });

   it("shows loading state while auth is initializing", () => {
      authState.isLoading = true;

      const wrapper = mount(TrashPage, {
         global: {
            plugins: [createPinia()],
            mocks: {
               $router: { back: vi.fn() },
            },
            stubs: {
               Loader: { template: "<div>loading</div>" },
            },
         },
      });

      expect(wrapper.text()).toContain("loading");
   });

   it("renders nothing state when teacher session is unavailable", () => {
      authState.teacher = null;

      const wrapper = mount(TrashPage, {
         global: {
            plugins: [createPinia()],
            mocks: {
               $router: { back: vi.fn() },
            },
            stubs: {
               Loader: { template: "<div>loading</div>" },
            },
         },
      });

      expect(wrapper.text()).toContain("Nothing");
   });
});
