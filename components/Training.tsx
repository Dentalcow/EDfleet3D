"use client";

import { FormEvent, useState } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Training() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: "Training EOI",
          message: `Training EOI from ${name} (${email}).`,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="training" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-surface p-8 md:p-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">
              Coming Soon
            </p>
            <h2 className="text-3xl font-display font-semibold sm:text-4xl">
              Slicer Training for Teachers
            </h2>
            <p className="text-muted">
              We&apos;re building a structured training program to help teachers
              get confident with slicer software (Bambu Studio, PrusaSlicer,
              Creality Print) and printer setup. Sessions will be available as
              bookable in-school workshops or remote video calls.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Slicer Fundamentals",
                description:
                  "Learn to prepare models, set supports, and choose print settings.",
              },
              {
                title: "Printer Setup & Calibration",
                description:
                  "First-layer calibration, bed levelling, Z-offset.",
              },
              {
                title: "Basic Troubleshooting",
                description:
                  "Common faults and how to handle them before calling us.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <h3 className="text-lg font-display font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted">
                Expected availability: Term 3, 2025 — Sydney schools only
                initially.
              </p>
            </div>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
              >
                Register Your Interest
              </button>
            </form>
          </div>
          {status === "success" && (
            <p className="mt-4 text-sm text-success">
              We&apos;ll be in touch when bookings open!
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-secondary">{error}</p>
          )}
        </div>
      </div>
    </section>
  );
}
