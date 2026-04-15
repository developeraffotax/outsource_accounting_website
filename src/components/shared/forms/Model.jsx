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
      }, 200); // Match transition duration
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
      className={`fixed inset-0 z-9999 flex items-center justify-center p-3 md:p-6 transition-all duration-200 ${
        isAnimating
          ? "bg-black/60 backdrop-blur-sm"
          : "bg-black/0 backdrop-blur-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-5xl transform transition-all duration-200 ${
          isAnimating
            ? "scale-100 opacity-100 animate-in fade-in zoom-in-95 slide-in-from-top-4"
            : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="absolute right-3 top-3 z-20 sm:right-4 sm:top-4">
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl font-semibold text-slate-500 shadow-sm transition-colors hover:bg-white hover:text-slate-700"
            aria-label="Close modal"
          >
            x
          </button>
        </div>

        {/* Content container */}
        <div className="max-h-[92vh] overflow-y-auto rounded-[28px] shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Model;
