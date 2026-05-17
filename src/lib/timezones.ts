export type TimeZoneCity = {
  city: string;
  country: string;
  timezone: string;
  region: string;
};

export const timezones: TimeZoneCity[] = [
  { city: "New Delhi", country: "India", timezone: "Asia/Kolkata", region: "Asia" },
  { city: "Mumbai", country: "India", timezone: "Asia/Kolkata", region: "Asia" },
  { city: "New York", country: "USA", timezone: "America/New_York", region: "North America" },
  { city: "Los Angeles", country: "USA", timezone: "America/Los_Angeles", region: "North America" },
  { city: "Chicago", country: "USA", timezone: "America/Chicago", region: "North America" },
  { city: "London", country: "UK", timezone: "Europe/London", region: "Europe" },
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai", region: "Middle East" },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", region: "Asia" },
  { city: "Beijing", country: "China", timezone: "Asia/Shanghai", region: "Asia" },
  { city: "Shanghai", country: "China", timezone: "Asia/Shanghai", region: "Asia" },
  { city: "Sydney", country: "Australia", timezone: "Australia/Sydney", region: "Oceania" },
  { city: "Melbourne", country: "Australia", timezone: "Australia/Melbourne", region: "Oceania" },
  { city: "Paris", country: "France", timezone: "Europe/Paris", region: "Europe" },
  { city: "Berlin", country: "Germany", timezone: "Europe/Berlin", region: "Europe" },
  { city: "Madrid", country: "Spain", timezone: "Europe/Madrid", region: "Europe" },
  { city: "Rome", country: "Italy", timezone: "Europe/Rome", region: "Europe" },
  { city: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam", region: "Europe" },
  { city: "Singapore", country: "Singapore", timezone: "Asia/Singapore", region: "Asia" },
  { city: "Hong Kong", country: "Hong Kong", timezone: "Asia/Hong_Kong", region: "Asia" },
  { city: "Seoul", country: "South Korea", timezone: "Asia/Seoul", region: "Asia" },
  { city: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok", region: "Asia" },
  { city: "Jakarta", country: "Indonesia", timezone: "Asia/Jakarta", region: "Asia" },
  { city: "Manila", country: "Philippines", timezone: "Asia/Manila", region: "Asia" },
  { city: "Toronto", country: "Canada", timezone: "America/Toronto", region: "North America" },
  { city: "Vancouver", country: "Canada", timezone: "America/Vancouver", region: "North America" },
  { city: "Mexico City", country: "Mexico", timezone: "America/Mexico_City", region: "North America" },
  { city: "Sao Paulo", country: "Brazil", timezone: "America/Sao_Paulo", region: "South America" },
  { city: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires", region: "South America" },
  { city: "Cape Town", country: "South Africa", timezone: "Africa/Johannesburg", region: "Africa" },
  { city: "Cairo", country: "Egypt", timezone: "Africa/Cairo", region: "Africa" },
  { city: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul", region: "Europe" },
  { city: "Riyadh", country: "Saudi Arabia", timezone: "Asia/Riyadh", region: "Middle East" },
  { city: "Doha", country: "Qatar", timezone: "Asia/Qatar", region: "Middle East" },
  { city: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland", region: "Oceania" },
  { city: "UTC", country: "Global", timezone: "UTC", region: "Global" },
];

export function getOffsetLabel(timezone: string, date = new Date()) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value.replace("GMT", "UTC") ?? "UTC";
}

export function getHourInZone(timezone: string, date = new Date()) {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: timezone,
    }).format(date),
  );
}

