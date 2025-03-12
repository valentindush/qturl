import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { UrlProvider } from "@/contexts/url-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QT URLS - URL Shortener",
  description: "Shorten your URLs quickly and easily with QT URLS. The best URL shortener service.",
  keywords: ["URL shortener", "link shortener", "shorten URLs", "QT URLS"],
  authors: [{ name: "QT Global" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <UrlProvider>
            {children}
          </UrlProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
