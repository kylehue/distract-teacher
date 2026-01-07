import { toCamelCase } from "./string";

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

/**
 * Recursively converts all keys of an object or array to camelCase.
 */
export function keysToCamel<T>(obj: T): T {
   if (Array.isArray(obj)) {
      return obj.map((item) => keysToCamel(item)) as any;
   } else if (obj !== null && typeof obj === "object") {
      const newObj: any = {};
      for (const [key, value] of Object.entries(obj)) {
         newObj[toCamelCase(key)] = keysToCamel(value);
      }
      return newObj;
   }
   return obj;
}
