'use client';

import React from 'react';
import { Share2, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';

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
          <Twitter size={18} /> Twitter
        </button>
        <button 
          onClick={() => handleShare('facebook')}
          style={{ 
            flex: 1, background: '#4267B2', color: 'white', border: 'none', 
            padding: '10px', borderRadius: '10px', cursor: 'pointer', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', gap: '8px' 
          }}
        >
          <Facebook size={18} /> Facebook
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
