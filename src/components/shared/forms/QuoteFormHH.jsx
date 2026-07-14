"use client";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

// --- Turnover Options ---
const turnoverOptions = [
  { value: "under_50k", label: "Under £50,000" },
  { value: "50k_150k", label: "£50,000 - £150,000" },
  { value: "150k_500k", label: "£150,000 - £500,000" },
  { value: "over_500k", label: "Over £500,000" },
];

// --- Enhanced Custom Select ---
const CustomSelect = ({ control, name, error, rules }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const triggerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e, field) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setIsOpen(true);
          setHighlightedIndex(0);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < turnoverOptions.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : turnoverOptions.length - 1,
          );
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlightedIndex >= 0) {
            const option = turnoverOptions[highlightedIndex];
            field.onChange(option.value);
            setIsOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case "Tab":
          setIsOpen(false);
          break;
        default:
          // Type‑ahead: focus first option starting with pressed letter
          const letter = e.key.toLowerCase();
          if (letter.length === 1) {
            const index = turnoverOptions.findIndex((opt) =>
              opt.label.toLowerCase().startsWith(letter),
            );
            if (index !== -1) {
              setHighlightedIndex(index);
              listRef.current?.children[index]?.scrollIntoView({
                block: "nearest",
              });
            }
          }
      }
    },
    [isOpen, highlightedIndex],
  );

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      listRef.current.children[highlightedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className="mb-4 relative" ref={containerRef}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const selectedOption = turnoverOptions.find(
            (opt) => opt.value === field.value,
          );

          return (
            <>
              {/* Trigger — identical styling to original inputs */}
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => handleKeyDown(e, field)}
                className={`w-full p-4 bg-white border rounded text-sm text-left flex items-center justify-between outline-none transition-all duration-150 ${
                  isOpen
                    ? "border-indigo-600 ring-2 ring-indigo-300"
                    : "border-gray-300 hover:border-gray-400"
                } ${error ? "border-red-500 ring-red-200" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby={`${name}-label`}
              >
                <span
                  className={selectedOption ? "text-gray-900" : "text-gray-500"}
                >
                  {selectedOption?.label || "Company Turnover"}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu with enhanced animations */}
              <div
                className={`absolute z-20 mt-1 w-full max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg transform-gpu transition-all duration-300 ease-out origin-top ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-3 pointer-events-none"
                }`}
                role="listbox"
                aria-label="Turnover options"
              >
                <div ref={listRef}>
                  {turnoverOptions.map((option, index) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        field.onChange(option.value);
                        setIsOpen(false);
                        triggerRef.current?.focus();
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`px-4 py-2.5 text-sm cursor-pointer transition-colors duration-100 flex items-center justify-between ${
                        field.value === option.value
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : highlightedIndex === index
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50"
                      }`}
                      role="option"
                      aria-selected={field.value === option.value}
                    >
                      {option.label}
                      {field.value === option.value && (
                        <svg
                          className="w-4 h-4 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        }}
      />

      {/* Error message — untouched, matches original design */}
      {error && (
        <div className="mt-2 flex items-start gap-2 px-3 py-2 bg-red-50 border-l-4 border-red-500 rounded-r-md animate-in fade-in slide-in-from-top-1 duration-200">
          <svg
            className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-800 text-xs font-medium leading-tight">
            {error.message}
          </p>
        </div>
      )}
    </div>
  );
};

// --- QuoteForm (unchanged except adding control) ---
const QuoteForm = ({ onSuccess }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      companyTurnover: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(`/api/contact`, data);
      toast.success(
        <div>
          <p className="font-bold">Quote Request Received</p>
          <p className="text-xs opacity-80">
            Thanks for reaching out! Your quote request has been successfully
            submitted. We’ll be in touch soon with the details.
          </p>
        </div>,
      );
      reset();

      // if (onSuccess) {
      //   await new Promise((resolve) => setTimeout(resolve, 2000));
      // }
    } catch (error) {
      console.log("error occued hero ", error);
      toast.error("failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name field — now controlled */}
      <div className="mb-4">
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full p-4 bg-white border border-gray-300 rounded text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 outline-none"
              {...field}
            />
          )}
        />
        {errors.name && (
          <div className="flex items-center gap-1.5 mt-1 px-2 py-1 bg-red-50 border-l-2 border-red-500 rounded-r-md">
            <svg
              className="w-3.5 h-3.5 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-700 text-[11px] font-medium leading-none">
              Name is required
            </p>
          </div>
        )}
      </div>

      {/* Company field — now controlled */}
      <div className="mb-4">
        <Controller
          name="company"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Enter Company Name"
              className="w-full p-4 bg-white border border-gray-300 rounded text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 outline-none"
              {...field}
            />
          )}
        />
        {errors.company && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-red-50 border-l-4 border-red-500 rounded-r-md animate-in fade-in slide-in-from-top-1 duration-200">
            <svg
              className="w-4 h-4 text-red-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-800 text-xs font-medium leading-none">
              Company name is required
            </p>
          </div>
        )}
      </div>

      {/* Custom Turnover Dropdown */}
      <CustomSelect
        name="companyTurnover"
        control={control}
        error={errors.companyTurnover}
        rules={{ required: "Please select a turnover" }}
      />

      {/* Email field — now controlled */}
      <div className="mb-6">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-4 bg-white border border-gray-300 rounded text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 outline-none"
              {...field}
            />
          )}
        />
        {errors.email && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-red-50 border-l-4 border-red-500 rounded-r-md animate-in fade-in slide-in-from-top-1">
            <svg
              className="w-4 h-4 text-red-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-red-800 text-xs font-semibold tracking-wide">
              {errors.email.message || "Email is required"}
            </p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-2/3 md:w-2/3 lg:1/3 mx-auto block px-8 py-2 rounded-sm bg-(--color-buttonBlue) text-white text-lg font-medium hover:opacity-90 transition ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {isSubmitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

export default QuoteForm;


































// "use client";
// import { useForm, Controller } from "react-hook-form";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useState, useRef, useEffect, useCallback } from "react";
// import { ChevronDown, Sparkles } from "lucide-react";

// // --- Turnover Options ---
// const turnoverOptions = [
//   { value: "under_50k", label: "Under £50,000" },
//   { value: "50k_150k", label: "£50,000 - £150,000" },
//   { value: "150k_500k", label: "£150,000 - £500,000" },
//   { value: "over_500k", label: "Over £500,000" },
// ];

// // --- Enhanced Custom Select ---
// const CustomSelect = ({ control, name, error, rules }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [highlightedIndex, setHighlightedIndex] = useState(-1);
//   const containerRef = useRef(null);
//   const listRef = useRef(null);
//   const triggerRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleKeyDown = useCallback(
//     (e, field) => {
//       if (!isOpen) {
//         if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
//           e.preventDefault();
//           setIsOpen(true);
//           setHighlightedIndex(0);
//         }
//         return;
//       }

//       switch (e.key) {
//         case "ArrowDown":
//           e.preventDefault();
//           setHighlightedIndex((prev) =>
//             prev < turnoverOptions.length - 1 ? prev + 1 : 0,
//           );
//           break;
//         case "ArrowUp":
//           e.preventDefault();
//           setHighlightedIndex((prev) =>
//             prev > 0 ? prev - 1 : turnoverOptions.length - 1,
//           );
//           break;
//         case "Enter":
//         case " ":
//           e.preventDefault();
//           if (highlightedIndex >= 0) {
//             const option = turnoverOptions[highlightedIndex];
//             field.onChange(option.value);
//             setIsOpen(false);
//           }
//           break;
//         case "Escape":
//           e.preventDefault();
//           setIsOpen(false);
//           triggerRef.current?.focus();
//           break;
//         case "Tab":
//           setIsOpen(false);
//           break;
//         default:
//           const letter = e.key.toLowerCase();
//           if (letter.length === 1) {
//             const index = turnoverOptions.findIndex((opt) =>
//               opt.label.toLowerCase().startsWith(letter),
//             );
//             if (index !== -1) {
//               setHighlightedIndex(index);
//               listRef.current?.children[index]?.scrollIntoView({
//                 block: "nearest",
//               });
//             }
//           }
//       }
//     },
//     [isOpen, highlightedIndex],
//   );

//   useEffect(() => {
//     if (isOpen && highlightedIndex >= 0 && listRef.current) {
//       listRef.current.children[highlightedIndex]?.scrollIntoView({
//         block: "nearest",
//       });
//     }
//   }, [highlightedIndex, isOpen]);

//   return (
//     <div className="relative" ref={containerRef}>
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         Company Turnover
//       </label>
//       <Controller
//         name={name}
//         control={control}
//         rules={rules}
//         render={({ field }) => {
//           const selectedOption = turnoverOptions.find(
//             (opt) => opt.value === field.value,
//           );

//           return (
//             <>
//               <button
//                 ref={triggerRef}
//                 type="button"
//                 onClick={() => setIsOpen(!isOpen)}
//                 onKeyDown={(e) => handleKeyDown(e, field)}
//                 className={`w-full px-4 py-3.5 bg-gray-50/50 border rounded-xl text-sm text-left flex items-center justify-between outline-none transition-all duration-200 ${
//                   isOpen
//                     ? "bg-white border-gray-900 ring-1 ring-gray-900 shadow-sm"
//                     : "border-gray-200 hover:bg-gray-100/50 hover:border-gray-300"
//                 } ${error ? "!border-red-500 !ring-1 !ring-red-500 bg-red-50/20" : ""}`}
//                 aria-haspopup="listbox"
//                 aria-expanded={isOpen}
//               >
//                 <span
//                   className={selectedOption ? "text-gray-900 font-medium" : "text-gray-400"}
//                 >
//                   {selectedOption?.label || "Select turnover amount..."}
//                 </span>
//                 <ChevronDown
//                   size={18}
//                   className={`text-gray-400 transition-transform duration-300 ${
//                     isOpen ? "rotate-180 text-gray-900" : ""
//                   }`}
//                 />
//               </button>

//               <div
//                 className={`absolute z-30 mt-2 w-full max-h-60 overflow-auto rounded-xl border border-gray-200/50 bg-white/90 backdrop-blur-xl p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-200 ease-out origin-top ${
//                   isOpen
//                     ? "opacity-100 translate-y-0 scale-100"
//                     : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
//                 }`}
//                 role="listbox"
//               >
//                 <div ref={listRef} className="space-y-0.5">
//                   {turnoverOptions.map((option, index) => (
//                     <div
//                       key={option.value}
//                       onClick={() => {
//                         field.onChange(option.value);
//                         setIsOpen(false);
//                         triggerRef.current?.focus();
//                       }}
//                       onMouseEnter={() => setHighlightedIndex(index)}
//                       className={`px-3 py-2.5 text-sm rounded-lg cursor-pointer transition-colors duration-150 flex items-center justify-between ${
//                         field.value === option.value
//                           ? "bg-gray-900 text-white font-medium"
//                           : highlightedIndex === index
//                             ? "bg-gray-100 text-gray-900"
//                             : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                       role="option"
//                       aria-selected={field.value === option.value}
//                     >
//                       <span>{option.label}</span>
//                       {field.value === option.value && (
//                         <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                         </svg>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           );
//         }}
//       />
//       {error && (
//         <p className="mt-1.5 text-red-500 text-xs font-medium flex items-center gap-1 animate-in fade-in">
//           <span className="w-1 h-1 rounded-full bg-red-500"></span>
//           {error.message}
//         </p>
//       )}
//     </div>
//   );
// };

// // --- QuoteForm ---
// const QuoteForm = ({ onSuccess }) => {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm({
//     defaultValues: {
//       name: "",
//       company: "",
//       email: "",
//       companyTurnover: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post(`/api/contact`, data);
//       toast.success(
//         <div className="text-sm">
//           <p className="font-semibold text-gray-900">Quote Request Received</p>
//           <p className="text-xs text-gray-500 mt-0.5">
//             Thanks for reaching out! We’ll be in touch soon with the details.
//           </p>
//         </div>,
//       );
//       reset();
//     } catch (error) {
//       toast.error("Failed to send message");
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto p-1">
//       {/* 
//         NEW BACKGROUND: 
//         A gorgeous frosted glass container with a subtle gradient and soft shadow.
//         Ensure your parent container has some background color or image to see the blur effect beautifully.
//       */}
//       <form 
//         onSubmit={handleSubmit(onSubmit)} 
//         className="relative bg-white/70 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] space-y-6"
//       >
//         <div className="space-y-1 mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Request a Quote</h2>
//           <p className="text-sm text-gray-500">Fill in your details below and we'll get right back to you.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Name field */}
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//             <Controller
//               name="name"
//               control={control}
//               rules={{ required: "Name is required" }}
//               render={({ field }) => (
//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                   className={`w-full px-4 py-3.5 bg-gray-50/50 border rounded-xl text-sm placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all duration-200 ${
//                     errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/20" : "border-gray-200 hover:border-gray-300"
//                   }`}
//                   {...field}
//                 />
//               )}
//             />
//             {errors.name && (
//               <p className="mt-1.5 text-red-500 text-xs font-medium flex items-center gap-1 animate-in fade-in">
//                 <span className="w-1 h-1 rounded-full bg-red-500"></span>
//                 {errors.name.message}
//               </p>
//             )}
//           </div>

//           {/* Company field */}
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
//             <Controller
//               name="company"
//               control={control}
//               rules={{ required: "Company is required" }}
//               render={({ field }) => (
//                 <input
//                   type="text"
//                   placeholder="Acme Corp"
//                   className={`w-full px-4 py-3.5 bg-gray-50/50 border rounded-xl text-sm placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all duration-200 ${
//                     errors.company ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/20" : "border-gray-200 hover:border-gray-300"
//                   }`}
//                   {...field}
//                 />
//               )}
//             />
//             {errors.company && (
//               <p className="mt-1.5 text-red-500 text-xs font-medium flex items-center gap-1 animate-in fade-in">
//                 <span className="w-1 h-1 rounded-full bg-red-500"></span>
//                 {errors.company.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Custom Turnover Dropdown */}
//         <CustomSelect
//           name="companyTurnover"
//           control={control}
//           error={errors.companyTurnover}
//           rules={{ required: "Please select a turnover bracket" }}
//         />

//         {/* Email field */}
//         <div className="relative !mb-10">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//           <Controller
//             name="email"
//             control={control}
//             rules={{ required: "Email is required" }}
//             render={({ field }) => (
//               <input
//                 type="email"
//                 placeholder="john@acme.com"
//                 className={`w-full px-4 py-3.5 bg-gray-50/50 border rounded-xl text-sm placeholder-gray-400 focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all duration-200 ${
//                   errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/20" : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 {...field}
//               />
//             )}
//           />
//           {errors.email && (
//             <p className="mt-1.5 text-red-500 text-xs font-medium flex items-center gap-1 animate-in fade-in">
//               <span className="w-1 h-1 rounded-full bg-red-500"></span>
//               {errors.email.message}
//             </p>
//           )}
//         </div>

//         {/* 
//           NEW BUTTON: 
//           Midnight gradient, pill-shaped, premium lift effect on hover.
//         */}
//         <div className="pt-2">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full md:w-2/3 lg:w-1/2 mx-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-b from-gray-800 to-black text-white text-sm font-semibold tracking-wide shadow-[0_8px_20px_rgb(0,0,0,0.16)] hover:shadow-[0_15px_25px_rgb(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ${
//               isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                 </svg>
//                 <span>Processing...</span>
//               </>
//             ) : (
//               <>
//                 <Sparkles size={16} className="text-gray-300" />
//                 <span>Submit Request</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default QuoteForm;