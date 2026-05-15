'use client';

import React from 'react';
import { Share2, Link as LinkIcon } from 'lucide-react';

interface SocialShareProps {
  streak: number;
  level: number;
}

export default function SocialShare({ streak, level }: SocialShareProps) {
  const shareText = `I'm crushing my goals on VIBE! 🔥 ${streak} Day Streak | Level ${level}. Join me in leveling up!`;
  const shareUrl = "https://vibe-task.app";

  const handleShare = (platform: string) => {
    let url = "";
    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert("Link copied to clipboard!");
      return;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="glass-card" style={{ padding: '20px', marginTop: '32px' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Share2 size={18} style={{ color: 'var(--primary)' }} /> Share Your Progress
      </h3>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          onClick={() => handleShare('twitter')}
          style={{ 
            flex: 1, background: '#1DA1F2', color: 'white', border: 'none', 
            padding: '10px', borderRadius: '10px', cursor: 'pointer', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', gap: '8px' 
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          Twitter
        </button>
        <button 
          onClick={() => handleShare('facebook')}
          style={{ 
            flex: 1, background: '#4267B2', color: 'white', border: 'none', 
            padding: '10px', borderRadius: '10px', cursor: 'pointer', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', gap: '8px' 
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          Facebook
        </button>
        <button 
          onClick={() => handleShare('copy')}
          style={{ 
            flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', 
            padding: '10px', borderRadius: '10px', cursor: 'pointer', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', gap: '8px' 
          }}
        >
          <LinkIcon size={18} /> Copy
        </button>
      </div>
    </div>
  );
}
