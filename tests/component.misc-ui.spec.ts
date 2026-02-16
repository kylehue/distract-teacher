import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import ContentLoader from "@/app/components/content-loader.vue";
import InfoTooltip from "@/app/components/info-tooltip.vue";
import ThemeSwitch from "@/app/components/theme-switch.vue";
import RoomStatusTag from "@/app/components/room-status-tag.vue";
import Loader from "@/app/components/loader.vue";
import LogoutLoadingOverlay from "@/app/components/logout-loading-overlay.vue";
import { THEME_INJECTION_KEY } from "@/lib/injection-keys";

vi.mock("naive-ui", () => ({
   NText: defineComponent({
      name: "NText",
      setup(_, { slots }) {
         return () => h("span", slots.default?.());
      },
   }),
   NTooltip: defineComponent({
      name: "NTooltip",
      setup(_, { slots }) {
         return () => h("div", [slots.trigger?.(), slots.default?.()]);
      },
   }),
   NIcon: defineComponent({
      name: "NIcon",
      setup(_, { slots }) {
         return () => h("i", slots.default?.());
      },
   }),
   NSwitch: defineComponent({
      name: "NSwitch",
      props: { value: { type: Boolean, default: false } },
      emits: ["update-value"],
      setup(props, { emit }) {
         return () =>
            h("button", {
               type: "button",
               "data-is-dark": String(props.value),
               onClick: () => emit("update-value", !props.value),
            });
      },
   }),
   NTag: defineComponent({
      name: "NTag",
      props: { type: { type: String, default: "" } },
      setup(props, { slots }) {
         return () => h("span", { "data-type": props.type }, slots.default?.());
      },
   }),
   NCard: defineComponent({
      name: "NCard",
      setup(_, { slots }) {
         return () => h("section", slots.default?.());
      },
   }),
   useThemeVars: () => ({ textColor3: "#888" }),
}));

vi.mock("@phosphor-icons/vue", () => ({
   PhInfo: defineComponent({
      name: "PhInfo",
      props: { color: { type: String, default: "" } },
      setup(props) {
         return () => h("svg", { "data-color": props.color });
      },
   }),
}));

describe("Misc UI Components", () => {
   it("loader renders fallback and custom props", async () => {
      const w1 = mount(Loader);
      expect(w1.text()).toContain("Loading...");
      expect(w1.get("img").attributes("width")).toBe("48");

      const w2 = mount(Loader, { props: { size: 72, text: "Please wait" } });
      expect(w2.text()).toContain("Please wait");
      expect(w2.get("img").attributes("width")).toBe("72");
   });

   it("content loader renders nested loader", () => {
      const wrapper = mount(ContentLoader, {
         global: {
            stubs: { Loader: { template: "<div data-testid='loader'>loader</div>" } },
         },
      });
      expect(wrapper.get("[data-testid='loader']").exists()).toBe(true);
   });

   it("info tooltip renders slot and themed icon color", () => {
      const wrapper = mount(InfoTooltip, {
         slots: { default: "<p>tooltip body</p>" },
      });
      expect(wrapper.text()).toContain("tooltip body");
      expect(wrapper.get("svg").attributes("data-color")).toBe("#888");
   });

   it("theme switch toggles injected theme ref", async () => {
      const theme = ref<"light" | "dark">("light");
      const wrapper = mount(ThemeSwitch, {
         global: {
            provide: {
               [THEME_INJECTION_KEY as symbol]: theme,
            },
         },
      });

      expect(wrapper.get("button").attributes("data-is-dark")).toBe("false");
      await wrapper.get("button").trigger("click");
      await nextTick();
      expect(theme.value).toBe("dark");
   });

   it("room status tag updates for general and monitoring modes", async () => {
      const wrapper = mount(RoomStatusTag as any, {
         props: {
            room: { status: "monitoring" },
            type: "monitoring",
         },
      });

      expect(wrapper.text()).toContain("Monitoring");
      expect(wrapper.get('[data-type="warning"]').exists()).toBe(true);

      await wrapper.setProps({
         room: { status: "concluded" },
         type: "general",
      });
      expect(wrapper.text()).toContain("Concluded");
      expect(wrapper.get('[data-type="error"]').exists()).toBe(true);
   });

   it("logout overlay includes logging out indicator", () => {
      const wrapper = mount(LogoutLoadingOverlay, {
         global: {
            stubs: {
               Loader: { template: "<div>Logging out...</div>" },
            },
         },
      });
      expect(wrapper.text()).toContain("Logging out...");
   });
});
