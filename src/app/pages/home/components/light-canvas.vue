<template>
   <canvas
      ref="canvas"
      class="absolute inset-0 w-full h-full pointer-events-none"
      :class="{
         'mix-blend-darken': theme === 'light',
         'mix-blend-lighten': theme === 'dark',
      }"
   />
</template>

<script setup lang="ts">
import { THEME_INJECTION_KEY } from "@/lib/injection-keys";
import { useThemeVars } from "naive-ui";
import { inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useTemplateRef } from "vue";

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");
const themeVars = useThemeVars();
const theme = inject(THEME_INJECTION_KEY)!;

let ctx: CanvasRenderingContext2D | null = null;
let raf = 0;

let width = 0; // CSS px
let height = 0; // CSS px
let dpr = 1;

type Light = {
   x: number;
   y: number;
   radius: number;
   alpha: number;
   life: number;
   maxLife: number;
   vy: number;
   color: [number, number, number];
   decay: number;
};

const lights: Light[] = [];

// ---- GRID SETTINGS ----
const gridGap = ref(48);
const gridLineAlpha = ref(0.1);

// cached grid pattern
let gridCanvas: HTMLCanvasElement | OffscreenCanvas | null = null;
let gridCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null =
   null;
let gridPattern: CanvasPattern | null = null;

// spawn config
const colors = [
   themeVars.value.primaryColor,
   themeVars.value.primaryColorHover,
   themeVars.value.primaryColorPressed,
   themeVars.value.successColor,
];

const spawnInterval = 400;
let spawnTimer = 0;

function random(min: number, max: number) {
   return Math.random() * (max - min) + min;
}

function hexToRgb(hex: string): [number, number, number] {
   hex = hex.replace(/^#/, "");
   if (hex.length === 3) {
      hex = hex
         .split("")
         .map((c) => c + c)
         .join("");
   }
   const r = parseInt(hex.slice(0, 2), 16);
   const g = parseInt(hex.slice(2, 4), 16);
   const b = parseInt(hex.slice(4, 6), 16);
   return [r, g, b];
}

function toRgba(color: string, alpha: number) {
   const c = color.trim();

   if (c.startsWith("rgba(")) {
      return c.replace(/rgba\(([^)]+)\)/, (_m, inner) => {
         const parts = inner.split(",").map((p: string) => p.trim());
         return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
      });
   }

   if (c.startsWith("rgb(")) {
      return c.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
   }

   if (c.startsWith("#")) {
      const [r, g, b] = hexToRgb(c);
      return `rgba(${r},${g},${b},${alpha})`;
   }

   return c;
}

/**
 * Create/update cached grid pattern.
 * This makes zoom/resizes waaay cheaper because we don't re-stroke thousands of lines every frame.
 */
function rebuildGridPattern() {
   const c = canvas.value;
   if (!c || !ctx) return;

   const gap = Math.max(8, Math.floor(gridGap.value));
   const stroke = toRgba(themeVars.value.textColor1, gridLineAlpha.value);

   // use 2x gap tile so pattern doesn't look too repetitive with half-pixel offsets
   const tileW = gap * 2;
   const tileH = gap * 2;

   // OffscreenCanvas if available (better), fallback to normal canvas
   if (!gridCanvas) {
      gridCanvas =
         typeof OffscreenCanvas !== "undefined"
            ? new OffscreenCanvas(tileW, tileH)
            : document.createElement("canvas");
   }

   gridCanvas.width = tileW;
   gridCanvas.height = tileH;

   gridCtx = gridCanvas.getContext("2d")!;
   if (!gridCtx) return;

   // clear tile
   gridCtx.clearRect(0, 0, tileW, tileH);

   gridCtx.save();
   gridCtx.globalCompositeOperation = "source-over";
   gridCtx.lineWidth = 1;
   gridCtx.strokeStyle = stroke;

   // crisp lines: draw at .5 in tile space
   gridCtx.beginPath();

   // vertical lines at x=0 and x=gap
   for (const x of [0, gap]) {
      gridCtx.moveTo(x + 0.5, 0);
      gridCtx.lineTo(x + 0.5, tileH);
   }

   // horizontal lines at y=0 and y=gap
   for (const y of [0, gap]) {
      gridCtx.moveTo(0, y + 0.5);
      gridCtx.lineTo(tileW, y + 0.5);
   }

   gridCtx.stroke();
   gridCtx.restore();

   // create pattern on main ctx
   gridPattern = ctx.createPattern(gridCanvas as any, "repeat");
}

function drawGrid() {
   if (!ctx || !gridPattern) return;

   ctx.save();
   ctx.globalCompositeOperation = "source-over";
   ctx.filter = "none";
   ctx.fillStyle = gridPattern;

   // fill entire viewport with the cached pattern
   ctx.fillRect(0, 0, width, height);
   ctx.restore();
}

