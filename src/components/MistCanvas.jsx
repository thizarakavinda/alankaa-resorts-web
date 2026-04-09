import { useEffect, useRef } from 'react';

const MIST_TONES = [
  'rgba(184, 150, 90, opacity)',
  'rgba(44, 74, 40, opacity)',
  'rgba(255, 255, 255, opacity)',
  'rgba(100, 140, 180, opacity)',
];

const randomBetween = (min, max) => min + Math.random() * (max - min);

const createMistLayer = (width, height) => {
  const opacity = randomBetween(0.03, 0.07);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomBetween(0.08, 0.15),
    vy: randomBetween(0.03, 0.08),
    radius: randomBetween(300, 600),
    opacity,
    color: MIST_TONES[Math.floor(Math.random() * MIST_TONES.length)],
    phase: Math.random() * Math.PI * 2,
    speed: randomBetween(0.0003, 0.0008),
  };
};

const createParticle = (width, height) => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: randomBetween(1, 2),
  opacity: randomBetween(0.1, 0.3),
  speed: randomBetween(0.2, 0.5),
  pulseSpeed: randomBetween(0.008, 0.018),
  pulseOffset: Math.random() * Math.PI * 2,
});

const MistCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animId = 0;
    let time = 0;

    let mistLayers = [];
    let particles = [];

    const setupScene = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      const mobile = width < 768;
      const mistCount = mobile ? 4 : 6;
      const particleCount = mobile ? 12 : 25;

      mistLayers = Array.from({ length: mistCount }, () => createMistLayer(width, height));
      particles = Array.from({ length: particleCount }, () => createParticle(width, height));
    };

    setupScene();
    window.addEventListener('resize', setupScene);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      mistLayers.forEach((layer) => {
        layer.x += layer.vx + Math.sin(time * layer.speed + layer.phase) * 0.4;
        layer.y += layer.vy + Math.cos(time * layer.speed * 0.7 + layer.phase) * 0.2;

        if (layer.x > width + layer.radius) layer.x = -layer.radius;
        if (layer.x < -layer.radius) layer.x = width + layer.radius;
        if (layer.y > height + layer.radius) layer.y = -layer.radius;
        if (layer.y < -layer.radius) layer.y = height + layer.radius;

        const centerColor = layer.color.replace('opacity', String(layer.opacity));
        const edgeColor = layer.color.replace('opacity', '0');

        const grad = ctx.createRadialGradient(
          layer.x,
          layer.y,
          0,
          layer.x,
          layer.y,
          layer.radius
        );

        grad.addColorStop(0, centerColor);
        grad.addColorStop(1, edgeColor);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      particles.forEach((particle) => {
        particle.y -= particle.speed * 0.1;

        if (particle.y < -4) {
          particle.y = height + 4;
          particle.x = Math.random() * width;
        }

        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.15;
        const alpha = Math.max(0, Math.min(1, particle.opacity + pulse));

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 234, 214, ${alpha})`;
        ctx.fill();
      });

      time += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    if (prefersReducedMotion) {
      cancelAnimationFrame(animId);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setupScene);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes lightSweep {
          0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          5% { opacity: 1; }
          27% { transform: translateX(200vw) skewX(-15deg); opacity: 1; }
          30% { opacity: 0; }
          100% { transform: translateX(200vw) skewX(-15deg); opacity: 0; }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '80px',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(184,150,90,0.04), transparent)',
          animation: 'lightSweep 11s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </>
  );
};

export default MistCanvas;
