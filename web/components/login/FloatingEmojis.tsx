// /web/components/login/FloatingEmojis.tsx

'use client'

import { useState, useEffect, useRef } from 'react';

const EMOJIS = [
  // Ancient & Classical
  '📜', '🏛️', '🏺', '🔱', '🛡️', '⚔️', '🏹', '👑', '🗿', '⚖️',
  // Medieval & Exploration
  '🏰', '🧭', '🗺️', '⚓', '⛵', '✒️', '🪶',
  // Science & Discovery
  '🔬', '🧪', '🔭', '⚛️', '💡', '🧬', '🧠', '🦴', '🌿', '🌍',
  // Art & Philosophy
  '🎭', '🎨', '🗿', '🦉', '🧩',
  // Technology & Time
  '🔥', '⚙️', '⏳', '🕰️'
];

const MAX_EMOJIS = 15;
const SPAWN_INTERVAL_MS = 3000;

interface Emoji {
  id: number;
  emoji: string;
  style: React.CSSProperties;
}

export default function FloatingEmojis() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const lastSpawnTime = useRef(Date.now());
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const manageEmojis = () => {
      const now = Date.now();
      
      setEmojis(currentEmojis => {
        if (now - lastSpawnTime.current > SPAWN_INTERVAL_MS && currentEmojis.length < MAX_EMOJIS) {
          lastSpawnTime.current = now;
          const duration = Math.random() * 20 + 25;
          const id = now + Math.random();

          const newEmoji: Emoji = {
            id: id,
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            // --- THE FIX IS HERE ---
            style: {
              top: `${Math.random() * 90}%`,
              fontSize: `${Math.random() * 10 + 10}px`,
              opacity: 0,
              animation: `float-across ${duration}s linear`,
              '--drift': `${(Math.random() - 0.5) * 40}px`,
              '--rotation': `${(Math.random() - 0.5) * 80}deg`,
            } as React.CSSProperties
            // -----------------------
          };
          
          setTimeout(() => {
            setEmojis(prev => prev.filter(e => e.id !== id));
          }, duration * 1000);

          return [...currentEmojis, newEmoji];
        }
        return currentEmojis;
      });
      
      animationFrameId.current = requestAnimationFrame(manageEmojis);
    };

    animationFrameId.current = requestAnimationFrame(manageEmojis);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {emojis.map(e => (
        <div key={e.id} className="floating-emoji" style={e.style}>
          {e.emoji}
        </div>
      ))}
    </div>
  );
}