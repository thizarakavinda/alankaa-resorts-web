import { useEffect, useRef, useState } from 'react';
import { useRavanaAnimation } from '../hooks/useRavanaAnimation';
import '../styles/RavanaBackground.css';

export default function RavanaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldRender(false);
    }
  }, []);

  useRavanaAnimation(shouldRender ? canvasRef : { current: null });

  if (!shouldRender) return null;

  return (
    <canvas
      ref={canvasRef}
      className="ravana-bg-canvas"
      aria-hidden="true"
    />
  );
}
