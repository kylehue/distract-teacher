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
import { inject } from "vue";
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";

const canvas = useTemplateRef("canvas");
const themeVars = useThemeVars();
const theme = inject(THEME_INJECTION_KEY)!;

let ctx: CanvasRenderingContext2D | null = null;
let raf = 0;
let width = 0;
let height = 0;

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
const gridGap = ref(48);          // adjustable
const gridLineAlpha = ref(0.1);  // subtle

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

function drawGrid() {
   if (!ctx) return;

   const gap = Math.max(8, Math.floor(gridGap.value));
   const color = toRgba(themeVars.value.textColor1, gridLineAlpha.value);

   ctx.save();
   ctx.globalCompositeOperation = "source-over";
   ctx.filter = "none";
   ctx.lineWidth = 1;
   ctx.strokeStyle = color;

   ctx.beginPath();

   for (let x = -gap * 0.2; x <= width; x += gap) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
   }

   for (let y = -gap * 0.2; y <= height; y += gap) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
   }

   ctx.stroke();
   ctx.restore();
}

onMounted(() => {
   if (!canvas.value) return;

   const c = canvas.value;
   const dpr = window.devicePixelRatio || 1;

   const resize = () => {
      const rect = c.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      gridGap.value = Math.max(48, width / 20);

      c.width = width * dpr;
      c.height = height * dpr;

      ctx = c.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
   };

   resize();
   window.addEventListener("resize", resize);

   let lastTime = performance.now();
   const animate = (time: number) => {
      if (!ctx) return;
      const delta = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      spawnTimer += delta;
      if (spawnTimer >= spawnInterval) {
         spawnTimer = 0;
         spawnLight();
      }

      for (let i = lights.length - 1; i >= 0; i--) {
         const light = lights[i];

         light.life += delta;
         light.decay += 1;
         light.alpha = Math.sin((light.life / light.maxLife) * Math.PI);
         light.y -= light.vy * (delta / 16);

         drawLight(light);

         if (light.life >= light.maxLife || light.y + light.radius < 0) {
            lights.splice(i, 1);
         }
      }

      // grid first (background)
      drawGrid();

      raf = requestAnimationFrame(animate);
   };

   raf = requestAnimationFrame(animate);

   function spawnLight() {
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

      ctx.globalCompositeOperation = "color-dodge";
      ctx.filter = "blur(100px)";

      const gradient = ctx.createRadialGradient(
         light.x,
         light.y,
         light.decay,
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
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";
      ctx.filter = "none";
   }

   onBeforeUnmount(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
   });
});
</script>
