import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  count?: number;
  duration?: number;
}

export default function Confetti({ count = 50, duration = 2500 }: ConfettiProps) {
  const [pieces, setPieces] = useState<
    { id: number; x: number; y: number; color: string; size: number; rotation: number; delay: number }[]
  >([]);

  useEffect(() => {
    const colors = ['#FF2A54', '#3B82F6', '#FDE047', '#4ADE80', '#A855F7'];
    
    const newPieces = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random start horizontal position (vw)
      y: -20 - Math.random() * 20, // start above the screen
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
    }));
    
    setPieces(newPieces);

    const timer = setTimeout(() => {
      setPieces([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [count, duration]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: `${p.x}vw`, 
            y: `${p.y}vh`, 
            rotate: 0,
            opacity: 1
          }}
          animate={{
            y: '120vh',
            rotate: p.rotation + 360 * 2,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: p.delay,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
        />
      ))}
    </div>
  );
}
