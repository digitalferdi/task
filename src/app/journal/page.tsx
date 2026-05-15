'use client';

import React, { useState } from 'react';
import { Smile, Meh, Frown, Heart, Trash2, Calendar } from 'lucide-react';

const MOODS = [
  { label: 'Excellent', icon: Heart, color: '#ec4899' },
  { label: 'Good', icon: Smile, color: '#10b981' },
  { label: 'Neutral', icon: Meh, color: '#f59e0b' },
  { label: 'Bad', icon: Frown, color: '#6366f1' },
  { label: 'Awful', icon: Trash2, color: '#ef4444' },
];

interface JournalEntry {
  id: string;
  mood: string;
  reflection: string;
  date: string;
}

export default function Journal() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [reflection, setReflection] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]); // In a real app, fetch these

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;
    
    const newEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      reflection,
      date: new Date().toLocaleDateString(),
    };
    
    setEntries([newEntry, ...entries]);
    setSelectedMood(null);
    setReflection('');
  };

  return (
    <div className="dashboard-grid" style={{ maxWidth: '1000px' }}>
      <div style={{ gridColumn: 'span 12' }}>
        <h2 style={{ marginBottom: '8px', fontSize: '2rem' }}>Reflection <span className="gradient-text">Journal</span></h2>
        <p style={{ opacity: 0.6, marginBottom: '32px' }}>Track your mood and thoughts to improve your daily rhythm.</p>
      </div>

      {/* Entry Form */}
      <div style={{ gridColumn: 'span 5' }}>
        <form className="glass-card" style={{ padding: '24px' }} onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.25rem' }}>How are you feeling?</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            {MOODS.map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMood === m.label;
              return (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setSelectedMood(m.label as any)}
                  style={{
                    background: isSelected ? m.color : 'rgba(255,255,255,0.05)',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '12px',
                    color: isSelected ? 'white' : 'white',
                    opacity: isSelected ? 1 : 0.4,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Icon size={24} />
                  <span style={{ fontSize: '0.625rem' }}>{m.label}</span>
                </button>
              );
            })}
          </div>

          <h3 style={{ marginBottom: '12px', fontSize: '1.125rem' }}>Daily Reflection</h3>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What's on your mind? What did you learn today?"
            style={{
              width: '100%',
              height: '150px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--card-border)',
              borderRadius: '12px',
              padding: '12px',
              color: 'white',
              outline: 'none',
              resize: 'none',
              marginBottom: '20px',
              fontSize: '0.875rem'
            }}
          />

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={!selectedMood}>
            Save Reflection
          </button>
        </form>
      </div>

      {/* History */}
      <div style={{ gridColumn: 'span 7' }}>
        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={20} className="gradient-text" /> Recent Entries
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {entries.length > 0 ? entries.map((entry) => (
            <div key={entry.id} className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ 
                  background: MOODS.find(m => m.label === entry.mood)?.color + '22',
                  color: MOODS.find(m => m.label === entry.mood)?.color,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {entry.mood}
                </span>
                <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>{entry.date}</span>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.8 }}>{entry.reflection}</p>
            </div>
          )) : (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', opacity: 0.4 }}>
              <p>No entries yet. Start reflecting!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
