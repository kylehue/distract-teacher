<template>
   <div class="flex flex-col gap-4">
      <div
         v-if="props.items.length"
         class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
      >
         <div class="flex flex-wrap items-center gap-2">
            <slot
               name="controlsLeft"
               :totalCount="transformedItems.length"
               :visibleCount="visibleItems.length"
            />

            <NTooltip v-if="isSortEnabled" placement="bottom">
               <template #trigger>
                  <NPopselect
                     trigger="click"
                     multiple
                     :options="sortSelectionOptions"
                     :value="selectedSortKeys"
                     @update:value="onUpdateSortKeys"
                  >
                     <NButton quaternary circle>
                        <template #icon>
                           <PhArrowsDownUp />
                        </template>
                     </NButton>
                  </NPopselect>
               </template>
               Sort
            </NTooltip>

            <NDropdown
               v-if="isColumnFilterEnabled"
               trigger="click"
               placement="bottom-start"
               :options="columnFilterMenuOptions"
               @select="onSelectColumnFilter"
            >
               <NTooltip placement="bottom">
                  <template #trigger>
                     <NButton quaternary circle>
                        <template #icon>
                           <PhFunnel />
                        </template>
                     </NButton>
                  </template>
                  Filter
               </NTooltip>
            </NDropdown>

            <NTooltip v-if="hasActiveTransforms" placement="bottom">
               <template #trigger>
                  <NButton quaternary circle @click="resetTransforms">
                     <template #icon>
                        <PhArrowCounterClockwise />
                     </template>
                  </NButton>
               </template>
               Reset filtering and sorting rules
            </NTooltip>

            <NDropdown
               trigger="click"
               :options="
                  AVAILABLE_PAGE_SIZES.map((size) => ({
                     label: `${size} per page`,
                     key: size,
                  }))
               "
               :value="pageSize"
               @select="(key) => (pageSize = key)"
            >
               <NTooltip placement="bottom">
                  <template #trigger>
                     <NButton quaternary circle>
                        <template #icon>
                           <PhRowsPlusBottom />
                        </template>
                     </NButton>
                  </template>
                  Items per page
               </NTooltip>
            </NDropdown>
         </div>

         <div class="flex w-full items-center gap-2 sm:w-auto sm:justify-end">
            <div v-if="isSearchEnabled" class="w-full sm:w-[320px]">
               <InputSearch
                  v-model:search-query="searchQuery"
                  :documents="props.items"
                  :fields="searchConfig.fields"
                  :id-field="searchConfig.idField"
                  :label-field="searchConfig.labelField"
                  :filter-fields="searchConfig.filterFields"
                  :placeholder="searchConfig.placeholder ?? 'Search'"
                  :search-on-input="searchConfig.searchOnInput"
                  :label="searchConfig.label"
                  :max-suggestions="searchConfig.maxSuggestions"
                  @search="onSearch"
                  @select="onSearchSelect"
                  :disabled="!props.items.length"
               />
            </div>

            <slot
               name="controlsRight"
               :totalCount="transformedItems.length"
               :visibleCount="visibleItems.length"
            />
         </div>
      </div>

      <div
         v-if="
            ((isSortEnabled && effectiveSortRules.length) ||
               (isColumnFilterEnabled && selectedFilterTokens.length)) &&
            props.items.length
         "
         class="flex flex-wrap gap-2"
      >
         <template v-for="rule in effectiveSortRules" :key="rule.key">
            <NTooltip placement="bottom" :delay="1000">
               <template #trigger>
                  <NTag
                     closable
                     :bordered="false"
                     @close="removeSortRule(rule.key)"
                  >
                     <template #icon>
                        <PhSortAscending v-if="rule.direction === 'asc'" />
                        <PhSortDescending v-else />
                     </template>
                     <div class="flex items-center gap-1">
                        <NButton
                           quaternary
                           size="tiny"
                           @click.stop="toggleSortDirection(rule.key)"
                        >
                           {{ sortLabel(rule.key) }}
                        </NButton>
                     </div>
                  </NTag>
               </template>
               Sorted by {{ sortLabel(rule.key) }} in
               {{ rule.direction === "asc" ? "ascending" : "descending" }}
               order
            </NTooltip>
         </template>
         <NTag
            v-for="(token, index) in selectedFilterTokens"
            :key="token"
            closable
            :bordered="false"
            @close="removeFilterToken(token)"
         >
            <template #icon>
               <PhFunnel />
            </template>
            <NPopselect
               :options="
                  filterTokenOptions(token).map((option) => ({
                     label: option.label,
                     value: encodeFilterToken(
                        parseFilterToken(token)!.key,
                        option.value,
                     ),
                  }))
               "
               @update-value="
                  (value) => (selectedFilterTokens[index] = String(value))
               "
               trigger="click"
            >
               <NButton quaternary size="tiny">
                  {{ filterTokenLabel(token) }}
               </NButton>
            </NPopselect>
         </NTag>
         <NTag
            v-for="specialFilter in specialFilters.values()"
            :key="specialFilter.key"
            closable
            :bordered="false"
            @close="specialFilters.delete(specialFilter.key)"
         >
            <template #icon>
               <PhFunnel />
            </template>
            <NText class="text-xs">{{ specialFilter.label }}</NText>
         </NTag>
      </div>

      <div v-if="props.loading" class="flex justify-center py-10">
         <slot name="loading">
            <Loader text="" />
         </slot>
      </div>

      <div v-else-if="!transformedItems.length" class="py-6">
         <slot name="empty">
            <NEmpty description="No data found." />
         </slot>
      </div>

      <NScrollbar
         v-else
         ref="scrollbar"
         :style="{ maxHeight: props.maxHeight }"
      >
         <div :class="props.contentClass ?? 'flex flex-col gap-2'">
            <div
               v-for="(item, localIndex) in visibleItems"
               :key="itemKey(item, localIndex)"
            >
               <slot
                  name="item"
                  :item="item"
                  :index="itemIndex(localIndex)"
                  :localIndex="localIndex"
                  :visibleCount="visibleItems.length"
               />
            </div>
         </div>
      </NScrollbar>

      <div v-if="isPaginationEnabled" class="flex justify-end">
         <NPagination
            v-model:page="currentPage"
            :page-size="pageSize"
            :item-count="transformedItems.length"
            @update:page="scrollbar?.scrollTo(0, 0)"
         />
      </div>
   </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, h, ref, useTemplateRef, watch } from "vue";
