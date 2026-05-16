import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import SessionProvider from '@/components/Providers/SessionProvider';
import Navbar from '@/components/Navigation/Navbar';

export const metadata: Metadata = {
  title: {
    default: "VIBE Task | Premium Gamified Productivity",
    template: "%s | VIBE Task"
  },
  description: "Level up your life with VIBE. The premium, gamified task manager that tracks your productivity, mood, and achievements.",
  keywords: ["productivity", "task manager", "gamification", "AI coach", "mood tracker", "VIBE task"],
  authors: [{ name: "VIBE Team" }],
  creator: "VIBE Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://task-d5ie.vercel.app/",
    siteName: "VIBE Task",
    title: "VIBE Task | Premium Gamified Productivity",
    description: "Manage tasks, track mood, and level up your life with AI-powered insights.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "VIBE Task Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBE Task | Gamified Productivity",
    description: "Level up your productivity with VIBE Task Manager.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "39HkWeyR0VFaDzDw0OxY1UQsSUOThIWJh-5u6OE4drU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
