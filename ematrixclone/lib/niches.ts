// Niche lookup. Each niche carries the customer-facing copy from the ECO MATRIX
// copy pack (tokens {{business}} {{city}} {{state}} {{phone}} {{rating}} {{reviews}}
// are filled at render time). The hero image is selected by niche, not per business.

export type Niche =
  | 'septic'
  | 'tree'
  | 'pressure_wash'
  | 'well_water'
  | 'fence'
  | 'cleaning'
  | 'junk_removal'
  | 'roofing'
  | 'excavating'
  | 'plumbing'
  | 'hvac'
  | 'landscaping'
  | 'insurance'
  | 'beauty'
  | 'real_estate'
  | 'electrical'
  | 'accounting'
  | 'handyman'
  | 'construction'
  | 'concrete'
  | 'trucking_auto'
  | 'finance'
  | 'snow_removal'
  | 'retail';

export type NicheConfig = {
  label: string;
  tagline: string;
  /** Expanded service list (4–6 items). */
  services: string[];
  heroImage: string;
  accent: string;
  gradient: [string, string];
  /** Hero headline (opens on the gap). */
  h1: string;
  /** Hero subhead. */
  sub: string;
  /** Problem/"gap" paragraph. */
  gap: string;
  /** Final close line, shown above the call CTA. */
  close: string;
};

