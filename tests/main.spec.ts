import { describe, expect, it, vi } from "vitest";

const { useMock, mountMock, pushMock, getErrorHandler, setErrorHandler } =
   vi.hoisted(() => {
      let errorHandler: ((err: unknown) => void) | undefined;
      return {
         useMock: vi.fn(),
         mountMock: vi.fn(),
         pushMock: vi.fn(),
         getErrorHandler: () => errorHandler,
         setErrorHandler: (fn: (err: unknown) => void) => {
            errorHandler = fn;
         },
      };
   });

vi.mock("vue", () => ({
   createApp: () => ({
      use: useMock,
      mount: mountMock,
      config: {
         get errorHandler() {
            return getErrorHandler();
         },
         set errorHandler(fn) {
            setErrorHandler(fn);
         },
      },
   }),
}));

vi.mock("pinia", () => ({
   createPinia: () => ({ name: "pinia" }),
}));

vi.mock("@/lib/router", () => ({
   router: { push: pushMock },
}));

vi.mock("@/plugins/socket", () => ({
   default: { install: vi.fn() },
}));

vi.mock("@/app/index.vue", () => ({ default: {} }));
vi.mock("@/styles/main.css", () => ({}));

import "@/main";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "@/lib/errors";

describe("main bootstrap", () => {
   it("registers plugins and mounts app", () => {
      expect(useMock).toHaveBeenCalledTimes(3);
      expect(mountMock).toHaveBeenCalledWith("#app");
   });

   it("routes known app errors in global handler", () => {
      getErrorHandler()?.(new UnauthorizedError());
      getErrorHandler()?.(new ForbiddenError());
      getErrorHandler()?.(new NotFoundError());

      expect(pushMock).toHaveBeenCalledWith("/unauthorized");
      expect(pushMock).toHaveBeenCalledWith("/forbidden");
      expect(pushMock).toHaveBeenCalledWith("/not-found");
   });
});
