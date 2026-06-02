"use client";

import { FormEvent, useEffect, useState } from "react";

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
  foundUs: string;
  message: string;
};

const roleOptions = [
  "Teacher",
  "Head Teacher",
  "Admin",
  "Executive",
  "Principal",
  "IT",
  "Other",
];

const subjectOptions = [
  "Maintenance Package",
  "Urgent Callout",
  "QR Error Reporting",
  "Teacher Training",
  "Something Else",
];

const foundUsOptions = [
  "Google Search",
  "Recommended by a colleague",
  "Social Media",
  "My school already uses edfleet3d",
  "Other",
];

export default function ContactForm({
  prefillSubject,
  prefillPrinters,
}: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    school: "",
    role: "",
    email: "",
    phone: "",
    subject: subjectOptions[0] ?? "",
    printerCount: prefillPrinters ? String(prefillPrinters) : "",
    foundUs: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
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

  const handleChange = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formState.name.trim()) nextErrors.name = "Required.";
    if (!formState.school.trim()) nextErrors.school = "Required.";
    if (!formState.role.trim()) nextErrors.role = "Required.";
    if (!formState.email.trim()) nextErrors.email = "Required.";
    if (!formState.subject.trim()) nextErrors.subject = "Required.";
    if (!formState.message.trim()) nextErrors.message = "Required.";

    if (formState.printerCount.trim()) {
      const printerValue = Number(formState.printerCount);
      if (Number.isNaN(printerValue) || printerValue < 1) {
        nextErrors.printerCount = "Must be at least 1.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) throw new Error("Submission failed");

      setStatus("success");
      setFormState((prev) => ({
        ...prev,
        name: "",
        school: "",
        role: "",
        email: "",
        phone: "",
        foundUs: "",
        message: "",
        printerCount: "",
      }));
    } catch {
      setStatus("error");
      setSubmitError(
        "Unable to send right now. Please check your details and try again."
      );
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary";

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
              Complete the form and we will get back to you within 1-2 business days.
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
                    Thanks! We will be in touch within 1-2 business days.
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
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={inputClass}
                    />
                    {errors.name && <p className="mt-1 text-xs text-secondary">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-muted">School Name*</label>
                    <input
                      type="text"
                      value={formState.school}
                      onChange={(e) => handleChange("school", e.target.value)}
                      className={inputClass}
                    />
                    {errors.school && <p className="mt-1 text-xs text-secondary">{errors.school}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-muted">What role best describes you?*</label>
                    <select
                      value={formState.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select a role</option>
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    {errors.role && <p className="mt-1 text-xs text-secondary">{errors.role}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-muted">Email Address*</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={inputClass}
                    />
                    {errors.email && <p className="mt-1 text-xs text-secondary">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-muted">Phone Number</label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted">How can we help?*</label>
                    <select
                      value={formState.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className={inputClass}
                    >
                      {subjectOptions.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    {errors.subject && <p className="mt-1 text-xs text-secondary">{errors.subject}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-muted">Number of Printers</label>
                    <input
                      type="number"
                      min={1}
                      value={formState.printerCount}
                      onChange={(e) => handleChange("printerCount", e.target.value)}
                      className={inputClass}
                    />
                    {errors.printerCount && <p className="mt-1 text-xs text-secondary">{errors.printerCount}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-muted">How did you find us?</label>
                    <select
                      value={formState.foundUs}
                      onChange={(e) => handleChange("foundUs", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select an option</option>
                      {foundUsOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted">Message*</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={4}
                    className={inputClass}
                  />
                  {errors.message && <p className="mt-1 text-xs text-secondary">{errors.message}</p>}
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