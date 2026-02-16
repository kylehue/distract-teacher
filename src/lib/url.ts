function normalizePath(path: string): string | null {
   const rawPath = path.split(/[?#]/, 1)[0]?.trim();
   if (!rawPath) return null;

   let normalizedPath = rawPath.replace(/\/{2,}/g, "/");
   if (!normalizedPath.startsWith("/")) {
      normalizedPath = `/${normalizedPath}`;
   }
   if (normalizedPath.length > 1) {
      normalizedPath = normalizedPath.replace(/\/+$/, "");
   }

   return normalizedPath;
}

export function isUrlRelatedToParent(url: string, parentUrl: string): boolean {
   const normalizedUrl = normalizePath(url);
   const normalizedParentUrl = normalizePath(parentUrl);

   if (!normalizedUrl || !normalizedParentUrl) return false;
   if (normalizedUrl === normalizedParentUrl) return true;
   return normalizedUrl.startsWith(normalizedParentUrl + "/");
}
