import localFont from "next/font/local";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import TopBar from "@/components/layout/TopBar/TopBar.jsx";
import Navbar from "@/components/layout/Navbar/Navbar.jsx";
import Footer from "@/components/layout/Footer/Footer.jsx";

const inter = localFont({
  src: "../assets/fonts/Inter-VariableFont.ttf",
  display: "swap",
});

export const metadata = {
  title: "Outsource Accounting",
  description: "Professional accounting services for your business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <Navbar />
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
