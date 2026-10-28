export type PartnerType = "workshop" | "tyres" | "glass" | "bodyshop";

export type Partner = {
  id: string;
  name: string;
  type: PartnerType;
  street: string;
  zip: string;
  city: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
};

export const TYPE_LABELS: Record<PartnerType, string> = {
  workshop: "Workshop",
  tyres: "Tyres",
  glass: "Glass repair",
  bodyshop: "Body shop",
};

export const TYPE_COLORS: Record<PartnerType, string> = {
  workshop: "#0b6e4f",
  tyres: "#d17b0f",
  glass: "#2563eb",
  bodyshop: "#9333ea",
};

// Fictional demo data – replace with your database / API.
export const PARTNERS: Partner[] = [
  { id: "1", name: "Demo Autowerkstatt Mitte", type: "workshop", street: "Musterstraße 12", zip: "1010", city: "Wien", phone: "+43 1 000 0001", hours: "Mon–Fri 08:00–17:00", lat: 48.2082, lng: 16.3738 },
  { id: "2", name: "Demo Reifen Favoriten", type: "tyres", street: "Beispielgasse 5", zip: "1100", city: "Wien", phone: "+43 1 000 0002", hours: "Mon–Fri 07:30–18:00, Sat 08:00–12:00", lat: 48.1743, lng: 16.3777 },
  { id: "3", name: "Demo Glas Donaustadt", type: "glass", street: "Testplatz 3", zip: "1220", city: "Wien", phone: "+43 1 000 0003", hours: "Mon–Fri 08:00–16:30", lat: 48.2339, lng: 16.4551 },
  { id: "4", name: "Demo Karosserie Liesing", type: "bodyshop", street: "Probeweg 21", zip: "1230", city: "Wien", phone: "+43 1 000 0004", hours: "Mon–Fri 07:00–16:00", lat: 48.1346, lng: 16.2832 },
  { id: "5", name: "Demo Autohaus Graz Ost", type: "workshop", street: "Hauptstraße 40", zip: "8010", city: "Graz", phone: "+43 316 000 005", hours: "Mon–Fri 08:00–17:00", lat: 47.0707, lng: 15.4395 },
  { id: "6", name: "Demo Reifenservice Linz", type: "tyres", street: "Industriezeile 8", zip: "4020", city: "Linz", phone: "+43 732 000 006", hours: "Mon–Fri 07:30–17:30", lat: 48.3069, lng: 14.2858 },
  { id: "7", name: "Demo Autoglas Salzburg", type: "glass", street: "Teststraße 17", zip: "5020", city: "Salzburg", phone: "+43 662 000 007", hours: "Mon–Fri 08:00–16:00", lat: 47.8095, lng: 13.055 },
  { id: "8", name: "Demo Karosserie Innsbruck", type: "bodyshop", street: "Musterweg 2", zip: "6020", city: "Innsbruck", phone: "+43 512 000 008", hours: "Mon–Fri 07:30–16:30", lat: 47.2692, lng: 11.4041 },
  { id: "9", name: "Demo Werkstatt Klagenfurt", type: "workshop", street: "Seestraße 9", zip: "9020", city: "Klagenfurt", phone: "+43 463 000 009", hours: "Mon–Fri 08:00–17:00", lat: 46.6247, lng: 14.3053 },
  { id: "10", name: "Demo Werkstatt St. Pölten", type: "workshop", street: "Landstraße 33", zip: "3100", city: "St. Pölten", phone: "+43 2742 000 010", hours: "Mon–Fri 08:00–17:00", lat: 48.2047, lng: 15.6256 },
];

export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export type LatLng = { lat: number; lng: number };
