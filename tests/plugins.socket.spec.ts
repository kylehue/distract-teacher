import { describe, expect, it, vi } from "vitest";

const { socket, pushMock } = vi.hoisted(() => {
   const handlers = new Map<string, Function[]>();
   const s = {
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
      once: vi.fn(),
      emit: vi.fn(),
      connect: vi.fn(),
      disconnect: vi.fn(),
      _emitServer(event: string, payload: any) {
         for (const h of handlers.get(event) ?? []) h(payload);
      },
   } as any;
   return { socket: s, pushMock: vi.fn() };
});

vi.mock("socket.io-client", () => ({
   io: vi.fn(() => socket),
}));

vi.mock("@/lib/router", () => ({
   router: { push: pushMock },
}));

import SocketPlugin, { getSocket } from "@/plugins/socket";

describe("plugins/socket", () => {
   it("installs handlers and exposes socket globally", () => {
      const app = { config: { globalProperties: {} } } as any;
      SocketPlugin.install(app);

      expect(app.config.globalProperties.$socket).toBe(socket);
      expect((window as any).$socket).toBe(socket);
      expect(getSocket()).toBe(socket);
   });

   it("routes unauthorized event", () => {
      const app = { config: { globalProperties: {} } } as any;
      SocketPlugin.install(app);

      socket._emitServer("unauthorized", {});
      expect(pushMock).toHaveBeenCalledWith("/unauthorized");
   });
});
