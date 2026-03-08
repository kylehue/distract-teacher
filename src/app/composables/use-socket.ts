import { onUnmounted, unref } from "vue";
import { getSocket } from "@/plugins/socket";

export function useSocket() {
   const socket = getSocket();

   function on(
      event: string,
      handler: (data: Record<any, any>) => void,
      { autoClean = true } = {},
   ) {
      const wrappedHandler = (data: any) => handler(data);
      socket.on(event, wrappedHandler);
      if (autoClean) {
         onUnmounted(() => socket.off(event, wrappedHandler));
      }

      // dev logging
      if (process.env.NODE_ENV === "development") {
         const _test_handler_ = (args: any) => {
            console.log(`SERVER -> CLIENT (${event}):\n`, args);
         };
         socket.on(event, (data) => _test_handler_(data));
         if (autoClean) {
            onUnmounted(() => socket.off(event, _test_handler_));
         }
      }
   }

   function emit(event: string, data: Record<any, any> = {}) {
      socket.emit(event, unref(data));

      // dev logging
      if (process.env.NODE_ENV === "development") {
         console.log(`CLIENT -> SERVER (${event}):\n`, unref(data));
      }
   }

   return { socket, on, emit };
}
