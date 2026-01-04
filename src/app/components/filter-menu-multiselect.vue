<template>
   <FilterMenu @clear="emit('clear')" @confirm="emit('confirm', value)">
      <NSelect
         v-bind="$attrs"
         multiple
         filterable
         :consistentMenuWidth="false"
         v-model:value="value"
      ></NSelect>
   </FilterMenu>
</template>
<script setup lang="ts">
import { NSelect, SelectProps } from "naive-ui";
import FilterMenu from "./filter-menu.vue";
import { ref, watch } from "vue";

interface Props extends /* @vue-ignore */ SelectProps {
   value?: (string | number)[];
}
const props = defineProps<Props>();

defineOptions({
   inheritAttrs: false,
});

const value = ref(props.value ?? []);

const emit = defineEmits<{
   (e: "confirm", data: (string | number)[]): void;
   (e: "clear"): void;
   (e: "update:value", value: (string | number)[]): void;
}>();

watch(value, (newValues) => {
   emit("update:value", newValues);
});

watch(
   () => props.value,
   (newValues) => {
      if (newValues) {
         value.value = newValues;
      }
   }
);
</script>
