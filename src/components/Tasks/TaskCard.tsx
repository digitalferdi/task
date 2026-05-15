'use client';

import React from 'react';
import { CheckCircle2, Circle, Clock, Tag } from 'lucide-react';

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    category: string;
    status: string;
    priority: string;
    xpReward: number;
  };
  onToggle: (id: string, currentStatus: string) => void;
}

export default function TaskCard({ task, onToggle }: TaskCardProps) {
  const isCompleted = task.status === 'Completed';

  return (
    <div className={`glass-card ${isCompleted ? 'completed' : ''}`} style={{ 
      padding: '16px', 
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      opacity: isCompleted ? 0.6 : 1,
      textDecoration: isCompleted ? 'line-through' : 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => onToggle(task._id, task.status)}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            color: isCompleted ? 'var(--success)' : 'rgba(255,255,255,0.2)',
            transition: 'color 0.2s ease'
          }}
        >
          {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
        <div>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>{task.title}</h3>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', opacity: 0.6 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Tag size={12} /> {task.category}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> {task.priority}
            </span>
          </div>
        </div>
      </div>
      <div style={{ 
        background: 'var(--primary-glow)', 
        color: 'var(--primary)', 
        padding: '4px 10px', 
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: 600
      }}>
        +{task.xpReward} XP
      </div>
    </div>
  );
}
