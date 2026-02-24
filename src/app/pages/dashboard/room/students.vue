<template>
   <template v-if="!room">No room</template>
   <StudentsView
      v-else
      :students="allStudents"
      :room="room"
      :loading="isLoading"
   />
</template>

<script setup lang="ts">
import { inject } from "vue";
import {
   IS_LOADING_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_INJECTION_KEY,
} from "@/lib/injection-keys";
import StudentsView from "@/app/components/students-view.vue";

const room = inject(ROOM_INJECTION_KEY)!;
const allStudents = inject(STUDENTS_INJECTION_KEY)!;
const isLoading = inject(IS_LOADING_INJECTION_KEY)!;
</script>
