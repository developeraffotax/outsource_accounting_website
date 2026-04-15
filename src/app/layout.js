import localFont from "next/font/local";
import Script from "next/script";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import TopBar from "@/components/layout/TopBar/TopBar.jsx";
import Navbar from "@/components/layout/Navbar/Navbar.jsx";
import Footer from "@/components/layout/Footer/Footer.jsx";
import APICall from "@/components/shared/buttons/APICall.jsx";
// checking 403
const inter = localFont({
  src: "../assets/fonts/Inter-VariableFont.ttf",
  display: "swap",
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://outsourceaccountings.co.uk";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Outsource Accounting | Professional Accounting Services UK",
    template: "%s | Outsource Accounting",
  },
  description:
    "Expert outsourced accounting services for UK businesses — Annual Accounts, Self Assessment, Payroll, VAT, Bookkeeping, Corporation Tax & Company Formation.",
  verification: {
    google: "LXLD34lW_HVnOLdPsBFJ6yvGHQ0P62DJO3AWJg-xJIo",
  },
  authors: [{ name: "Outsource Accounting" }],
  creator: "Outsource Accounting",
  publisher: "Outsource Accounting",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      {
        url: "/FaviconWhite.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/FaviconBlue.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Outsource Accounting",
    title: "Outsource Accounting | Professional Accounting Services UK",
    description:
      "Expert outsourced accounting services for UK businesses — Annual Accounts, Self Assessment, Payroll, VAT, Bookkeeping, Corporation Tax & Company Formation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Outsource Accounting - Professional Accounting Services UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outsource Accounting | Professional Accounting Services UK",
    description:
      "Expert outsourced accounting services for UK businesses — Annual Accounts, Self Assessment, Payroll, VAT & more.",
    images: ["/og-image.png"],
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AccountingService",
      "@id": `${siteUrl}/#organization`,
      name: "Outsource Accounting",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.png`,
      },
      description:
        "Expert outsourced accounting services for UK businesses — Annual Accounts, Self Assessment, Payroll, VAT, Bookkeeping, Corporation Tax & Company Formation.",
      areaServed: "GB",
      serviceType: [
        "Annual Accounts",
        "Self Assessment",
        "Bookkeeping",
        "Payroll",
        "VAT Returns",
        "Company Formation",
        "Corporation Tax",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        areaServed: "GB",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Outsource Accounting",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/blogs?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JVX03L2MCN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JVX03L2MCN');
          `}
        </Script>
        <TopBar />
        <Navbar
          buyNowSlot={<APICall />}
          mobileBuyNowSlot={<APICall mobile />}
        />
        {children}
        <Footer />

        <ToastContainer
          position="bottom-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </body>
    </html>
  );
}
