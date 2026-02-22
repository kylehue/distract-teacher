import { mount, flushPromises } from "@vue/test-utils";
import { createPinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick } from "vue";
import { createSocketMock } from "./support/socket-mock";
import { naiveUiMockState } from "./support/naive-ui-mock";

type NotificationSeed = {
   id: string;
   title: string;
   body: string;
   isRead: boolean;
   url?: string;
   createdAt: string;
};

let activeSocket = createSocketMock();
const socketApi = {
   get socket() {
      return activeSocket;
   },
   on: vi.fn((event: string, handler: Function) => {
      activeSocket.on(event, handler);
   }),
   emit: vi.fn((event: string, payload: any) => {
      activeSocket.emit(event, payload);
   }),
};

const fetchStates = new Map<string, any>();
const failNextByKey = new Map<string, any>();
let seededNotifications: NotificationSeed[] = [];

const messageApi = naiveUiMockState.message;

function fetchKey(method: string, url: string) {
   return `${method.toUpperCase()}:${url}`;
}

function getFetchState(method: string, url: string) {
   return fetchStates.get(fetchKey(method, url));
}

function findButtonByText(wrapper: any, text: string) {
   return wrapper
      .findAll("button")
      .find((button: any) => button.text().trim() === text);
}

async function syncUi() {
   await flushPromises();
   await nextTick();
}

vi.mock("@/app/composables/use-socket", () => ({
   useSocket: () => socketApi,
}));

vi.mock("@/app/composables/use-fetch", () => ({
   useFetch: (url: string, method: string = "GET") => {
      const key = `${method.toUpperCase()}:${url}`;
      const state: any = {
         data: null,
         error: null,
         isLoading: false,
         execute: vi.fn(async (args: any = {}) => {
            state.isLoading = true;
            state.error = null;

            try {
               if (failNextByKey.has(key)) {
                  const err = failNextByKey.get(key);
                  failNextByKey.delete(key);
                  state.error = err;
                  throw err;
               }

               if (key === "GET:/api/notifications") {
                  state.data = {
                     message: "Notifications loaded successfully",
                     data: {
                        notifications: seededNotifications.map((item) => ({
                           ...item,
                        })),
                     },
                  };
               } else {
                  state.data = {
                     message: "ok",
                     data: args,
                  };
               }

               return state.data;
            } finally {
               state.isLoading = false;
            }
         }),
      };
      fetchStates.set(key, state);
      return state;
   },
}));

import NotificationProvider from "@/app/components/notification-provider.vue";
import { useNotification } from "@/app/composables/use-notification";

const DataViewStub = defineComponent({
   name: "DataView",
   props: {
      items: { type: Array, default: () => [] },
   },
   setup(props, { slots }) {
      return () =>
         h(
            "div",
            { class: "data-view-stub" },
            (props.items as any[]).length > 0
               ? (props.items as any[]).map((item, localIndex) =>
                    slots.item?.({ item, localIndex }),
                 )
               : slots.empty?.(),
         );
   },
});

const RowCardStub = defineComponent({
   name: "RowCard",
   props: {
      title: { type: String, default: "" },
      content: { type: String, default: "" },
      tags: { type: Array, default: () => [] },
      menuOptions: { type: Array, default: () => [] },
   },
   emits: ["click", "menu-select"],
   setup(props, { slots, emit }) {
      return () =>
         h("article", { class: "row-card-stub", "data-title": props.title }, [
            h(
               "button",
               {
                  type: "button",
                  class: "row-card-open",
                  onClick: () => emit("click"),
               },
               props.title,
            ),
            h("p", { class: "row-card-content" }, props.content),
            ...(props.tags as any[]).map((tag: any, index: number) =>
               h(
                  "span",
                  {
                     class: "row-card-tag",
                     "data-index": String(index),
                  },
                  typeof tag === "string" ? tag : (tag?.label ?? ""),
               ),
            ),
            ...(props.menuOptions as any[]).map((option: any, index: number) =>
               h(
                  "button",
                  {
                     type: "button",
                     class: "row-card-menu",
                     "data-label": String(option.label ?? ""),
                     disabled: !!option.disabled,
                     onClick: () => {
                        if (option.disabled) return;
                        option.onSelect?.();
                        emit("menu-select", option.key ?? `menu-${index}`);
                     },
                  },
                  String(option.label ?? ""),
               ),
            ),
            slots.icon?.(),
         ]);
   },
});

