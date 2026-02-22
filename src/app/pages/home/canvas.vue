<template>
   <div ref="container" class="relative content-canvas">
      <canvas
         ref="canvasB"
         class="fixed top-0 left-0 w-full h-full pointer-events-none"
      />
   </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const container = ref<HTMLElement | null>(null);
const canvasB = ref<HTMLCanvasElement | null>(null);

const HALF_PI = 0.5 * Math.PI;
const TAU = 2 * Math.PI;
const DEGREES_TO_RADIANS = Math.PI / 180;

const PIPE_COUNT = 15;
const PIPE_PROPERTY_COUNT = 8;
const PIPE_PROPERTIES_LENGTH = PIPE_COUNT * PIPE_PROPERTY_COUNT;

const TURN_COUNT = 8;
const TURN_AMOUNT = (360 / TURN_COUNT) * DEGREES_TO_RADIANS;
const TURN_CHANCE_RANGE = 100;

const BASE_SPEED = 0.5;
const SPEED_RANGE = 1;

const BASE_TTL = 100;
const TTL_RANGE = 300;

const BASE_WIDTH = 2;
const WIDTH_RANGE = 4;

const BASE_HUE = 180;
const HUE_RANGE = 90;

const PIPE_X = 0;
const PIPE_Y = 1;
const PIPE_DIRECTION = 2;
const PIPE_SPEED = 3;
const PIPE_LIFE = 4;
const PIPE_TTL = 5;
const PIPE_WIDTH = 6;
const PIPE_HUE = 7;

let offscreenCanvas: HTMLCanvasElement | null = null;
let offscreenContext: CanvasRenderingContext2D | null = null;
let visibleContext: CanvasRenderingContext2D | null = null;

let centerX = 0;
let centerY = 0;

let tick = 0;
let animationFrameId = 0;

let pipeProperties: Float32Array | null = null;

function random(min: number, max?: number): number {
   if (max === undefined) {
      max = min;
      min = 0;
   }
   return min + (max - min) * Math.random();
}

function fadeInOut(time: number, duration: number): number {
   const halfDuration = 0.5 * duration;
   return (
      Math.abs(((time + halfDuration) % duration) - halfDuration) / halfDuration
   );
}

function createCanvases(): void {
   if (!canvasB.value) return;

   offscreenCanvas = document.createElement("canvas");
   offscreenContext = offscreenCanvas.getContext("2d");
   visibleContext = canvasB.value.getContext("2d");

   centerX = 0;
   centerY = 0;
   tick = 0;
}

function resizeCanvases(): void {
   if (!canvasB.value) return;
   if (!offscreenCanvas || !offscreenContext || !visibleContext) return;

   const innerWidth = window.innerWidth;
   const innerHeight = window.innerHeight;

   offscreenCanvas.width = innerWidth;
   offscreenCanvas.height = innerHeight;

   canvasB.value.width = innerWidth;
   canvasB.value.height = innerHeight;

   centerX = 0.5 * offscreenCanvas.width;
   centerY = 0.5 * offscreenCanvas.height;
}

function clearCanvases(): void {
   if (!canvasB.value) return;
   if (!offscreenCanvas || !offscreenContext || !visibleContext) return;

   offscreenContext.clearRect(
      0,
      0,
      offscreenCanvas.width,
      offscreenCanvas.height,
   );
   visibleContext.clearRect(0, 0, canvasB.value.width, canvasB.value.height);
}

function initializePipes(): void {
   pipeProperties = new Float32Array(PIPE_PROPERTIES_LENGTH);

   for (let i = 0; i < PIPE_PROPERTIES_LENGTH; i += PIPE_PROPERTY_COUNT) {
      initializePipe(i);
   }
}

function initializePipe(index: number): void {
   if (!offscreenCanvas || !pipeProperties) return;

   const x = centerX + random(-50, 50) + Math.min(300, centerX / 2);
   const y = centerY + random(-50, 50);

   const direction = Math.round(random(1)) ? HALF_PI : TAU - HALF_PI;
   const speed = BASE_SPEED + random(SPEED_RANGE);

   const life = 0;
   const ttl = BASE_TTL + random(TTL_RANGE);

   const width = BASE_WIDTH + random(WIDTH_RANGE);
   const hue = BASE_HUE + random(HUE_RANGE);

   pipeProperties.set([x, y, direction, speed, life, ttl, width, hue], index);
}

