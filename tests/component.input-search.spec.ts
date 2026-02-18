import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, expect, it } from "vitest";
import InputSearch from "@/app/components/input-search.vue";

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
