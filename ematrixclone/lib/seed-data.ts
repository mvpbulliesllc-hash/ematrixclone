import type { Niche } from '@/lib/niches';

// The 20 demo businesses from the lead list. Subdomains are derived at seed time
// via slugifyBusinessName; where city is blank the locale falls back to the full
// state name (see scripts/seed.ts). All seeded with status = demo.

export type SeedRow = {
  businessName: string;
  niche: Niche;
  city: string; // '' → locale becomes the full state name
  state: string;
  phone: string;
  rating: number;
  reviewCount: number;
};

export const SEED_ROWS: SeedRow[] = [
  { businessName: "Aguilar's Truck & Trailer Washout", niche: 'pressure_wash', city: 'American Falls', state: 'ID', phone: '(208) 240-2698', rating: 4.5, reviewCount: 89 },
  { businessName: 'Huskie Carpet Cleaning', niche: 'cleaning', city: 'Fruitland', state: 'ID', phone: '(208) 570-9889', rating: 4.9, reviewCount: 83 },
  { businessName: 'Faithful Pressure Wash', niche: 'pressure_wash', city: '', state: 'MT', phone: '(406) 697-0192', rating: 5.0, reviewCount: 74 },
  { businessName: "Tinsley's Moving", niche: 'junk_removal', city: '', state: 'MT', phone: '(406) 590-1307', rating: 4.7, reviewCount: 62 },
  { businessName: 'Pow-A-Wash', niche: 'pressure_wash', city: '', state: 'MT', phone: '(406) 561-0866', rating: 5.0, reviewCount: 56 },
  { businessName: 'Vertical Tree Co.', niche: 'tree', city: 'Blackfoot', state: 'ID', phone: '(208) 244-9967', rating: 4.6, reviewCount: 48 },
  { businessName: 'ASAP Septic', niche: 'septic', city: 'Melba', state: 'ID', phone: '(208) 991-7184', rating: 5.0, reviewCount: 47 },
  { businessName: "Gary's Sewer & Drain", niche: 'plumbing', city: 'Pocatello', state: 'ID', phone: '(208) 232-7464', rating: 4.9, reviewCount: 41 },
  { businessName: 'H & L Drilling', niche: 'well_water', city: 'East Helena', state: 'MT', phone: '(406) 227-7435', rating: 4.7, reviewCount: 40 },
  { businessName: 'Troyer Roofing', niche: 'roofing', city: 'Libby', state: 'MT', phone: '(406) 334-0500', rating: 4.8, reviewCount: 39 },
  { businessName: 'Marlatt Tree Care', niche: 'tree', city: '', state: 'WY', phone: '(307) 331-5102', rating: 5.0, reviewCount: 36 },
  { businessName: 'Redhorn Pump Service', niche: 'well_water', city: 'St Ignatius', state: 'MT', phone: '(406) 676-7867', rating: 5.0, reviewCount: 33 },
  { businessName: 'Triple J Well & Pump Service', niche: 'well_water', city: 'Kalispell', state: 'MT', phone: '(406) 890-2057', rating: 5.0, reviewCount: 32 },
  { businessName: 'Independent Drilling', niche: 'well_water', city: 'Blackfoot', state: 'ID', phone: '(208) 684-3788', rating: 4.3, reviewCount: 32 },
  { businessName: 'Sterling Excavation', niche: 'excavating', city: 'Casper', state: 'WY', phone: '(307) 258-5381', rating: 4.7, reviewCount: 29 },
  { businessName: "Eckert's Patriot Pumpers", niche: 'septic', city: '', state: 'MT', phone: '(406) 777-2816', rating: 4.7, reviewCount: 28 },
  { businessName: 'Blue Collar Pressure Wash', niche: 'pressure_wash', city: 'Cheyenne', state: 'WY', phone: '(307) 223-2280', rating: 5.0, reviewCount: 25 },
  { businessName: 'Busy Boys Stump Grinding', niche: 'tree', city: 'Blackfoot', state: 'ID', phone: '(208) 200-4429', rating: 5.0, reviewCount: 24 },
  { businessName: 'Xtreme Clean Floor Care', niche: 'cleaning', city: 'Rock Springs', state: 'WY', phone: '(307) 922-1686', rating: 4.7, reviewCount: 22 },
  { businessName: 'Bison Fence', niche: 'fence', city: 'Great Falls', state: 'MT', phone: '(406) 899-8884', rating: 4.6, reviewCount: 22 }
];

export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
  NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina',
  ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee',
  TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  ON: 'Ontario', BC: 'British Columbia', AB: 'Alberta'
};
