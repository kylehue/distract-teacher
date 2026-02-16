import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it, vi } from "vitest";
import InputSearch from "@/app/components/input-search.vue";

vi.mock("naive-ui", () => ({
   NInput: defineComponent({
      name: "NInput",
      props: {
         value: { type: String, default: "" },
         placeholder: { type: String, default: "" },
         class: { type: String, default: "" },
      },
      emits: ["update:value", "focus", "blur", "keydown.enter", "clear"],
      setup(props, { emit, slots }) {
         return () =>
            h("div", [
               slots.prefix?.(),
               h("input", {
                  value: props.value,
                  placeholder: props.placeholder,
                  class: props.class,
                  onInput: (e: Event) =>
                     emit("update:value", (e.target as HTMLInputElement).value),
                  onFocus: () => emit("focus"),
                  onBlur: () => emit("blur"),
                  onKeydown: (e: KeyboardEvent) => {
                     if (e.key === "Enter") emit("keydown.enter");
                  },
               }),
               h(
                  "button",
                  {
                     type: "button",
                     onClick: () => emit("clear"),
                  },
                  "clear",
               ),
            ]);
      },
   }),
   NPopselect: defineComponent({
      name: "NPopselect",
      props: {
         show: { type: Boolean, default: false },
         options: { type: Array, default: () => [] },
      },
      emits: ["update:show", "update:value"],
      setup(_, { slots }) {
         return () => h("div", slots.default?.());
      },
   }),
}));

vi.mock("@phosphor-icons/vue", () => ({
   PhMagnifyingGlass: defineComponent({ name: "PhMagnifyingGlass", setup: () => () => h("i") }),
}));

describe("InputSearch", () => {
   it("emits live search results and clears search on empty query", async () => {
      const docs = [
         { id: "s1", name: "Alice", section: "A" },
         { id: "s2", name: "Bob", section: "B" },
      ];
      const wrapper = mount(InputSearch as any, {
         props: {
            documents: docs,
            fields: ["name", "section"],
            idField: "id",
            labelField: "name",
            searchOnInput: true,
         },
      });

      const input = wrapper.get("input");
      await input.setValue("Ali");
      await nextTick();

      const searchEvents = wrapper.emitted("search") ?? [];
      expect(searchEvents[searchEvents.length - 1][0]).toEqual(["s1"]);

      await input.setValue("");
      await nextTick();
      const finalSearchEvents = wrapper.emitted("search") ?? [];
      expect(finalSearchEvents[finalSearchEvents.length - 1][0]).toEqual([]);
   });

   it("selecting an option emits select and narrows search to selected id", async () => {
      const docs = [
         { id: "s1", name: "Alice", section: "A" },
         { id: "s2", name: "Bob", section: "B" },
      ];
      const wrapper = mount(InputSearch as any, {
         props: {
            documents: docs,
            fields: ["name", "section"],
            idField: "id",
            labelField: "name",
         },
      });

      await wrapper.get("input").setValue("Al");
      await nextTick();

      const pop = wrapper.getComponent({ name: "NPopselect" });
      pop.vm.$emit("update:value", "s1");
      await nextTick();

      expect(wrapper.emitted("select")?.[0]?.[0]).toBe("s1");
      const searchEvents = wrapper.emitted("search") ?? [];
      expect(searchEvents[searchEvents.length - 1][0]).toEqual(["s1"]);
      expect((wrapper.get("input").element as HTMLInputElement).value).toBe(
         "Alice",
      );
   });
});
