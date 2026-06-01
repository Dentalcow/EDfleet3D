// ⚠️ TBD — replace all placeholder values below with final content before launch

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
  cta: string;
};

export const packages: ServicePackage[] = [
  {
    id: "basic",
    name: "Basic Maintenance", // TBD
    badge: "Most Popular", // TBD or remove
    unitPrice: null, // TBD — price per printer per visit
    priceLabel: "Pricing coming soon",
    frequency: "TBD — e.g. once per term", // TBD
    description:
      "TBD — short summary of what this package covers and who it suits.",
    includes: [
      "TBD — line item 1",
      "TBD — line item 2",
      "TBD — line item 3",
    ],
    scaledByPrinterCount: true,
    cta: "Select This Package",
  },
  {
    id: "deep-clean",
    name: "Advanced Deep Clean", // TBD
    badge: "Recommended", // TBD or remove
    unitPrice: null, // TBD — price per printer per visit
    priceLabel: "Pricing coming soon",
    frequency: "TBD — e.g. once per semester",
    description:
      "TBD — short summary of what this package covers and who it suits.",
    includes: [
      "TBD — everything in Basic, plus:",
      "TBD — line item 1",
      "TBD — line item 2",
    ],
    scaledByPrinterCount: true,
    cta: "Select This Package",
  },
  {
    id: "urgent",
    name: "Urgent Callout", // TBD
    badge: null,
    unitPrice: null, // TBD — fixed fee, does not scale
    priceLabel: "From $TBD",
    frequency: "On demand",
    description:
      "TBD — short summary, e.g. same-day or next-day response when a printer goes down.",
    includes: ["TBD — line item 1", "TBD — line item 2"],
    scaledByPrinterCount: false,
    cta: "Request Urgent Callout",
  },
];
