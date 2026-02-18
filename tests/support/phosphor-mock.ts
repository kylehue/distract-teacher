import { defineComponent, h } from "vue";
import { vi } from "vitest";

const KNOWN_ICONS = [
   "PhArrowCounterClockwise",
   "PhArrowLeft",
   "PhArrowsDownUp",
   "PhArrowSquareOut",
   "PhBell",
   "PhBellZ",
   "PhCopy",
   "PhDotsThreeVertical",
   "PhDownloadSimple",
   "PhFileXls",
   "PhFunnel",
   "PhFunnelSimple",
   "PhGear",
   "PhHouse",
   "PhInfo",
   "PhMagnifyingGlass",
   "PhMegaphoneSimple",
   "PhMoon",
   "PhPause",
   "PhPlay",
   "PhPlus",
   "PhPrinter",
   "PhSortAscending",
   "PhSortDescending",
   "PhStop",
   "PhSunDim",
   "PhTrash",
   "PhUser",
   "PhUserFocus",
   "PhUsers",
   "PhVideoCameraSlash",
   "PhX",
];

function createIconComponent(name: string) {
   return defineComponent({
      name,
      inheritAttrs: false,
      props: {
         color: { type: String, default: "" },
      },
      setup(props, { attrs, slots }) {
         return () =>
            h(
               "svg",
               {
                  ...attrs,
                  "data-icon": name,
                  "data-color": props.color,
               },
               slots.default?.(),
            );
      },
   });
}

export function createUnifiedPhosphorMock() {
   const exports: Record<string, any> = Object.fromEntries(
      KNOWN_ICONS.map((name) => [name, createIconComponent(name)]),
   );

   return new Proxy(exports, {
      has(_, prop: string | symbol) {
         return typeof prop === "string"
            ? prop.startsWith("Ph") || prop in exports
            : false;
      },
      get(target, prop: string | symbol) {
         if (prop === "__esModule") return true;
         if (typeof prop !== "string") return undefined;

         if (!(prop in target) && prop.startsWith("Ph")) {
            target[prop] = createIconComponent(prop);
         }

         return target[prop];
      },
      getOwnPropertyDescriptor(target, prop: string | symbol) {
         if (
            typeof prop === "string" &&
            !(prop in target) &&
            prop.startsWith("Ph")
         ) {
            target[prop] = createIconComponent(prop);
         }

         if (typeof prop === "string" && prop in target) {
            return {
               configurable: true,
               enumerable: true,
               writable: true,
               value: target[prop],
            };
         }

         return undefined;
      },
   });
}

export function installPhosphorMock() {
   vi.mock("@phosphor-icons/vue", () => createUnifiedPhosphorMock());
}
