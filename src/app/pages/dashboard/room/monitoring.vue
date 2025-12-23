<template>
   <Layout>
      <div class="flex flex-col gap-4">
         <div class="flex flex-row justify-end gap-2">
            <NButton type="primary">Start Monitoring</NButton>
         </div>
         <NDataTable
            :columns="columns"
            :data="data"
            :pagination="{ pageSize: 10 }"
            :render-cell="renderCell"
         />
      </div>
   </Layout>
</template>

<script setup lang="ts">
import { DataTableColumns, NButton, NDataTable, NTag } from "naive-ui";
import Layout from "./layout.vue";
import { h } from "vue";

// TODO: might have to make these types global
interface MonitoringLog {
   studentName: string;
   warningLevel: WarningLevel;
   time: string;
}

type WarningLevel = "low" | "moderate" | "severe";

const columns: DataTableColumns<MonitoringLog> = [
   {
      title: "Student Name",
      key: "studentName",
   },
   {
      title: "Warning Level",
      key: "warningLevel",
   },
   {
      title: "Time",
      key: "time",
   },
   {
      title: "Actions",
      key: "actions",
   },
];

const data: MonitoringLog[] = [
   {
      studentName: "John Doe",
      warningLevel: "moderate",
      time: "10:15 AM",
   },
   {
      studentName: "Jane Smith",
      warningLevel: "severe",
      time: "10:20 AM",
   },
   {
      studentName: "Alice Johnson",
      warningLevel: "low",
      time: "10:25 AM",
   },
];

function renderCell(value: any, row: any, column: any) {
   if (column.key === "warningLevel") {
      let color: "default" | "warning" | "error" = "default";
      if (value === "moderate") color = "warning";
      else if (value === "severe") color = "error";
      return h(NTag, { type: color }, { default: () => value });
   }

   if (column.key === "actions") {
      return h(
         NButton,
         {
            size: "small",
            onClick: () => {},
         },
         { default: () => "View Record" }
      );
   }

   return value;
}
</script>
