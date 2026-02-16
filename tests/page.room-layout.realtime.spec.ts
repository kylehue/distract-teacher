import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { reactive, nextTick } from "vue";

const state = vi.hoisted(() => ({
   route: {
      params: { roomId: "r1" },
      path: "/dashboard/rooms/r1/overview",
   },
   routerPush: vi.fn(),
   loadRoom: vi.fn(),
   announcementShow: vi.fn(),
   messageSuccess: vi.fn(),
   messageWarning: vi.fn(),
   messageError: vi.fn(),
   fetchByUrl: {} as Record<string, any>,
   store: {} as any,
}));

vi.mock("vue-router", () => ({
   useRoute: () => state.route,
   useRouter: () => ({ push: state.routerPush }),
   RouterLink: {
      props: ["to"],
      template: "<a><slot /></a>",
   },
   RouterView: {
      template: "<div data-testid='router-view' />",
   },
}));

vi.mock("@/app/composables/use-store", () => ({
   useStore: () => state.store,
}));

vi.mock("@/app/composables/use-auth-store", () => ({
   useAuthStore: () => ({ teacher: { id: "t1", name: "Teacher" } }),
}));

vi.mock("@/app/composables/use-announcement", () => ({
   useAnnouncement: () => ({ show: state.announcementShow }),
}));

vi.mock("@/app/composables/use-fetch", () => ({
   useFetch: (url: string) => {
      if (!state.fetchByUrl[url]) {
         state.fetchByUrl[url] = {
            isLoading: false,
            error: null,
            execute: vi.fn().mockResolvedValue({ data: { success: true } }),
         };
      }
      return state.fetchByUrl[url];
   },
}));

vi.mock("naive-ui", () => ({
   NButton: {
      props: ["disabled", "loading", "type", "secondary", "circle", "quaternary"],
      emits: ["click"],
      template:
         "<button type='button' :disabled='disabled' @click=\"$emit('click')\"><slot /></button>",
   },
   NTabs: {
      props: ["value", "type"],
      emits: ["update:value"],
      template: "<div><slot /></div>",
   },
   NTab: {
      props: ["name"],
      template: "<div><slot /></div>",
   },
   NText: {
      template: "<span><slot /></span>",
   },
   NDivider: {
      template: "<hr />",
   },
   NTooltip: {
      template: "<div><slot name='trigger' /><slot /></div>",
   },
   NBadge: {
      props: ["value"],
      template: "<span class='badge'>{{ value }}<slot /></span>",
   },
   NIcon: {
      template: "<i><slot /></i>",
   },
   useMessage: () => ({
      success: state.messageSuccess,
      warning: state.messageWarning,
      error: state.messageError,
   }),
}));

vi.mock("@phosphor-icons/vue", () => ({
   PhPause: { template: "<i />" },
   PhPlay: { template: "<i />" },
   PhStop: { template: "<i />" },
   PhArrowLeft: { template: "<i />" },
   PhGear: { template: "<i />" },
   PhHouse: { template: "<i />" },
   PhMegaphoneSimple: { template: "<i />" },
   PhUserFocus: { template: "<i />" },
   PhUsers: { template: "<i />" },
}));

import RoomLayoutPage from "@/app/pages/dashboard/room/layout.vue";

function setDefaultStoreState() {
   state.store = {
      allRooms: reactive(
         new Map([
            [
               "r1",
               {
                  id: "r1",
                  title: "Realtime Room",
                  status: "paused",
               },
            ],
         ]),
      ),
      allStudents: reactive(new Map()),
      monitorLogsGroupedByRoomId: reactive(new Map()),
      studentsGroupedByRoomId: reactive(
         new Map([
            [
               "r1",
               reactive(
                  new Map([
                     [
                        "s1",
                        {
                           id: "s1",
                           roomId: "r1",
                           permitted: false,
                           active: true,
                           lockMonitorLogId: null,
                        },
                     ],
                     [
                        "s2",
                        {
                           id: "s2",
                           roomId: "r1",
                           permitted: true,
                           active: true,
                           lockMonitorLogId: "m-lock",
                        },
                     ],
                  ]),
               ),
            ],
         ]),
      ),
      isLoadRoomLoading: false,
      loadRoom: state.loadRoom,
   };
}

