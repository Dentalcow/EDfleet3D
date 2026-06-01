"use client";

import { FormEvent, useEffect, useState } from "react";
import { packages } from "@/lib/packages";

type ContactFormProps = {
  prefillSubject: string;
  prefillPrinters: number;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  school: string;
  role: string;
  email: string;
  phone: string;
  subject: string;
  printerCount: string;
  message: string;
};

const roleOptions = [
  "Teacher",
  "IT Coordinator",
  "Business Manager",
  "Principal",
  "Other",
];

export default function ContactForm({
  prefillSubject,
  prefillPrinters,
}: ContactFormProps) {
  const packageSubjects = packages.map((pkg) => pkg.name);
  const subjectOptions = Array.from(
    new Set([
      "General Enquiry",
      ...packageSubjects,
      "PrintPing Enquiry",
      "Training EOI",
      "Fleet Pricing",
    ])
  );

  const [formState, setFormState] = useState<FormState>({
    name: "",
    school: "",
    role: "",
    email: "",
    phone: "",
    subject: subjectOptions[0] ?? "",
    printerCount: prefillPrinters ? String(prefillPrinters) : "3",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (prefillSubject) {
      setFormState((prev) => ({ ...prev, subject: prefillSubject }));
    }
  }, [prefillSubject]);

  useEffect(() => {
    if (prefillPrinters) {
      setFormState((prev) => ({
        ...prev,
        printerCount: String(prefillPrinters),
      }));
    }
  }, [prefillPrinters]);

  const handleChange = (
    field: keyof FormState,
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formState.name.trim()) nextErrors.name = "Required.";
    if (!formState.school.trim()) nextErrors.school = "Required.";
    if (!formState.email.trim()) nextErrors.email = "Required.";
    if (!formState.subject.trim()) nextErrors.subject = "Required.";
    if (!formState.message.trim()) nextErrors.message = "Required.";

    const printerValue = Number(formState.printerCount);
    if (!formState.printerCount.trim() || Number.isNaN(printerValue)) {
      nextErrors.printerCount = "Required.";
    } else if (printerValue < 1) {
      nextErrors.printerCount = "Must be at least 1.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          school: formState.school,
          role: formState.role,
          email: formState.email,
          phone: formState.phone,
          subject: formState.subject,
          printerCount: formState.printerCount,
          message: formState.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setFormState((prev) => ({
        ...prev,
        name: "",
        school: "",
        role: "",
        email: "",
        phone: "",
        message: "",
      }));
    } catch (err) {
      setStatus("error");
      setSubmitError(
        "Unable to send right now. Please check your details and try again."
      );
    }
  };

  return (
    <section id="contact" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">
              Contact
            </p>
            <h2 className="text-3xl font-display font-semibold sm:text-4xl">
              Tell us about your printers
            </h2>
            <p className="text-muted">
              Complete the form and we&apos;ll confirm your quote or callout
              within 24 hours.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success animate-tick-pop">
                  ✓
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    Thanks! We&apos;ll be in touch within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-black"
                  >
                    Send another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-muted">Your Name*</label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(event) =>
                        handleChange("name", event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-secondary">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted">School Name*</label>
                    <input
                      type="text"
                      value={formState.school}
                      onChange={(event) =>
                        handleChange("school", event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
                    />
                    {errors.school && (
                      <p className="mt-1 text-xs text-secondary">
                        {errors.school}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-muted">Your Role</label>
                    <select
                      value={formState.role}
                      onChange={(event) =>
                        handleChange("role", event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
                    >
                      <option value="">Select a role</option>
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-muted">Email Address*</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(event) =>
                        handleChange("email", event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-secondary">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-muted">Phone Number</label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(event) =>
                        handleChange("phone", event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted">Subject*</label>
                    <select
                      value={formState.subject}
                      onChange={(event) =>
                        handleChange("subject", event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
                    >
                      {subjectOptions.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-xs text-secondary">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted">
                    Number of Printers*
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formState.printerCount}
                    onChange={(event) =>
                      handleChange("printerCount", event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
                  />
                  {errors.printerCount && (
                    <p className="mt-1 text-xs text-secondary">
                      {errors.printerCount}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-muted">Message*</label>
                  <textarea
                    value={formState.message}
                    onChange={(event) =>
                      handleChange("message", event.target.value)
                    }
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-secondary">
                      {errors.message}
                    </p>
                  )}
                </div>
                {submitError && (
                  <p className="text-sm text-secondary">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
