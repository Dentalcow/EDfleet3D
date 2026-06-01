"use client";

import { useInView } from "@/lib/hooks/useInView";

const steps = [
  {
    title: "Get a Quote",
    description:
      "Choose your package, enter your printer count, submit the contact form. We’ll confirm within 24 hours.",
  },
  {
    title: "We Come to You",
    description:
      "A qualified technician visits your school at a pre-arranged time. No equipment to ship, no downtime.",
  },
  {
    title: "Back to Printing",
    description:
      "Printers serviced, report emailed, done. Repeat each term or book on demand.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-surface py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            How It Works
          </p>
          <h2 className="text-3xl font-display font-semibold sm:text-4xl">
            A simple, school-friendly process
          </h2>
        </div>
        <div className="relative mt-10">
          <div className="absolute left-6 right-6 top-6 hidden h-px bg-border md:block" />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <StepCard key={step.title} index={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type StepCardProps = {
  index: number;
  title: string;
  description: string;
};

function StepCard({ index, title, description }: StepCardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <div
      ref={ref}
      className={`relative z-10 rounded-2xl border border-border bg-background p-6 transition ${
        isInView ? "animate-fade-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary text-sm font-semibold text-primary">
          {index + 1}
        </span>
        <h3 className="text-lg font-display font-semibold">{title}</h3>
      </div>
      <p className="mt-4 text-sm text-muted">{description}</p>
    </div>
  );
}
