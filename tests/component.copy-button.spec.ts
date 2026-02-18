import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { h } from "vue";
import CopyButton from "@/app/components/copy-button.vue";
import { naiveUiMockState } from "./support/naive-ui-mock";

const createSpy = naiveUiMockState.message.create;
const errorSpy = naiveUiMockState.message.error;

vi.mock("@/lib/ui", () => ({
   renderIcon: vi.fn(() => () => h("i")),
}));

describe("CopyButton", () => {
   beforeEach(() => {
      createSpy.mockReset();
      errorSpy.mockReset();
   });

   it("copies text and shows success message", async () => {
      Object.assign(navigator, {
         clipboard: {
            writeText: vi.fn().mockResolvedValue(undefined),
         },
      });
      const wrapper = mount(CopyButton, {
         props: {
            textToCopy: "ROOM123",
         },
      });

      await wrapper.get("button").trigger("click");
      await Promise.resolve();

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("ROOM123");
      expect(createSpy).toHaveBeenCalled();
   });

   it("shows error message when clipboard write fails", async () => {
      Object.assign(navigator, {
         clipboard: {
            writeText: vi.fn().mockRejectedValue(new Error("denied")),
         },
      });
      const wrapper = mount(CopyButton, {
         props: {
            textToCopy: "ROOM123",
         },
      });

      await wrapper.get("button").trigger("click");
      await Promise.resolve();

      expect(errorSpy).toHaveBeenCalledWith(
         "Failed to copy text to clipboard.",
      );
   });
});
