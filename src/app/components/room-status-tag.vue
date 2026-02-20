<template>
   <NTag :type="roomStatusToComponentType(room.status)" round>
      {{ toTitleCase(room.status) }}
   </NTag>
</template>

<script setup lang="ts">
import { toTitleCase } from "@/lib/string";
import { RoomInfo } from "@/lib/typings";
import { roomStatusToComponentType } from "@/lib/ui";
import { NTag } from "naive-ui";

defineProps<{
   room: RoomInfo;
}>();
</script>
