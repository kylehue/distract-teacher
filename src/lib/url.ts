export function isUrlRelatedToParent(url: string, parentUrl: string): boolean {
   if (url === parentUrl) return true;
   if (url.startsWith(parentUrl + "/")) return true;
   return false;
}
