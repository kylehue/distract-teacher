import { ref, onUnmounted, onMounted } from "vue";
import {
   Room,
   RoomEvent,
   RemoteTrack,
   RemoteTrackPublication,
   RemoteParticipant,
} from "livekit-client";
import { useFetch } from "./use-fetch";
import { useAuthStore } from "./use-auth-store";

export interface Participant {
   identity: string;
   track: RemoteTrack;
   publication: RemoteTrackPublication;
}

export function useLiveKit() {
   const room = ref<Room | null>(null);
   const participants = ref<Participant[]>([]);
   const fetchToken = useFetch<string>("/api/livekit-token/teacher", "POST");
   const auth = useAuthStore();

   const isConnected = ref(false);

   function addParticipantTrack(
      track: RemoteTrack,
      pub: RemoteTrackPublication,
      participant: RemoteParticipant,
   ) {
      if (track.kind !== "video") return;

      const exists = participants.value.some(
         (p) => p.publication.trackSid === pub.trackSid,
      );

      if (exists) return;

      participants.value.push({
         identity: participant.identity,
         track,
         publication: pub,
      });
   }

   async function connect(roomCode: string) {
      const url = import.meta.env.VITE_LIVEKIT_URL;
      const teacherId = auth.teacher?.id;
      if (!teacherId) throw new Error("Teacher not found");
      const fetchTokenResult = await fetchToken.execute({
         body: {
            identity: `teacher:${teacherId}`,
            room: roomCode,
         },
      });
      const token = fetchTokenResult.data;
      if (!token) throw new Error("Failed to generate livekit token");

      const _room = new Room({
         adaptiveStream: true,
         dynacast: true,
      });

      room.value = _room;

      await _room.connect(url, token, {
         autoSubscribe: true,
      });

      isConnected.value = true;

      // put existing
      for (const participant of _room.remoteParticipants.values()) {
         for (const pub of participant.trackPublications.values()) {
            if (pub.track) {
               addParticipantTrack(pub.track, pub, participant);
            }
         }
      }

      // track subscribed (NEW stream)
      _room.on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
         addParticipantTrack(track, pub, participant);
      });

      // track unsubscribed (REMOVE stream)
      _room.on(
         RoomEvent.TrackUnsubscribed,
         (
            track: RemoteTrack,
            pub: RemoteTrackPublication,
            participant: RemoteParticipant,
         ) => {
            participants.value = participants.value.filter(
               (p) => p.publication.trackSid !== pub.trackSid,
            );
         },
      );

      // participant disconnected
      _room.on(
         RoomEvent.ParticipantDisconnected,
         (participant: RemoteParticipant) => {
            participants.value = participants.value.filter(
               (p) => p.identity !== participant.identity,
            );
         },
      );
   }

   function disconnect() {
      if (room.value) {
         room.value.disconnect();
         room.value = null;
         participants.value = [];
         isConnected.value = false;
      }
   }

   onUnmounted(() => {
      disconnect();
   });

   return {
      room,
      participants,
      isConnected,
      connect,
      disconnect,
   };
}
