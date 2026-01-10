import { Poppins } from "next/font/google";
import { Providers } from "@/app/providers";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "BooksExchange - Share Books, Build Community",
  description:
    "Connect with readers through a trust-based platform for exchanging physical books. Every book has a journey—be part of it.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
