import { Providers } from "@/app/providers";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      </body>
    </html>
  );
}
