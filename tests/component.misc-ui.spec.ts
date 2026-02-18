import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick, ref } from "vue";
import ContentLoader from "@/app/components/content-loader.vue";
import InfoTooltip from "@/app/components/info-tooltip.vue";
import ThemeSwitch from "@/app/components/theme-switch.vue";
import RoomStatusTag from "@/app/components/room-status-tag.vue";
import Loader from "@/app/components/loader.vue";
import LogoutLoadingOverlay from "@/app/components/logout-loading-overlay.vue";
import { THEME_INJECTION_KEY } from "@/lib/injection-keys";

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
            stubs: {
               Loader: { template: "<div data-testid='loader'>loader</div>" },
            },
         },
      });
      expect((wrapper.get("[data-testid='loader']") as any).exists()).toBe(
         true,
      );
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
      expect((wrapper.get('[data-type="warning"]') as any).exists()).toBe(true);

      await wrapper.setProps({
         room: { status: "concluded" },
         type: "general",
      });
      expect(wrapper.text()).toContain("Concluded");
      expect((wrapper.get('[data-type="error"]') as any).exists()).toBe(true);
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
