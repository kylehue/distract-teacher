import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { computed, defineComponent, h, nextTick, ref } from "vue";
import { createPinia, setActivePinia } from "pinia";
import RoomStudentsPage from "@/app/pages/dashboard/room/students.vue";
import {
   IS_LOADING_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_INJECTION_KEY,
} from "@/lib/injection-keys";
import { useStore } from "@/app/composables/use-store";

const socketHandlers = new Map<string, Function>();
const socketApi = {
   on: vi.fn((event: string, handler: Function) => {
      socketHandlers.set(event, handler);
   }),
   emit: vi.fn(),
   socket: {
      connected: false,
      connect: vi.fn(),
      disconnect: vi.fn(),
   },
};

vi.mock("@/app/composables/use-socket", () => ({
   useSocket: () => socketApi,
}));

vi.mock("@/app/composables/use-fetch", () => ({
   useFetch: () => ({
      data: null as any,
      isLoading: false,
      execute: vi.fn(async () => ({ data: {} })),
   }),
}));

const StudentsViewStub = defineComponent({
   name: "StudentsView",
   props: {
      students: { type: Array, default: () => [] },
      room: { type: Object, default: null },
      loading: { type: Boolean, default: false },
   },
   setup(props) {
      return () =>
         h("div", {
            "data-testid": "students-view",
            "data-room-id": String((props.room as any)?.id ?? ""),
            "data-room-status": String((props.room as any)?.status ?? ""),
            "data-loading": String(props.loading),
            "data-student-ids": (props.students as any[])
               .map((student: any) => student.id)
               .join(","),
         });
   },
});

function createStudent(id: string, roomId: string, overrides: Record<string, any> = {}) {
   return {
      id,
      roomId,
      uuid: `uuid-${id}`,
      name: `Student ${id}`,
      timeJoined: "2026-01-01T00:00:00.000Z",
      active: true,
      permitted: true,
      monitorLogCount: 0,
      createdAt: "2026-01-01T00:00:00.000Z",
      ...overrides,
   } as any;
}

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

describe("Dashboard Room Students Page (real-time via store sockets)", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      socketHandlers.clear();
      setActivePinia(createPinia());
   });

   function mountStudentsPageFromStore() {
      const store = useStore();
      const roomId = "r1";

      store.upsertRooms([
         {
            id: roomId,
            teacherAccountId: "t1",
            title: "Realtime Room",
            code: "RM01",
            studentCount: 1,
            studentCapacity: 30,
            status: "monitoring",
            evidenceWarningLevel: "moderate",
            enablePunishments: true,
            allowLateStudents: true,
            joinConfirmation: true,
            createdAt: "2026-01-01T00:00:00.000Z",
         } as any,
      ]);
      store.upsertStudents([createStudent("s1", roomId, { name: "Alice" })]);

      const wrapper = mount(RoomStudentsPage, {
         global: {
            provide: {
               [ROOM_INJECTION_KEY as symbol]: computed(
                  () => store.allRooms.get(roomId) ?? null,
               ),
               [IS_LOADING_INJECTION_KEY as symbol]: ref(false),
               [STUDENTS_INJECTION_KEY as symbol]: computed(() =>
                  Array.from(
                     (
                        store.studentsGroupedByRoomId.get(roomId) ??
                        new Map<string, any>()
                     ).values(),
                  ),
               ),
            },
            stubs: {
               StudentsView: StudentsViewStub,
            },
         },
      });

      return { wrapper, store };
   }

   it("adds a student row when socket upserts a student", async () => {
      const { wrapper } = mountStudentsPageFromStore();
      await nextTick();

      expect(
         wrapper.get('[data-testid="students-view"]').attributes("data-student-ids"),
      ).toBe("s1");

      socketHandlers.get("teacher:upsert_student")?.({
         student: createStudent("s2", "r1", { name: "Bob" }),
      });
      await nextTick();

      expect(
         wrapper.get('[data-testid="students-view"]').attributes("data-student-ids"),
      ).toBe("s1,s2");
   });

   it("removes a student row when socket deletes a student", async () => {
      const { wrapper, store } = mountStudentsPageFromStore();
      store.upsertStudents([createStudent("s2", "r1", { name: "Bob" })]);
      await nextTick();

      expect(
         wrapper.get('[data-testid="students-view"]').attributes("data-student-ids"),
      ).toBe("s1,s2");

      socketHandlers.get("teacher:delete_student")?.({
         student: { id: "s1" },
      });
      await nextTick();

      expect(
         wrapper.get('[data-testid="students-view"]').attributes("data-student-ids"),
      ).toBe("s2");
   });
});
