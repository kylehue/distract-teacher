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
   if (hex.length !== 6) throw new Error("Invalid hex color");
   const r = parseInt(hex.slice(0, 2), 16);
   const g = parseInt(hex.slice(2, 4), 16);
   const b = parseInt(hex.slice(4, 6), 16);
   return [r, g, b];
}

onMounted(() => {
   if (!canvas.value) return;

   const c = canvas.value;
   const dpr = window.devicePixelRatio || 1;

   const resize = () => {
      width = 800;
      height = 600;
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

      // spawn lights at intervals
      spawnTimer += delta;
      if (spawnTimer >= spawnInterval) {
         spawnTimer = 0;
         spawnLight();
      }

      // update + draw lights
      for (let i = lights.length - 1; i >= 0; i--) {
         const light = lights[i];

         light.life += delta;
         light.decay += 1;
         light.alpha = Math.sin((light.life / light.maxLife) * Math.PI); // fade in/out
         light.y -= light.vy * (delta / 16); // drift upward, normalize to ~60fps

         drawLight(light);

         if (light.life >= light.maxLife || light.y + light.radius < 0) {
            lights.splice(i, 1);
         }
      }

      raf = requestAnimationFrame(animate);
   };

   raf = requestAnimationFrame(animate);

   function spawnLight() {
      const radius = 200 + random(width * 0.25, width * 0.5);
      const x = random(0, width);
      const y = height + radius / 2; // off-screen bottom
      const maxLife = spawnInterval + random(2000, 2500);
      const vy = random(0.5, 1); // upward speed
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
      ctx.filter = "blur(100px)";
      ctx.globalCompositeOperation = "color-dodge";
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
   }

   onBeforeUnmount(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
   });
});
</script>
