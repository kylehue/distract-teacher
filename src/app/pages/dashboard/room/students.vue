<template>
   <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between w-full gap-2">
         <NBadge :value="numberOfJoinRequests">
            <NCheckbox v-model:checked="showJoinRequests">
               Show Join Requests
            </NCheckbox>
         </NBadge>
         <InputSearch
            :documents="allStudentsPreprocessed"
            :fields="['name']"
            label-field="name"
            id-field="id"
            placeholder="Search students..."
            class="w-fit!"
            @search="
               (ids) => {
                  table?.table?.filters({ name: ids });
               }
            "
         ></InputSearch>
      </div>
      <StudentsTable
         ref="table"
         :columns="[
            'studentName',
            'warningDistribution',
            'phoneDetections',
            'timeJoined',
            'timeLeft',
            'actions',
         ]"
         :actions="['approve', 'reject', 'view-reports', 'view-logs', 'kick']"
         :students="allStudentsPreprocessed"
      />
   </div>
</template>

<script setup lang="ts">
import { NBadge, NCheckbox } from "naive-ui";
import { computed, inject, ref, useTemplateRef } from "vue";
import InputSearch from "@/app/components/input-search.vue";
import { STUDENTS_INJECTION_KEY } from "@/lib/injection-keys";
import StudentsTable from "@/app/components/students-table.vue";

const table = useTemplateRef("table");
const showJoinRequests = ref(false);
const allStudents = inject(STUDENTS_INJECTION_KEY)!;
const allStudentsPreprocessed = computed(() => {
   if (!showJoinRequests.value) {
      return allStudents.value.filter((student) => student.permitted);
   }

   return allStudents.value;
});
const numberOfJoinRequests = computed(() => {
   return allStudents.value.filter((student) => !student.permitted).length;
});
</script>
