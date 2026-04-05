import { useEffect, useRef } from 'react';

const MistCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const isMobile = window.innerWidth < 768;
    const numLayers = isMobile ? 4 : 6;
    const numParticles = isMobile ? 12 : 25;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Warm/cool tones for the mist layers
    const colorOptions = [
      'rgba(184, 150, 90, opacity)',  // warm gold
      'rgba(44, 74, 40, opacity)',    // deep forest green
      'rgba(255, 255, 255, opacity)', // cool white
      'rgba(100, 140, 180, opacity)'  // mountain blue
    ];

    // Generate mist layers
    const mistLayers = Array.from({ length: numLayers }).map(() => {
      const colorTemplate = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0.08 + Math.random() * 0.07, // very slow horizontal drift 0.08 to 0.15
        vy: 0.03 + Math.random() * 0.05, // very slow vertical drift 0.03 to 0.08
        radius: 300 + Math.random() * 300, // 300px to 600px
        baseOpacity: 0.06 + Math.random() * 0.08, // Increased from 0.03 to ~0.14
        colorTemplate,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0005, // 0.0003 to 0.0008
      };
    });

    // Generate floating light particles
    const particles = Array.from({ length: numParticles }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 1.5 + Math.random() * 1.5, // 1.5px to 3px
      baseOpacity: 0.2 + Math.random() * 0.4, // 0.2 to 0.6
      speed: 0.2 + Math.random() * 0.3, // 0.2 to 0.5
      pulseSpeed: 0.02 + Math.random() * 0.03, // twinkling speed
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    // Animation loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw mist layers
      // Draw mist layers
      mistLayers.forEach((layer) => {
        // Update position with gentle sine wave
        layer.x += Math.sin(time * layer.speed + layer.phase) * 0.4 + layer.vx;
        layer.y += Math.cos(time * layer.speed * 0.7 + layer.phase) * 0.2 - layer.vy;

        // Wrap position
        if (layer.x > canvas.width + layer.radius) layer.x = -layer.radius;
        if (layer.y < -layer.radius) layer.y = canvas.height + layer.radius;
        if (layer.x < -layer.radius) layer.x = canvas.width + layer.radius;
        if (layer.y > canvas.height + layer.radius) layer.y = -layer.radius;

        // Pulsing opacity — breathes gently
        const pulsingOpacity =
          layer.baseOpacity +
          Math.sin(time * layer.speed * 500 + layer.phase) * 0.02;

        const safeOpacity = Math.max(0, Math.min(0.18, pulsingOpacity));
        const edgeOpacity = safeOpacity * 0.4;

        // Draw ONLY arc — NO fillRect
        const grad = ctx.createRadialGradient(
          layer.x, layer.y, 0,
          layer.x, layer.y, layer.radius
        );

        grad.addColorStop(0, layer.colorTemplate.replace('opacity', safeOpacity.toString()));
        grad.addColorStop(0.5, layer.colorTemplate.replace('opacity', edgeOpacity.toString()));
        grad.addColorStop(1, layer.colorTemplate.replace('opacity', '0'));

        ctx.beginPath();
        ctx.arc(layer.x, layer.y, layer.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Draw particles
      particles.forEach((p) => {
        // Update position
        p.y -= p.speed * 0.1;

        // Wrap vertically
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        // Calculate opacity pulse
        const opacity = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.25 + p.baseOpacity;

        // Ensure opacity stays within bounds
        const safeOpacity = Math.max(0, Math.min(1, opacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 234, 214, ${safeOpacity})`;
        ctx.fill();
        ctx.closePath();
      });

      time++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes lightSweep {
          0%   { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateX(200vw) skewX(-15deg); opacity: 0; }
        }
      `}</style>

      {/* Mist canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* Light sweep overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '60px',
          height: '100vh',
          background: 'linear-gradient(90deg, transparent, rgba(184,150,90,0.03), transparent)',
          animation: 'lightSweep 11s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
};

export default MistCanvas;
