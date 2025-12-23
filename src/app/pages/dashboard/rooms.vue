<template>
   <!-- Main -->
   <Layout title="Rooms">
      <NGrid :x-gap="16" :y-gap="16" cols="1 m:2 l:3 xl:4" responsive="screen">
         <NGridItem v-for="i in 10" :key="i">
            <RoomItem
               :title="'Test Room ' + i"
               :code="'test' + i"
               :students="5"
               :max-students="10"
               :date-created="'2024-06-01'"
               :time="'10:00 AM - 11:30 AM'"
               :status="Math.random() > 0.5 ? 'ongoing' : 'concluded'"
            />
         </NGridItem>
      </NGrid>
      <template #header-extra>
         <div class="flex flex-row gap-2">
            <NInput placeholder="Search Rooms">
               <template #prefix>
                  <PhMagnifyingGlass></PhMagnifyingGlass>
               </template>
            </NInput>
            <NButton @click="showCreateRoomModal = true">
               Create New Room
               <template #icon><PhPlus></PhPlus></template>
            </NButton>
         </div>
      </template>
   </Layout>

   <!-- Create Room Modal -->
   <NModal v-model:show="showCreateRoomModal" closable>
      <NCard
         title="Create New Room"
         closable
         @close="showCreateRoomModal = false"
         class="w-[420px]!"
      >
         <NForm>
            <NFormItem label="Room Title">
               <NInput
                  v-model:value="createRoomModalForm.title"
                  placeholder="Enter the room title"
               />
            </NFormItem>

            <NFormItem label="Room Code">
               <div class="flex flex-col gap-1 w-full">
                  <NInput
                     v-model:value="createRoomModalForm.code"
                     placeholder="Enter the room code"
                     :disabled="createRoomModalForm.autoGenerateCode"
                  />
                  <NCheckbox
                     class="w-fit"
                     v-model:checked="createRoomModalForm.autoGenerateCode"
                     size="small"
                  >
                     <NText depth="3" class="text-xs">
                        Auto-generate room code
                     </NText>
                  </NCheckbox>
               </div>
            </NFormItem>

            <NFormItem label="Max Students">
               <NInputNumber
                  v-model:value="createRoomModalForm.maxStudents"
                  placeholder="Enter the max number of students"
                  class="w-full"
               />
            </NFormItem>

            <NButton type="primary" block> Create </NButton>
         </NForm>
      </NCard>
   </NModal>
</template>

<script setup lang="ts">
import Layout from "./layout.vue";
import RoomItem from "@/app/components/room-item.vue";
import {
   PhArrowsClockwise,
   PhMagnifyingGlass,
   PhPlus,
} from "@phosphor-icons/vue";
import {
   NButton,
   NGrid,
   NGridItem,
   NModal,
   NCard,
   NForm,
   NFormItem,
   NInput,
   NInputNumber,
   NTooltip,
   NCheckbox,
   NText,
} from "naive-ui";
import { reactive, ref } from "vue";

const showCreateRoomModal = ref(false);
const createRoomModalForm = reactive({
   title: "",
   code: "",
   autoGenerateCode: true,
   maxStudents: 10,
});
</script>
