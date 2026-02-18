import { defineComponent, h } from "vue";
import { vi } from "vitest";

type MessageApi = {
   create: ReturnType<typeof vi.fn>;
   success: ReturnType<typeof vi.fn>;
   error: ReturnType<typeof vi.fn>;
   warning: ReturnType<typeof vi.fn>;
   info: ReturnType<typeof vi.fn>;
};

type NaiveUiMockState = {
   message: MessageApi;
   scrollbar: {
      scrollTo: ReturnType<typeof vi.fn>;
   };
};

function flattenOptions(options: any[]): any[] {
   return options.flatMap((option) => [
      option,
      ...(option?.children ? flattenOptions(option.children) : []),
   ]);
}

function createGenericComponentStub(name: string) {
   return defineComponent({
      name,
      setup(_, { slots }) {
         return () => h("div", { class: `stub-${name}` }, slots.default?.());
      },
   });
}

export const naiveUiMockState: NaiveUiMockState = {
   message: {
      create: vi.fn(),
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
      info: vi.fn(),
   },
   scrollbar: {
      scrollTo: vi.fn(),
   },
};

export function resetNaiveUiMockState() {
   naiveUiMockState.message.create.mockReset();
   naiveUiMockState.message.success.mockReset();
   naiveUiMockState.message.error.mockReset();
   naiveUiMockState.message.warning.mockReset();
   naiveUiMockState.message.info.mockReset();
   naiveUiMockState.scrollbar.scrollTo.mockReset();
}

