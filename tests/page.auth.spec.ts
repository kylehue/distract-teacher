import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createRouterLinkStub } from "./support/component-stubs";
import { naiveUiMockState } from "./support/naive-ui-mock";

const pushSpy = vi.fn();
const replaceSpy = vi.fn();
const messageErrorSpy = naiveUiMockState.message.error;
const messageSuccessSpy = naiveUiMockState.message.success;
const clearStoreSpy = vi.fn();

const authState = {
   isAuthenticated: false,
   isLoading: false,
   postLogin: { error: null as any },
   loginWithCredentials: vi.fn(),
};

const registerFetch = {
   isLoading: false,
   error: null as any,
   execute: vi.fn(),
};

vi.mock("vue-router", () => ({
   useRouter: () => ({ push: pushSpy, replace: replaceSpy }),
   RouterLink: createRouterLinkStub(),
}));

vi.mock("@/app/composables/use-auth-store", () => ({
   useAuthStore: () => authState,
}));

vi.mock("@/app/composables/use-store", () => ({
   useStore: () => ({ clear: clearStoreSpy }),
}));

vi.mock("@/app/composables/use-fetch", () => ({
   useFetch: () => registerFetch,
}));

import LoginPage from "@/app/pages/login.vue";
import RegisterPage from "@/app/pages/register.vue";

describe("Auth Pages", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      authState.isAuthenticated = false;
      authState.isLoading = false;
      authState.postLogin.error = null;
      registerFetch.error = null;
      registerFetch.execute.mockReset();
      authState.loginWithCredentials.mockReset();
   });

   it("redirects already-authenticated users away from auth pages", () => {
      authState.isAuthenticated = true;
      mount(LoginPage);
      mount(RegisterPage);
      expect(replaceSpy).toHaveBeenCalledWith("/dashboard");
   });

   it("login shows field errors from auth store and does not clear store", async () => {
      authState.postLogin.error = {
         fieldErrors: {
            username: "Username is required",
            password: "Password is required",
         },
      };
      authState.loginWithCredentials.mockRejectedValue(new Error("invalid"));
      const wrapper = mount(LoginPage);

      const inputs = wrapper.findAll("input");
      await inputs[0].setValue("");
      await inputs[1].setValue("");
      await wrapper.findAll("button")[0].trigger("click");
      await nextTick();

      const feedbacks = wrapper.findAll(".feedback").map((x) => x.text());
      expect(feedbacks).toContain("Username is required");
      expect(feedbacks).toContain("Password is required");
      expect(clearStoreSpy).not.toHaveBeenCalled();
   });

   it("register submits and routes to login on success", async () => {
      registerFetch.execute.mockResolvedValue({ data: { ok: true } });
      const wrapper = mount(RegisterPage);

      const inputs = wrapper.findAll("input");
      await inputs[0].setValue("teacher1");
      await inputs[1].setValue("secret123");
      await inputs[2].setValue("secret123");
      await wrapper.findAll("button")[0].trigger("click");

      expect(registerFetch.execute).toHaveBeenCalled();
      expect(messageSuccessSpy).toHaveBeenCalledWith(
         "Registration successful!",
      );
      expect(pushSpy).toHaveBeenCalledWith("/login");
   });

   it("register displays field-level API errors", async () => {
      registerFetch.error = {
         fieldErrors: {
            username: "Username already taken",
            password2: "Passwords do not match",
         },
      };
      registerFetch.execute.mockRejectedValue(new Error("invalid"));
      const wrapper = mount(RegisterPage);

      await wrapper.findAll("button")[0].trigger("click");
      await nextTick();
      const feedbacks = wrapper.findAll(".feedback").map((x) => x.text());
      expect(feedbacks).toContain("Username already taken");
      expect(feedbacks).toContain("Passwords do not match");
   });

   it("login clears store after successful auth", async () => {
      authState.loginWithCredentials.mockResolvedValue(undefined);
      const wrapper = mount(LoginPage);

      const inputs = wrapper.findAll("input");
      await inputs[0].setValue("teacher1");
      await inputs[1].setValue("secret123");
      await wrapper.findAll("button")[0].trigger("click");

      expect(authState.loginWithCredentials).toHaveBeenCalledWith(
         "teacher1",
         "secret123",
      );
      expect(clearStoreSpy).toHaveBeenCalledTimes(1);
   });

   it("login shows fallback error when store has no error payload", async () => {
      authState.postLogin.error = null;
      authState.loginWithCredentials.mockRejectedValue(new Error("network"));
      const wrapper = mount(LoginPage);

      await wrapper.findAll("button")[0].trigger("click");
      await nextTick();

      expect(messageErrorSpy).toHaveBeenCalledWith(
         "An unknown error occurred during login.",
      );
   });

   it("register shows top-level API message when field errors are absent", async () => {
      registerFetch.error = {
         message: "Invalid registration payload",
      };
      registerFetch.execute.mockRejectedValue(new Error("invalid"));
      const wrapper = mount(RegisterPage);

      await wrapper.findAll("button")[0].trigger("click");
      await nextTick();

      expect(messageErrorSpy).toHaveBeenCalledWith(
         "Invalid registration payload",
      );
   });
});
