// src/app/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarWrapper from "@/components/Sidebarwrapper"; // Import SidebarWrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><div className="flex min-h-screen bg-gray-50">
         <SidebarWrapper />
<main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