export function createUnifiedNaiveUiMock() {
   const explicit: Record<string, any> = {
      NButton: defineComponent({
         name: "NButton",
         props: {
            disabled: { type: Boolean, default: false },
            loading: { type: Boolean, default: false },
         },
         emits: ["click"],
         setup(props, { slots, emit }) {
            return () =>
               h(
                  "button",
                  {
                     type: "button",
                     disabled: props.disabled || props.loading,
                     onClick: (event: MouseEvent) => emit("click", event),
                  },
                  slots.default?.(),
               );
         },
      }),
      NText: defineComponent({
         name: "NText",
         props: {
            class: { type: String, default: "" },
         },
         setup(props, { slots }) {
            return () => h("span", { class: props.class }, slots.default?.());
         },
      }),
      NCard: defineComponent({
         name: "NCard",
         props: {
            title: { type: String, default: "" },
            closable: { type: Boolean, default: false },
         },
         emits: ["close"],
         setup(props, { slots, emit }) {
            return () =>
               h("section", { class: "n-card" }, [
                  props.title
                     ? h("h2", { class: "card-title" }, props.title)
                     : null,
                  slots["header-extra"]?.(),
                  props.closable
                     ? h(
                          "button",
                          {
                             type: "button",
                             class: "card-close",
                             onClick: () => emit("close"),
                          },
                          "close",
                       )
                     : null,
                  slots.default?.(),
               ]);
         },
      }),
      NIcon: defineComponent({
         name: "NIcon",
         props: {
            size: { type: Number, default: undefined },
         },
         setup(props, { slots }) {
            return () =>
               h(
                  "i",
                  { "data-size": props.size ? String(props.size) : "" },
                  slots.default?.(),
               );
         },
      }),
      NDivider: defineComponent({
         name: "NDivider",
         setup() {
            return () => h("hr");
         },
      }),
      NTooltip: defineComponent({
         name: "NTooltip",
         setup(_, { slots }) {
            return () => h("div", [slots.trigger?.(), slots.default?.()]);
         },
      }),
      NEmpty: defineComponent({
         name: "NEmpty",
         props: {
            description: { type: String, default: "" },
         },
         setup(props, { slots }) {
            return () =>
               h("div", { class: "n-empty" }, [
                  slots.icon?.(),
                  props.description ? h("p", props.description) : null,
                  slots.default?.(),
               ]);
         },
      }),
      NConfigProvider: defineComponent({
         name: "NConfigProvider",
         setup(_, { slots }) {
            return () => h("div", slots.default?.());
         },
      }),
      NModal: defineComponent({
         name: "NModal",
         props: {
            show: { type: Boolean, default: false },
         },
         setup(props, { slots }) {
            return () =>
               props.show
                  ? h("div", { class: "n-modal" }, slots.default?.())
                  : null;
         },
      }),
      NInput: defineComponent({
         name: "NInput",
         props: {
            value: { type: String, default: "" },
            placeholder: { type: String, default: "" },
            class: { type: String, default: "" },
            type: { type: String, default: "text" },
            clearable: { type: Boolean, default: false },
         },
         emits: ["update:value", "focus", "blur", "keydown.enter", "clear"],
         setup(props, { emit, slots }) {
            return () =>
               h("div", [
                  slots.prefix?.(),
                  h("input", {
                     value: props.value,
                     placeholder: props.placeholder,
                     class: props.class,
                     type: props.type,
                     onInput: (event: Event) =>
                        emit(
                           "update:value",
                           (event.target as HTMLInputElement).value,
                        ),
                     onFocus: () => emit("focus"),
                     onBlur: () => emit("blur"),
                     onKeydown: (event: KeyboardEvent) => {
                        if (event.key === "Enter") emit("keydown.enter");
                     },
                  }),
                  slots.suffix?.(),
                  props.clearable
                     ? h(
                          "button",
                          {
                             type: "button",
                             onClick: () => emit("clear"),
                          },
                          "clear",
                       )
                     : null,
               ]);
         },
      }),
      NPopselect: defineComponent({
         name: "NPopselect",
         props: {
            show: { type: Boolean, default: false },
            options: { type: Array, default: () => [] },
            value: {
               type: [Array, String, Number, Boolean, Object],
               default: undefined,
            },
         },
         emits: ["update:show", "update:value"],
         setup(_, { slots }) {
            return () => h("div", slots.default?.());
         },
      }),
      NDropdown: defineComponent({
         name: "NDropdown",
         props: {
            options: { type: Array, default: () => [] },
            renderLabel: { type: Function, default: undefined },
         },
         emits: ["select"],
         setup(props, { slots, emit }) {
            return () =>
               h("div", { class: "dropdown" }, [
                  slots.default?.(),
                  ...flattenOptions(props.options as any[])
                     .filter((option) => option?.type !== "divider")
                     .map((option) =>
                        h(
                           "button",
                           {
                              type: "button",
                              class: "dropdown-option menu-item",
                              "data-key": String(option?.key),
                              disabled: !!option?.disabled,
                              onClick: () => {
                                 if (option?.disabled) return;
                                 emit("select", option?.key, option);
                              },
                           },
                           props.renderLabel
                              ? [(props.renderLabel as any)(option)]
                              : [String(option?.label ?? "")],
                        ),
                     ),
               ]);
         },
      }),
      NPagination: defineComponent({
         name: "NPagination",
         props: {
            page: { type: Number, default: 1 },
         },
         emits: ["update:page"],
         setup(props, { emit }) {
            return () =>
               h(
                  "button",
                  {
                     type: "button",
                     class: "next-page",
                     "data-page": String(props.page),
                     onClick: () => emit("update:page", props.page + 1),
                  },
                  "next",
               );
         },
      }),
      NTag: defineComponent({
         name: "NTag",
         props: {
            type: { type: String, default: "" },
            size: { type: String, default: "small" },
            bordered: { type: Boolean, default: false },
            round: { type: Boolean, default: false },
            closable: { type: Boolean, default: false },
         },
         emits: ["close"],
         setup(props, { slots, emit }) {
            return () =>
               h(
                  "span",
                  {
                     class: "tag",
                     "data-type": props.type,
                     "data-size": props.size,
                     "data-bordered": String(props.bordered),
                     "data-round": String(props.round),
                  },
                  [
                     slots.default?.(),
                     props.closable
                        ? h(
                             "button",
                             {
                                type: "button",
                                class: "tag-close",
                                onClick: () => emit("close"),
                             },
                             "x",
                          )
                        : null,
                  ],
               );
         },
      }),
      NSwitch: defineComponent({
         name: "NSwitch",
         props: {
            value: { type: Boolean, default: false },
         },
         emits: ["update-value"],
         setup(props, { emit }) {
            return () =>
               h("button", {
                  type: "button",
                  "data-is-dark": String(props.value),
                  onClick: () => emit("update-value", !props.value),
               });
         },
      }),
      NScrollbar: defineComponent({
         name: "NScrollbar",
         setup(_, { slots, expose }) {
            expose({ scrollTo: naiveUiMockState.scrollbar.scrollTo });
            return () => h("div", { class: "scrollbar" }, slots.default?.());
         },
      }),
      NDataTable: defineComponent({
         name: "NDataTable",
         props: {
            data: { type: Array, default: () => [] },
         },
         setup(props, { slots }) {
            return () =>
               h("div", { class: "n-data-table" }, [
                  h(
                     "div",
                     { "data-testid": "rooms-table" },
                     (props.data as any[]).map((row) =>
                        h(
                           "p",
                           { class: "room-row" },
                           `${row?.title ?? ""}|${row?.code ?? ""}|${row?.status ?? ""}`,
                        ),
                     ),
                  ),
                  h(
                     "div",
                     { "data-testid": "trash-table" },
                     (props.data as any[]).map((row) =>
                        h(
                           "p",
                           { class: "trash-row" },
                           `${row?.title ?? ""}|${row?.code ?? ""}`,
                        ),
                     ),
                  ),
                  slots.default?.(),
               ]);
         },
      }),
      NLayout: defineComponent({
         name: "NLayout",
         setup(_, { slots }) {
            return () => h("div", slots.default?.());
         },
      }),
      NLayoutContent: defineComponent({
         name: "NLayoutContent",
         setup(_, { slots }) {
            return () => h("div", slots.default?.());
         },
      }),
      NForm: defineComponent({
         name: "NForm",
         setup(_, { slots }) {
            return () => h("form", slots.default?.());
         },
      }),
      NFormItem: defineComponent({
         name: "NFormItem",
         props: {
            feedback: { type: String, default: "" },
         },
         setup(props, { slots }) {
            return () =>
               h("div", [
                  slots.default?.(),
                  h("p", { class: "feedback" }, props.feedback),
               ]);
         },
      }),
      NTabs: defineComponent({
         name: "NTabs",
         props: {
            value: { type: String, default: "" },
            type: { type: String, default: "" },
         },
         emits: ["update:value"],
         setup(_, { slots }) {
            return () => h("div", slots.default?.());
         },
      }),
      NTab: defineComponent({
         name: "NTab",
         props: {
            name: { type: String, default: "" },
         },
         setup(_, { slots }) {
            return () => h("div", slots.default?.());
         },
      }),
      NBadge: defineComponent({
         name: "NBadge",
         props: {
            value: { type: [String, Number], default: "" },
         },
         setup(props, { slots }) {
            return () =>
               h("span", { class: "badge" }, [
                  String(props.value),
                  slots.default?.(),
               ]);
         },
      }),
      NCheckbox: defineComponent({
         name: "NCheckbox",
         props: {
            checked: { type: Boolean, default: false },
         },
         emits: ["update:checked"],
         setup(props, { slots, emit }) {
            return () =>
               h(
                  "button",
                  {
                     type: "button",
                     "data-checked": String(props.checked),
                     onClick: () => emit("update:checked", !props.checked),
                  },
                  slots.default?.(),
               );
         },
      }),
      useMessage: () => naiveUiMockState.message,
      useThemeVars: () => ({ textColor3: "#888" }),
      lightTheme: {},
      darkTheme: {},
   };

   const generated = new Map<string, any>();

   return new Proxy(explicit, {
      get(target, prop: string | symbol) {
         if (typeof prop !== "string") return Reflect.get(target, prop);
         if (prop in target) return (target as any)[prop];
         if (prop.startsWith("N")) {
            if (!generated.has(prop)) {
               generated.set(prop, createGenericComponentStub(prop));
            }
            return generated.get(prop);
         }
         if (prop.startsWith("use")) {
            return () => ({});
         }
         if (prop.endsWith("Theme")) {
            return {};
         }
         return undefined;
      },
   });
}

export function installNaiveUiMock() {
   vi.mock("naive-ui", () => createUnifiedNaiveUiMock());
}
