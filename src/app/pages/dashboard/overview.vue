<template>
  <div>
    <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 32px">
      Dashboard Overview
    </h1>

    <!-- Stats Grid with Icons -->
    <n-grid
      :cols="4"
      :x-gap="24"
      :y-gap="24"
      style="margin-bottom: 32px"
      responsive="screen"
    >
      <n-gi span="4 m:2 l:1">
        <n-card style="height: 100%">
          <div style="display: flex; align-items: center; gap: 16px">
            <div style="font-size: 32px">📊</div>
            <div style="flex: 1">
              <div style="color: #999; font-size: 14px; margin-bottom: 8px">
                Total Rooms
              </div>
              <div style="font-size: 28px; font-weight: bold; color: #0ea5e9">
                {{ totalRooms }}
              </div>
            </div>
          </div>
        </n-card>
      </n-gi>

      <n-gi span="4 m:2 l:1">
        <n-card style="height: 100%">
          <div style="display: flex; align-items: center; gap: 16px">
            <div style="font-size: 32px">👥</div>
            <div style="flex: 1">
              <div style="color: #999; font-size: 14px; margin-bottom: 8px">
                Total Students
              </div>
              <div style="font-size: 28px; font-weight: bold; color: #10b981">
                {{ totalStudents }}
              </div>
            </div>
          </div>
        </n-card>
      </n-gi>

      <n-gi span="4 m:2 l:1">
        <n-card style="height: 100%">
          <div style="display: flex; align-items: center; gap: 16px">
            <div style="font-size: 32px">📋</div>
            <div style="flex: 1">
              <div style="color: #999; font-size: 14px; margin-bottom: 8px">
                Reports Generated
              </div>
              <div style="font-size: 28px; font-weight: bold; color: #eab308">
                {{ totalReports }}
              </div>
            </div>
          </div>
        </n-card>
      </n-gi>

      <n-gi span="4 m:2 l:1">
        <n-card style="height: 100%">
          <div style="display: flex; align-items: center; gap: 16px">
            <div style="font-size: 32px">📷</div>
            <div style="flex: 1">
              <div style="color: #999; font-size: 14px; margin-bottom: 8px">
                Evidence Items
              </div>
              <div style="font-size: 28px; font-weight: bold; color: #a855f7">
                {{ totalEvidence }}
              </div>
            </div>
          </div>
        </n-card>
      </n-gi>
    </n-grid>

    <!-- Recent Activity -->
    <n-card>
      <template #header>
        <div style="font-size: 20px; font-weight: bold">Recent Activity</div>
      </template>

      <n-empty
        v-if="recentActivity.length === 0"
        description="No activity yet"
      />

      <div v-else style="display: flex; flex-direction: column; gap: 12px">
        <div
          v-for="(activity, index) in recentActivity"
          :key="index"
          style="
            padding: 16px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            border-left: 4px solid #0ea5e9;
          "
        >
          <div
            style="
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 8px;
            "
          >
            <div style="font-size: 20px">{{ activity.icon }}</div>
            <div style="font-weight: 500; flex: 1">{{ activity.title }}</div>
            <div style="color: #999; font-size: 12px">{{ activity.time }}</div>
          </div>
          <div style="color: #999; font-size: 14px; margin-left: 32px">
            {{ activity.description }}
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NCard, NGrid, NGi, NEmpty } from "naive-ui";

const totalRooms = ref(0);
const totalStudents = ref(0);
const totalReports = ref(0);
const totalEvidence = ref(0);
const recentActivity = ref<any[]>([]);

onMounted(() => {
  // Load data from localStorage
  const rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  const reports = JSON.parse(localStorage.getItem("reports") || "[]");
  const evidence = JSON.parse(localStorage.getItem("evidence") || "[]");

  totalRooms.value = rooms.length;
  totalReports.value = reports.length;
  totalEvidence.value = evidence.length;

  // Count total students across all rooms
  totalStudents.value = rooms.reduce(
    (sum: number, room: any) => sum + (room.students?.length || 0),
    0
  );

  // Build recent activity
  recentActivity.value = [
    ...rooms.map((r: any) => ({
      title: `Room Created: ${r.name}`,
      description: `${r.students?.length || 0} students`,
      time: "Recently",
      icon: "🏫",
    })),
    ...reports.map((r: any) => ({
      title: `Report Generated`,
      description: `${r.studentName}`,
      time: "Recently",
      icon: "📋",
    })),
  ].slice(0, 5);
});
</script>
