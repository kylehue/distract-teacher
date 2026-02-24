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
const dateFormat = computed(() =>
   props.simpleDate ? "MM/DD/YYYY" : "MMMM DD, YYYY",
);
const timeFormat = computed(() =>
   props.excludeSeconds ? "hh:mm A" : "hh:mm:ss A",
);
const relative = computed(() => moment(props.value).fromNow());
const absolute = computed(() =>
   moment(props.value).format(`MMMM DD, YYYY [at] hh:mm:ss A`),
);
const defaultText = computed(() => {
   let text = "";
   if (props.absolute) {
      if (props.dateOnly) {
         text = moment(props.value).format(dateFormat.value);
      } else if (props.timeOnly) {
         text = moment(props.value).format(timeFormat.value);
      } else {
         text = moment(props.value).format(
            `${dateFormat.value} [at] ${timeFormat.value}`,
         );
      }
   } else {
      text = relative.value;
   }

   if (props.prefix) {
      text = props.prefix + " " + text;
   }
   if (props.suffix) {
      text = text + " " + props.suffix;
   }

   return text;
});
</script>
