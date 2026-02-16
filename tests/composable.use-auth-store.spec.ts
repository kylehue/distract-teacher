import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

const replaceMock = vi.fn();
const clearMock = vi.fn();
const currentRoute = { value: { path: "/login" } };

const socketHandlers = new Map<string, Function>();
const socketApi = {
   on: vi.fn((event: string, handler: Function) =>
      socketHandlers.set(event, handler),
   ),
   socket: {
      connected: false,
      connect: vi.fn(),
      disconnect: vi.fn(),
   },
};

vi.mock("vue-router", () => ({
   useRouter: () => ({ replace: replaceMock, currentRoute }),
}));

vi.mock("@/app/composables/use-store", () => ({
   useStore: () => ({ clear: clearMock }),
}));

vi.mock("@/app/composables/use-socket", () => ({
   useSocket: () => socketApi,
}));

vi.mock("@/app/composables/use-fetch", () => ({
   useFetch: (url: string) => {
      if (url === "/api/login") {
         return {
            execute: vi.fn(async () => ({
               data: { teacher: { id: "t1", username: "u" } },
            })),
         };
      }
      if (url === "/api/validate_session") {
         return {
            execute: vi.fn(async () => ({
               data: { teacher: { id: "t1", username: "u" } },
            })),
         };
      }
      return {
         execute: vi.fn(async () => ({ message: "ok" })),
      };
   },
}));

import { useAuthStore } from "@/app/composables/use-auth-store";

describe("useAuthStore", () => {
   beforeEach(() => {
      setActivePinia(createPinia());
      socketHandlers.clear();
      currentRoute.value.path = "/login";
      socketApi.socket.connected = false;
      vi.clearAllMocks();
   });

   it("logs in with credentials and routes to dashboard", async () => {
      const auth = useAuthStore();
      await auth.loginWithCredentials("u", "p");

      expect(auth.isAuthenticated).toBe(true);
      expect(auth.teacher?.id).toBe("t1");
      expect(socketApi.socket.connect).toHaveBeenCalled();
      expect(replaceMock).toHaveBeenCalledWith("/dashboard");
   });

   it("logs in with cookie and opens protected page", async () => {
      const auth = useAuthStore();
      await auth.loginWithCookie();
      expect(auth.isAuthenticated).toBe(true);
      expect(replaceMock).toHaveBeenCalledWith("/dashboard");
   });

   it("logs out and clears store", async () => {
      const auth = useAuthStore();
      auth.isAuthenticated = true;
      socketApi.socket.connected = true;
      currentRoute.value.path = "/dashboard";

      await auth.logout();

      expect(auth.isAuthenticated).toBe(false);
      expect(socketApi.socket.disconnect).toHaveBeenCalled();
      expect(replaceMock).toHaveBeenCalledWith("/login");
      expect(clearMock).toHaveBeenCalled();
   });

   it("updates current teacher on realtime account update", () => {
      const auth = useAuthStore();
      auth.teacher = { id: "t1", username: "old" } as any;
      socketHandlers.get("teacher:update_account")?.({
         teacher: { id: "t1", username: "new" },
      });
      expect(auth.teacher?.username).toBe("new");
   });
});
