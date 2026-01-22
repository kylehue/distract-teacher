import { RoomInfo } from "@/lib/typings";
import { ref } from "vue";

const isShowing = ref(false);
const room = ref<RoomInfo>();

export function useAnnouncement() {
   function show(_room: RoomInfo) {
      if (!_room) {
         throw new Error("Room is required to show announcement");
      }

      room.value = _room;
      isShowing.value = true;
   }

   function hide() {
      room.value = undefined;
      isShowing.value = false;
   }

   return { isShowing, room, show, hide };
}
