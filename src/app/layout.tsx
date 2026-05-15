import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <nav className="glass" style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '0 0 2rem 0',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderRadius: 0
        }}>
          <h1 className="gradient-text" style={{ fontSize: '1.5rem' }}>VIBE</h1>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>Dashboard</a>
            <a href="/journal" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>Journal</a>
            <a href="/coach" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>AI Coach</a>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
