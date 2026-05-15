'use client';

import React from 'react';
import { Award, Shield, Zap, Flame, Star } from 'lucide-react';

const ALL_BADGES = [
  { id: 'early_bird', name: 'Early Bird', icon: Zap, color: '#f59e0b', desc: 'Complete a task before 8 AM' },
  { id: 'streak_3', name: 'Hot Streak', icon: Flame, color: '#ef4444', desc: 'Maintain a 3-day streak' },
  { id: 'level_5', name: 'Rising Star', icon: Star, color: '#8b5cf6', desc: 'Reach Level 5' },
  { id: 'focus_master', name: 'Focus Master', icon: Shield, color: '#06b6d4', desc: 'Complete 5 Pomodoro sessions' },
  { id: 'consistent', name: 'Consistent', icon: Award, color: '#10b981', desc: 'Complete 10 tasks in total' },
];

interface AchievementBadgesProps {
  unlockedIds: string[];
}

export default function AchievementBadges({ unlockedIds }: AchievementBadgesProps) {
  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '24px' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Award size={18} style={{ color: 'var(--warning)' }} /> Achievements
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '16px' }}>
        {ALL_BADGES.map((badge) => {
          const Icon = badge.icon;
          const isUnlocked = unlockedIds.includes(badge.id);
          
          return (
            <div 
              key={badge.id} 
              style={{ 
                textAlign: 'center', 
                opacity: isUnlocked ? 1 : 0.2,
                filter: isUnlocked ? 'none' : 'grayscale(100%)',
                transition: 'all 0.3s ease'
              }}
              title={badge.desc}
            >
              <div style={{ 
                background: isUnlocked ? badge.color + '22' : 'rgba(255,255,255,0.05)', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                margin: '0 auto 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isUnlocked ? badge.color : 'white',
                border: isUnlocked ? `2px solid ${badge.color}` : '2px dashed rgba(255,255,255,0.1)'
              }}>
                <Icon size={24} />
              </div>
              <p style={{ fontSize: '0.625rem', fontWeight: 600 }}>{badge.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