import {
   NButton,
   NDropdown,
   NEmpty,
   NIcon,
   NPagination,
   NPopselect,
   NTag,
   NTooltip,
   NText,
   NScrollbar,
} from "naive-ui";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import type {
   DropdownMixedOption,
   DropdownOption,
} from "naive-ui/es/dropdown/src/interface";
import InputSearch from "@/app/components/input-search.vue";
import Loader from "@/app/components/loader.vue";
import {
   PhArrowCounterClockwise,
   PhArrowsDownUp,
   PhFunnel,
   PhRowsPlusBottom,
   PhSortAscending,
   PhSortDescending,
   PhX,
} from "@phosphor-icons/vue";

type SortDirection = "asc" | "desc";
type FilterPrimitive = string | number | boolean | null | undefined;

interface DataViewSortRule {
   key: string;
   direction: SortDirection;
}

interface DataViewSortOption<T> {
   key: string;
   label: string;
   compare: (left: T, right: T) => number;
   defaultDirection?: SortDirection;
   priority?: number;
}

interface DataViewSortConfig<T> {
   options: DataViewSortOption<T>[];
   defaultRules?: DataViewSortRule[];
}

interface DataViewSearchConfig<T> {
   fields: (keyof T & string)[];
   idField: keyof T & string;
   labelField: keyof T & string;
   filterFields?: (keyof T & string)[];
   placeholder?: string;
   searchOnInput?: boolean;
   label?: (item: Pick<T, keyof T & string>) => string;
   maxSuggestions?: number;
}

interface DataViewColumnFilterOption<
   V extends FilterPrimitive = FilterPrimitive,
> {
   label: string;
   value: V;
}

interface DataViewColumnFilter<T, V extends FilterPrimitive = FilterPrimitive> {
   key: string;
   label: string;
   value?: (item: T) => V;
   options?: DataViewColumnFilterOption<V>[];
}

interface DataViewColumnFilterConfig<T> {
   columns: DataViewColumnFilter<T>[];
   defaultRules?: DataViewColumnFilterRule[];
}

interface DataViewColumnFilterRule<
   V extends FilterPrimitive = FilterPrimitive,
> {
   key: string;
   values: V[];
}

interface SpecialFilterRule {
   key: string;
   label: string;
   filter: (item: T) => boolean;
}

