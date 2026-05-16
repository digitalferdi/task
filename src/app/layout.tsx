import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import SessionProvider from '@/components/Providers/SessionProvider';
import Navbar from '@/components/Navigation/Navbar';

export const metadata: Metadata = {
  title: "VIBE Task | Premium Gamified Productivity",
  description: "Manage your tasks, track your mood, and level up your life with VIBE.",
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
