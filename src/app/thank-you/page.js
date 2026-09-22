"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ThankYouPage() {
  const router = useRouter();

  // 1. Initialize state synchronously on initial mount
  const [allowed] = useState(() => {
    if (typeof window === "undefined") return false;

    const submitted = sessionStorage.getItem("quote_form_submitted");
    if (submitted === "true") {
      sessionStorage.removeItem("quote_form_submitted");
      return true;
    }
    return false;
  });

  // 2. Handle side-effect (redirect) if not allowed
  useEffect(() => {
    if (!allowed) {
      router.replace("/");
    }
  }, [allowed, router]);

  // Prevent flash of content while redirecting
  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--color-buttonBlue) border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-slate-50">
      {/* Soft background accents matching your form */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-(--color-veryLightBlue) blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-(--color-linearBar)/40 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-(--color-buttonBlue)/5 blur-2xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center px-5 py-20 sm:px-8">
        {/* Card */}
        <div className="w-full overflow-hidden rounded-[28px] border border-(--color-linearBar) bg-white shadow-[0_28px_80px_rgba(23,33,58,0.18)]">
          <div className="relative px-6 py-12 text-center sm:px-12 sm:py-16">
            {/* Success icon */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-(--color-veryLightBlue)">
              <svg
                className="h-10 w-10 text-(--color-buttonBlue)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-(--color-buttonBlue)">
              Quote Request Received
            </p>

            <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-800 sm:text-4xl">
              Thank you!
            </h1>

            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600">
              We’ve received your details and will put together a tailored
              outsourcing plan with clear pricing.
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Our team typically responds within one business day. Keep an eye
              on your inbox (and spam folder, just in case).
            </p>

            {/* Decorative bottom shapes like the form */}
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-(--color-linearBar) blur-sm opacity-70" />
            <div className="pointer-events-none absolute -bottom-6 left-16 h-16 w-7 rounded-[999px] bg-(--color-buttonBlue) opacity-80" />
            <div className="pointer-events-none absolute -bottom-4 left-28 h-12 w-5 rotate-12 rounded-[999px] bg-(--color-ImgOverlay) opacity-70" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-(--color-buttonBlue) px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-sm transition-all duration-300 hover:brightness-110 active:scale-[0.99]"
          >
            Back to Home
          </Link>
          <p className="text-xs text-slate-500">
            Need anything else? Just reply to our email.
          </p>
        </div>
      </div>
    </div>
  );
}