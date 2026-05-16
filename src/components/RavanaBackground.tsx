import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

// Mist & Firefly Definitions
const getMistTones = (isLight: boolean) => isLight ? [
  'rgba(184, 150, 90, opacity)', // Gold
  'rgba(154, 122, 58, opacity)', // Darker Gold
  'rgba(212, 175, 122, opacity)', // Soft Gold
] : [
  'rgba(184, 150, 90, opacity)', // Gold
  'rgba(44, 74, 40, opacity)', // Moss Green
  'rgba(26, 46, 24, opacity)', // Deep Forest Green
];

const createMistLayer = (width: number, height: number, isLight: boolean) => {
  const tones = getMistTones(isLight);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(0.05, 0.12),
    vy: randomBetween(0.02, 0.06),
    radius: randomBetween(300, 700),
    opacity: randomBetween(0.02, 0.07),
    colorIndex: Math.floor(Math.random() * tones.length),
    phase: Math.random() * Math.PI * 2,
    speed: randomBetween(0.0003, 0.0008),
  };
};

const createFirefly = (width: number, height: number) => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: randomBetween(1, 2.5),
  opacity: randomBetween(0.1, 0.8),
  speed: randomBetween(0.3, 0.8),
  pulseSpeed: randomBetween(0.01, 0.03),
  pulseOffset: Math.random() * Math.PI * 2,
  wobbleSpeed: randomBetween(0.005, 0.015),
  wobbleOffset: Math.random() * Math.PI * 2,
});

export const RavanaBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLight } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let time = 0;

    let mistLayers: any[] = [];
    let fireflies: any[] = [];

    const setupScene = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const mistCount = w < 768 ? 4 : 6;
      const fireflyCount = w < 768 ? 20 : 40;

      mistLayers = Array.from({ length: mistCount }, () => createMistLayer(w, h, isLight));
      fireflies = Array.from({ length: fireflyCount }, () => createFirefly(w, h));
    };

    window.addEventListener('resize', setupScene);
    setupScene();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const currentTones = getMistTones(isLight);

      // 1. Draw Mist
      mistLayers.forEach((layer) => {
        layer.x += layer.vx + Math.sin(time * layer.speed + layer.phase) * 0.4;
        layer.y += layer.vy + Math.cos(time * layer.speed * 0.7 + layer.phase) * 0.2;

        if (layer.x > w + layer.radius) layer.x = -layer.radius;
        if (layer.x < -layer.radius) layer.x = w + layer.radius;
        if (layer.y > h + layer.radius) layer.y = -layer.radius;
        if (layer.y < -layer.radius) layer.y = h + layer.radius;

        const baseColor = currentTones[layer.colorIndex] || currentTones[0];
        const centerColor = baseColor.replace('opacity', String(layer.opacity));
        const edgeColor = baseColor.replace('opacity', '0');

        const grad = ctx.createRadialGradient(layer.x, layer.y, 0, layer.x, layer.y, layer.radius);
        grad.addColorStop(0, centerColor);
        grad.addColorStop(1, edgeColor);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      // 2. Draw Fireflies
      fireflies.forEach((f) => {
        f.y -= f.speed;
        f.x += Math.sin(time * f.wobbleSpeed + f.wobbleOffset) * 0.5;

        if (f.y < -10) {
          f.y = h + 10;
          f.x = Math.random() * w;
        }

        const pulse = Math.sin(time * f.pulseSpeed + f.pulseOffset) * 0.3;
        const alpha = Math.max(0, Math.min(1, f.opacity + pulse));

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        
        // Fireflies are glowing gold in light mode, yellowish-green in dark mode
        const fireflyRGB = isLight ? '154, 122, 58' : '184, 190, 90';
        
        ctx.fillStyle = `rgba(${fireflyRGB}, ${alpha})`;
        ctx.fill();
        
        const fGlow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 3);
        fGlow.addColorStop(0, `rgba(${fireflyRGB}, ${alpha * 0.4})`);
        fGlow.addColorStop(1, `rgba(${fireflyRGB}, 0)`);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = fGlow;
        ctx.fill();
      });

      time += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setupScene);
    };
  }, [isLight]); // Re-run effect when theme changes

  return (
    <div className={`fixed inset-0 z-[1] pointer-events-none bg-transparent overflow-hidden ${isLight ? 'mix-blend-normal' : 'mix-blend-screen'}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};
