import { NIcon } from "naive-ui";
import { Component, h } from "vue";

export function renderIcon(icon: Component, size = 20) {
   return () => h(NIcon, { size }, { default: () => h(icon) });
}