const props = defineProps<{
   items: T[];
   loading?: boolean;
   itemKey?: (item: T, localIndex: number) => string | number;
   contentClass?: string;
   sort?: DataViewSortConfig<T>;
   search?: DataViewSearchConfig<T>;
   columnFilter?: DataViewColumnFilterConfig<T>;
   maxHeight?: number | string;
   pageSize?: (typeof AVAILABLE_PAGE_SIZES)[number];
   pageSizeInfinite?: boolean;
}>();

defineSlots<{
   item(props: {
      item: T;
      index: number;
      localIndex: number;
      visibleCount: number;
   }): unknown;
   loading(props: Record<string, never>): unknown;
   empty(props: Record<string, never>): unknown;
   controlsLeft(props: { totalCount: number; visibleCount: number }): unknown;
   controlsRight(props: { totalCount: number; visibleCount: number }): unknown;
}>();

const currentPage = ref(1);
const searchQuery = ref("");
const searchIds = ref<string[]>([]);
const selectedSearchId = ref<string | null>(null);
const sortRules = ref<DataViewSortRule[]>([]);
const selectedFilterTokens = ref<string[]>([]);
const specialFilters = ref(new Map<string, SpecialFilterRule>());
const AVAILABLE_PAGE_SIZES = [10, 20, 50, 100] as const;
const pageSize = ref(
   props.pageSizeInfinite
      ? Number.MAX_SAFE_INTEGER
      : (props.pageSize ?? AVAILABLE_PAGE_SIZES[0]),
);
const scrollbar = useTemplateRef("scrollbar");

const isSearchEnabled = computed(() => Boolean(props.search));
const isSortEnabled = computed(() => Boolean(props.sort));
const isColumnFilterEnabled = computed(() => Boolean(props.columnFilter));
const isPaginationEnabled = computed(
   () => !props.loading && !!props.items.length,
);
const searchConfig = computed(() => props.search!);
const sortConfig = computed(() => props.sort!);
const columnFilterConfig = computed(() => props.columnFilter!);
const defaultSortRules = computed(() =>
   normalizeSortRules(props.sort?.defaultRules),
);
const defaultFilterTokens = computed(() =>
   normalizeDefaultFilterTokens(props.columnFilter?.defaultRules),
);

const sortOptionMap = computed(() => {
   const map = new Map<string, DataViewSortOption<T>>();
   if (!isSortEnabled.value) return map;
   for (const option of sortConfig.value.options) {
      map.set(String(option.key), option);
   }
   return map;
});

const columnFilterMap = computed(() => {
   const map = new Map<string, DataViewColumnFilter<T>>();
   if (!isColumnFilterEnabled.value) return map;
   for (const column of columnFilterConfig.value.columns) {
      map.set(String(column.key), column);
   }
   return map;
});

const sortSelectionOptions = computed<SelectMixedOption[]>(() => {
   if (!isSortEnabled.value) return [];
   return sortConfig.value.options.map((option) => ({
      label: option.label,
      value: String(option.key),
   }));
});

const selectedSortKeys = computed(() =>
   sortRules.value.map((rule) => String(rule.key)),
);

const validSortKeySet = computed(() => {
   return new Set(Array.from(sortOptionMap.value.keys()));
});

// active sort rules sorted by priority
const effectiveSortRules = computed(() => {
   const orderIndex = new Map(
      sortRules.value.map((rule, index) => [String(rule.key), index]),
   );

   // sort by priority
   return [...sortRules.value].sort((left, right) => {
      const leftPriority = sortPriority(String(left.key));
      const rightPriority = sortPriority(String(right.key));
      if (leftPriority !== rightPriority) return rightPriority - leftPriority;

      const leftIndex = orderIndex.get(String(left.key)) ?? 0;
      const rightIndex = orderIndex.get(String(right.key)) ?? 0;
      return leftIndex - rightIndex;
   });
});

// for filter dropdown
const columnFilterMenuOptions = computed<DropdownMixedOption[]>(() => {
   if (!isColumnFilterEnabled.value) return [];
   const selectedTokenSet = new Set(selectedFilterTokens.value);

   return columnFilterConfig.value.columns.map((column) => {
      const columnKey = String(column.key);
      return {
         key: `group:${columnKey}`,
         label: column.label,
         children: resolveColumnFilterOptions(column).map((option) => {
            const token = encodeFilterToken(columnKey, option.value);
            const isSelected = selectedTokenSet.has(token);
            return {
               key: token,
               label: option.label,
               extra: isSelected
                  ? () => h(NIcon, { size: 14 }, { default: () => h(PhX) })
                  : undefined,
            };
         }),
      };
   }) as DropdownMixedOption[];
});

