import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/plugins/socket", () => ({
   getSocket: () => ({ connected: true, once: vi.fn() }),
}));

import { useFetch } from "@/app/composables/use-fetch";

describe("useFetch", () => {
   beforeEach(() => {
      vi.restoreAllMocks();
   });

   it("executes successful request and camel-cases response", async () => {
      vi.stubGlobal(
         "fetch",
         vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ message: "ok", data: { teacher_id: "t1" } }),
         }),
      );

      const api = useFetch<{ teacherId: string }>("/api/login", "POST");
      const res = await api.execute({ body: { username: "u" } });

      expect((fetch as any).mock.calls[0][0]).toContain("/api/login");
      expect(res.data?.teacherId).toBe("t1");
      expect(api.isLoading).toBe(false);
   });

   it("throws structured api error on failed response", async () => {
      vi.stubGlobal(
         "fetch",
         vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
               detail: { message: "Bad", field_errors: { a: "b" } },
            }),
         }),
      );

      const api = useFetch("/api/login", "POST");
      await expect(api.execute()).rejects.toMatchObject({ message: "Bad" });
      expect(api.error?.message).toBe("Bad");
      expect(api.error?.fieldErrors).toEqual({ a: "b" });
   });

   it("resolves url params", async () => {
      vi.stubGlobal(
         "fetch",
         vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ message: "ok" }),
         }),
      );

      const api = useFetch("/api/rooms/:roomId", "GET");
      await api.execute({ params: { roomId: "abc" } });

      expect((fetch as any).mock.calls[0][0]).toContain("/api/rooms/abc");
   });

   it("encodes unsafe url params", async () => {
      vi.stubGlobal(
         "fetch",
         vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ message: "ok" }),
         }),
      );

      const api = useFetch("/api/rooms/:roomId/students/:studentId", "GET");
      await api.execute({ params: { roomId: "a/b", studentId: "x y" } });

      expect((fetch as any).mock.calls[0][0]).toContain(
         "/api/rooms/a%2Fb/students/x%20y",
      );
   });

   it("handles fetch rejection and resets loading state", async () => {
      vi.stubGlobal(
         "fetch",
         vi.fn().mockRejectedValue(new Error("Network down")),
      );

      const api = useFetch("/api/login", "POST");

      await expect(api.execute({ body: { username: "u" } })).rejects.toThrow(
         "Network down",
      );
      expect(api.error?.message).toBe("Network down");
      expect(api.isLoading).toBe(false);
   });

   it("sends FormData without forcing json content type", async () => {
      vi.stubGlobal(
         "fetch",
         vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ message: "ok" }),
         }),
      );

      const api = useFetch("/api/upload", "POST");
      const form = new FormData();
      form.append(
         "file",
         new Blob(["test"], { type: "text/plain" }),
         "test.txt",
      );

      await api.execute({ body: form });

      const init = (fetch as any).mock.calls[0][1];
      expect(init.body).toBe(form);
      expect(init.headers["Content-Type"]).toBeUndefined();
   });
});
