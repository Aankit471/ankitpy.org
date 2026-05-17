import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fixoo - Trusted Pros, Anytime.",
  description: "Fixoo - Trusted home service professionals at your doorstep. Book plumbers, electricians, cleaners and more in minutes.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Fixoo - Trusted Pros, Anytime.",
    description: "Hyperlocal service booking for the Indian market",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Fixoo",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { ToastProvider } from "@/context/ToastContext";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-zinc-950">
        <QueryProvider>
          <AuthProvider>
            <ToastProvider>
              <div className="max-w-md mx-auto bg-black min-h-screen relative shadow-2xl overflow-x-hidden border-x border-zinc-900">
                {children}
              </div>
            </ToastProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
