'use client';

import React from 'react';
import { Target, TrendingUp, Award } from 'lucide-react';

interface DailyEvaluationProps {
  tasks: any[];
}

export default function DailyEvaluation({ tasks }: DailyEvaluationProps) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  let rating = "Getting Started";
  let color = "var(--primary)";
  
  if (percentage >= 100) { rating = "Perfect Vibe"; color = "var(--success)"; }
  else if (percentage >= 75) { rating = "Productive Day"; color = "var(--success)"; }
  else if (percentage >= 50) { rating = "On Track"; color = "var(--warning)"; }
  else if (percentage > 0) { rating = "Slow Progress"; color = "var(--primary)"; }

  return (
    <div className="glass-card" style={{ padding: '24px', marginTop: '24px', borderLeft: `4px solid ${color}` }}>
      <h3 style={{ fontSize: '1.125rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Target size={20} style={{ color }} /> Daily Evaluation
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div>
          <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '4px' }}>Completion Rate</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{percentage}%</span>
          </div>
        </div>
        
        <div>
          <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '4px' }}>Daily Rating</p>
          <span style={{ fontSize: '1rem', fontWeight: 600, color }}>{rating}</span>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <Award size={32} style={{ opacity: percentage >= 100 ? 1 : 0.2, color: 'var(--warning)' }} />
        </div>
      </div>
      
      <div style={{ 
        width: '100%', 
        height: '8px', 
        background: 'rgba(255,255,255,0.05)', 
        borderRadius: '10px', 
        marginTop: '20px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: `${percentage}%`, 
          height: '100%', 
          background: color,
          borderRadius: '10px',
          transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  );
}