const validFilterTokenSet = computed(() => {
   const tokens = new Set<string>();
   if (!isColumnFilterEnabled.value) return tokens;

   for (const column of columnFilterConfig.value.columns) {
      const columnKey = String(column.key);
      for (const option of resolveColumnFilterOptions(column)) {
         tokens.add(encodeFilterToken(columnKey, option.value));
      }
   }

   return tokens;
});

const filterTokenLabelMap = computed(() => {
   const labels = new Map<string, string>();
   if (!isColumnFilterEnabled.value) return labels;

   for (const column of columnFilterConfig.value.columns) {
      for (const option of resolveColumnFilterOptions(column)) {
         const token = encodeFilterToken(String(column.key), option.value);
         labels.set(token, `${column.label}: ${option.label}`);
      }
   }

   return labels;
});

const hasActiveTransforms = computed(() => {
   return (
      (isSortEnabled.value &&
         sortRulesSignature(sortRules.value) !==
            sortRulesSignature(defaultSortRules.value)) ||
      (isColumnFilterEnabled.value &&
         !isSameStringSet(
            selectedFilterTokens.value,
            defaultFilterTokens.value,
         )) ||
      specialFilters.value.size > 0
   );
});

// run search first so later filters/sort work on the narrowed result set
const searchFilteredItems = computed(() => {
   if (!isSearchEnabled.value) return props.items;

   const idField = searchConfig.value.idField;
   if (selectedSearchId.value) {
      return props.items.filter(
         (item) => String(item[idField] as unknown) === selectedSearchId.value,
      );
   }

   if (!searchQuery.value.trim() || !searchIds.value.length) return props.items;

   const ids = new Set(searchIds.value.map((id) => String(id)));
   return props.items.filter((item) =>
      ids.has(String(item[idField] as unknown)),
   );
});

// group selected filter tokens by column for fast matching during item filtering
const selectedColumnFilters = computed(() => {
   const map = new Map<string, Set<string>>();
   for (const token of selectedFilterTokens.value) {
      const parsed = parseFilterToken(token);
      if (!parsed) continue;

      if (!map.has(parsed.key)) {
         map.set(parsed.key, new Set<string>());
      }
      map.get(parsed.key)!.add(parsed.serializedEncoded);
   }
   return map;
});

// actual filtered items
const columnFilteredItems = computed(() => {
   if (
      !isColumnFilterEnabled.value ||
      (!selectedFilterTokens.value.length && !specialFilters.value.size)
   ) {
      return searchFilteredItems.value;
   }

   return searchFilteredItems.value.filter((item) => {
      for (const [columnKey, allowedValues] of selectedColumnFilters.value) {
         const column = columnFilterMap.value.get(columnKey);
         if (!column) continue;

         const raw = getColumnFilterValue(column, item);
         const encoded = encodeSerializedValue(raw);
         if (!allowedValues.has(encoded)) return false;
      }
      for (const specialFilter of specialFilters.value.values()) {
         if (!specialFilter.filter(item)) {
            return false;
         }
      }
      return true;
   });
});

// apply multi-column sort after search + filters so page output is deterministic
const transformedItems = computed(() => {
   if (!isSortEnabled.value || !effectiveSortRules.value.length) {
      return columnFilteredItems.value;
   }

   const sorted = [...columnFilteredItems.value];
   sorted.sort((left, right) => {
      for (const rule of effectiveSortRules.value) {
         const option = sortOptionMap.value.get(String(rule.key));
         if (!option) continue;

         const compared = option.compare(left, right);
         if (compared !== 0) {
            return rule.direction === "asc" ? compared : -compared;
         }
      }
      return 0;
   });
   return sorted;
});

const totalPages = computed(() =>
   Math.max(1, Math.ceil(transformedItems.value.length / pageSize.value)),
);

const visibleItems = computed(() => {
   if (!isPaginationEnabled.value) return transformedItems.value;

   const start = (currentPage.value - 1) * pageSize.value;
   const end = start + pageSize.value;
   return transformedItems.value.slice(start, end);
});

