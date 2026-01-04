<template>
   <NTable :bordered="false" :single-line="false" class="rounded!">
      <tbody>
         <tr>
            <td>
               <slot></slot>
            </td>
         </tr>
         <tr>
            <td class="flex gap-2 justify-around">
               <NButton size="tiny" @click="emit('clear')">Clear</NButton>
               <NButton size="tiny" type="primary" @click="emit('confirm')">
                  Confirm
               </NButton>
            </td>
         </tr>
      </tbody>
   </NTable>
</template>

<script setup lang="ts">
import { NTable, NButton } from "naive-ui";

const emit = defineEmits<{
   (e: "confirm"): void;
   (e: "clear"): void;
}>();
</script>
