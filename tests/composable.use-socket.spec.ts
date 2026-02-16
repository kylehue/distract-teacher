import { describe, expect, it, vi } from "vitest";
import { createSocketMock } from "./support/socket-mock";

const socket = createSocketMock();

vi.mock("@/plugins/socket", () => ({
   getSocket: () => socket,
}));

import { useSocket } from "@/app/composables/use-socket";

describe("useSocket", () => {
   it("registers wrapped event handler with camelized payload", () => {
      const api = useSocket();
      const handler = vi.fn();

      api.on("teacher:update", handler, { autoClean: false });
      socket._emitServer("teacher:update", { some_key: 1 });

      expect(handler).toHaveBeenCalledWith({ someKey: 1 });
   });

   it("emits payload as-is", () => {
      const api = useSocket();
      api.emit("x:event", { a: 1 });
      expect(socket.emit).toHaveBeenCalledWith("x:event", { a: 1 });
   });
});
