import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with John Doe — open to project collaborations, freelance enquiries, and new full-time opportunities.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="mb-16 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Contact
        </p>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Get in touch
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          I&apos;m open to collaborations, freelance projects, and full-time
          opportunities. Fill in the form and I&apos;ll respond within one
          business day.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        {/* ── Contact details ─────────────────────────────────────── */}
        <aside aria-label="Contact details" className="flex flex-col gap-6">
          <dl className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <dt className="sr-only">Email</dt>
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500"
                aria-hidden="true"
              />
              <dd className="text-sm text-zinc-600 dark:text-zinc-400">
                john@example.com
              </dd>
            </div>

            <div className="flex items-start gap-3">
              <dt className="sr-only">Location</dt>
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500"
                aria-hidden="true"
              />
              <dd className="text-sm text-zinc-600 dark:text-zinc-400">
                Nairobi, Kenya · Remote-friendly
              </dd>
            </div>

            <div className="flex items-start gap-3">
              <dt className="sr-only">Response time</dt>
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500"
                aria-hidden="true"
              />
              <dd className="text-sm text-zinc-600 dark:text-zinc-400">
                Typically responds within 24 hours
              </dd>
            </div>
          </dl>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Availability
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Currently available for new projects starting{" "}
              <strong className="font-medium text-zinc-900 dark:text-zinc-50">
                Q4 2026
              </strong>
              .
            </p>
          </div>
        </aside>

        {/* ── Contact form ──────────────────────────────────────────── */}
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}