function updatePipes(): void {
   tick += 1;

   for (let i = 0; i < PIPE_PROPERTIES_LENGTH; i += PIPE_PROPERTY_COUNT) {
      updatePipe(i);
   }
}
function updatePipe(index: number): void {
   if (!pipeProperties) return;

   let x = pipeProperties[index + PIPE_X];
   let y = pipeProperties[index + PIPE_Y];
   let direction = pipeProperties[index + PIPE_DIRECTION];

   let speed = pipeProperties[index + PIPE_SPEED];

   let life = pipeProperties[index + PIPE_LIFE];
   const ttl = pipeProperties[index + PIPE_TTL];

   const width = pipeProperties[index + PIPE_WIDTH];
   const hue = pipeProperties[index + PIPE_HUE];
   drawPipe(x, y, life, ttl, width, hue);

   if (speed === 0) {
      pipeProperties[index + PIPE_LIFE] = life + 1;
      return;
   }

   life += 1;

   x += Math.cos(direction) * speed;
   y += Math.sin(direction) * speed;

   const shouldTurnByChance =
      !(tick % Math.round(random(TURN_CHANCE_RANGE))) &&
      (!(Math.round(x) % 6) || !(Math.round(y) % 6));

   const turnBias = Math.round(random(1)) ? -1 : 1;
   direction += shouldTurnByChance ? TURN_AMOUNT * turnBias : 0;

   // If it leaves the canvas, freeze it in place
   if (isOutOfBounds(x, y, width * 2)) {
      speed = 0;
   }

   pipeProperties[index + PIPE_X] = x;
   pipeProperties[index + PIPE_Y] = y;
   pipeProperties[index + PIPE_DIRECTION] = direction;
   pipeProperties[index + PIPE_SPEED] = speed;
   pipeProperties[index + PIPE_LIFE] = life;

   // Don't reinitialize anymore (or only reinitialize pipes that haven't stopped)
   if (life > ttl && speed !== 0) {
      initializePipe(index);
   }
}

function isOutOfBounds(x: number, y: number, pad: number): boolean {
   if (!offscreenCanvas) return true;
   return (
      x < -pad ||
      x > offscreenCanvas.width + pad ||
      y < -pad ||
      y > offscreenCanvas.height + pad
   );
}

function drawPipe(
   x: number,
   y: number,
   life: number,
   ttl: number,
   width: number,
   hue: number,
): void {
   if (!offscreenContext) return;

   offscreenContext.save();
   offscreenContext.strokeStyle = `hsla(${hue},75%,50%,${fadeInOut(life, ttl) * 0.0525})`;
   offscreenContext.beginPath();
   offscreenContext.arc(x, y, width, 0, TAU);
   offscreenContext.stroke();
   offscreenContext.closePath();
   offscreenContext.restore();
}

function checkBoundsNoEffect(x: number, y: number): void {
   if (!offscreenCanvas) return;

   if (x > offscreenCanvas.width) x = 0;
   if (x < 0) x = offscreenCanvas.width;
   if (y > offscreenCanvas.height) y = 0;
   if (y < 0) y = offscreenCanvas.height;
}

function renderFrame(): void {
   if (!canvasB.value) return;
   if (!offscreenCanvas || !visibleContext) return;

   visibleContext.clearRect(0, 0, canvasB.value.width, canvasB.value.height);

   visibleContext.save();
   visibleContext.filter = "blur(12px)";
   visibleContext.drawImage(offscreenCanvas, 0, 0);
   visibleContext.restore();

   visibleContext.save();
   visibleContext.drawImage(offscreenCanvas, 0, 0);
   visibleContext.restore();
}

function animationLoop(): void {
   updatePipes();
   renderFrame();
   animationFrameId = window.requestAnimationFrame(animationLoop);
}

function resetAnimation(): void {
   tick = 0;
   resizeCanvases();
   clearCanvases();
   initializePipes();
}

function setup(): void {
   createCanvases();
   resetAnimation();
   animationFrameId = window.requestAnimationFrame(animationLoop);
}

function handleResize(): void {
   resetAnimation();
}

onMounted(function () {
   setup();
   window.addEventListener("resize", handleResize, { passive: true });
});

onBeforeUnmount(function () {
   window.cancelAnimationFrame(animationFrameId);
   window.removeEventListener("resize", handleResize);

   pipeProperties = null;

   offscreenContext = null;
   visibleContext = null;
   offscreenCanvas = null;
});
</script>

<style scoped>
.content-canvas {
   position: absolute;
   inset: 0;
   width: 100%;
   height: 100%;
}
</style>
