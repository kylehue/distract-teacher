<template>
   <div class="tile">
      <video ref="videoRef" autoplay playsinline muted class="tile-video" />
      <div v-if="!videoTrack" class="tile-no-video">
         <PhUser size="50%" />
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import type { RemoteTrack } from "livekit-client";
import { PhUser } from "@phosphor-icons/vue";

const props = defineProps<{
   videoTrack: RemoteTrack | null | undefined;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);

function attach(track: RemoteTrack | null | undefined) {
   if (!track || !videoRef.value) return;
   track.attach(videoRef.value);
}

function detach(track: RemoteTrack | null | undefined) {
   if (!track || !videoRef.value) return;
   track.detach(videoRef.value);
}

watch(
   () => props.videoTrack,
   (newTrack, oldTrack) => {
      if (oldTrack) detach(oldTrack);
      if (newTrack) attach(newTrack);
   },
   { immediate: true },
);

onUnmounted(() => {
   detach(props.videoTrack);
});
</script>

<style scoped>
.tile {
   position: relative;
   border-radius: 2px;
   overflow: hidden;
   background: #1c1c1c;
   aspect-ratio: 16 / 9;
}
.tile-video {
   width: 100%;
   height: 100%;
   object-fit: cover;
   display: block;
}
.tile-no-video {
   position: absolute;
   inset: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   color: #555;
   font-size: 14px;
}
</style>
