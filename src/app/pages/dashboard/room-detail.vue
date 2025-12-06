<template>
  <div>
    <div
      style="display: flex; align-items: center; gap: 16px; margin-bottom: 32px"
    >
      <RouterLink
        to="/dashboard/rooms"
        style="
          color: #0ea5e9;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
        "
      >
        ← Back to Rooms
      </RouterLink>
      <h1 style="font-size: 32px; font-weight: bold">
        {{ room?.name || "Room Not Found" }}
      </h1>
    </div>

    <div v-if="!room" style="text-align: center; padding: 32px 0; color: #999">
      This room does not exist.
    </div>

    <div v-else style="display: flex; flex-direction: column; gap: 24px">
      <!-- Room Details -->
      <n-card>
        <template #header>
          <div style="font-size: 20px; font-weight: bold">Room Details</div>
        </template>

        <n-grid :cols="2" :x-gap="16" :y-gap="16">
          <n-gi>
            <div>
              <p style="color: #999; font-size: 14px">Subject</p>
              <p style="font-size: 16px; font-weight: 500">
                {{ room.subject }}
              </p>
            </div>
          </n-gi>
          <n-gi>
            <div>
              <p style="color: #999; font-size: 14px">Room Code</p>
              <p style="font-size: 16px; font-weight: 500">{{ room.id }}</p>
            </div>
          </n-gi>
          <n-gi span="2">
            <div>
              <p style="color: #999; font-size: 14px">Description</p>
              <p style="font-size: 16px">{{ room.description }}</p>
            </div>
          </n-gi>
        </n-grid>
      </n-card>

      <!-- Students -->
      <n-card>
        <template #header>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
            "
          >
            <div style="font-size: 20px; font-weight: bold">
              Students ({{ room.students?.length || 0 }})
            </div>
            <n-button
              type="primary"
              @click="showAddStudentModal = true"
              size="small"
            >
              + Add Student
            </n-button>
          </div>
        </template>

        <div
          v-if="!room.students || room.students.length === 0"
          style="text-align: center; padding: 24px 0; color: #999"
        >
          No students in this room yet.
        </div>

        <div v-else style="display: flex; flex-direction: column; gap: 8px">
          <div
            v-for="(student, index) in room.students"
            :key="index"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 12px;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 4px;
            "
          >
            <div>
              <p style="font-weight: 500">{{ student.name }}</p>
              <p style="font-size: 14px; color: #999">{{ student.email }}</p>
            </div>
            <n-button type="error" size="small" @click="removeStudent(index)">
              Remove
            </n-button>
          </div>
        </div>
      </n-card>

      <!-- Add Student Modal -->
      <n-modal
        :show="showAddStudentModal"
        preset="dialog"
        title="Add Student"
        positive-text="Add"
        negative-text="Cancel"
        @update:show="showAddStudentModal = $event"
        @positive="addStudent"
      >
        <n-form-item label="Student Name">
          <n-input
            v-model="newStudent.name"
            type="text"
            placeholder="Enter student name"
          />
        </n-form-item>

        <n-form-item label="Email">
          <n-input
            v-model="newStudent.email"
            placeholder="Enter student email"
          />
        </n-form-item>
      </n-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  NCard,
  NGrid,
  NGi,
  NButton,
  NModal,
  NForm,
  NFormItem,
  NInput,
} from "naive-ui";

const route = useRoute();
const room = ref<any>(null);
const showAddStudentModal = ref(false);
const newStudent = ref({ name: "", email: "" });

onMounted(() => {
  loadRoom();
});

const loadRoom = () => {
  const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  room.value = rooms.find((r: any) => r.id === route.params.id);
};

const addStudent = () => {
  if (!newStudent.value.name || !newStudent.value.email) {
    alert("Please fill in all fields");
    return;
  }

  if (!room.value.students) {
    room.value.students = [];
  }

  room.value.students.push({
    name: newStudent.value.name,
    email: newStudent.value.email,
  });

  // Save to localStorage
  const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  const index = rooms.findIndex((r: any) => r.id === room.value.id);
  if (index !== -1) {
    rooms[index] = room.value;
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }

  newStudent.value = { name: "", email: "" };
  showAddStudentModal.value = false;
};

const removeStudent = (index: number) => {
  if (confirm("Remove this student?")) {
    room.value.students.splice(index, 1);

    const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
    const roomIndex = rooms.findIndex((r: any) => r.id === room.value.id);
    if (roomIndex !== -1) {
      rooms[roomIndex] = room.value;
      localStorage.setItem("rooms", JSON.stringify(rooms));
    }
  }
};
</script>
