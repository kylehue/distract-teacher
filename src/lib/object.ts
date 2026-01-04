export function createMappingById<T extends { id: PropertyKey }>(
   arr: T[]
): Map<T["id"], T> {
   const map = new Map<T["id"], T>();

   arr.forEach((item) => {
      map.set(item.id, item);
   });

   return map;
}

export function getWithDefault<K, V>(
   map: Map<K, V>,
   key: K,
   defaultValue: V
): V {
   if (!map.has(key)) {
      map.set(key, defaultValue);
   }
   return map.get(key)!;
}
