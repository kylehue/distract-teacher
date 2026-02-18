<template>
   <NCard
      v-bind="props.cardProps"
      :bordered="props.cardProps.bordered ?? false"
      class="w-full"
      size="small"
   >
      <div
         class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
      >
         <div class="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
            <div v-if="$slots.icon" class="shrink-0 pt-0.5">
               <NIcon :size="props.iconSize">
                  <slot name="icon" />
               </NIcon>
            </div>

            <div class="min-w-0 flex-1">
               <div
                  v-if="hasTitle || resolvedTagPlacement === 'after-title'"
                  class="flex flex-wrap items-start gap-2"
               >
                  <NText
                     v-if="hasTitle"
                     strong
                     class="min-w-0 flex-1 wrap-break-word leading-snug"
                  >
                     <slot name="title">
                        {{ props.title }}
                     </slot>
                  </NText>

                  <div
                     ref="afterTitleTagsTarget"
                     class="flex flex-wrap items-center gap-2"
                     :class="
                        resolvedTagPlacement === 'after-title' ? '' : 'hidden'
                     "
                  />
               </div>

               <NText
                  v-if="hasContent"
                  depth="2"
                  class="mt-1 block wrap-break-word text-sm leading-relaxed"
               >
                  <slot name="content">
                     {{ props.content }}
                  </slot>
               </NText>

               <div
                  ref="belowContentTagsTarget"
                  class="mt-3 flex flex-wrap items-center gap-2"
                  :class="
                     resolvedTagPlacement === 'below-content' ? '' : 'hidden'
                  "
               />

               <NText
                  v-if="hasFooter"
                  depth="3"
                  class="mt-3 block wrap-break-word text-xs leading-normal"
               >
                  <slot name="footer">
                     {{ props.footer }}
                  </slot>
               </NText>
            </div>
         </div>

         <div v-if="hasMenu" class="self-end sm:self-start">
            <NDropdown
               trigger="click"
               placement="bottom-end"
               :options="dropdownMenuOptions"
               :render-label="renderMenuLabel"
               @select="onSelectMenu"
            >
               <slot name="menu-trigger">
                  <NButton
                     quaternary
                     circle
                     size="small"
                     aria-label="Open context menu"
                  >
                     <template #icon>
                        <PhDotsThreeVertical />
                     </template>
                  </NButton>
               </slot>
            </NDropdown>
         </div>
      </div>

      <Teleport v-if="hasTags && activeTagsTarget" :to="activeTagsTarget">
         <slot name="tags" :tags="normalizedTags">
            <NTag
               v-for="tag in normalizedTags"
               :key="tag.key"
               :type="tag.type"
               :size="tag.size"
               :bordered="tag.bordered"
               :round="tag.round"
            >
               {{ tag.label }}
            </NTag>
         </slot>
      </Teleport>
   </NCard>
</template>

<script setup lang="ts">
import { computed, h, useSlots, useTemplateRef } from "vue";
import type { VNodeChild } from "vue";
import { NCard, NButton, NText, NDropdown, NTag, NIcon } from "naive-ui";
import type { CardProps, TagProps } from "naive-ui";
import type {
   DropdownMixedOption,
   DropdownOption,
} from "naive-ui/es/dropdown/src/interface";
import { RouterLink } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
import { PhDotsThreeVertical } from "@phosphor-icons/vue";

interface RowCardTagObject {
   key?: string | number;
   label: string;
   type?: TagProps["type"];
   size?: TagProps["size"];
   bordered?: boolean;
   round?: boolean;
}

interface RowCardBaseMenuOption {
   key?: string | number;
   disabled?: boolean;
}

interface RowCardMenuDivider extends RowCardBaseMenuOption {
   type: "divider";
}

interface RowCardMenuItem extends RowCardBaseMenuOption {
   type?: "item";
   label: string;
   children?: RowCardMenuOption[];
   icon?: () => VNodeChild;
   to?: RouteLocationRaw;
   onSelect?: (key: string | number) => void;
}

type RowCardDropdownOption = DropdownOption & {
   to?: RouteLocationRaw;
};

export type RowCardTag = string | RowCardTagObject;
export type RowCardMenuOption = RowCardMenuItem | RowCardMenuDivider;

const props = withDefaults(
   defineProps<{
      title?: string;
      content?: string;
      footer?: string;
      tags?: RowCardTag[];
      tagsPlacement?: "below-content" | "after-title";
      menuOptions?: RowCardMenuOption[];
      cardProps?: Partial<CardProps>;
      iconSize?: number;
   }>(),
   {
      title: "",
      content: "",
      footer: "",
      tags: () => [],
      tagsPlacement: "below-content",
      menuOptions: () => [],
      cardProps: () => ({}),
      iconSize: 24,
   },
);