function onSearch(ids: Array<T[keyof T & string]>) {
   searchIds.value = ids.map((id) => String(id));

   if (selectedSearchId.value) {
      const isExactSelectedResult =
         searchIds.value.length === 1 &&
         searchIds.value[0] === selectedSearchId.value;
      if (!isExactSelectedResult) {
         selectedSearchId.value = null;
      }
   }
}

function onSearchSelect(id: T[keyof T & string]) {
   applyDefaultRules();
   selectedSearchId.value = String(id);
   searchIds.value = [String(id)];
   currentPage.value = 1;
}

function onUpdateSortKeys(
   value: string | number | Array<string | number> | null | undefined,
) {
   const keys = normalizeSelectValues(value).filter((key) =>
      sortOptionMap.value.has(key),
   );
   const existingDirections = new Map(
      sortRules.value.map((rule) => [String(rule.key), rule.direction]),
   );

   sortRules.value = keys.map((key) => ({
      key: key as keyof T & string,
      direction: existingDirections.get(key) ?? sortDefaultDirection(key),
   }));
}

function onSelectColumnFilter(key: string | number, _option: DropdownOption) {
   const token = String(key);
   if (!parseFilterToken(token)) return;

   if (selectedFilterTokens.value.includes(token)) {
      selectedFilterTokens.value = selectedFilterTokens.value.filter(
         (value) => value !== token,
      );
      return;
   }

   selectedFilterTokens.value = [...selectedFilterTokens.value, token];
}

function toggleSortDirection(key: keyof T & string) {
   const index = sortRules.value.findIndex((rule) => rule.key === key);
   if (index < 0) return;

   const current = sortRules.value[index];
   sortRules.value[index] = {
      ...current,
      direction: current.direction === "asc" ? "desc" : "asc",
   };
}

function removeSortRule(key: keyof T & string) {
   sortRules.value = sortRules.value.filter((rule) => rule.key !== key);
}

function removeFilterToken(token: string) {
   selectedFilterTokens.value = selectedFilterTokens.value.filter(
      (v) => v !== token,
   );
}

function resetTransforms() {
   searchQuery.value = "";
   searchIds.value = [];
   selectedSearchId.value = null;
   applyDefaultRules();
   currentPage.value = 1;
   specialFilters.value.clear();
}

function itemIndex(localIndex: number) {
   if (!isPaginationEnabled.value) return localIndex;
   return (currentPage.value - 1) * pageSize.value + localIndex;
}

function itemKey(item: T, localIndex: number) {
   if (props.itemKey) return props.itemKey(item, localIndex);
   return itemIndex(localIndex);
}

function sortLabel(key: keyof T & string) {
   return (
      sortOptionMap.value.get(String(key))?.label ||
      String(key).replace(/([A-Z])/g, " $1")
   );
}

function filterTokenLabel(token: string) {
   return filterTokenLabelMap.value.get(token) || token;
}

function filterTokenOptions(token: string) {
   const parsed = parseFilterToken(token);
   if (!parsed) return [];

   const column = columnFilterMap.value.get(parsed.key);
   if (!column) return [];

   return resolveColumnFilterOptions(column);
}

function sortDefaultDirection(key: string): SortDirection {
   return sortOptionMap.value.get(key)?.defaultDirection ?? "asc";
}

function sortPriority(key: string): number {
   return sortOptionMap.value.get(key)?.priority ?? 0;
}

function applyDefaultRules() {
   sortRules.value = [...defaultSortRules.value];
   selectedFilterTokens.value = [...defaultFilterTokens.value];
}

function normalizeSortRules(rules?: DataViewSortRule[]) {
   if (!rules?.length) return [] as DataViewSortRule[];

   const seen = new Set<string>();
   const normalized: DataViewSortRule[] = [];
   for (const rule of rules) {
      const key = String(rule.key);
      if (seen.has(key)) continue;
      if (!sortOptionMap.value.has(key)) continue;

      seen.add(key);
      normalized.push({
         key: key as keyof T & string,
         direction: rule.direction === "desc" ? "desc" : "asc",
      });
   }
   return normalized;
}

function normalizeDefaultFilterTokens(rules?: DataViewColumnFilterRule[]) {
   if (!rules?.length) return [];

   const tokens = new Set<string>();
   for (const rule of rules) {
      const key = String(rule.key);
      if (!columnFilterMap.value.has(key)) continue;

      for (const value of rule.values) {
         tokens.add(encodeFilterToken(key, value));
      }
   }

   return Array.from(tokens);
}

