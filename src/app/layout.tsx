import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { StoreProvider } from "@/store/StoreProvider";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CinemApp - Movie Discovery App",
  description: "Discover and explore movies with CinemApp. Find the latest releases, search by genre, and save your favorites.",
  keywords: ["movies", "cinema", "film", "discover", "watch", "streaming"],
  authors: [{ name: "CinemApp Team" }],
  creator: "CinemApp",
  openGraph: {
    title: "CinemApp - Movie Discovery App",
    description: "Discover and explore movies with CinemApp",
    type: "website",
    siteName: "CinemApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "CinemApp - Movie Discovery App",
    description: "Discover and explore movies with CinemApp",
  },
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
      >
        <StoreProvider>
          <ErrorBoundary>
            <Navbar />
            {children}
            <ScrollToTop />
          </ErrorBoundary>
        </StoreProvider>
      </body>
    </html>
  );
}
