'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Focus } from 'lucide-react';

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // focus or break

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          // Auto switch mode
          if (mode === 'focus') {
            setMode('break');
            setMinutes(5);
          } else {
            setMode('focus');
            setMinutes(25);
          }
          alert(mode === 'focus' ? "Focus time over! Take a break." : "Break over! Back to work.");
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'focus' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
        <button 
          onClick={() => { setMode('focus'); setMinutes(25); setSeconds(0); setIsActive(false); }}
          style={{ 
            background: mode === 'focus' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
            border: 'none', padding: '6px 12px', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '0.75rem',
            display: 'flex', alignItems: 'center', gap: '4px'
          }}
        >
          <Focus size={14} /> Focus
        </button>
        <button 
          onClick={() => { setMode('break'); setMinutes(5); setSeconds(0); setIsActive(false); }}
          style={{ 
            background: mode === 'break' ? 'var(--success)' : 'rgba(255,255,255,0.05)',
            border: 'none', padding: '6px 12px', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '0.75rem',
            display: 'flex', alignItems: 'center', gap: '4px'
          }}
        >
          <Coffee size={14} /> Break
        </button>
      </div>

      <div style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '20px', fontFamily: 'monospace' }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button 
          onClick={toggleTimer}
          style={{ 
            width: '50px', height: '50px', borderRadius: '50%', border: 'none', 
            background: isActive ? 'var(--warning)' : 'var(--primary)', 
            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button 
          onClick={resetTimer}
          style={{ 
            width: '50px', height: '50px', borderRadius: '50%', border: 'none', 
            background: 'rgba(255,255,255,0.1)', 
            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <RotateCcw size={24} />
        </button>
      </div>
      
      <p style={{ marginTop: '16px', fontSize: '0.75rem', opacity: 0.5 }}>
        {mode === 'focus' ? 'Time to crush your tasks!' : 'Enjoy your well-deserved break.'}
      </p>
    </div>
  );
}
