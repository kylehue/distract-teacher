import { vi } from "vitest";

export function createSocketMock() {
   const handlers = new Map<string, Function[]>();

   const socket = {
      id: "sid-1",
      connected: false,
      on: vi.fn((event: string, handler: Function) => {
         const arr = handlers.get(event) ?? [];
         arr.push(handler);
         handlers.set(event, arr);
      }),
      off: vi.fn((event: string, handler: Function) => {
         const arr = handlers.get(event) ?? [];
         handlers.set(
            event,
            arr.filter((h) => h !== handler),
         );
      }),
      once: vi.fn((event: string, handler: Function) => {
         const wrapper = (...args: any[]) => {
            handler(...args);
            socket.off(event, wrapper);
         };
         socket.on(event, wrapper);
      }),
      emit: vi.fn(),
      connect: vi.fn(() => {
         socket.connected = true;
      }),
      disconnect: vi.fn(() => {
         socket.connected = false;
      }),
      _emitServer(event: string, payload: any) {
         for (const h of handlers.get(event) ?? []) h(payload);
      },
   } as any;

   return socket;
}
