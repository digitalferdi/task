'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
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
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h1 className="gradient-text" style={{ fontSize: '1.5rem', margin: 0 }}>VIBE</h1>
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>Dashboard</Link>
        <Link href="/journal" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>Journal</Link>
        <Link href="/coach" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>AI Coach</Link>
        
        {status === 'authenticated' ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1rem' }}>
            {session.user?.image && (
              <Image 
                src={session.user.image} 
                alt={session.user.name || 'User'} 
                width={32}
                height={32}
                style={{ borderRadius: '50%' }}
                unoptimized
              />
            )}
            <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{session.user?.name}</span>
            <button 
              onClick={() => signOut()}
              className="glass"
              style={{ 
                padding: '0.4rem 0.8rem', 
                fontSize: '0.8rem', 
                cursor: 'pointer',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}
            >
              Sign Out
            </button>
          </div>
        ) : status === 'unauthenticated' ? (
          <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
            <Link 
              href="/login" 
              className="glass"
              style={{ 
                padding: '0.4rem 1rem', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                color: 'white'
              }}
            >
              Login
            </Link>
            <Link 
              href="/register" 
              style={{ 
                padding: '0.4rem 1rem', 
                textDecoration: 'none', 
                fontSize: '0.9rem',
                background: 'var(--primary-gradient)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 600
              }}
            >
              Sign Up
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
