import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it, vi } from "vitest";
import RowCard from "@/app/components/row-card.vue";

vi.mock("naive-ui", () => ({
   NCard: defineComponent({
      name: "NCard",
      setup(_, { slots }) {
         return () => h("article", { class: "n-card" }, slots.default?.());
      },
   }),
   NButton: defineComponent({
      name: "NButton",
      emits: ["click"],
      setup(_, { slots, emit }) {
         return () =>
            h(
               "button",
               { type: "button", onClick: () => emit("click") },
               slots.default?.(),
            );
      },
   }),
   NText: defineComponent({
      name: "NText",
      setup(_, { slots }) {
         return () => h("span", slots.default?.());
      },
   }),
   NTag: defineComponent({
      name: "NTag",
      props: {
         type: { type: String, default: undefined },
         size: { type: String, default: undefined },
         bordered: { type: Boolean, default: undefined },
         round: { type: Boolean, default: undefined },
      },
      setup(props, { slots }) {
         return () =>
            h(
               "span",
               {
                  class: "tag",
                  "data-type": props.type ?? "",
                  "data-size": props.size ?? "",
                  "data-bordered": String(props.bordered ?? false),
                  "data-round": String(props.round ?? false),
               },
               slots.default?.(),
            );
      },
   }),
   NIcon: defineComponent({
      name: "NIcon",
      props: {
         size: { type: Number, default: undefined },
      },
      setup(props, { slots }) {
         return () =>
            h(
               "i",
               {
                  "data-size": String(props.size ?? ""),
               },
               slots.default?.(),
            );
      },
   }),
   NDropdown: defineComponent({
      name: "NDropdown",
      props: {
         options: { type: Array, default: () => [] },
         renderLabel: { type: Function, default: undefined },
      },
      emits: ["select"],
      setup(props, { slots, emit }) {
         const flattenOptions = (options: any[]): any[] =>
            options.flatMap((option) => [
               option,
               ...(option.children ? flattenOptions(option.children) : []),
            ]);

         return () =>
            h("div", { class: "dropdown" }, [
               slots.default?.(),
               ...flattenOptions(props.options as any[])
                  .filter((option) => option.type !== "divider")
                  .map((option) =>
                     h(
                        "button",
                        {
                           class: "menu-item",
                           "data-key": String(option.key),
                           onClick: () => {
                              if (option.disabled) return;
                              emit("select", option.key, option);
                           },
                        },
                        props.renderLabel
                           ? [(props.renderLabel as any)(option)]
                           : [String(option.label ?? "")],
                     ),
                  ),
            ]);
      },
   }),
}));

vi.mock("vue-router", () => ({
   RouterLink: defineComponent({
      name: "RouterLink",
      props: {
         to: { type: [String, Object], required: true },
         class: { type: String, default: "" },
      },
      setup(props, { slots }) {
         const toValue =
            typeof props.to === "string" ? props.to : JSON.stringify(props.to);
         return () =>
            h(
               "a",
               { class: props.class, "data-to": toValue },
               slots.default?.(),
            );
      },
   }),
}));

vi.mock("@phosphor-icons/vue", () => ({
   PhDotsThreeVertical: defineComponent({
      name: "PhDotsThreeVertical",
      setup: () => () => h("i"),
   }),
}));

