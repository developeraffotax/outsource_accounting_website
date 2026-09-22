// components/shared/forms/Model.jsx
"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Model = ({ isOpen, onClose, children }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to allow CSS transition to kick in
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      // Wait for exit animation to finish before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "";
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-9999 flex transition-all duration-300 ${
        isAnimating
          ? "bg-black/60 backdrop-blur-sm"
          : "bg-black/0 backdrop-blur-none"
      } items-end justify-center md:items-center md:p-6`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-5xl transform transition-all duration-300 ease-out
          /* Mobile: bottom drawer */
          max-h-[92vh] rounded-t-[28px] bg-white shadow-2xl
          ${
            isAnimating
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }
          /* Desktop: centered modal */
          md:max-h-[92vh] md:rounded-[28px] md:translate-y-0
          ${
            isAnimating
              ? "md:scale-100 md:opacity-100 md:animate-in md:fade-in md:zoom-in-95 md:slide-in-from-top-4"
              : "md:scale-95 md:opacity-0"
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button – top right on both mobile & desktop */}
        <div className="absolute right-3 top-3 z-20 sm:right-4 sm:top-4">
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl font-semibold text-slate-500 shadow-sm transition-colors hover:bg-white hover:text-slate-700"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content container – extra top padding on mobile for the handle area */}
        <div className="max-h-[92vh] overflow-y-auto pt-4 md:pt-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Optional drag handle (mobile only) */}
          <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-slate-300 md:hidden" />
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Model;