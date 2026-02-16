export function toTitleCase(str: string): string {
   const words = str.trim().toLowerCase().split(/\s+/).filter(Boolean);
   if (!words.length) return "";
   return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
}

export function toCamelCase(str: string): string {
   const normalized = str.trim().replace(/[-_\s]+/g, " ");
   if (!normalized) return "";

   const words = normalized.split(" ").filter(Boolean);
   if (words.length === 1) {
      const [word] = words;
      return word.charAt(0).toLowerCase() + word.slice(1);
   }

   return words
      .map((word, index) => {
         const lowerWord = word.toLowerCase();
         if (index === 0) return lowerWord;
         return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
      })
      .join("");
}