export const NICHES: Record<Niche, NicheConfig> = {
  hvac: {
    label: 'Heating & Air',
    tagline: 'Comfort You Can Count On',
    services: [
      'AC Repair',
      'Furnace Repair',
      'New System Install',
      'Tune-Ups & Maintenance',
      'Emergency Heating & Cooling',
      'Indoor Air Quality'
    ],
    heroImage: '/heroes/hvac.webp',
    accent: '#dc2626',
    gradient: ['#3b0a0a', '#dc2626'],
    h1: 'No heat? No cool? {{business}} answers {{city}} day and night.',
    sub: 'When the furnace quits on the coldest night or the AC dies in a heat wave, you need a real person, fast. We pick up and get a tech rolling.',
    gap: "A no-heat call at 2am isn't a leave-a-message situation. {{business}} answers when it matters, books you on the spot, and gets someone out before you're shivering through the night.",
    close: 'Make the call. Stay comfortable.'
  },
  septic: {
    label: 'Septic Services',
    tagline: 'Dependable Septic Service, Done Right',
    services: [
      'Tank Pumping',
      'Inspections',
      'Drainfield Repair',
      'New System Install',
      'Emergency Backups',
      'Line Cleaning'
    ],
    heroImage: '/heroes/septic.webp',
    accent: '#1d4ed8',
    gradient: ['#0f172a', '#1d4ed8'],
    h1: 'Septic backing up in {{city}}? {{business}} answers now.',
    sub: "A backup doesn't wait for business hours. We pick up, we come out, we fix it before it gets worse.",
    gap: "When a tank backs up into the house, you're not leaving voicemails for three companies. {{business}} answers the first call and gets a truck headed your way.",
    close: "Make the call. We'll handle the mess."
  },
  tree: {
    label: 'Tree Service',
    tagline: 'Tree Care You Can Count On',
    services: [
      'Tree Removal',
      'Trimming & Pruning',
      'Storm & Emergency Removal',
      'Stump Grinding',
      'Lot Clearing',
      'Hazard Assessment'
    ],
    heroImage: '/heroes/tree.webp',
    accent: '#15803d',
    gradient: ['#14532d', '#15803d'],
    h1: 'Tree down in {{city}}? {{business}} is already answering.',
    sub: 'A storm drops a limb on your roof and you need it gone today. We pick up, we assess, we clear it.',
    gap: 'A branch through the roof after a storm is a same-day job, and it goes to whoever answers first. {{business}} answers first.',
    close: "Make the call. We'll get it down."
  },
  well_water: {
    label: 'Well & Water Service',
    tagline: 'Clean Water, Reliable Wells',
    services: [
      'Pump Repair & Replacement',
      'New Well Drilling',
      'Pressure Tanks',
      'Water Testing',
      'Filtration',
      'No-Water Emergencies'
    ],
    heroImage: '/heroes/well_water.webp',
    accent: '#0369a1',
    gradient: ['#0c2a3e', '#0369a1'],
    h1: 'No water in {{city}}? {{business}} picks up.',
    sub: "When the well quits and the taps run dry, it's a today problem. We answer and get your water back on.",
    gap: "A house with no water can't wait until Monday. {{business}} answers the call, diagnoses the pump, and gets the water flowing again.",
    close: 'Make the call. Get your water back.'
  },
  roofing: {
    label: 'Roofing',
    tagline: 'Roofs Done Right, Rain or Shine',
    services: [
      'Leak Repair',
      'Full Replacement',
      'Storm Damage',
      'Inspections',
      'Gutters',
      'Emergency Tarping'
    ],
    heroImage: '/heroes/roofing.webp',
    accent: '#b91c1c',
    gradient: ['#450a0a', '#b91c1c'],
    h1: 'Roof leaking in {{city}}? {{business}} answers before the next storm.',
    sub: 'A leak after a storm only gets worse. We pick up, tarp it fast, and get you a real fix.',
    gap: 'Water through the ceiling is a today call, and a new roof goes to whoever picks up. {{business}} answers, protects the house, and quotes the job straight.',
    close: 'Make the call. Keep it dry.'
  },
  excavating: {
    label: 'Excavating',
    tagline: 'Ground Broken, Jobs Finished',
    services: [
      'Site Prep',
      'Grading',
      'Foundation Digs',
      'Trenching',
      'Land Clearing',
      'Drainage'
    ],
    heroImage: '/heroes/excavating.webp',
    accent: '#a16207',
    gradient: ['#422006', '#a16207'],
    h1: 'Breaking ground in {{city}}? {{business}} answers and shows up.',
    sub: 'Site prep, grading, drainage. We pick up, walk your job, and get dirt moving on your timeline.',
    gap: 'A dig job stalls the second nobody calls you back. {{business}} answers, gets eyes on the site, and keeps your build on schedule.',
    close: "Make the call. We'll move the dirt."
  },
  plumbing: {
    label: 'Plumbing',
    tagline: 'Fast, Honest Plumbing',
    services: [
      'Leak & Burst Repair',
      'Water Heaters',
      'Drain Cleaning',
      'Repipes',
      'Fixtures',
      '24/7 Emergencies'
    ],
    heroImage: '/heroes/plumbing.webp',
    accent: '#1e40af',
    gradient: ['#0c1838', '#1e40af'],
    h1: 'Burst pipe in {{city}}? {{business}} answers at any hour.',
    sub: "Water where it shouldn't be can't wait. We pick up and get a plumber to your door.",
    gap: 'A burst line at midnight has them calling until someone answers. {{business}} is the one who picks up, and the one who books the job.',
    close: "Make the call. We'll shut it off and fix it."
  },
  electrical: {
    label: 'Electrical',
    tagline: 'Licensed Electrical Help, Fast',
    services: [
      'Troubleshooting',
      'Panel Upgrades',
      'Lighting & Fixtures',
      'New Wiring',
      'Generators & EV Chargers',
      'Emergency Repairs'
    ],
    heroImage: '/heroes/hvac.webp',
    accent: '#eab308',
    gradient: ['#1f1600', '#ca8a04'],
    h1: 'Electrical issue in {{city}}? {{business}} answers and gets it handled.',
    sub: 'Power problems, upgrades, lighting, and repairs. We pick up, schedule the work, and show up ready.',
    gap: "An electrical problem is not a wait-and-see job. {{business}} answers the call, gets the details, and puts a qualified electrician on the calendar.",
    close: 'Make the call. Get the power right.'
  },
  fence: {
    label: 'Fencing',
    tagline: 'Fences Built to Last',
    services: [
      'Wood, Vinyl & Chain-Link',
      'Ranch Fencing',
      'Gates',
      'Repairs',
      'Commercial',
      'Free Estimates'
    ],
    heroImage: '/heroes/fence.webp',
    accent: '#b45309',
    gradient: ['#451a03', '#b45309'],
    h1: 'Need a fence in {{city}}? {{business}} answers and quotes fast.',
    sub: 'Most folks call three companies. The first to answer gets the job. We answer.',
    gap: "A fence quote shouldn't take a week of phone tag. {{business}} picks up, gets your details, and gets you a number while the others are still letting it ring.",
    close: 'Make the call. Get your quote today.'
  },
  handyman: {
    label: 'Handyman Services',
    tagline: 'Repairs Done Right',
    services: [
      'Home Repairs',
      'Punch Lists',
      'Drywall & Trim',
      'Doors & Hardware',
      'Assembly & Installs',
      'Rental Turnovers'
    ],
    heroImage: '/heroes/excavating.webp',
    accent: '#78716c',
    gradient: ['#1c1917', '#78716c'],
    h1: 'Need repairs in {{city}}? {{business}} answers and gets it done.',
    sub: 'Small fixes, punch lists, installs, and rental turns. We pick up, quote clearly, and get the work finished.',
    gap: "A repair list gets expensive when nobody calls back. {{business}} answers, sorts the details, and gets the job on the schedule.",
    close: 'Make the call. Cross it off the list.'
  },
  construction: {
    label: 'Construction',
    tagline: 'Built Solid, Start to Finish',
    services: [
      'General Contracting',
      'Remodels & Additions',
      'Exterior Projects',
      'Framing & Repairs',
      'Project Estimates',
      'Site Coordination'
    ],
    heroImage: '/heroes/excavating.webp',
    accent: '#b45309',
    gradient: ['#2f1603', '#b45309'],
    h1: 'Planning a build in {{city}}? {{business}} answers and keeps it moving.',
    sub: 'Repairs, remodels, additions, and full construction jobs. We pick up, walk the scope, and give you the next step.',
    gap: 'Construction work stalls fast when estimates go unanswered. {{business}} answers, gets eyes on the project, and keeps the job moving.',
    close: 'Make the call. Build with a crew that responds.'
  },
  concrete: {
    label: 'Concrete',
    tagline: 'Flatwork Built to Last',
    services: [
      'Driveways',
      'Slabs',
      'Patios & Walkways',
      'Concrete Repair',
      'Foundations',
      'Site Prep'
    ],
    heroImage: '/heroes/excavating.webp',
    accent: '#52525b',
    gradient: ['#18181b', '#52525b'],
    h1: 'Need concrete in {{city}}? {{business}} answers and quotes fast.',
    sub: 'Driveways, slabs, patios, foundations, and repairs. We pick up, measure the job, and get you a real number.',
    gap: "Concrete timing matters. {{business}} answers before the schedule slips, gets the scope clear, and lines up the crew.",
    close: 'Make the call. Get it poured right.'
  },
  pressure_wash: {
    label: 'Pressure Washing',
    tagline: 'Making Your Property Look New Again',
    services: [
      'House Washing',
      'Driveways & Concrete',
      'Decks & Fences',
      'Roofs & Gutters',
      'Commercial',
      'Free Estimates'
    ],
    heroImage: '/heroes/pressure_wash.webp',
    accent: '#0891b2',
    gradient: ['#083344', '#0891b2'],
    h1: 'Grime taking over in {{city}}? {{business}} picks up and gets it gone.',
    sub: 'Driveways, siding, decks — we answer, quote, and make it look new again.',
    gap: 'Most pressure-washing quotes die in voicemail. {{business}} answers, gets your details, and gets on the schedule while the others let it ring.',
    close: "Make the call. We'll make it look new."
  },
  cleaning: {
    label: 'Cleaning Service',
    tagline: 'A Cleaner Home, Every Time',
    services: [
      'Deep Cleaning',
      'Recurring Service',
      'Carpet & Floor',
      'Move-In / Move-Out',
      'Offices',
      'Free Estimates'
    ],
    heroImage: '/heroes/cleaning.webp',
    accent: '#7c3aed',
    gradient: ['#2e1065', '#7c3aed'],
    h1: 'Need it spotless in {{city}}? {{business}} answers and books you in.',
    sub: 'Homes, carpets, move-outs — we pick up, quote, and get you on the calendar.',
    gap: "A cleaning quote shouldn't take a week of phone tag. {{business}} answers, gets your details, and locks the date.",
    close: "Make the call. We'll handle the rest."
  },
  beauty: {
    label: 'Salon & Spa',
    tagline: 'Look Good, Feel Ready',
    services: [
      'Haircuts & Styling',
      'Color Services',
      'Spa Treatments',
      'Massage & Wellness',
      'Bridal & Event Prep',
      'Appointments & Consults'
    ],
    heroImage: '/heroes/cleaning.webp',
    accent: '#db2777',
    gradient: ['#3b071e', '#db2777'],
    h1: 'Need an appointment in {{city}}? {{business}} answers and gets you booked.',
    sub: 'Cuts, color, spa services, and wellness appointments. We pick up, find a time, and make it easy.',
    gap: 'Appointments go to the salon that answers. {{business}} picks up, gets you on the calendar, and keeps the day simple.',
    close: 'Make the call. Book your spot.'
  },
  accounting: {
    label: 'Accounting & Tax',
    tagline: 'Clear Books, Clean Returns',
    services: [
      'Tax Preparation',
      'Bookkeeping',
      'Payroll',
      'Tax Planning',
      'Cleanup & Catch-Up',
      'Business Advisory'
    ],
    heroImage: '/heroes/cleaning.webp',
    accent: '#047857',
    gradient: ['#022c22', '#047857'],
    h1: 'Tax or bookkeeping help in {{city}}? {{business}} answers.',
    sub: 'Returns, books, payroll, and planning. We pick up, gather what is needed, and help you get organized.',
    gap: 'Money questions get heavier when nobody calls back. {{business}} answers, explains the next step, and keeps the paperwork moving.',
    close: 'Make the call. Get the numbers handled.'
  },
  junk_removal: {
    label: 'Junk Removal',
    tagline: 'Haul It Away, Same Day',
    services: [
      'Junk Hauling',
      'Estate Cleanouts',
      'Same-Day Pickup',
      'Furniture & Appliances',
      'Construction Debris',
      'Free Estimates'
    ],
    heroImage: '/heroes/junk_removal.webp',
    accent: '#ea580c',
    gradient: ['#431407', '#ea580c'],
    h1: 'Need it hauled in {{city}}? {{business}} answers and shows up.',
    sub: 'One item or a whole house — we pick up, quote, and haul it the same day.',
    gap: 'Junk hauling goes to whoever answers and shows up. {{business}} picks up, gives you a number, and gets it gone — often same day.',
    close: "Make the call. We'll clear it out."
  },
  trucking_auto: {
    label: 'Trucking & Auto',
    tagline: 'Vehicles, Trailers, and Hauling Handled',
    services: [
      'Local Hauling',
      'Trailer Service',
      'Fleet Support',
      'Transport',
      'Washouts',
      'Roadside Coordination'
    ],
    heroImage: '/heroes/junk_removal.webp',
    accent: '#0f766e',
    gradient: ['#042f2e', '#0f766e'],
    h1: 'Need vehicle or hauling help in {{city}}? {{business}} answers.',
    sub: 'Transport, trailers, washouts, fleet work, and local hauling. We pick up and get the job moving.',
    gap: 'Vehicle and hauling jobs are timing jobs. {{business}} answers the phone, confirms the details, and gets the work scheduled.',
    close: 'Make the call. Keep it moving.'
  },
  landscaping: {
    label: 'Landscaping',
    tagline: 'Yards Worth Coming Home To',
    services: [
      'Lawn Care & Mowing',
      'Cleanups & Hauling',
      'Mulch & Flower Beds',
      'Trees & Shrubs',
      'Sod & Seeding',
      'Free Estimates'
    ],
    heroImage: '/heroes/landscaping.webp',
    accent: '#4d7c0f',
    gradient: ['#1a2e05', '#4d7c0f'],
    h1: 'Yard getting away from you in {{city}}? {{business}} answers and shows up.',
    sub: 'Mowing, cleanups, beds, and full makeovers — we pick up, quote, and get on the schedule.',
    gap: "A landscaping quote shouldn't take a week of phone tag. {{business}} answers, walks your yard, and gets you a number while the others let it ring.",
    close: "Make the call. We'll make it sharp."
  },
  snow_removal: {
    label: 'Snow Removal',
    tagline: 'Cleared Fast, All Winter',
    services: [
      'Driveway Plowing',
      'Commercial Lots',
      'Sidewalk Clearing',
      'Salting & Ice Control',
      'Seasonal Contracts',
      'Storm Response'
    ],
    heroImage: '/heroes/landscaping.webp',
    accent: '#0284c7',
    gradient: ['#082f49', '#0284c7'],
    h1: 'Snow piling up in {{city}}? {{business}} answers before the storm wins.',
    sub: 'Driveways, lots, walks, and ice control. We pick up, route the job, and clear the way.',
    gap: 'Snow removal goes to whoever answers before the route fills. {{business}} picks up, confirms the address, and gets you on the list.',
    close: 'Make the call. Get cleared out.'
  },
  insurance: {
    label: 'Insurance',
    tagline: 'Coverage With a Real Person',
    services: [
      'Auto Insurance',
      'Home Insurance',
      'Business Coverage',
      'Life Insurance',
      'Policy Reviews',
      'Claims Guidance'
    ],
    heroImage: '/heroes/cleaning.webp',
    accent: '#2563eb',
    gradient: ['#0f172a', '#2563eb'],
    h1: 'Need insurance help in {{city}}? {{business}} answers like a local.',
    sub: 'Quotes, policy reviews, claims questions, and coverage changes. We pick up and help you understand the next move.',
    gap: 'Insurance questions should not disappear into a call queue. {{business}} answers, reviews the details, and helps you protect what matters.',
    close: 'Make the call. Get covered with clarity.'
  },
  real_estate: {
    label: 'Real Estate',
    tagline: 'Local Guidance From First Call to Close',
    services: [
      'Buyer Representation',
      'Listing Strategy',
      'Market Pricing',
      'Showings',
      'Relocation Help',
      'Investment Properties'
    ],
    heroImage: '/heroes/roofing.webp',
    accent: '#7c2d12',
    gradient: ['#241004', '#7c2d12'],
    h1: 'Buying or selling in {{city}}? {{business}} answers and gets to work.',
    sub: 'Showings, listings, pricing, and local advice. We pick up, learn the goal, and move the deal forward.',
    gap: 'Real estate moves when someone responds. {{business}} answers the first call, gets your details, and helps you take the next step.',
    close: 'Make the call. Start the move.'
  },
  finance: {
    label: 'Financial Services',
    tagline: 'Practical Money Help, Close to Home',
    services: [
      'Accounts & Loans',
      'Credit Support',
      'Business Banking',
      'Financial Planning',
      'Member Service',
      'Local Guidance'
    ],
    heroImage: '/heroes/cleaning.webp',
    accent: '#4338ca',
    gradient: ['#111827', '#4338ca'],
    h1: 'Need financial help in {{city}}? {{business}} answers.',
    sub: 'Accounts, loans, credit questions, and planning. We pick up, clarify the need, and help you take the next step.',
    gap: 'Money decisions need a real response. {{business}} answers, listens to the details, and points you toward the right option.',
    close: 'Make the call. Get a clear next step.'
  },
  retail: {
    label: 'Local Retail',
    tagline: 'Local Help, Real Answers',
    services: [
      'Local Products',
      'Equipment & Supplies',
      'Special Orders',
      'Pickup & Availability',
      'Repairs & Support',
      'Customer Service'
    ],
    heroImage: '/heroes/cleaning.webp',
    accent: '#be123c',
    gradient: ['#2a0610', '#be123c'],
    h1: 'Looking for local help in {{city}}? {{business}} answers.',
    sub: 'Products, availability, special orders, and service questions. We pick up and help you find what you need.',
    gap: 'Local customers call because they want an answer now. {{business}} picks up, checks the details, and keeps the sale moving.',
    close: 'Make the call. Get the answer.'
  }
};

export const NICHE_KEYS = Object.keys(NICHES) as Niche[];

export function isNiche(value: string): value is Niche {
  return value in NICHES;
}

export function servicesForNiche(niche: Niche): string[] {
  return NICHES[niche].services;
}
