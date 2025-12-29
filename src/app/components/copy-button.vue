<template>
   <NButton @click="copyToClipboard()">
      <template #icon>
         <PhCopy />
      </template>
      <NText :class="props.textClass">
         {{ props.textToCopy }}
      </NText>
   </NButton>
</template>

<script setup lang="ts">
import { renderIcon } from "@/lib/ui";
import { PhCopy } from "@phosphor-icons/vue";
import { ButtonProps, NButton, NText, useMessage } from "naive-ui";

interface Props extends /* @vue-ignore */ ButtonProps {
   textToCopy: string;
   textClass?: string;
}

const props = defineProps<Props>();
const message = useMessage();

function copyToClipboard() {
   navigator.clipboard.writeText(props.textToCopy).then(
      () => {
         message.create("Text copied to clipboard!", {
            icon: renderIcon(PhCopy),
         });
      },
      () => {
         message.error("Failed to copy text to clipboard.");
      }
   );
}
</script>
