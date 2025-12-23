<template>
   <NCard>
      <!-- Title + Status -->
      <template #header>
         <div class="flex flex-row flex-wrap items-center gap-2">
            <NText strong>
               {{ title }}
            </NText>
            <NTag :type="statusType" class="w-fit" size="small">
               {{ statusLabel }}
            </NTag>
         </div>
      </template>

      <!-- Content -->
      <div class="space-y-2">
         <div class="flex justify-between gap-1 items-center">
            <NText depth="3">Room Code</NText>
            <NButton quaternary size="small" @click="copyCode">
               {{ code }}
               <template #icon>
                  <PhCopy />
               </template>
            </NButton>
         </div>

         <div class="flex justify-between">
            <NText depth="3">Students</NText>
            <NText> {{ students }} / {{ maxStudents }} </NText>
         </div>

         <div class="flex justify-between">
            <NText depth="3">Time</NText>
            <NText>
               {{ time }}
            </NText>
         </div>

         <div class="flex justify-between">
            <NText depth="3">Date Created</NText>
            <NText>
               {{ dateCreated }}
            </NText>
         </div>
      </div>

      <!-- Footer -->
      <template #footer>
         <div class="flex justify-end gap-2">
            <NButton size="small"> View Room </NButton>
         </div>
      </template>
   </NCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NCard, NButton, NTag, NText, useMessage } from "naive-ui";
import { PhCopy } from "@phosphor-icons/vue";

const props = defineProps<{
   title: string;
   code: string;
   students: number;
   maxStudents: number;
   dateCreated: string;
   time: string;
   status: "ongoing" | "concluded";
}>();

const message = useMessage();

const statusType = computed(() =>
   props.status === "ongoing" ? "success" : "default"
);

const statusLabel = computed(() =>
   props.status === "ongoing" ? "Ongoing" : "Concluded"
);

function copyCode() {
   navigator.clipboard.writeText(props.code);
   message.success("Room code copied");
}
</script>

<style scoped></style>
