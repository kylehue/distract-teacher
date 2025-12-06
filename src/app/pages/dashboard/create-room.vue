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
      <h1 style="font-size: 32px; font-weight: bold">Create Room</h1>
    </div>

    <n-card style="max-width: 800px">
      <n-form @submit.prevent="createRoom" :model="form" label-placement="top">
        <n-form-item label="Room Name" path="name" required>
          <n-input
            v-model="form.name"
            type="text"
            placeholder="e.g., Biology 101"
          />
        </n-form-item>

        <n-form-item label="Subject" path="subject" required>
          <n-input
            v-model="form.subject"
            type="text"
            placeholder="e.g., Biology"
          />
        </n-form-item>

        <n-form-item label="Description" path="description">
          <n-input
            v-model="form.description"
            type="textarea"
            placeholder="Describe the room..."
          />
        </n-form-item>

        <n-form-item label="Schedule (Optional)" path="schedule">
          <n-input
            v-model="form.schedule"
            type="text"
            placeholder="e.g., Monday-Friday, 9:00 AM - 10:00 AM"
          />
        </n-form-item>

        <div style="display: flex; gap: 16px; margin-top: 24px">
          <n-button type="primary" @click="createRoom" style="flex: 1">
            Create Room
          </n-button>
          <RouterLink to="/dashboard/rooms" style="flex: 1">
            <n-button style="width: 100%">Cancel</n-button>
          </RouterLink>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NCard, NForm, NFormItem, NInput, NButton } from "naive-ui";

const router = useRouter();
const form = ref({
  name: "",
  subject: "",
  description: "",
  schedule: "",
});

const createRoom = () => {
  if (!form.value.name || !form.value.subject) {
    alert("Please fill in required fields");
    return;
  }

  const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  const newRoom = {
    id: Date.now().toString(),
    name: form.value.name,
    subject: form.value.subject,
    description: form.value.description,
    schedule: form.value.schedule,
    students: [],
  };

  rooms.push(newRoom);
  localStorage.setItem("rooms", JSON.stringify(rooms));

  alert("Room created successfully!");
  router.push("/dashboard/rooms");
};
</script>
