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
      <h1 style="font-size: 32px; font-weight: bold">Reports</h1>
      <n-button type="primary" @click="showCreateReportModal = true">
        + Generate Report
      </n-button>
    </div>

    <!-- Reports Table -->
    <div
      v-if="reports.length === 0"
      style="text-align: center; padding: 32px 0; color: #999"
    >
      No reports generated yet.
    </div>

    <n-card v-else>
      <n-data-table
        :columns="columns"
        :data="reports"
        :pagination="false"
        :bordered="true"
        :single-line="false"
      />
    </n-card>

    <!-- Create Report Modal -->
    <n-modal
      :show="showCreateReportModal"
      preset="dialog"
      title="Generate Report"
      positive-text="Generate"
      negative-text="Cancel"
      @update:show="showCreateReportModal = $event"
      @positive="createReport"
    >
      <n-form-item label="Select Room">
        <n-select
          v-model="newReport.roomId"
          :options="roomOptions"
          placeholder="-- Select a room --"
        />
      </n-form-item>

      <n-form-item label="Select Student">
        <n-select
          v-model="newReport.studentName"
          :options="studentOptions"
          placeholder="-- Select a student --"
        />
      </n-form-item>

      <n-form-item label="Report Content">
        <n-input
          v-model="newReport.content"
          type="textarea"
          placeholder="Write your report..."
          :rows="4"
        />
      </n-form-item>
    </n-modal>

    <!-- View Report Modal -->
    <n-modal
      :show="showViewReportModal"
      preset="dialog"
      title="View Report"
      positive-text="Close"
      @update:show="showViewReportModal = $event"
    >
      <div v-if="selectedReport">
        <div style="margin-bottom: 16px">
          <p style="color: #999; font-size: 14px">Student Name</p>
          <p style="font-weight: 500">{{ selectedReport.studentName }}</p>
        </div>
        <div style="margin-bottom: 16px">
          <p style="color: #999; font-size: 14px">Room</p>
          <p style="font-weight: 500">{{ selectedReport.roomName }}</p>
        </div>
        <div style="margin-bottom: 16px">
          <p style="color: #999; font-size: 14px">Date</p>
          <p style="font-weight: 500">{{ selectedReport.date }}</p>
        </div>
        <div>
          <p style="color: #999; font-size: 14px">Content</p>
          <p style="font-weight: 500; white-space: pre-wrap">
            {{ selectedReport.content }}
          </p>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from "vue";
import {
  NCard,
  NDataTable,
  NButton,
  NModal,
  NFormItem,
  NSelect,
  NInput,
} from "naive-ui";

const reports = ref<any[]>([]);
const rooms = ref<any[]>([]);
const selectedReport = ref<any>(null);
const showCreateReportModal = ref(false);
const showViewReportModal = ref(false);
const newReport = ref({
  roomId: "",
  studentName: "",
  content: "",
});

const roomOptions = computed(() => {
  return rooms.value.map((room) => ({
    label: room.name,
    value: room.id,
  }));
});

const studentOptions = computed(() => {
  const room = rooms.value.find((r) => r.id === newReport.value.roomId);
  return (room?.students || []).map((student: any) => ({
    label: student.name,
    value: student.name,
  }));
});

const columns = [
  {
    title: "Student Name",
    key: "studentName",
  },
  {
    title: "Room",
    key: "roomName",
  },
  {
    title: "Date",
    key: "date",
  },
  {
    title: "Status",
    key: "status",
    render: (row: any) => {
      const type = row.status === "completed" ? "success" : "warning";
      return h("div", {}, row.status);
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: (row: any) => {
      return h("div", { style: "display: flex; gap: 8px" }, [
        h(
          NButton,
          {
            type: "primary",
            size: "small",
            onClick: () => viewReport(row),
            text: true,
          },
          { default: () => "View" }
        ),
        h(
          NButton,
          {
            type: "error",
            size: "small",
            onClick: () => deleteReport(row.id),
            text: true,
          },
          { default: () => "Delete" }
        ),
      ]);
    },
  },
];

onMounted(() => {
  loadReports();
  loadRooms();
});

const loadReports = () => {
  reports.value = JSON.parse(localStorage.getItem("reports") || "[]");
};

const loadRooms = () => {
  rooms.value = JSON.parse(localStorage.getItem("rooms") || "[]");
};

const createReport = () => {
  if (
    !newReport.value.roomId ||
    !newReport.value.studentName ||
    !newReport.value.content
  ) {
    alert("Please fill in all fields");
    return;
  }

  const room = rooms.value.find((r) => r.id === newReport.value.roomId);
  const report = {
    id: Date.now().toString(),
    studentName: newReport.value.studentName,
    roomName: room?.name || "",
    roomId: newReport.value.roomId,
    content: newReport.value.content,
    date: new Date().toLocaleDateString(),
    status: "completed",
  };

  reports.value.push(report);
  localStorage.setItem("reports", JSON.stringify(reports.value));

  newReport.value = { roomId: "", studentName: "", content: "" };
  showCreateReportModal.value = false;
  alert("Report generated successfully!");
};

const viewReport = (report: any) => {
  selectedReport.value = report;
  showViewReportModal.value = true;
};

const deleteReport = (id: string) => {
  if (confirm("Delete this report?")) {
    reports.value = reports.value.filter((r) => r.id !== id);
    localStorage.setItem("reports", JSON.stringify(reports.value));
    loadReports();
  }
};
</script>
