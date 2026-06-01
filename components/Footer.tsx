"use client";

type FooterProps = {
  onNavigate: (id: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@edfleet3d.com.au";

  return (
    <footer className="bg-surface py-12">
      <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onNavigate("hero")}
            className="text-xl font-display font-semibold"
          >
            edfleet3d
          </button>
          <p className="text-sm text-muted">
            Sydney&apos;s school 3D printer specialists
          </p>
          <p className="text-sm text-muted">
            {contactEmail} · Sydney, NSW
          </p>
          <p className="text-xs text-muted">ABN: [PLACEHOLDER — replace]</p>
        </div>
        <div className="space-y-2 text-sm text-muted">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Navigate
          </p>
          {[
            { label: "Home", id: "hero" },
            { label: "Packages", id: "packages" },
            { label: "PrintPing", id: "printping" },
            { label: "Training", id: "training" },
            { label: "Contact", id: "contact" },
          ].map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              className="block text-left transition hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="space-y-2 text-sm text-muted">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Legal</p>
          <a href="/privacy" className="block hover:text-foreground">
            Privacy Policy
          </a>
          <a href="/terms" className="block hover:text-foreground">
            Terms of Service
          </a>
        </div>
        <div className="space-y-3 text-sm text-muted">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Social
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="rounded-full border border-border px-3 py-2 text-xs hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="#"
              className="rounded-full border border-border px-3 py-2 text-xs hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-xs text-muted">
            © 2025 edfleet3d. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
