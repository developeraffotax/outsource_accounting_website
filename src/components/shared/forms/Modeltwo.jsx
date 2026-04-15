"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Modeltwo = ({ isOpen, onClose, children }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
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
      className={`fixed inset-0 z-101 flex items-center justify-center p-4 w-full transition-all duration-200 ${
        isAnimating
          ? "bg-black/60 backdrop-blur-sm"
          : "bg-black/0 backdrop-blur-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-3/4 h-4/5 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all duration-200 ${
          isAnimating
            ? "scale-100 opacity-100 animate-in fade-in zoom-in-95 slide-in-from-top-4"
            : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="absolute right-3 top-3 z-10 shrink-0">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Content area with proper spacing for close button */}
        <div className="px-6 pb-6 pt-12 flex-1 min-h-0 overflow-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modeltwo;
