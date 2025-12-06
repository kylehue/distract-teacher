<template>
  <div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 32px;
      "
    >
      <h1 style="font-size: 32px; font-weight: bold">Rooms</h1>
      <RouterLink to="/dashboard/rooms/create">
        <n-button type="primary">+ Create Room</n-button>
      </RouterLink>
    </div>

    <!-- Rooms Grid -->
    <div
      v-if="rooms.length === 0"
      style="text-align: center; padding: 32px 0; color: #999"
    >
      No rooms created yet.
      <RouterLink
        to="/dashboard/rooms/create"
        style="color: #0ea5e9; text-decoration: underline"
      >
        Create one now
      </RouterLink>
    </div>

    <n-grid v-else :cols="3" :x-gap="24" :y-gap="24" responsive="screen">
      <n-gi v-for="room in rooms" :key="room.id" span="3 m:2 s:1">
        <n-card style="cursor: pointer">
          <div
            style="
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 16px;
            "
          >
            <div>
              <h3 style="font-size: 18px; font-weight: bold">
                {{ room.name }}
              </h3>
              <p style="color: #999; font-size: 14px">{{ room.subject }}</p>
            </div>
            <n-tag type="info">{{ room.students?.length || 0 }} students</n-tag>
          </div>

          <p style="color: #999; font-size: 14px; margin-bottom: 16px">
            {{ room.description }}
          </p>

          <div style="display: flex; gap: 8px">
            <RouterLink :to="`/dashboard/rooms/${room.id}`" style="flex: 1">
              <n-button type="primary" block>View Room</n-button>
            </RouterLink>
            <n-button type="error" @click="deleteRoom(room.id)"
              >Delete</n-button
            >
          </div>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { NGrid, NGi, NCard, NButton, NTag } from "naive-ui";

const router = useRouter();
const rooms = ref<any[]>([]);

onMounted(() => {
  loadRooms();
});

const loadRooms = () => {
  rooms.value = JSON.parse(localStorage.getItem("rooms") || "[]");
};

const deleteRoom = (id: string) => {
  if (confirm("Are you sure you want to delete this room?")) {
    rooms.value = rooms.value.filter((r) => r.id !== id);
    localStorage.setItem("rooms", JSON.stringify(rooms.value));
    loadRooms();
  }
};
</script>
