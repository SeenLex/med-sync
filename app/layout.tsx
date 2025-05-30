import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { QueryProvider } from "./QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedSync - Your Health, Seamlessly Connected",
  description: "A comprehensive healthcare platform for patients and providers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
