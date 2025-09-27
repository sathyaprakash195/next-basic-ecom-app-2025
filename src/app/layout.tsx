import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { connectToMongoDB } from "@/config/mongodb-config";
import { Toaster } from "react-hot-toast";
import CustomLayout from "@/custom-layout";

export const metadata: Metadata = {
  title: "SheyShop",
  description: "A basic e-commerce app built with Next.js 15 and Tailwind CSS",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${montserrat.className} font-sans`}
        cz-shortcut-listen="true"
      >
        <Toaster />
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  );
}
