import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacitySpeed: number;
  opacityDirection: number;
  colorRGB: string;
}

interface MistBlob {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  baseOpacity: number;
  speed: number;
  phase: number;
  colorRGB: string;
}

interface SymbolParticle {
  x: number;
  y: number;
  symbol: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  targetOpacity: number;
  lifeTime: number;
  maxLife: number;
}

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  colorRGB: string;
  wanderAngle: number;
  wanderSpeed: number;
}

const EMBER_COLORS = [
  '184, 150, 90', // warm gold
  '201, 130, 50', // amber
  '220, 170, 80', // bright gold
  '160, 100, 40', // deep amber
];

const MIST_COLORS = [
  '101, 67, 33',  // ancient brown mist
  '80, 60, 40',   // dark earth mist
  '120, 90, 50',  // warm sepia mist
  '60, 80, 60',   // forest green mist
  '184, 150, 90', // golden mist
  '100, 70, 50',  // bronze mist
];

const FIREFLY_COLORS = [
  '255, 220, 100', // warm yellow
  '200, 180, 80',  // golden
  '255, 200, 80',  // bright gold
  '180, 150, 60',  // amber
];

export const useRavanaAnimation = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const { isDark } = useTheme();
  const themeMultiplierRef = useRef(1.0);

  useEffect(() => {
    themeMultiplierRef.current = isDark ? 1.0 : 0.4;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    let isMobile = w < 768;

    // --- State Initialization ---
    const particles: Particle[] = [];
    const mistBlobs: MistBlob[] = [];
    const symbols: SymbolParticle[] = [];
    const fireflies: Firefly[] = [];

    const initParticles = () => {
      const count = isMobile ? 24 : 60;
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -0.3 - Math.random() * 0.5,
          size: 1 + Math.random() * 2,
          opacity: 0.1 + Math.random() * 0.3,
          opacitySpeed: 0.005 + Math.random() * 0.01,
          opacityDirection: Math.random() > 0.5 ? 1 : -1,
          colorRGB: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
        });
      }
    };

    const initMist = () => {
      mistBlobs.length = 0;
      for (let i = 0; i < 6; i++) {
        mistBlobs.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radiusX: w * (0.4 + Math.random() * 0.4),
          radiusY: h * (0.15 + Math.random() * 0.1),
          baseOpacity: 0.02 + Math.random() * 0.04,
          speed: 0.0002 + Math.random() * 0.0004,
          phase: Math.random() * Math.PI * 2,
          colorRGB: MIST_COLORS[Math.floor(Math.random() * MIST_COLORS.length)],
        });
      }
    };

    const spawnSymbol = () => {
      if (symbols.length >= 8) return;
      symbols.push({
        x: Math.random() * w,
        y: Math.random() * h,
        symbol: Math.floor(Math.random() * 5),
        size: 20 + Math.random() * 30,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.004,
        opacity: 0,
        targetOpacity: 0.04 + Math.random() * 0.06,
        lifeTime: 0,
        maxLife: 800 + Math.random() * 400,
      });
    };

    const initFireflies = () => {
      const count = isMobile ? 14 : 35;
      fireflies.length = 0;
      for (let i = 0; i < count; i++) {
        fireflies.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0,
          size: 1 + Math.random() * 1.5,
          baseOpacity: 0.1 + Math.random() * 0.2,
          twinkleSpeed: 0.02 + Math.random() * 0.04,
          twinkleOffset: Math.random() * Math.PI * 2,
          colorRGB: FIREFLY_COLORS[Math.floor(Math.random() * FIREFLY_COLORS.length)],
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: 0.01 + Math.random() * 0.01,
        });
      }
    };

    initParticles();
    initMist();
    initFireflies();

    let framesSinceLastSpawn = 0;

    // --- Drawing Functions ---
    const drawSacredGeometry = (ctx: CanvasRenderingContext2D, t: number) => {
      if (isMobile) return; // Disable on mobile

      const mult = themeMultiplierRef.current;
      const mandalas = [
        { x: w * 0.85, y: h * 0.15, size: 300, rot: t * 0.02 },
        { x: w * 0.1, y: h * 0.85, size: 200, rot: -t * 0.015 },
        { x: w * 0.5, y: h * 0.5, size: 400, rot: t * 0.008 },
      ];

      for (const m of mandalas) {
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(m.rot);

        // Radial lines
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * m.size, Math.sin(angle) * m.size);
        }
        ctx.strokeStyle = `rgba(184, 150, 90, ${0.02 * mult})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Rings
        for (let i = 1; i <= 8; i++) {
          const radius = m.size * (i / 8);
          ctx.beginPath();
          
          for (let j = 0; j <= 12; j++) {
            const angle = (j / 12) * Math.PI * 2;
            const px = Math.cos(angle) * radius;
            const py = Math.sin(angle) * radius;
            
            // Draw diamond
            const dSize = 4 + (i / 8) * 4;
            ctx.moveTo(px + dSize, py);
            ctx.lineTo(px, py + dSize);
            ctx.lineTo(px - dSize, py);
            ctx.lineTo(px, py - dSize);
            ctx.lineTo(px + dSize, py);
          }
          
          let colorAlpha = 0.04;
          if (i <= 3) colorAlpha = 0.05;
          else if (i <= 6) colorAlpha = 0.03;
          
          ctx.strokeStyle = `rgba(184, 150, 90, ${colorAlpha * mult})`;
          ctx.stroke();

          // Thin connecting circle
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      }
    };

    const drawAncientParticles = (ctx: CanvasRenderingContext2D, t: number) => {
      const mult = themeMultiplierRef.current;
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t + p.x * 0.01) * 0.1;
        p.opacity += p.opacitySpeed * p.opacityDirection;

        if (p.opacity > 0.4) p.opacityDirection = -1;
        if (p.opacity < 0.05) p.opacityDirection = 1;

        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }

        const currentOpacity = Math.max(0, (p.opacity / 0.4) * 0.25 * mult); 
        if (currentOpacity < 0.005) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorRGB}, ${currentOpacity})`;
        
        if (p.size > 2) {
          ctx.shadowColor = `rgba(201, 168, 76, ${0.3 * mult})`;
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      }
      ctx.shadowBlur = 0; // reset
    };

    const drawAtmosphericMist = (ctx: CanvasRenderingContext2D, t: number) => {
      const mult = themeMultiplierRef.current;
      for (const blob of mistBlobs) {
        blob.x += Math.sin(t * blob.speed + blob.phase) * 0.3;
        
        const currentOpacity = blob.baseOpacity * mult * 0.05 / 0.06; // scaled to 0.05 max in dark
        if (currentOpacity < 0.005) continue;

        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radiusX);
        grad.addColorStop(0, `rgba(${blob.colorRGB}, ${currentOpacity})`);
        grad.addColorStop(0.5, `rgba(${blob.colorRGB}, ${currentOpacity * 0.5})`);
        grad.addColorStop(1, `rgba(${blob.colorRGB}, 0)`);

        ctx.beginPath();
        ctx.ellipse(blob.x, blob.y, blob.radiusX, blob.radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };

    const drawSymbolPath = (ctx: CanvasRenderingContext2D, symbolType: number, size: number) => {
      ctx.beginPath();
      switch (symbolType) {
        case 0: // Ancient Sinhala Om/Sacred
          ctx.moveTo(-size/2, -size/2);
          ctx.bezierCurveTo(size/2, -size/2, size/2, size/2, 0, size/2);
          ctx.bezierCurveTo(-size/4, size/2, -size/4, 0, size/4, 0);
          break;
        case 1: // Lotus Mandala
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(
              Math.cos(angle - 0.2) * size/2, Math.sin(angle - 0.2) * size/2,
              Math.cos(angle) * size, Math.sin(angle) * size
            );
            ctx.quadraticCurveTo(
              Math.cos(angle + 0.2) * size/2, Math.sin(angle + 0.2) * size/2,
              0, 0
            );
          }
          break;
        case 2: // Sword/Vel
          ctx.moveTo(0, -size);
          ctx.lineTo(0, size);
          ctx.moveTo(-size/2, -size/4);
          ctx.quadraticCurveTo(0, 0, size/2, -size/4);
          break;
        case 3: // Diamond/Gem
          ctx.moveTo(0, -size/2);
          ctx.lineTo(size/3, 0);
          ctx.lineTo(0, size/2);
          ctx.lineTo(-size/3, 0);
          ctx.closePath();
          break;
        case 4: // Spiral
          for(let i = 0; i < 40; i++) {
            const a = i * 0.3;
            const r = (i / 40) * size;
            if (i === 0) ctx.moveTo(0,0);
            else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          }
          break;
      }
    };

    const drawAncientSymbols = (ctx: CanvasRenderingContext2D, t: number) => {
      const mult = themeMultiplierRef.current;
      for (let i = symbols.length - 1; i >= 0; i--) {
        const sym = symbols[i];
        sym.rotation += sym.rotationSpeed;
        sym.lifeTime++;

        if (sym.lifeTime < 200) {
          sym.opacity += (sym.targetOpacity - sym.opacity) * 0.01;
        } else if (sym.lifeTime > sym.maxLife - 200) {
          sym.opacity -= sym.targetOpacity * 0.005;
        } else {
          sym.opacity = sym.targetOpacity + Math.sin(t) * 0.005;
        }

        if (sym.lifeTime >= sym.maxLife || sym.opacity < 0) {
          symbols.splice(i, 1);
          continue;
        }

        const currentAlpha = Math.max(0, sym.opacity * mult * 0.08 / 0.1);
        if (currentAlpha < 0.005) continue;

        ctx.save();
        ctx.translate(sym.x, sym.y);
        ctx.rotate(sym.rotation);
        ctx.globalAlpha = currentAlpha;
        ctx.strokeStyle = 'rgba(184, 150, 90, 1)';
        ctx.lineWidth = 1;
        drawSymbolPath(ctx, sym.symbol, sym.size);
        ctx.stroke();
        if (sym.symbol === 3) {
          ctx.fillStyle = 'rgba(184, 150, 90, 0.2)';
          ctx.fill();
        }
        ctx.restore();
      }
    };

    const drawFireflies = (ctx: CanvasRenderingContext2D, t: number) => {
      const mult = themeMultiplierRef.current;
      for (const f of fireflies) {
        f.wanderAngle += (Math.random() - 0.5) * 0.1;
        f.vx = Math.cos(f.wanderAngle) * f.wanderSpeed;
        f.vy = Math.sin(f.wanderAngle) * f.wanderSpeed;
        f.x += f.vx;
        f.y += f.vy;

        if (f.x < 0) f.x = w;
        if (f.x > w) f.x = 0;
        if (f.y < 0) f.y = h;
        if (f.y > h) f.y = 0;

        const twinkle = Math.sin(t * f.twinkleSpeed * 60 + f.twinkleOffset) * 0.5 + 0.5;
        const currentOpacity = f.baseOpacity * twinkle * mult * 0.3 / 0.3; // scale up to 0.3

        if (currentOpacity < 0.005) continue;

        // Core dot
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${f.colorRGB}, ${currentOpacity})`;
        ctx.fill();

        // Glow halo
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 4, 0, Math.PI * 2);
        const glowGrad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 4);
        glowGrad.addColorStop(0, `rgba(${f.colorRGB}, ${currentOpacity * 0.3})`);
        glowGrad.addColorStop(1, `rgba(${f.colorRGB}, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }
    };

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const draw = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      drawSacredGeometry(ctx, time);
      drawAncientParticles(ctx, time);
      drawAtmosphericMist(ctx, time);
      drawAncientSymbols(ctx, time);
      drawFireflies(ctx, time);

      framesSinceLastSpawn++;
      if (framesSinceLastSpawn > 120) {
        spawnSymbol();
        framesSinceLastSpawn = 0;
      }

      time += 0.008;
      animId = requestAnimationFrame(draw);
    };

    draw();

    // --- Cleanup ---
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        isMobile = w < 768;
        initParticles(); // Reinitialize to adjust counts
        initMist();
        initFireflies();
        symbols.length = 0; // Clear symbols on resize to prevent issues
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
    };
  }, [canvasRef]);
};