function spawnLight() {
   // keep it heavy but sane
   const radius = 200 + random(width * 0.25, width * 0.5);
   const x = random(0, width);
   const y = height + radius / 2;
   const maxLife = spawnInterval + random(2000, 2500);
   const vy = random(0.5, 1);
   const colorHex = colors[Math.floor(Math.random() * colors.length)];
   const color = hexToRgb(colorHex);

   lights.push({
      x,
      y,
      radius,
      alpha: 0,
      life: 0,
      maxLife,
      vy,
      color,
      decay: 0,
   });
}

function drawLight(light: Light) {
   if (!ctx) return;

   // cap blur relative to DPR so zoom doesn't murder perf
   const blurPx = Math.min(100, 100 / Math.max(1, dpr));

   ctx.save();
   ctx.globalCompositeOperation = "color-dodge";
   ctx.filter = `blur(${blurPx}px)`;

   const gradient = ctx.createRadialGradient(
      light.x,
      light.y,
      Math.max(0, light.decay),
      light.x,
      light.y,
      light.radius + light.decay,
   );

   const [r, g, b] = light.color;
   const multiplier = theme.value === "light" ? 1 : 0.3;

   gradient.addColorStop(0, `rgba(255,255,255,${light.alpha * multiplier})`);
   gradient.addColorStop(
      0.4,
      `rgba(${r},${g},${b},${light.alpha * multiplier})`,
   );
   gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

   ctx.fillStyle = gradient;

   // don't fill the whole canvas; only fill the affected region (+pad for blur).
   const pad = blurPx * 3; // conservative padding to avoid clipped blur edges
   const x0 = Math.max(0, light.x - (light.radius + light.decay + pad));
   const y0 = Math.max(0, light.y - (light.radius + light.decay + pad));
   const x1 = Math.min(width, light.x + (light.radius + light.decay + pad));
   const y1 = Math.min(height, light.y + (light.radius + light.decay + pad));

   ctx.fillRect(x0, y0, x1 - x0, y1 - y0);

   ctx.restore();
}

onMounted(() => {
   const c = canvas.value;
   if (!c) return;

   let resizeRaf = 0;
   const resize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
         lights.length = 0;
         const rect = c.getBoundingClientRect();
         width = Math.max(1, Math.floor(rect.width));
         height = Math.max(1, Math.floor(rect.height));

         // dynamic DPR: zooming changes this
         dpr = window.devicePixelRatio || 1;

         // avoid reallocating if same size
         const nextW = Math.max(1, Math.floor(width * dpr));
         const nextH = Math.max(1, Math.floor(height * dpr));

         if (c.width !== nextW) c.width = nextW;
         if (c.height !== nextH) c.height = nextH;

         ctx = c.getContext("2d", { alpha: true });

         // draw in CSS pixel space
         ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

         // update responsive gap
         gridGap.value = Math.max(48, width / 20);

         // rebuild cached grid whenever dimensions/theme vars change
         rebuildGridPattern();
      });
   };

   // run once
   resize();

   // resize & zoom: resize fires a lot; throttled above
   window.addEventListener("resize", resize, { passive: true });

   // also rebuild grid if theme vars / theme change (colors/line color changes)
   const stopWatch = watch(
      () => [
         theme.value,
         themeVars.value.textColor1,
         gridGap.value,
         gridLineAlpha.value,
      ],
      () => {
         // just rebuild the pattern; super cheap
         rebuildGridPattern();
      },
      { flush: "post" },
   );

   let lastTime = performance.now();

   const animate = (time: number) => {
      if (!ctx) return;

      const delta = time - lastTime;
      lastTime = time;

      // clear in CSS pixels (transform handles DPR)
      ctx.clearRect(0, 0, width, height);

      spawnTimer += delta;
      if (spawnTimer >= spawnInterval) {
         spawnTimer = 0;
         spawnLight();
      }

      // draw lights first
      for (let i = lights.length - 1; i >= 0; i--) {
         const light = lights[i];

         light.life += delta;
         light.decay += 1;

         // avoid NaN if maxLife is weird
         const t = Math.min(1, Math.max(0, light.life / Math.max(1, light.maxLife)));
         light.alpha = Math.sin(t * Math.PI);

         light.y -= light.vy * (delta / 16);

         drawLight(light);

         if (light.life >= light.maxLife || light.y + light.radius < 0) {
            lights.splice(i, 1);
         }
      }

      drawGrid();

      raf = requestAnimationFrame(animate);
   };

   raf = requestAnimationFrame(animate);

   onBeforeUnmount(() => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", resize);
      stopWatch();

      // help GC
      lights.length = 0;
      ctx = null;
      gridCtx = null;
      gridCanvas = null;
      gridPattern = null;
   });
});
</script>
