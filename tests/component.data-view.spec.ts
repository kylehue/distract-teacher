import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick } from "vue";
import DataView from "@/app/components/data-view.vue";
import { naiveUiMockState } from "./support/naive-ui-mock";

const scrollToSpy = naiveUiMockState.scrollbar.scrollTo;

vi.mock("@/app/components/input-search.vue", () => ({
   default: defineComponent({
      name: "InputSearch",
      emits: ["search", "select", "update:searchQuery"],
      setup: () => () => h("div", { class: "input-search-stub" }),
   }),
}));

vi.mock("@/app/components/loader.vue", () => ({
   default: defineComponent({
      name: "Loader",
      setup: () => () => h("div", { class: "loader-stub" }, "loading"),
   }),
}));

function makeItems() {
   return [
      { id: "1", name: "Alpha", status: "open", score: 30 },
      { id: "2", name: "Beta", status: "closed", score: 10 },
      { id: "3", name: "Gamma", status: "open", score: 20 },
      { id: "4", name: "Delta", status: "closed", score: 40 },
   ];
}

function rowIds(wrapper: any) {
   return wrapper.findAll(".row").map((node: any) => node.text());
}

describe("DataView", () => {
   beforeEach(() => {
      scrollToSpy.mockReset();
   });

   it("applies default filters and sorting before pagination", async () => {
      const wrapper = mount(DataView as any, {
         props: {
            items: makeItems(),
            pageSize: 1,
            sort: {
               options: [
                  {
                     key: "score",
                     label: "Score",
                     compare: (left: any, right: any) =>
                        left.score - right.score,
                  },
               ],
               defaultRules: [{ key: "score", direction: "asc" }],
            },
            columnFilter: {
               columns: [
                  {
                     key: "status",
                     label: "Status",
                     options: [
                        { label: "Open", value: "open" },
                        { label: "Closed", value: "closed" },
                     ],
                  },
               ],
               defaultRules: [{ key: "status", values: ["open"] }],
            },
         },
         slots: {
            item: ({ item }: any) => h("div", { class: "row" }, item.id),
         },
      });

      expect(rowIds(wrapper)).toEqual(["3"]);
      await wrapper.get("button.next-page").trigger("click");
      expect(rowIds(wrapper)).toEqual(["1"]);
   });

   it("ignores non-token filter keys and toggles token filters on repeated click", async () => {
      const wrapper = mount(DataView as any, {
         props: {
            items: makeItems(),
            columnFilter: {
               columns: [
                  {
                     key: "status",
                     label: "Status",
                     options: [
                        { label: "Open", value: "open" },
                        { label: "Closed", value: "closed" },
                     ],
                  },
               ],
            },
         },
         slots: {
            item: ({ item }: any) => h("div", { class: "row" }, item.id),
         },
      });

      expect(rowIds(wrapper)).toEqual(["1", "2", "3", "4"]);

      await wrapper
         .get('button.dropdown-option[data-key="group:status"]')
         .trigger("click");
      expect(rowIds(wrapper)).toEqual(["1", "2", "3", "4"]);

      await wrapper
         .get('button.dropdown-option[data-key="status::%22closed%22"]')
         .trigger("click");
      expect(rowIds(wrapper)).toEqual(["2", "4"]);

      await wrapper
         .get('button.dropdown-option[data-key="status::%22closed%22"]')
         .trigger("click");
      expect(rowIds(wrapper)).toEqual(["1", "2", "3", "4"]);
   });

   it("keeps current page when sort rules change and scrolls to top", async () => {
      const wrapper = mount(DataView as any, {
         props: {
            items: makeItems(),
            pageSize: 1,
            sort: {
               options: [
                  {
                     key: "score",
                     label: "Score",
                     compare: (left: any, right: any) =>
                        left.score - right.score,
                  },
               ],
            },
         },
         slots: {
            item: ({ item }: any) => h("div", { class: "row" }, item.id),
         },
      });

      expect(rowIds(wrapper)).toEqual(["1"]);
      await wrapper.get("button.next-page").trigger("click");
      expect(rowIds(wrapper)).toEqual(["2"]);
      expect(scrollToSpy).toHaveBeenCalledWith(0, 0);

      wrapper
         .getComponent({ name: "NPopselect" })
         .vm.$emit("update:value", ["score"]);
      await nextTick();
      expect(rowIds(wrapper)).toEqual(["3"]);
   });

   it("keeps sort direction when selected sort keys are re-applied", async () => {
      const wrapper = mount(DataView as any, {
         props: {
            items: makeItems(),
            sort: {
               options: [
                  {
                     key: "score",
                     label: "Score",
                     compare: (left: any, right: any) =>
                        left.score - right.score,
                  },
               ],
               defaultRules: [{ key: "score", direction: "asc" }],
            },
         },
         slots: {
            item: ({ item }: any) => h("div", { class: "row" }, item.id),
         },
      });

      expect(rowIds(wrapper)[0]).toBe("2");

      const sortToggleButton = wrapper
         .findAll("button")
         .find((button) => button.text().includes("Score"));
      expect(sortToggleButton).toBeDefined();
      await sortToggleButton!.trigger("click");
      expect(rowIds(wrapper)[0]).toBe("4");

      wrapper
         .getComponent({ name: "NPopselect" })
         .vm.$emit("update:value", ["score"]);
      await nextTick();
      expect(rowIds(wrapper)[0]).toBe("4");
   });

   it("clears selected search id when search results no longer include it", async () => {
      const wrapper = mount(DataView as any, {
         props: {
            items: makeItems(),
            search: {
               fields: ["name"],
               idField: "id",
               labelField: "name",
            },
         },
         slots: {
            item: ({ item }: any) => h("div", { class: "row" }, item.id),
         },
      });

      const inputSearch = wrapper.getComponent({ name: "InputSearch" });
      inputSearch.vm.$emit("select", "2");
      await nextTick();
      expect(rowIds(wrapper)).toEqual(["2"]);

      inputSearch.vm.$emit("update:searchQuery", "a");
      inputSearch.vm.$emit("search", ["1", "3"]);
      await nextTick();
      expect(rowIds(wrapper)).toEqual(["1", "3"]);
   });

   it("clamps current page when items shrink and active page becomes invalid", async () => {
      const wrapper = mount(DataView as any, {
         props: {
            items: makeItems(),
            pageSize: 2,
         },
         slots: {
            item: ({ item }: any) => h("div", { class: "row" }, item.id),
         },
      });

      expect(rowIds(wrapper)).toEqual(["1", "2"]);
      await wrapper.get("button.next-page").trigger("click");
      expect(rowIds(wrapper)).toEqual(["3", "4"]);

      await wrapper.setProps({
         items: [{ id: "1", name: "Alpha", status: "open", score: 30 }],
      });
      await nextTick();
      expect(rowIds(wrapper)).toEqual(["1"]);
   });

   it("keeps user-selected filters when default filter rules change later", async () => {
      const wrapper = mount(DataView as any, {
         props: {
            items: makeItems(),
            columnFilter: {
               columns: [
                  {
                     key: "status",
                     label: "Status",
                     options: [
                        { label: "Open", value: "open" },
                        { label: "Closed", value: "closed" },
                     ],
                  },
               ],
               defaultRules: [{ key: "status", values: ["open"] }],
            },
         },
         slots: {
            item: ({ item }: any) => h("div", { class: "row" }, item.id),
         },
      });

      expect(rowIds(wrapper)).toEqual(["1", "3"]);

      await wrapper
         .get('button.dropdown-option[data-key="status::%22closed%22"]')
         .trigger("click");
      expect(rowIds(wrapper)).toEqual(["1", "2", "3", "4"]);

      await wrapper.setProps({
         columnFilter: {
            columns: [
               {
                  key: "status",
                  label: "Status",
                  options: [
                     { label: "Open", value: "open" },
                     { label: "Closed", value: "closed" },
                  ],
               },
            ],
            defaultRules: [{ key: "status", values: ["closed"] }],
         },
      });
      await nextTick();

      expect(rowIds(wrapper)).toEqual(["1", "2", "3", "4"]);
   });

   it("treats null and empty-string filter tokens as distinct values", async () => {
      const wrapper = mount(DataView as any, {
         props: {
            items: [
               { id: "a", label: "null", value: null },
               { id: "b", label: "empty", value: "" },
               { id: "c", label: "text", value: "x" },
            ],
            columnFilter: {
               columns: [
                  {
                     key: "value",
                     label: "Value",
                  },
               ],
            },
         },
         slots: {
            item: ({ item }: any) => h("div", { class: "row" }, item.id),
         },
      });

      expect(wrapper.find('[data-key="value::null"]').exists()).toBe(true);
      expect(wrapper.find('[data-key="value::%22%22"]').exists()).toBe(true);

      await wrapper.get('[data-key="value::null"]').trigger("click");
      expect(rowIds(wrapper)).toEqual(["a"]);

      await wrapper.get('[data-key="value::%22%22"]').trigger("click");
      expect(rowIds(wrapper)).toEqual(["a", "b"]);
   });

   it("removes stale sort rules when sort options no longer include that key", async () => {
      const wrapper = mount(DataView as any, {
         props: {
            items: makeItems(),
            sort: {
               options: [
                  {
                     key: "score",
                     label: "Score",
                     compare: (left: any, right: any) =>
                        left.score - right.score,
                  },
               ],
               defaultRules: [{ key: "score", direction: "asc" }],
            },
         },
         slots: {
            item: ({ item }: any) => h("div", { class: "row" }, item.id),
         },
      });

      expect(rowIds(wrapper)[0]).toBe("2");

      await wrapper.setProps({
         sort: {
            options: [
               {
                  key: "name",
                  label: "Name",
                  compare: (left: any, right: any) =>
                     left.name.localeCompare(right.name),
               },
            ],
         },
      });
      await nextTick();

      expect(rowIds(wrapper)[0]).toBe("1");
   });
});
