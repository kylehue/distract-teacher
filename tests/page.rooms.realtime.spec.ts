import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { defineComponent, h, nextTick } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
   DataViewStub,
   PageLayoutStub,
   RowCardStub,
   RouterLinkStub,
} from "./support/component-stubs";

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

const fetchStateByUrl = new Map<string, any>();
vi.mock("@/app/composables/use-fetch", () => ({
   useFetch: (url: string) => {
      const state = {
         data: null as any,
         isLoading: false,
         async execute() {
            if (url === "/api/rooms") {
               state.data = { data: { rooms: [] } };
            } else if (url === "/api/deleted_rooms") {
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
                  data: { monitorLog: {}, student: {}, room: {}, teacher: {} },
               };
            } else if (url === "/api/rooms/:roomId/monitor_logs") {
               state.data = { data: { monitorLogs: [] } };
            }
            return state.data;
         },
      };
      fetchStateByUrl.set(url, state);
      return state;
   },
}));

vi.mock("@/app/composables/use-socket", () => ({
   useSocket: () => socketApi,
}));

const showCreateRoomSpy = vi.fn();
vi.mock("@/app/composables/use-create-room", () => ({
   useCreateRoom: () => ({
      show: showCreateRoomSpy,
   }),
}));

vi.mock("@/app/components/input-search.vue", () => ({
   default: defineComponent({
      name: "InputSearch",
      setup() {
         return () => h("div", { "data-testid": "input-search" });
      },
   }),
}));

vi.mock("@/app/components/copy-button.vue", () => ({
   default: defineComponent({
      name: "CopyButton",
      setup() {
         return () => h("button", "copy");
      },
   }),
}));

import RoomsPage from "@/app/pages/dashboard/rooms.vue";
import { useStore } from "@/app/composables/use-store";

function mountRoomsPage() {
   return mount(RoomsPage, {
      global: {
         plugins: [createPinia()],
         stubs: {
            DataView: DataViewStub,
            Layout: PageLayoutStub,
            RowCard: RowCardStub,
            RouterLink: RouterLinkStub,
         },
      },
   });
}

describe("Dashboard Rooms Page (real-time)", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      socketHandlers.clear();
      fetchStateByUrl.clear();
   });

   it("updates rendered rooms when socket upserts a room in store", async () => {
      const wrapper = mountRoomsPage();

      const store = useStore();
      await store.loadRooms();
      await nextTick();
      expect(wrapper.findAll(".row-card").length).toBe(0);

      socketHandlers.get("teacher:upsert_room")?.({
         room: {
            id: "r-1",
            title: "Realtime Room",
            code: "R1X1",
            status: "ongoing",
            studentCount: 5,
            studentCapacity: 30,
            createdAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z",
            teacherAccountId: "t-1",
            timeStarted: null,
            timeEnded: null,
            maxViolations: 3,
            evidenceWarningLevel: "high",
            isDeleted: false,
         },
      });
      await nextTick();

      expect(wrapper.findAll(".row-card").length).toBe(1);
      expect(wrapper.text()).toContain("Realtime Room");
      expect(wrapper.text()).toContain("R1X1");
   });

   it("updates rendered rooms when socket deletes a room in store", async () => {
      const wrapper = mountRoomsPage();

      const store = useStore();
      await store.loadRooms();
      await nextTick();

      const room = {
         id: "r-del-1",
         title: "Deleted Realtime Room",
         code: "DEL1",
         status: "ongoing",
         studentCount: 2,
         studentCapacity: 30,
         createdAt: "2026-01-01T00:00:00.000Z",
         updatedAt: "2026-01-01T00:00:00.000Z",
         teacherAccountId: "t-1",
         timeStarted: null,
         timeEnded: null,
         maxViolations: 3,
         evidenceWarningLevel: "high",
         isDeleted: false,
      };

      socketHandlers.get("teacher:upsert_room")?.({ room });
      await nextTick();
      expect(wrapper.findAll(".row-card").length).toBe(1);
      expect(wrapper.text()).toContain("Deleted Realtime Room");
      expect(wrapper.text()).toContain("DEL1");

      socketHandlers.get("teacher:delete_room")?.({
         room: { ...room, isDeleted: true },
      });
      await nextTick();
      expect(wrapper.findAll(".row-card").length).toBe(0);
      expect(wrapper.text()).not.toContain("Deleted Realtime Room");
   });

   it("opens create-room modal when header action is clicked", async () => {
      const wrapper = mountRoomsPage();

      const createButton = wrapper
         .findAll("button")
         .find((btn) => btn.text().includes("Create Room"));
      expect(createButton).toBeTruthy();

      await createButton!.trigger("click");
      expect(showCreateRoomSpy).toHaveBeenCalledTimes(1);
   });

   it("renders empty-state placeholder when no rooms are available", async () => {
      const wrapper = mountRoomsPage();

      await nextTick();
      expect(wrapper.find(".data-view").exists()).toBe(true);
      expect(wrapper.find(".data-view-empty").exists()).toBe(true);
      expect(wrapper.text()).toContain("You haven't created any rooms yet.");
      expect(wrapper.findAll(".row-card").length).toBe(0);
   });
});
