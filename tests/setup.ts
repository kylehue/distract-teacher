import { afterEach, beforeEach, vi } from "vitest";
import {
   installNaiveUiMock,
   resetNaiveUiMockState,
} from "./support/naive-ui-mock";
import { installPhosphorMock } from "./support/phosphor-mock";

installNaiveUiMock();
installPhosphorMock();

// Keep test output deterministic and avoid noisy console logs from socket/plugin modules.
vi.spyOn(console, "log").mockImplementation(() => undefined);
vi.spyOn(console, "error").mockImplementation(() => undefined);

// Minimal browser APIs used by app code.
Object.defineProperty(window, "matchMedia", {
   writable: true,
   value: vi.fn().mockImplementation(() => ({
      matches: false,
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
   })),
});

Object.defineProperty(document, "fonts", {
   writable: true,
   value: { ready: Promise.resolve() },
});

afterEach(() => {
   vi.clearAllMocks();
});

beforeEach(() => {
   resetNaiveUiMockState();
});
