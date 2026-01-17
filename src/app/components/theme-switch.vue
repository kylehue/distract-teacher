<template>
   <NSwitch
      :value="theme === 'dark'"
      @update-value="(v) => (theme = v ? 'dark' : 'light')"
   />
</template>

<script setup lang="ts">
import { NSwitch } from "naive-ui";
import { inject, computed } from "vue";
import { THEME_INJECTION_KEY } from "@/lib/injection-keys";
const theme = inject(THEME_INJECTION_KEY)!;
</script>
