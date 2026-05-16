'use client';

import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AICoach() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm your VIBE AI Productivity Coach. How can I help you crush your goals today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I'm having trouble connecting right now. Let's try again in a bit!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div className="glass-card" style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'var(--primary-glow)', padding: '8px', borderRadius: '50%', color: 'var(--primary)' }}>
            <Bot size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem' }}>AI Productivity Coach</h2>
            <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Powered by VIBE Intelligence</p>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              alignSelf: msg.role === 'bot' ? 'flex-start' : 'flex-end',
              maxWidth: '80%',
              display: 'flex',
              gap: '12px',
              flexDirection: msg.role === 'bot' ? 'row' : 'row-reverse'
            }}>
              <div style={{ 
                background: msg.role === 'bot' ? 'var(--card-bg)' : 'var(--primary)',
                padding: '12px 16px',
                borderRadius: msg.role === 'bot' ? '0 16px 16px 16px' : '16px 0 16px 16px',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                border: msg.role === 'bot' ? '1px solid var(--card-border)' : 'none'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', opacity: 0.5, fontSize: '0.75rem' }}>Coach is thinking...</div>
          )}
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid var(--card-border)', display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about productivity tips, your streak, or goal setting..."
            style={{ 
              flex: 1, 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--card-border)', 
              borderRadius: '12px',
              padding: '12px 16px',
              color: 'white',
              outline: 'none'
            }}
          />
          <button 
            onClick={handleSend}
            className="btn-primary" 
            style={{ padding: '12px' }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px', fontSize: '0.875rem', cursor: 'pointer' }} onClick={() => setInput("How can I improve my focus today?")}>
          <Sparkles size={16} style={{ color: 'var(--warning)', marginBottom: '8px' }} />
          <p>&quot;How can I improve my focus today?&quot;</p>
        </div>
        <div className="glass-card" style={{ padding: '16px', fontSize: '0.875rem', cursor: 'pointer' }} onClick={() => setInput("Suggest a schedule for my tasks.")}>
          <Sparkles size={16} style={{ color: 'var(--accent)', marginBottom: '8px' }} />
          <p>&quot;Suggest a schedule for my tasks.&quot;</p>
        </div>
      </div>
    </div>
  );
}
