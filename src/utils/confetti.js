import confetti from 'canvas-confetti';

export function triggerRoseCelebration() {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const romanticColors = ['#9B1B30', '#C22543', '#D84A65', '#FB7185', '#FDA4AF', '#C59B27', '#FFFDF9'];

  // Central burst
  try {
    const heart = confetti.shapeFromText({ text: '❤️' });
    const petal = confetti.shapeFromText({ text: '🌸' });

    confetti({
      particleCount: 35,
      spread: 80,
      origin: { y: 0.55 },
      shapes: [heart, petal],
      scalar: 2.2,
      ticks: 260,
      gravity: 0.7
    });
  } catch (err) {
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.55 },
      colors: romanticColors,
      scalar: 1.3
    });
  }

  // Gentle side flutter like falling petals
  const duration = 2500;
  const animationEnd = Date.now() + duration;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 3;
    confetti({
      particleCount,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.6 },
      colors: romanticColors,
      ticks: 180,
      gravity: 0.75,
      scalar: 1.2
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.6 },
      colors: romanticColors,
      ticks: 180,
      gravity: 0.75,
      scalar: 1.2
    });
  }, 160);
}

