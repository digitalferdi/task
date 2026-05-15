'use client';

import React from 'react';
import { Trophy, Flame, Zap } from 'lucide-react';

interface StatsHeaderProps {
  xp: number;
  level: number;
  streak: number;
}

export default function StatsHeader({ xp, level, streak }: StatsHeaderProps) {
  const xpToNextLevel = level * 100;
  const progress = (xp % 100);

  return (
    <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: 'var(--primary-glow)', 
          padding: '12px', 
          borderRadius: '12px',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Zap size={24} fill="currentColor" />
        </div>
        <div>
          <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '4px' }}>Current XP</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{xp}</span>
            <span style={{ fontSize: '0.875rem', opacity: 0.5 }}>/ {level * 100}</span>
          </div>
          <div style={{ 
            width: '120px', 
            height: '6px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '10px',
            marginTop: '8px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'var(--primary)',
              borderRadius: '10px',
              boxShadow: '0 0 10px var(--primary)'
            }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: 'rgba(236, 72, 153, 0.1)', 
          padding: '12px', 
          borderRadius: '12px',
          color: 'var(--secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Trophy size={24} fill="currentColor" />
        </div>
        <div>
          <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '4px' }}>Level</p>
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{level}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: 'rgba(245, 158, 11, 0.1)', 
          padding: '12px', 
          borderRadius: '12px',
          color: 'var(--warning)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Flame size={24} fill="currentColor" />
        </div>
        <div>
          <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '4px' }}>Streak</p>
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{streak} Days</span>
        </div>
      </div>
    </div>
  );
}
