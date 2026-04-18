import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/NavBar";
import PixelBackground from "@/app/components/PixelBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ronald — Software Engineer",
  description:
    "Personal portfolio of Ronald, a software engineer building clean, thoughtful software.",
  keywords: ["software engineer", "portfolio", "Next.js", "TypeScript", "React"],
  openGraph: {
    title: "Ronald — Software Engineer",
    description: "Personal portfolio of Ronald, a software engineer.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-[#F8F4EE] dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen flex flex-col">
        <PixelBackground />
        <NavBar />
        <div className="relative z-10 flex-1">{children}</div>
      </body>
    </html>
  );
}
