<template>
   <NPopselect
      placement="bottom"
      v-model:show="showOptions"
      trigger="manual"
      :options="searchResults.options"
      width="trigger"
      @update:value="onSelect($event)"
   >
      <NInput
         v-bind="$attrs"
         :placeholder="props.placeholder ?? 'Search'"
         clearable
         v-model:value="searchQuery"
         :class="props.class"
         @focus="onFocus"
         @blur="onBlur"
         @keydown.enter="emit('search', searchResults.ids)"
         @clear="emit('search', [])"
      >
         <template #prefix>
            <PhMagnifyingGlass />
         </template>
      </NInput>
   </NPopselect>
</template>
<script
   setup
   lang="ts"
   generic="T extends Record<string, any>, K extends keyof T, F extends (keyof T)[]"
>
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
import { NInput, NPopselect } from "naive-ui";
import { computed, nextTick, ref, watch } from "vue";
import MiniSearch from "minisearch";

const props = defineProps<{
   documents: T[];
   fields: F;
   idField: K;
   labelField: keyof T;
   placeholder?: string;
   class?: string;
   searchOnInput?: boolean;
   label?: (item: Pick<T, F[number] | K>) => string;
}>();

defineOptions({ inheritAttrs: false });

const showOptions = ref(false);
const searchQuery = defineModel("searchQuery", {
   type: String,
   default: "",
});

const miniSearch = new MiniSearch<T>({
   fields: props.fields as string[],
   storeFields: [...props.fields, props.idField as keyof T] as string[],
   idField: props.idField as string,
});

const searchResults = computed(() => {
   const results = miniSearch.search(searchQuery.value, {
      fuzzy: 0.5,
      prefix: true,
   });

   const options: { label: string; value: T[K] }[] = [];
   const ids: T[K][] = [];
   results.forEach((r) => {
      let label = String(r[props.labelField as any]);
      if (props.label && typeof props.label === "function") {
         label = props.label(r as any);
      }
      options.push({
         label: label,
         value: r[props.idField as any],
      });
      ids.push(r[props.idField as any]);
   });

   return {
      options,
      ids,
   };
});

const emit = defineEmits<{
   (e: "select", value: T[K]): void;
   (e: "search", ids: T[K][]): void;
}>();

watch(
   () => props.documents,
   (newDocs) => {
      miniSearch.removeAll();
      miniSearch.addAll(newDocs);
   },
   { immediate: true }
);

watch(searchQuery, (value) => {
   // open when typing
   showOptions.value = !!value && searchResults.value.options.length > 0;

   if (props.searchOnInput) {
      emit("search", searchResults.value.ids);
   }

   if (!value) {
      emit("search", []);
   }
});

function onFocus() {
   if (searchResults.value.options.length) showOptions.value = true;
}

function onBlur() {
   nextTick(() => {
      showOptions.value = false;
   });
}

function onSelect(value: T[K]) {
   emit("select", value);
   emit("search", [value]);
   searchQuery.value = props.documents.find(
      (doc) => doc[props.idField] === value
   )?.[props.labelField] as string;
   nextTick(() => {
      showOptions.value = false;
   });
}
</script>
