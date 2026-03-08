import {
   isDummyModeEnabled,
   resolveDummyResponse,
   type DummyError,
   type DummyRequestOptions,
   type DummyResponse,
} from "@/lib/dummy-database";
import { proxyRefs, ref } from "vue";

const API = import.meta.env.VITE_API_URL;

export type ApiSuccess<T> = DummyResponse<T>;
export type ApiError = DummyError;

type ExecuteOptions = Omit<RequestInit, "body" | "method"> &
   DummyRequestOptions;

function resolveUrl(
   template: string,
   params?: Record<string, string | number>,
) {
   if (!params) return template;

   let url = template;

   for (const [key, value] of Object.entries(params)) {
      url = url.replace(
         new RegExp(`:${key}\\b`, "g"),
         encodeURIComponent(String(value)),
      );
   }

   // dev safety: unresolved params
   if (import.meta.env.DEV) {
      const unresolved = url.match(/:[a-zA-Z_]\w*/g);
      if (unresolved) {
         throw new Error(
            `Unresolved URL params: ${unresolved.join(", ")} in ${template}`,
         );
      }
   }

   return url;
}

export function useFetch<T = any>(url: string, method: string = "GET") {
   const data = ref<ApiSuccess<T> | null>(null);
   const error = ref<ApiError | null>(null);
   const isLoading = ref(false);

   const execute = async (
      options: ExecuteOptions = {},
   ): Promise<ApiSuccess<T>> => {
      isLoading.value = true;
      data.value = null;
      error.value = null;

      if (import.meta.env.DEV) {
         console.log(`FETCH -> ${url} [${method.toUpperCase()}]:\n`, options);
      }

      try {
         const normalizedMethod = method.toUpperCase();

         if (isDummyModeEnabled()) {
            const dummyResponse = resolveDummyResponse<T>(
               url,
               normalizedMethod,
               {
                  body: options.body,
                  params: options.params,
               },
            );
            data.value = dummyResponse;
            return dummyResponse;
         }

         if (!API) {
            throw new Error("VITE_API_URL is not defined");
         }

         const headers: HeadersInit = {
            ...options.headers,
         };

         let body: BodyInit | undefined;

         if (options.body instanceof FormData) {
            body = options.body;
         } else if (options.body) {
            (headers as any)["Content-Type"] = "application/json";
            body = JSON.stringify(options.body);
         }

         const res = await fetch(
            resolveUrl(
               new URL(url, API).toString(),
               options.params as Record<string, string | number> | undefined,
            ),
            {
               ...options,
               headers,
               body,
               method: normalizedMethod,
               credentials: "include",
            },
         );

         const json = await res.json();

         if (!res.ok) {
            // server-controlled error shape
            const apiError: ApiError = {
               message: json?.detail?.message ?? "Request failed",
               fieldErrors: json?.detail?.fieldErrors,
            };
            throw apiError;
         }

         data.value = json;
         return json;
      } catch (err: any) {
         error.value = {
            message: err?.message ?? "Unknown error",
            fieldErrors: err?.fieldErrors,
         };
         throw err;
      } finally {
         isLoading.value = false;

         if (import.meta.env.DEV) {
            console.log(`RESPONSE -> ${url}:\n`, data.value || error.value);
         }
      }
   };

   return proxyRefs({
      data,
      error,
      isLoading,
      execute,
   });
}
