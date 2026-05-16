'use client';

import React, { useEffect, useState } from 'react';
import StatsHeader from '@/components/Dashboard/StatsHeader';
import TaskCard from '@/components/Tasks/TaskCard';
import PomodoroTimer from '@/components/Tasks/PomodoroTimer';
import SocialShare from '@/components/Gamification/SocialShare';
import DailyEvaluation from '@/components/Analytics/DailyEvaluation';
import AchievementBadges from '@/components/Gamification/AchievementBadges';
import { Plus, BarChart3, Clock, BrainCircuit } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState({ xp: 0, level: 1, streak: 0, achievements: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Work');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, progressRes] = await Promise.all([
        fetch('/api/tasks'),
        fetch('/api/user/progress')
      ]);
      
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        if (tasksData.success) setTasks(tasksData.data);
      }
      
      if (progressRes.ok) {
        const progressData = await progressRes.json();
        if (progressData.success) setProgress(progressData.data || { xp: 0, level: 1, streak: 0 });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchData(); // Refresh data to update XP and status
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTaskTitle,
          category: newTaskCategory,
          priority: newTaskPriority,
          xpReward: newTaskPriority === 'High' ? 30 : newTaskPriority === 'Medium' ? 20 : 10,
        })
      });

      if (res.ok) {
        setNewTaskTitle('');
        setIsAdding(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="dashboard-grid">
      <div style={{ gridColumn: 'span 12' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '2rem' }}>
          Welcome back, <span className="gradient-text">Productivity Master</span>
        </h2>
        <StatsHeader 
          xp={progress.xp} 
          level={progress.level} 
          streak={progress.streak} 
        />
      </div>

      {/* Main Task Section */}
      <div style={{ gridColumn: 'span 8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} className="gradient-text" /> Today&apos;s Tasks
          </h3>
          <button 
            className="btn-primary" 
            style={{ padding: '8px 16px', fontSize: '0.875rem' }}
            onClick={() => setIsAdding(!isAdding)}
          >
            <Plus size={18} /> {isAdding ? 'Cancel' : 'New Task'}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAddTask} className="glass-card" style={{ padding: '20px', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              style={{ flex: 1, minWidth: '200px', padding: '10px', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              autoFocus
            />
            <select 
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
            </select>
            <select 
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button type="submit" className="btn-primary">Add</button>
          </form>
        )}

        <div className="animate-fade-in">
          {isLoading ? (
            <p>Loading your mission...</p>
          ) : tasks.length > 0 ? (
            <>
              {tasks.map((task: any) => (
                <TaskCard key={task._id} task={task} onToggle={handleToggleTask} />
              ))}
              <DailyEvaluation tasks={tasks} />
            </>
          ) : (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
              <p>No tasks found. Time to plan your day!</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar: AI & Analytics */}
      <div style={{ gridColumn: 'span 4' }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Clock size={20} style={{ color: 'var(--accent)' }} /> Focus Timer
          </h3>
          <PomodoroTimer />
        </div>

        <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BrainCircuit size={20} style={{ color: 'var(--primary)' }} /> AI Coach
          </h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: 1.5, marginBottom: '16px' }}>
            &quot;You&apos;ve completed 3 tasks today! Keep it up to maintain your 5-day streak. Focus on your Education task next for a big XP boost.&quot;
          </p>
          <button style={{ 
            width: '100%', 
            background: 'var(--card-border)', 
            border: 'none', 
            padding: '10px', 
            borderRadius: '10px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 500
          }}>
            Ask AI Coach
          </button>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BarChart3 size={20} style={{ color: 'var(--secondary)' }} /> Activity
          </h3>
          <div style={{ 
            height: '150px', 
            display: 'flex', 
            alignItems: 'flex-end', 
            justifyContent: 'space-between',
            gap: '8px',
            paddingTop: '20px'
          }}>
            {[40, 70, 45, 90, 65, 30, 85].map((h, i) => (
              <div key={i} style={{ 
                flex: 1, 
                height: `${h}%`, 
                background: i === 3 ? 'var(--primary)' : 'var(--card-border)',
                borderRadius: '4px',
                transition: 'height 0.3s ease'
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.625rem', opacity: 0.5 }}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <SocialShare streak={progress.streak} level={progress.level} />
        <AchievementBadges unlockedIds={progress.achievements || []} />
      </div>
    </div>
  );
}