function sortRulesSignature(rules: DataViewSortRule[]) {
   return rules
      .map((rule) => `${String(rule.key)}:${rule.direction}`)
      .join("|");
}

function isSameStringSet(left: string[], right: string[]) {
   if (left.length !== right.length) return false;

   const leftSet = new Set(left);
   for (const value of right) {
      if (!leftSet.has(value)) return false;
   }
   return true;
}

function normalizeSelectValues(
   value: string | number | Array<string | number> | null | undefined,
) {
   if (value == null) return [];
   if (Array.isArray(value)) {
      return value.map((v) => String(v));
   }
   return [String(value)];
}

// use explicit options when provided, otherwise infer options from current items
function resolveColumnFilterOptions(column: DataViewColumnFilter<T>) {
   if (column.options?.length) {
      return [...column.options].map((option) => ({
         label: option.label,
         value: option.value,
      }));
   }

   const map = new Map<string, FilterPrimitive>();
   for (const item of props.items) {
      const value = getColumnFilterValue(column, item);
      const key = serializeValue(value);
      if (!map.has(key)) {
         map.set(key, value);
      }
   }

   return Array.from(map.values())
      .map((value) => ({
         label: formatValue(value),
         value,
      }))
      .sort((left, right) =>
         left.label.localeCompare(right.label, undefined, {
            numeric: true,
            sensitivity: "base",
         }),
      );
}

function getColumnFilterValue(
   column: DataViewColumnFilter<T>,
   item: T,
): FilterPrimitive {
   if (column.value) {
      return column.value(item);
   }
   return item[column.key] as FilterPrimitive;
}

// encode values so dropdown keys stay safe and reversible.
function encodeFilterToken(key: string, value: FilterPrimitive) {
   return `${key}::${encodeSerializedValue(value)}`;
}

function parseFilterToken(token: string) {
   const separatorIndex = token.indexOf("::");
   if (separatorIndex < 0) return null;
   return {
      key: token.slice(0, separatorIndex),
      serializedEncoded: token.slice(separatorIndex + 2),
   };
}

function encodeSerializedValue(value: FilterPrimitive) {
   return encodeURIComponent(serializeValue(value));
}

function serializeValue(value: FilterPrimitive) {
   return JSON.stringify(value ?? null);
}

function formatValue(value: FilterPrimitive) {
   if (value === null || value === undefined || value === "") {
      return "Empty";
   }
   if (typeof value === "boolean") {
      return value ? "True" : "False";
   }
   return String(value);
}

function addSpecialFilter(rule: SpecialFilterRule) {
   specialFilters.value.set(rule.key, rule);
}

defineExpose({
   addSpecialFilter,
});

watch(
   defaultSortRules,
   (rules) => {
      // avoid overriding user choices once they already started interacting
      if (!isSortEnabled.value || sortRules.value.length) return;
      sortRules.value = [...rules];
   },
   { immediate: true, deep: true },
);

watch(
   defaultFilterTokens,
   (tokens) => {
      // avoid overriding user choices once they already started interacting
      if (!isColumnFilterEnabled.value || selectedFilterTokens.value.length)
         return;
      selectedFilterTokens.value = [...tokens];
   },
   { immediate: true, deep: true },
);

watch(validSortKeySet, (keys) => {
   sortRules.value = sortRules.value.filter((rule) =>
      keys.has(String(rule.key)),
   );
});

watch(validFilterTokenSet, (tokens) => {
   selectedFilterTokens.value = selectedFilterTokens.value.filter((token) =>
      tokens.has(token),
   );
});

watch(
   () => props.items,
   (items) => {
      if (!selectedSearchId.value || !isSearchEnabled.value) return;

      const idField = searchConfig.value.idField;
      const stillExists = items.some(
         (item) => String(item[idField] as unknown) === selectedSearchId.value,
      );
      if (!stillExists) {
         selectedSearchId.value = null;
      }
   },
   { deep: true },
);

watch([totalPages, pageSize], () => {
   if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
   }
   if (currentPage.value < 1) {
      currentPage.value = 1;
   }
});

watch(
   [searchQuery, selectedFilterTokens, sortRules],
   () => {
      // jump back to the first page whenever any transform changes
      currentPage.value = 1;
   },
   { deep: true },
);
</script>