function mountNotificationProvider() {
   return mount(NotificationProvider, {
      global: {
         plugins: [createPinia()],
         stubs: {
            DataView: DataViewStub,
            RowCard: RowCardStub,
         },
      },
   });
}

describe("NotificationProvider", () => {
   beforeEach(() => {
      activeSocket = createSocketMock();
      fetchStates.clear();
      failNextByKey.clear();
      seededNotifications = [];
      messageApi.create.mockReset();
      messageApi.error.mockReset();
      messageApi.success.mockReset();
      socketApi.on.mockClear();
      socketApi.emit.mockClear();

      const notification = useNotification();
      notification.hide();
      notification.show();
   });

   it("loads notifications on mount and renders newest first", async () => {
      seededNotifications = [
         {
            id: "n-1",
            title: "Older unread",
            body: "body 1",
            isRead: false,
            createdAt: "2026-01-01T00:00:00.000Z",
         },
         {
            id: "n-2",
            title: "Newest read",
            body: "body 2",
            isRead: true,
            createdAt: "2026-01-03T00:00:00.000Z",
         },
      ];

      const wrapper = mountNotificationProvider();
      await syncUi();

      const list = wrapper
         .findAll("button.row-card-open")
         .map((node) => node.text());
      expect(list).toEqual(["Newest read", "Older unread"]);
      expect(
         getFetchState("GET", "/api/notifications").execute,
      ).toHaveBeenCalledTimes(1);
      expect(findButtonByText(wrapper, "Mark All as Read")?.exists()).toBe(
         true,
      );
      expect(findButtonByText(wrapper, "Clear")?.exists()).toBe(true);
   });

   it("runs mark/read/unread/delete actions with expected payloads", async () => {
      seededNotifications = [
         {
            id: "n-unread",
            title: "Unread item",
            body: "body unread",
            isRead: false,
            createdAt: "2026-01-01T00:00:00.000Z",
         },
         {
            id: "n-read",
            title: "Read item",
            body: "body read",
            isRead: true,
            url: "/rooms/n-read",
            createdAt: "2026-01-02T00:00:00.000Z",
         },
      ];

      const wrapper = mountNotificationProvider();
      await syncUi();

      await wrapper
         .get(
            'article.row-card-stub[data-title="Unread item"] button.row-card-open',
         )
         .trigger("click");
      expect(
         getFetchState("PATCH", "/api/notifications/:notificationId").execute,
      ).toHaveBeenCalledWith({
         params: { notificationId: "n-unread" },
         body: { isRead: true },
      });

      await wrapper
         .get(
            'article.row-card-stub[data-title="Read item"] button.row-card-menu[data-label="Mark as Unread"]',
         )
         .trigger("click");
      expect(
         getFetchState("PATCH", "/api/notifications/:notificationId").execute,
      ).toHaveBeenCalledWith({
         params: { notificationId: "n-read" },
         body: { isRead: false },
      });

      await wrapper
         .get(
            'article.row-card-stub[data-title="Unread item"] button.row-card-menu[data-label="Delete"]',
         )
         .trigger("click");
      expect(
         getFetchState("DELETE", "/api/notifications/:notificationId").execute,
      ).toHaveBeenCalledWith({
         params: { notificationId: "n-unread" },
      });

      await findButtonByText(wrapper, "Mark All as Read")!.trigger("click");
      expect(
         getFetchState("PATCH", "/api/notifications").execute,
      ).toHaveBeenCalledWith({
         body: { isRead: true },
      });
      expect(messageApi.create).toHaveBeenCalledWith(
         "All notifications marked as read",
      );

      await findButtonByText(wrapper, "Clear")!.trigger("click");
      expect(
         getFetchState("DELETE", "/api/notifications").execute,
      ).toHaveBeenCalled();
      expect(messageApi.create).toHaveBeenCalledWith(
         "All notifications cleared",
      );
   });

   it("shows mutation error messages when requests fail", async () => {
      seededNotifications = [
         {
            id: "n-1",
            title: "Unread item",
            body: "body",
            isRead: false,
            createdAt: "2026-01-01T00:00:00.000Z",
         },
      ];
      failNextByKey.set(
         "PATCH:/api/notifications/:notificationId",
         new Error("request failed"),
      );

      const wrapper = mountNotificationProvider();
      await syncUi();

      await wrapper.get("button.row-card-open").trigger("click");
      expect(messageApi.error).toHaveBeenCalledWith(
         "Failed to mark notification as read",
      );
   });

   it("reacts to socket realtime upsert/delete notification events", async () => {
      seededNotifications = [];
      const wrapper = mountNotificationProvider();
      await syncUi();

      expect(wrapper.findAll("article.row-card-stub")).toHaveLength(0);
      expect(wrapper.text()).toContain("You have no notifications.");

      activeSocket._emitServer("teacher:upsert_notification", {
         notification: {
            id: "n-1",
            title: "Older unread",
            body: "body 1",
            isRead: false,
            createdAt: "2026-01-01T00:00:00.000Z",
         },
      });
      activeSocket._emitServer("teacher:upsert_notification", {
         notification: {
            id: "n-2",
            title: "Newest read",
            body: "body 2",
            isRead: true,
            createdAt: "2026-01-03T00:00:00.000Z",
         },
      });
      await syncUi();

      const firstPass = wrapper
         .findAll("button.row-card-open")
         .map((node) => node.text());
      expect(firstPass).toEqual(["Newest read", "Older unread"]);
      expect(findButtonByText(wrapper, "Mark All as Read")?.exists()).toBe(
         true,
      );

      activeSocket._emitServer("teacher:upsert_notification", {
         notification: {
            id: "n-1",
            title: "Older now read",
            body: "body 1",
            isRead: true,
            createdAt: "2026-01-01T00:00:00.000Z",
         },
      });
      await syncUi();

      expect(wrapper.findAll("article.row-card-stub")).toHaveLength(2);
      expect(wrapper.text()).toContain("Older now read");
      expect(findButtonByText(wrapper, "Mark All as Read")).toBeUndefined();

      activeSocket._emitServer("teacher:delete_notification", {
         notification: { id: "n-2" },
      });
      await syncUi();
      expect(wrapper.findAll("article.row-card-stub")).toHaveLength(1);

      activeSocket._emitServer("teacher:delete_notifications", {
         notifications: [{ id: "n-1" }],
      });
      await syncUi();
      expect(wrapper.findAll("article.row-card-stub")).toHaveLength(0);
      expect(findButtonByText(wrapper, "Clear")).toBeUndefined();
   });

   it("reacts to socket realtime batch upsert notifications event", async () => {
      seededNotifications = [];
      const wrapper = mountNotificationProvider();
      await syncUi();

      expect(wrapper.findAll("article.row-card-stub")).toHaveLength(0);

      activeSocket._emitServer("teacher:upsert_notifications", {
         notifications: [
            {
               id: "n-batch-1",
               title: "Batch older",
               body: "body 1",
               isRead: false,
               createdAt: "2026-01-01T00:00:00.000Z",
            },
            {
               id: "n-batch-2",
               title: "Batch newer",
               body: "body 2",
               isRead: true,
               createdAt: "2026-01-03T00:00:00.000Z",
            },
         ],
      });
      await syncUi();

      const rows = wrapper.findAll("button.row-card-open").map((n) => n.text());
      expect(rows).toEqual(["Batch newer", "Batch older"]);
   });
});
