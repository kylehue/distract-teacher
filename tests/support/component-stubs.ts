import { defineComponent, h } from "vue";

export const NButtonClickStub = defineComponent({
   name: "NButton",
   emits: ["click"],
   setup(_, { slots, emit }) {
      return () =>
         h(
            "button",
            {
               type: "button",
               onClick: () => emit("click"),
            },
            slots.default?.(),
         );
   },
});

export const NTextSlotStub = defineComponent({
   name: "NText",
   props: {
      class: { type: String, default: "" },
   },
   setup(props, { slots }) {
      return () => h("span", { class: props.class }, slots.default?.());
   },
});

export const NCardSlotStub = defineComponent({
   name: "NCard",
   setup(_, { slots }) {
      return () => h("section", slots.default?.());
   },
});

export const NIconSlotStub = defineComponent({
   name: "NIcon",
   setup(_, { slots }) {
      return () => h("i", slots.default?.());
   },
});

export const NDividerHrStub = defineComponent({
   name: "NDivider",
   setup() {
      return () => h("hr");
   },
});

export const NTooltipTriggerStub = defineComponent({
   name: "NTooltip",
   setup(_, { slots }) {
      return () => h("div", [slots.trigger?.(), slots.default?.()]);
   },
});

export const NEmptyDescriptionStub = defineComponent({
   name: "NEmpty",
   props: {
      description: { type: String, default: "" },
   },
   setup(props, { slots }) {
      return () => h("div", [props.description, slots.default?.()]);
   },
});

export const NConfigProviderStub = defineComponent({
   name: "NConfigProvider",
   setup(_, { slots }) {
      return () => h("div", slots.default?.());
   },
});

export const lightThemeStub = {};

export function createNaiveUiMock(overrides: Record<string, any> = {}) {
   return {
      NButton: NButtonClickStub,
      NText: NTextSlotStub,
      NCard: NCardSlotStub,
      NIcon: NIconSlotStub,
      NDivider: NDividerHrStub,
      NTooltip: NTooltipTriggerStub,
      NEmpty: NEmptyDescriptionStub,
      NConfigProvider: NConfigProviderStub,
      lightTheme: lightThemeStub,
      ...overrides,
   };
}

export function createPhosphorIconMocks(names: string[]) {
   return Object.fromEntries(
      names.map((name) => [
         name,
         defineComponent({
            name,
            setup: () => () => h("i"),
         }),
      ]),
   );
}

export function createRouterLinkStub() {
   return defineComponent({
      name: "RouterLink",
      props: {
         to: { type: [String, Object], required: false },
         class: { type: String, default: "" },
      },
      setup(props, { slots }) {
         const toValue =
            typeof props.to === "string"
               ? props.to
               : props.to
                 ? JSON.stringify(props.to)
                 : "";
         return () =>
            h(
               "a",
               {
                  class: props.class,
                  "data-to": toValue,
               },
               slots.default?.(),
            );
      },
   });
}

export const PageLayoutStub = defineComponent({
   name: "Layout",
   props: {
      title: { type: String, default: "" },
   },
   setup(props, { slots }) {
      return () =>
         h("section", [
            h("h1", props.title),
            h("div", slots["header-extra"]?.()),
            h("div", slots.default?.()),
         ]);
   },
});

export const RouterLinkStub = createRouterLinkStub();

export const DataViewStub = defineComponent({
   name: "DataView",
   props: {
      items: { type: Array, default: () => [] },
      loading: { type: Boolean, default: false },
   },
   setup(props, { slots }) {
      return () => {
         const items = props.items as any[];

         if (props.loading) {
            return h("section", { class: "data-view data-view-loading" }, [
               slots.loading?.() ?? "loading",
            ]);
         }

         if (!items.length) {
            return h("section", { class: "data-view data-view-empty" }, [
               slots.empty?.(),
            ]);
         }

         return h(
            "section",
            { class: "data-view" },
            items.map((item, index) =>
               h(
                  "div",
                  { class: "data-view-item", "data-index": String(index) },
                  slots.item?.({
                     item,
                     index,
                     localIndex: index,
                     visibleCount: items.length,
                  }),
               ),
            ),
         );
      };
   },
});

export const RowCardStub = defineComponent({
   name: "RowCard",
   props: {
      title: { type: String, default: "" },
      tags: { type: Array, default: () => [] },
   },
   setup(props, { attrs, slots }) {
      return () => {
         const mergedClass = attrs.class
            ? `row-card ${String(attrs.class)}`
            : "row-card";

         return h("article", { ...attrs, class: mergedClass }, [
            h("h3", { class: "row-card-title" }, props.title),
            h(
               "div",
               { class: "row-card-tags" },
               (props.tags as any[]).map((tag, index) =>
                  h(
                     "span",
                     { class: "row-card-tag", "data-index": String(index) },
                     typeof tag === "string" ? tag : String(tag?.label ?? ""),
                  ),
               ),
            ),
            slots.content
               ? h("div", { class: "row-card-content" }, slots.content())
               : null,
            slots.footer
               ? h("div", { class: "row-card-footer" }, slots.footer())
               : null,
            slots.action
               ? h("div", { class: "row-card-action" }, slots.action())
               : null,
         ]);
      };
   },
});

export const LoaderStub = defineComponent({
   name: "Loader",
   setup() {
      return () => h("div", "loading");
   },
});
