"use client";

type HeroProps = {
  onPackages: () => void;
  onQuote: () => void;
};

export default function Hero({ onPackages, onQuote }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-background pt-24"
    >
      <div
        className="absolute inset-0 opacity-30 animate-grid-pan"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.18),transparent_65%)]" />
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-8">
          <p
            className="text-sm uppercase tracking-[0.3em] text-muted animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Keeping school printers printing.
          </p>
          <h1
            className="text-4xl font-display font-semibold leading-tight text-balance sm:text-5xl md:text-6xl animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            3D Printer Maintenance for Sydney Schools
          </h1>
          <p
            className="max-w-2xl text-lg text-muted sm:text-xl animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            Keep your printers printing and your teachers teaching.
          </p>
          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <button
              type="button"
              onClick={onPackages}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              See Our Packages
            </button>
            <button
              type="button"
              onClick={onQuote}
              className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-black"
            >
              Get a Quote
            </button>
          </div>
          <div
            className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-muted animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            <span className="rounded-full border border-border px-3 py-2">
              Sydney-Based
            </span>
            <span className="rounded-full border border-border px-3 py-2">
              School Specialists
            </span>
            <span className="rounded-full border border-border px-3 py-2">
              Fast Response
            </span>
            <span className="rounded-full border border-border px-3 py-2">
              No Lock-In Contracts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
