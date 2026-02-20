export function compareTimestamps(
   timestampA: string | undefined,
   timestampB: string | undefined,
): number {
   if (!timestampA && !timestampB) return 0;
   if (!timestampA) return -1;
   if (!timestampB) return 1;
   const dateA = Date.parse(timestampA);
   const dateB = Date.parse(timestampB);
   const isAValid = Number.isFinite(dateA);
   const isBValid = Number.isFinite(dateB);

   if (!isAValid && !isBValid) return 0;
   if (!isAValid) return -1;
   if (!isBValid) return 1;

   return dateA - dateB;
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
   relative?: boolean,
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
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
   });
}

export function totalTime(start: string, end?: string): string {
   const startDate = new Date(start);
   const endDate = end ? new Date(end) : new Date();

   let totalSeconds = Math.floor(
      (endDate.getTime() - startDate.getTime()) / 1000,
   );
   if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "0s";

   const hours = Math.floor(totalSeconds / 3600);
   totalSeconds %= 3600;
   const minutes = Math.floor(totalSeconds / 60);
   const seconds = totalSeconds % 60;

   const parts: string[] = [];
   if (hours > 0) parts.push(`${hours}h`);
   if (minutes > 0) parts.push(`${minutes}m`);
   if (seconds > 0 && hours === 0) parts.push(`${seconds}s`); // show seconds only if less than 1 hour

   return parts.join(" ") || "0s";
}