describe("RowCard", () => {
   it("uses slots to override title/content/footer and tags rendering", async () => {
      const wrapper = mount(RowCard as any, {
         props: {
            title: "prop title",
            content: "prop content",
            footer: "prop footer",
            tags: ["from-prop"],
         },
         slots: {
            title: () => h("span", { class: "slot-title" }, "slot title"),
            content: () => h("span", { class: "slot-content" }, "slot content"),
            footer: () => h("span", { class: "slot-footer" }, "slot footer"),
            tags: ({ tags }: any) =>
               h("span", { class: "slot-tags" }, `slot tags:${tags.length}`),
         },
         global: {
            stubs: {
               teleport: false,
            },
         },
      });

      await nextTick();
      expect(wrapper.text()).toContain("slot title");
      expect(wrapper.text()).toContain("slot content");
      expect(wrapper.text()).toContain("slot footer");
      expect(wrapper.text()).toContain("slot tags:1");
      expect(wrapper.text()).not.toContain("prop title");
      expect(wrapper.text()).not.toContain("prop content");
      expect(wrapper.text()).not.toContain("prop footer");
      expect(wrapper.text()).not.toContain("from-prop");
   });

   it("normalizes string tags and keeps explicit object tag options", async () => {
      const wrapper = mount(RowCard as any, {
         props: {
            tags: [
               "Unread",
               {
                  label: "Important",
                  type: "info",
                  size: "large",
                  bordered: true,
                  round: true,
               },
            ],
         },
         global: {
            stubs: {
               teleport: false,
            },
         },
      });

      await nextTick();
      const tags = wrapper.findAll(".tag");
      expect(tags).toHaveLength(2);

      expect(tags[0].text()).toBe("Unread");
      expect(tags[0].attributes("data-size")).toBe("small");
      expect(tags[0].attributes("data-bordered")).toBe("false");
      expect(tags[0].attributes("data-round")).toBe("false");

      expect(tags[1].text()).toBe("Important");
      expect(tags[1].attributes("data-type")).toBe("info");
      expect(tags[1].attributes("data-size")).toBe("large");
      expect(tags[1].attributes("data-bordered")).toBe("true");
      expect(tags[1].attributes("data-round")).toBe("true");
   });

   it("teleports tags to the after-title target when configured", async () => {
      const wrapper = mount(RowCard as any, {
         props: {
            title: "Title",
            content: "Body",
            tags: ["Unread"],
            tagsPlacement: "after-title",
         },
         global: {
            stubs: {
               teleport: false,
            },
         },
      });

      await nextTick();
      const targets = wrapper.findAll("div.flex.flex-wrap.items-center.gap-2");
      expect(targets).toHaveLength(2);
      expect(targets[0].text()).toContain("Unread");
      expect(targets[1].text()).not.toContain("Unread");
   });

   it("teleports tags to the below-content target by default", async () => {
      const wrapper = mount(RowCard as any, {
         props: {
            title: "Title",
            content: "Body",
            tags: ["Unread"],
         },
         global: {
            stubs: {
               teleport: false,
            },
         },
      });

      await nextTick();
      const targets = wrapper.findAll("div.flex.flex-wrap.items-center.gap-2");
      expect(targets).toHaveLength(2);
      expect(targets[0].text()).not.toContain("Unread");
      expect(targets[1].text()).toContain("Unread");
   });

   it("hides dropdown trigger when menu options are empty", () => {
      const wrapper = mount(RowCard as any, {
         props: {
            title: "No menu",
            menuOptions: [],
         },
      });

      expect(wrapper.find(".dropdown").exists()).toBe(false);
   });

   it("renders router links for to values and resolves fallback keys", async () => {
      const selectSpy = vi.fn();
      const disabledSpy = vi.fn();
      const wrapper = mount(RowCard as any, {
         props: {
            menuOptions: [
               {
                  label: "route object",
                  to: { name: "room", params: { id: "abc" } },
                  onSelect: selectSpy,
               },
               {
                  label: "route string",
                  to: "/dashboard",
               },
               {
                  label: "no key fallback",
               },
               {
                  label: "disabled",
                  key: "disabled-key",
                  disabled: true,
                  onSelect: disabledSpy,
               },
               {
                  label: "nested",
                  key: "nested-group",
                  children: [
                     {
                        label: "nested child",
                        key: "child-key",
                        onSelect: selectSpy,
                     },
                  ],
               },
            ],
         },
         global: {
            stubs: {
               teleport: false,
            },
         },
      });

      expect(
         wrapper
            .find(
               '[data-to="{\\"name\\":\\"room\\",\\"params\\":{\\"id\\":\\"abc\\"}}"]',
            )
            .exists(),
      ).toBe(true);
      expect(wrapper.find('[data-key="/dashboard"]').exists()).toBe(true);
      expect(wrapper.find('[data-key="menu-2"]').exists()).toBe(true);

      await wrapper
         .get('button.menu-item[data-key="child-key"]')
         .trigger("click");
      await wrapper.get('button.menu-item[data-key="menu-2"]').trigger("click");
      await wrapper
         .get('button.menu-item[data-key="disabled-key"]')
         .trigger("click");

      expect(selectSpy).toHaveBeenCalledWith("child-key");
      expect(disabledSpy).not.toHaveBeenCalled();
      expect(wrapper.emitted("menu-select")?.map((event) => event[0])).toEqual([
         "child-key",
         "menu-2",
      ]);
   });
});
