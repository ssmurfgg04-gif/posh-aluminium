// Posh Aluminium — Brand constants

export const COMPANY = {
  name: "Posh Aluminium",
  fullName: "Posh Aluminium & Glass",
  tagline: "Premium Aluminium & Glass Solutions",
  phone: "0706 878 066",
  phoneIntl: "+254706878066",
  phoneDisplay: "+254 706 878 066",
  whatsapp: "254706878066",
  email: "info@poshaluminium.co.ke",
  emailSales: "sales@poshaluminium.co.ke",
  address: "Industrial Area, Nairobi, Kenya",
  addressLine2: "Off Likoni Road, Plot 247",
  hoursWeek: "Mon – Fri: 8:00 AM – 6:00 PM",
  hoursSat: "Saturday: 9:00 AM – 4:00 PM",
  hoursSun: "Sunday: Closed",
  mapsQuery: "Industrial+Area+Nairobi+Kenya",
  founded: 2010,
  social: {
    facebook: "https://facebook.com/poshaluminium",
    instagram: "https://instagram.com/poshaluminium",
    linkedin: "https://linkedin.com/company/poshaluminium",
    youtube: "https://youtube.com/@poshaluminium",
  },
};

export const BRAND = {
  navy: "#0B1F3A",
  royal: "#165DDB",
  royalBright: "#2E7AF5",
  red: "#DC2626",
  mist: "#F5F7FA",
  silver: "#E5E9F0",
};

export const STATS = [
  { value: 500, suffix: "+", labelKey: "trust.projects" as const },
  { value: 15, suffix: "+", labelKey: "trust.years" as const },
  { value: 98, suffix: "%", labelKey: "trust.satisfaction" as const },
  { value: 24, suffix: " hr", labelKey: "trust.response" as const },
];

export const BRANDS = [
  { name: "Saint Gobain", country: "France" },
  { name: "Dormakaba", country: "Switzerland" },
  { name: "Assa Abloy", country: "Sweden" },
  { name: "Yale", country: "UK" },
  { name: "Schüco", country: "Germany" },
  { name: "Reynaers", country: "Belgium" },
];

export const PROJECT_CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" },
  { id: "hospital", label: "Hospitals" },
  { id: "school", label: "Schools" },
  { id: "hotel", label: "Hotels" },
  { id: "apartment", label: "Apartments" },
];

export const WHATSAPP_LINK = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
  "Hello Posh Aluminium, I'd like to enquire about your services."
)}`;

export const TEL_LINK = `tel:${COMPANY.phoneIntl}`;
