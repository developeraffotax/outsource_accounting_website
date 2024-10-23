import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900", });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900", });

export const metadata = { title: "Outsource Accounting", description: "Outsource Accounting", };




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased  `} >
        <Header />
        <main className=" pt-24 max-lg:pt-20">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


//pt-24 