describe("Dashboard Room Layout Page", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      state.fetchByUrl = {};
      setDefaultStoreState();
      (globalThis as any).confirm = vi.fn(() => true);
   });

   it("loads room on mount and triggers start/pause/stop/announcement actions", async () => {
      const wrapper = mount(RoomLayoutPage, {
         global: {
            stubs: {
               Layout: {
                  template:
                     "<div><div class='header'><slot name='header' /></div><div class='header-extra'><slot name='header-extra' /></div><slot /></div>",
               },
               RoomStatusTag: { template: "<span>status-tag</span>" },
               Loader: { template: "<div>loader</div>" },
            },
         },
      });

      expect(state.loadRoom).toHaveBeenCalledWith("r1");
      expect(wrapper.text()).toContain("Realtime Room");

      let buttons = wrapper.findAll("button");
      await buttons[3].trigger("click");

      const room = state.store.allRooms.get("r1");
      room.status = "monitoring";
      await nextTick();

      buttons = wrapper.findAll("button");
      await buttons[2].trigger("click");
      await buttons[1].trigger("click");
      await buttons[4].trigger("click");
      await Promise.resolve();

      expect(state.fetchByUrl["/api/start_monitoring/:roomId"].execute).toHaveBeenCalledWith({
         params: { roomId: "r1" },
      });
      expect(state.fetchByUrl["/api/pause_monitoring/:roomId"].execute).toHaveBeenCalledWith({
         params: { roomId: "r1" },
      });
      expect(state.fetchByUrl["/api/stop_monitoring/:roomId"].execute).toHaveBeenCalledWith({
         params: { roomId: "r1" },
      });
      expect(state.announcementShow).toHaveBeenCalled();
      expect(state.messageSuccess).toHaveBeenCalled();
      expect(state.messageWarning).toHaveBeenCalled();
      expect(state.messageError).toHaveBeenCalled();
   });

   it("updates header actions when room status changes from store", async () => {
      const wrapper = mount(RoomLayoutPage, {
         global: {
            stubs: {
               Layout: {
                  template:
                     "<div><div class='header'><slot name='header' /></div><div class='header-extra'><slot name='header-extra' /></div><slot /></div>",
               },
               RoomStatusTag: { template: "<span>status-tag</span>" },
               Loader: { template: "<div>loader</div>" },
            },
         },
      });

      const room = state.store.allRooms.get("r1");
      expect(wrapper.findAll("button").length).toBeGreaterThanOrEqual(5);
      room.status = "concluded";
      await nextTick();

      expect(wrapper.findAll("button").length).toBe(1);
   });

   it("does not call stop-monitoring API when confirmation is cancelled", async () => {
      (globalThis as any).confirm = vi.fn(() => false);

      const wrapper = mount(RoomLayoutPage, {
         global: {
            stubs: {
               Layout: {
                  template:
                     "<div><div class='header'><slot name='header' /></div><div class='header-extra'><slot name='header-extra' /></div><slot /></div>",
               },
               RoomStatusTag: { template: "<span>status-tag</span>" },
               Loader: { template: "<div>loader</div>" },
            },
         },
      });

      const buttons = wrapper.findAll("button");
      await buttons[1].trigger("click");

      expect(
         state.fetchByUrl["/api/stop_monitoring/:roomId"].execute,
      ).not.toHaveBeenCalled();
   });

   it("shows room-not-found state when room is absent and not loading", () => {
      state.store = {
         allRooms: reactive(new Map()),
         allStudents: reactive(new Map()),
         monitorLogsGroupedByRoomId: reactive(new Map()),
         studentsGroupedByRoomId: reactive(new Map()),
         isLoadRoomLoading: false,
         loadRoom: state.loadRoom,
      };

      const wrapper = mount(RoomLayoutPage, {
         global: {
            stubs: {
               Layout: {
                  template:
                     "<div><div class='header'><slot name='header' /></div><div class='header-extra'><slot name='header-extra' /></div><slot /></div>",
               },
               RoomStatusTag: { template: "<span>status-tag</span>" },
               Loader: { template: "<div>loader</div>" },
            },
         },
      });

      expect(wrapper.text()).toContain("Room not found");
   });

   it("shows loader when room is absent but still loading", () => {
      state.store = {
         allRooms: reactive(new Map()),
         allStudents: reactive(new Map()),
         monitorLogsGroupedByRoomId: reactive(new Map()),
         studentsGroupedByRoomId: reactive(new Map()),
         isLoadRoomLoading: true,
         loadRoom: state.loadRoom,
      };

      const wrapper = mount(RoomLayoutPage, {
         global: {
            stubs: {
               Layout: {
                  template:
                     "<div><div class='header'><slot name='header' /></div><div class='header-extra'><slot name='header-extra' /></div><slot /></div>",
               },
               RoomStatusTag: { template: "<span>status-tag</span>" },
               Loader: { template: "<div>loader</div>" },
            },
         },
      });

      expect(wrapper.text()).toContain("loader");
   });
});
