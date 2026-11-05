import React, { useMemo } from 'react';

export default function AmbientHearts() {
  const hearts = useMemo(() => {
    const symbols = ['❤️', '🤍', '🌸', '✨', '💕'];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: `${(i * 8.3 + 3) % 94}%`,
      animationDelay: `${(i * 1.6) % 15}s`,
      animationDuration: `${14 + (i % 8)}s`,
      fontSize: `${14 + (i % 12)}px`,
    }));
  }, []);

  return (
    <div className="ambient-hearts-container" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="ambient-heart"
          style={{
            left: h.left,
            animationDelay: h.animationDelay,
            animationDuration: h.animationDuration,
            fontSize: h.fontSize,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}