const emit = defineEmits<{
   (event: "menu-select", key: string | number, option: RowCardMenuItem): void;
}>();

defineSlots<{
   icon(props: Record<string, never>): unknown;
   title(props: Record<string, never>): unknown;
   content(props: Record<string, never>): unknown;
   tags(props: { tags: RowCardTagObject[] }): unknown;
   footer(props: Record<string, never>): unknown;
   "menu-trigger"(props: Record<string, never>): unknown;
}>();

const slots = useSlots();
const afterTitleTagsTarget = useTemplateRef("afterTitleTagsTarget");
const belowContentTagsTarget = useTemplateRef("belowContentTagsTarget");

// normalize mixed tag input into one shape so rendering stays simple
const normalizedTags = computed<RowCardTagObject[]>(() =>
   props.tags.map((tag, index) => {
      if (typeof tag === "string") {
         return {
            key: `tag-${index}-${tag}`,
            label: tag,
            size: "small",
            bordered: false,
            round: false,
         };
      }

      return {
         key: tag.key ?? `tag-${index}-${tag.label}`,
         label: tag.label,
         type: tag.type,
         size: tag.size ?? "small",
         bordered: tag.bordered ?? false,
         round: tag.round ?? false,
      };
   }),
);

const hasTitle = computed(() => Boolean(slots.title || props.title));
const hasContent = computed(() => Boolean(slots.content || props.content));
const hasFooter = computed(() => Boolean(slots.footer || props.footer));
const hasTags = computed(() =>
   Boolean(slots.tags || normalizedTags.value.length),
);
const resolvedTagPlacement = computed(() => props.tagsPlacement);
const activeTagsTarget = computed(() =>
   resolvedTagPlacement.value === "after-title"
      ? afterTitleTagsTarget.value
      : belowContentTagsTarget.value,
);

// flatten nested menu options into a quick lookup for select callbacks
const menuItemLookup = computed(() => {
   const lookup = new Map<string | number, RowCardMenuItem>();

   const walk = (options: RowCardMenuOption[], path: string) => {
      options.forEach((option, index) => {
         if (isMenuDivider(option)) {
            return;
         }

         const currentPath = path ? `${path}-${index}` : `${index}`;
         const key = resolveMenuKey(option, currentPath);
         lookup.set(key, option);

         if (option.children?.length) {
            walk(option.children, currentPath);
         }
      });
   };

   walk(props.menuOptions, "");
   return lookup;
});

const dropdownMenuOptions = computed<DropdownMixedOption[]>(() =>
   props.menuOptions.map((option, index) =>
      toDropdownOption(option, `${index}`),
   ),
);

const hasMenu = computed(() => dropdownMenuOptions.value.length > 0);

function isMenuDivider(
   option: RowCardMenuOption,
): option is RowCardMenuDivider {
   return option.type === "divider";
}

function resolveMenuKey(
   option: RowCardMenuItem,
   path: string,
): string | number {
   // keep keys deterministic even when callers do not pass one
   if (option.key !== undefined) return option.key;
   if (typeof option.to === "string") return option.to;
   return `menu-${path}`;
}

function toDropdownOption(
   option: RowCardMenuOption,
   path: string,
): DropdownMixedOption {
   if (isMenuDivider(option)) {
      return {
         type: "divider",
         key: option.key ?? `divider-${path}`,
      };
   }

   const key = resolveMenuKey(option, path);

   return {
      key,
      label: option.label,
      disabled: option.disabled,
      icon: option.icon,
      children: option.children?.map((child, childIndex) =>
         toDropdownOption(child, `${path}-${childIndex}`),
      ),
      to: option.to,
   } as RowCardDropdownOption;
}

function renderMenuLabel(option: DropdownOption) {
   const typedOption = option as RowCardDropdownOption;
   const label = String(typedOption.label ?? "");

   // render router links inside the dropdown so menu items can navigate directly
   if (typedOption.to !== undefined) {
      return h(
         RouterLink,
         {
            to: typedOption.to,
            class: "block w-full",
         },
         { default: () => label },
      );
   }

   return label;
}

function onSelectMenu(key: string | number) {
   const option = menuItemLookup.value.get(key);
   if (!option) return;

   option.onSelect?.(key);
   emit("menu-select", key, option);
}
</script>
