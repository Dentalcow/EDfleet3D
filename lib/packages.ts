// TBD — replace all placeholder values below with final content before launch

export type ServicePackage = {
  id: string;
  name: string;
  badge: string | null;
  unitPrice: number | null;
  priceLabel: string;
  frequency: string;
  description: string;
  includes: string[];
  scaledByPrinterCount: boolean;
  outOfHoursOnly?: boolean;
  duringTermSurcharge?: boolean;
  cta: string;
};

export const packages: ServicePackage[] = [
  {
    id: "basic",
    name: "Basic Maintenance",
    badge: "Most Popular",
    unitPrice: null,
    priceLabel: "Pricing coming soon",
    frequency: "TBD",
    description: "TBD",
    includes: [
      "TBD",
      "TBD",
      "TBD",
    ],
    scaledByPrinterCount: true,
    cta: "Select This Package",
  },
  {
    id: "deep-clean",
    name: "Advanced Deep Clean",
    badge: "Recommended",
    unitPrice: null,
    priceLabel: "Pricing coming soon",
    frequency: "TBD",
    description: "TBD",
    includes: [
      "TBD",
      "TBD",
    ],
    scaledByPrinterCount: true,
    cta: "Select This Package",
  },
  {
    id: "urgent",
    name: "Urgent Callout",
    badge: null,
    unitPrice: null,
    priceLabel: "From $TBD",
    frequency: "On demand. Available outside school hours only. Higher rate applies during term time.",
    description: "TBD",
    includes: [
      "TBD",
      "TBD",
    ],
    scaledByPrinterCount: false,
    outOfHoursOnly: true,
    duringTermSurcharge: true,
    cta: "Request Urgent Callout",
  },
];