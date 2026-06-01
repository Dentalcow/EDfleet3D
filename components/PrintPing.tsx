"use client";

type PrintPingProps = {
  onEnquiry: () => void;
};

export default function PrintPing({ onEnquiry }: PrintPingProps) {
  const systemName =
    process.env.NEXT_PUBLIC_QR_SYSTEM_NAME?.trim() || "PrintPing";

  return (
    <section id="printping" className="bg-surface py-20 md:py-32">
      <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-background p-6">
            <svg
              viewBox="0 0 360 280"
              className="h-full w-full"
              role="img"
              aria-label="QR reporting mockup"
            >
              <rect
                x="24"
                y="30"
                width="200"
                height="180"
                rx="16"
                fill="#111827"
                stroke="#1F2937"
                strokeWidth="2"
              />
              <rect
                x="48"
                y="58"
                width="110"
                height="80"
                rx="8"
                fill="#0A0E1A"
                stroke="#00D4FF"
                strokeWidth="2"
              />
              <rect x="170" y="60" width="36" height="36" fill="#0A0E1A" />
              <rect x="170" y="104" width="36" height="36" fill="#0A0E1A" />
              <rect
                x="250"
                y="80"
                width="90"
                height="160"
                rx="20"
                fill="#0A0E1A"
                stroke="#1F2937"
                strokeWidth="2"
              />
              <rect
                x="264"
                y="100"
                width="62"
                height="90"
                rx="10"
                fill="#111827"
              />
              <rect
                x="270"
                y="110"
                width="50"
                height="12"
                fill="#00D4FF"
                opacity="0.6"
              />
              <rect
                x="270"
                y="130"
                width="50"
                height="12"
                fill="#1F2937"
              />
              <rect
                x="270"
                y="150"
                width="50"
                height="12"
                fill="#1F2937"
              />
              <circle cx="192" cy="186" r="16" fill="#00D4FF" />
              <path
                d="M210 190c28 6 54 0 70-14"
                stroke="#00D4FF"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <div className="mt-4 flex items-center justify-between text-xs text-muted">
              <span>QR sticker</span>
              <span className="font-mono text-primary">{systemName}</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            Smart Error Reporting
          </p>
          <h2 className="text-3xl font-display font-semibold sm:text-4xl">
            Every Printer Gets Its Own QR Code
          </h2>
          <p className="text-muted">
            With {systemName}, each printer in your fleet gets a unique QR
            sticker. When something goes wrong, anyone — student, teacher, or
            staff — simply scans the code and submits a fault report in seconds.
            No emails, no phone calls, no lost sticky notes.
          </p>
          <ul className="space-y-3 text-sm text-muted">
            {[
              "Unique QR code per printer",
              "Custom error categories (jams, bed adhesion, layer shifts, etc.)",
              "Automatic requoting triggered on submission",
              "Service history logged per device",
              "Notifies edfleet3d instantly",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onEnquiry}
            className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-black"
          >
            Ask About {systemName}
          </button>
        </div>
      </div>
    </section>
  );
}
