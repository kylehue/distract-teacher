<template>
   <NTag
      v-if="!type || type == 'general'"
      :type="room.status !== 'concluded' ? 'success' : 'error'"
      round
   >
      {{ room.status !== "concluded" ? "Ongoing" : "Concluded" }}
   </NTag>
   <NTag
      v-else-if="type == 'monitoring'"
      :type="
         room.status === 'monitoring'
            ? 'warning'
            : room.status === 'paused'
              ? 'success'
              : 'error'
      "
      round
   >
      {{ toTitleCase(room.status) }}
   </NTag>
</template>

<script setup lang="ts">
import { toTitleCase } from "@/lib/string";
import { RoomInfo } from "@/lib/typings";
import { NTag } from "naive-ui";

defineProps<{
   type?: "general" | "monitoring";
   room: RoomInfo;
}>();
</script>
