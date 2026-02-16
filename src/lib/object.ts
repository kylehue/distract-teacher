import { toCamelCase } from "./string";

export function createMappingById<T extends { id: PropertyKey }>(
   arr: T[],
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
   defaultValue: V,
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
   } else if (isObject(obj)) {
      const newObj: any = {};
      for (const [key, value] of Object.entries(obj)) {
         newObj[toCamelCase(key)] = keysToCamel(value);
      }
      return newObj;
   }
   return obj;
}

export function deepMerge(target: any, source: any): any {
   if (!isObject(target) && isObject(source)) {
      return deepMerge({}, source);
   }
   if (!isObject(target)) return source;
   if (!isObject(source)) return { ...target };

   const output = { ...target };
   Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
         if (!(key in target)) Object.assign(output, { [key]: source[key] });
         else output[key] = deepMerge(target[key], source[key]);
      } else {
         Object.assign(output, { [key]: source[key] });
      }
   });
   return output;
}

export function isObject(item: any): boolean {
   if (!item || typeof item !== "object" || Array.isArray(item)) return false;
   const proto = Object.getPrototypeOf(item);
   return proto === Object.prototype || proto === null;
}
