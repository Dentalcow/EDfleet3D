"use client";

import { packages, ServicePackage } from "@/lib/packages";
import { formatPrice } from "@/lib/utils";

type PackagesProps = {
  printerCount: number;
  isFleetPricing: boolean;
  selectedPackageId: string | null;
  onPrinterCountChange: (count: number, isFleetPricing: boolean) => void;
  onHighlightPackage: (id: string) => void;
  onSelectPackage: (pkg: ServicePackage) => void;
};

export default function Packages({
  printerCount,
  isFleetPricing,
  selectedPackageId,
  onPrinterCountChange,
  onHighlightPackage,
  onSelectPackage,
}: PackagesProps) {
  const displayCount = isFleetPricing ? "20+" : printerCount.toString();
  const iconMap: Record<string, string> = {
    basic: "🛠️",
    "deep-clean": "🧼",
    urgent: "⚡",
  };

  return (
    <section id="packages" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            Services & Packages
          </p>
          <h2 className="text-3xl font-display font-semibold sm:text-4xl">
            Maintenance plans that scale with your fleet
          </h2>
          <p className="text-muted">
            Choose the package that suits your school and let us handle the
            ongoing maintenance.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted">
                How many 3D printers does your school have?
              </p>
              <p className="mt-2 text-3xl font-display font-semibold">
                {displayCount} printers
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <input
                type="range"
                min={1}
                max={20}
                value={printerCount}
                onChange={(event) =>
                  onPrinterCountChange(
                    Number(event.target.value),
                    event.target.value === "20" ? isFleetPricing : false
                  )
                }
                className="w-full accent-primary"
              />
              <div className="flex items-center justify-between text-xs text-muted">
                <span>1 printer</span>
                <button
                  type="button"
                  onClick={() => onPrinterCountChange(20, true)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    isFleetPricing
                      ? "border-primary text-primary"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  20+
                </button>
              </div>
              {isFleetPricing && (
                <p className="text-xs text-primary">
                  Fleet pricing available — contact us for a custom quote.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            const price =
              pkg.unitPrice !== null
                ? pkg.scaledByPrinterCount
                  ? formatPrice(pkg.unitPrice * printerCount)
                  : formatPrice(pkg.unitPrice)
                : null;

            return (
              <div
                key={pkg.id}
                role="button"
                tabIndex={0}
                onClick={() => onHighlightPackage(pkg.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    onHighlightPackage(pkg.id);
                  }
                }}
                className={`flex h-full cursor-pointer flex-col rounded-2xl border bg-surface p-6 transition hover:-translate-y-1 hover:shadow-lg ${
                  isSelected
                    ? "border-primary shadow-[0_0_0_1px_var(--color-primary)]"
                    : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted">Package</p>
                    <h3 className="mt-2 text-xl font-display font-semibold">
                      <span className="mr-2">{iconMap[pkg.id] ?? "🔧"}</span>
                      {pkg.name}
                    </h3>
                  </div>
                  {pkg.badge && (
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                      {pkg.badge}
                    </span>
                  )}
                </div>
                <div className="mt-6">
                  <p className="text-3xl font-display font-semibold">
                    {price ?? (
                      <span className="text-base text-muted">
                        {pkg.priceLabel}
                      </span>
                    )}
                  </p>
                  {price && pkg.scaledByPrinterCount && (
                    <p className="mt-1 text-xs text-muted">
                      Based on {printerCount} printers
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted">{pkg.frequency}</p>
                </div>
                <p className="mt-4 text-sm text-muted">{pkg.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 text-primary">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelectPackage(pkg);
                  }}
                  className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110"
                >
                  {pkg.cta}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-muted">
          All prices are GST-inclusive. Fleet pricing available for 10+
          printers — contact us for a custom quote.
        </p>
        <p className="mt-4 text-xs text-muted">
          TODO for business owner: Update lib/packages.ts with final pricing and
          package copy before launch.
        </p>
      </div>
    </section>
  );
}
