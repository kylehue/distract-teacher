export function createMappingById<T extends { id: PropertyKey }>(
   arr: T[]
): Map<T["id"], T> {
   const map = new Map<T["id"], T>();

   arr.forEach((item) => {
      map.set(item.id, item);
   });

   return map;
}
