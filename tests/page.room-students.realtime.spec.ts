import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import RoomStudentsPage from "@/app/pages/dashboard/room/students.vue";
import {
   IS_LOADING_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_INJECTION_KEY,
} from "@/lib/injection-keys";

const StudentsViewStub = defineComponent({
   name: "StudentsView",
   props: {
      students: { type: Array, default: () => [] },
      room: { type: Object, default: null },
      loading: { type: Boolean, default: false },
      showJoinRequests: { type: Boolean, default: false },
   },
   setup(props) {
      return () =>
         h("div", {
            "data-testid": "students-view",
            "data-room-id": String((props.room as any)?.id ?? ""),
            "data-room-status": String((props.room as any)?.status ?? ""),
            "data-loading": String(props.loading),
            "data-show-join-requests": String(props.showJoinRequests),
            "data-student-ids": (props.students as any[])
               .map((student: any) => student.id)
               .join(","),
         });
   },
});

describe("Dashboard Room Students Page", () => {
   it("passes injected room, loading, and students data to StudentsView", async () => {
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
               StudentsView: StudentsViewStub,
            },
         },
      });

      const view = wrapper.get('[data-testid="students-view"]');
      expect(view.attributes("data-room-id")).toBe("r1");
      expect(view.attributes("data-room-status")).toBe("monitoring");
      expect(view.attributes("data-loading")).toBe("false");
      expect(view.attributes("data-show-join-requests")).toBe("true");
      expect(view.attributes("data-student-ids")).toBe("s1,s2");

      allStudents.value = [
         ...allStudents.value,
         { id: "s3", name: "Cara", permitted: true, active: false } as any,
      ];
      await nextTick();
      expect(
         wrapper
            .get('[data-testid="students-view"]')
            .attributes("data-student-ids"),
      ).toBe("s1,s2,s3");
   });

   it("still renders StudentsView when room is concluded", () => {
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
               StudentsView: StudentsViewStub,
            },
         },
      });

      const view = wrapper.get('[data-testid="students-view"]');
      expect(view.attributes("data-room-status")).toBe("concluded");
      expect(view.attributes("data-show-join-requests")).toBe("true");
      expect(view.attributes("data-student-ids")).toBe("s1,s2");
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
               StudentsView: StudentsViewStub,
            },
         },
      });

      expect(wrapper.text()).toContain("No room");
      expect(wrapper.find('[data-testid="students-view"]').exists()).toBe(
         false,
      );
   });
});
