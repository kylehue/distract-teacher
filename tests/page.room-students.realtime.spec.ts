import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import RoomStudentsPage from "@/app/pages/dashboard/room/students.vue";
import {
   IS_LOADING_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_INJECTION_KEY,
} from "@/lib/injection-keys";

const filtersSpy = vi.fn();

const StudentsTableStub = defineComponent({
   name: "StudentsTable",
   props: {
      students: { type: Array, default: () => [] },
   },
   setup(props, { expose }) {
      expose({
         table: {
            filters: filtersSpy,
         },
      });

      return () =>
         h(
            "div",
            {
               "data-testid": "students-table",
               "data-count": String((props.students as any[]).length),
            },
            (props.students as any[]).map((s: any) => s.id).join(","),
         );
   },
});

const InputSearchStub = defineComponent({
   name: "InputSearch",
   emits: ["search"],
   setup(_, { emit }) {
      return () =>
         h(
            "button",
            {
               type: "button",
               "data-testid": "trigger-search",
               onClick: () => emit("search", ["s2"]),
            },
            "search",
         );
   },
});

describe("Dashboard Room Students Page", () => {
   it("filters students, updates join-request count, and passes search filters to table", async () => {
      const allStudents = ref([
         { id: "s1", name: "Alice", permitted: true, active: true },
         { id: "s2", name: "Bob", permitted: false, active: true },
      ] as any[]);

      const wrapper = mount(RoomStudentsPage, {
         global: {
            provide: {
               [ROOM_INJECTION_KEY as symbol]: ref({
                  id: "r1",
                  status: "monitoring",
               }),
               [IS_LOADING_INJECTION_KEY as symbol]: ref(false),
               [STUDENTS_INJECTION_KEY as symbol]: allStudents,
            },
            stubs: {
               InputSearch: InputSearchStub,
               StudentsTable: StudentsTableStub,
            },
         },
      });

      const table = wrapper.get('[data-testid="students-table"]');
      expect(table.attributes("data-count")).toBe("1");
      expect(wrapper.text()).toContain("1");

      await wrapper.get("button[data-checked='false']").trigger("click");
      await nextTick();
      expect(
         wrapper.get('[data-testid="students-table"]').attributes("data-count"),
      ).toBe("2");

      await wrapper.get('[data-testid="trigger-search"]').trigger("click");
      expect(filtersSpy).toHaveBeenCalledWith({ name: ["s2"] });
   });

   it("hides join-request controls for concluded rooms", () => {
      const wrapper = mount(RoomStudentsPage, {
         global: {
            provide: {
               [ROOM_INJECTION_KEY as symbol]: ref({
                  id: "r1",
                  status: "concluded",
               }),
               [IS_LOADING_INJECTION_KEY as symbol]: ref(false),
               [STUDENTS_INJECTION_KEY as symbol]: ref([
                  { id: "s1", name: "Alice", permitted: true, active: true },
                  { id: "s2", name: "Bob", permitted: false, active: true },
               ] as any[]),
            },
            stubs: {
               InputSearch: InputSearchStub,
               StudentsTable: StudentsTableStub,
            },
         },
      });

      expect(wrapper.find("button[data-checked='false']").exists()).toBe(false);
      expect(
         wrapper
            .find('[data-testid="students-table"]')
            .attributes("data-count"),
      ).toBe("1");
   });

   it("renders no-room state when room injection is null", () => {
      const wrapper = mount(RoomStudentsPage, {
         global: {
            provide: {
               [ROOM_INJECTION_KEY as symbol]: ref(null),
               [IS_LOADING_INJECTION_KEY as symbol]: ref(false),
               [STUDENTS_INJECTION_KEY as symbol]: ref([] as any[]),
            },
            stubs: {
               InputSearch: InputSearchStub,
               StudentsTable: StudentsTableStub,
            },
         },
      });

      expect(wrapper.text()).toContain("No room");
   });
});
