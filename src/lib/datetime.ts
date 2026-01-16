export function compareTimestamps(
   timestampA: string | undefined,
   timestampB: string | undefined
): number {
   if (!timestampA && !timestampB) return 0;
   if (!timestampA) return -1;
   if (!timestampB) return 1;
   const dateA = new Date(timestampA);
   const dateB = new Date(timestampB);
   return dateA.getTime() - dateB.getTime();
}

export function timestampToTimeString(
   timestamp: string,
   relative?: boolean,
   includeSeconds?: boolean,
): string {
   const date = new Date(timestamp);
   const now = new Date();

   if (relative) {
      const diffMs = now.getTime() - date.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours < 24 && diffHours >= 0) {
         const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
         const diffMinutes = Math.round(diffMs / (1000 * 60));
         const diffHoursRound = Math.round(diffMs / (1000 * 60 * 60));

         if (diffMinutes < 60) return rtf.format(-diffMinutes, "minute");
         return rtf.format(-diffHoursRound, "hour");
      }
   }

   return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: includeSeconds ? "2-digit" : undefined,
   });
}

export function timestampToDateString(
   timestamp: string,
   relative?: boolean
): string {
   const date = new Date(timestamp);
   const now = new Date();

   if (relative) {
      const diffMs = now.getTime() - date.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours < 24 && diffHours >= 0) {
         const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
         const diffMinutes = Math.round(diffMs / (1000 * 60));
         const diffHoursRound = Math.round(diffMs / (1000 * 60 * 60));

         if (diffMinutes < 60) return rtf.format(-diffMinutes, "minute");
         return rtf.format(-diffHoursRound, "hour");
      }
   }

   return date.toLocaleDateString("en-PH", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
   });
}
