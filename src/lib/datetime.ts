import moment from "moment";

export function totalTime(start: string, end: string): string {
   const a = moment(start);
   const b = moment(end);

   if (!a.isValid() || !b.isValid()) return "";

   const diff = Math.abs(b.diff(a));
   const dur = moment.duration(diff);

   const units = [
      { label: "y", value: Math.floor(dur.asYears()) },
      { label: "mo", value: dur.months() },
      { label: "d", value: dur.days() },
      { label: "h", value: dur.hours() },
      { label: "m", value: dur.minutes() },
   ];

   const parts = units
      .filter((u) => u.value > 0)
      .slice(0, 2) // only keep 2 largest units
      .map((u) => `${u.value}${u.label}`);

   return parts.length ? parts.join(" ") : "0m";
}
