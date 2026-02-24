<template>
   <NTooltip placement="bottom" :disabled="absolute === defaultText">
      <template #trigger>
         <slot :relative="relative" :absolute="absolute">
            {{ defaultText }}
         </slot>
      </template>
      {{ absolute }}
   </NTooltip>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui";
import moment from "moment";
import { computed } from "vue";

const props = defineProps<{
   value: moment.MomentInput;
   absolute?: boolean;
   dateOnly?: boolean;
   timeOnly?: boolean;
   excludeSeconds?: boolean;
   simpleDate?: boolean;
   prefix?: string;
   suffix?: string;
}>();

const relative = computed(() => moment(props.value).fromNow());
const absolute = computed(() => {
   const dateFormat = props.simpleDate ? "MM/DD/YYYY" : "MMMM DD, YYYY";
   const timeFormat = props.excludeSeconds ? "HH:mm A" : "HH:mm:ss A";
   if (props.dateOnly) {
      return moment(props.value).format(dateFormat);
   }
   if (props.timeOnly) {
      return moment(props.value).format(timeFormat);
   }
   return moment(props.value).format(`${dateFormat} [at] ${timeFormat}`);
});
const defaultText = computed(() => {
   let text = props.absolute ? absolute.value : relative.value;
   if (props.prefix) {
      text = props.prefix + " " + text;
   }
   if (props.suffix) {
      text = text + " " + props.suffix;
   }

   return text;
});
</script>
