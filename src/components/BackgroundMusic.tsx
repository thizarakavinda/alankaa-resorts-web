import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import '../styles/BackgroundMusic.css';

// ─── Constants ────────────────────────────────────────────────
const VOLUME_TARGET = 0.9;
const VOLUME_START = 0.9;
const FADE_IN_MS = 3000;
const FADE_OUT_MS = 1000;
const FADE_STEPS = 20;
const AUDIO_SRC = '/audio/alankaa-ambient.mp3';

// ─── Component ────────────────────────────────────────────────
const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isMuted, setIsMuted] = useState(false); // ← default NOT muted
  const [isReady, setIsReady] = useState(false);

  // ── Helpers ──────────────────────────────────────────────────
  const clearFade = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    audio.volume = VOLUME_START;
    audio.muted = false;        // ← always unmuted
    setIsMuted(false);

    const step = VOLUME_TARGET / FADE_STEPS;
    const tick = FADE_IN_MS / FADE_STEPS;

    intervalRef.current = setInterval(() => {
      if (!audioRef.current) { clearFade(); return; }
      const next = Math.min(audioRef.current.volume + step, VOLUME_TARGET);
      audioRef.current.volume = next;
      if (next >= VOLUME_TARGET) clearFade();
    }, tick);
  }, [clearFade]);

  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    const startVol = audio.volume;
    const step = startVol / FADE_STEPS;
    const tick = FADE_OUT_MS / FADE_STEPS;

    intervalRef.current = setInterval(() => {
      if (!audioRef.current) { clearFade(); return; }
      const next = Math.max(audioRef.current.volume - step, 0);
      audioRef.current.volume = next;
      if (next <= 0) {
        clearFade();
        if (audioRef.current) audioRef.current.muted = true;
        setIsMuted(true);
      }
    }, tick);
  }, [clearFade]);

  // ── Autoplay on mount ────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.muted = false;    // ← NO mute at all
    audio.volume = VOLUME_START;
    audioRef.current = audio;

    const attemptPlay = () => {
      audio.muted = false;      // ← NO mute at all
      audio.volume = VOLUME_START;

      audio.play()
        .then(() => {
          setIsReady(true);
          fadeIn();              // ← starts with sound immediately
        })
        .catch(() => {
          // Browser blocked autoplay
          // Wait for first user interaction
          // then play WITH sound — never muted
          const resume = () => {
            audio.muted = false;  // ← still no mute
            audio.volume = VOLUME_START;
            audio.play()
              .then(() => {
                setIsReady(true);
                fadeIn();
              })
              .catch(() => {
                /* silently ignore */
              });
            cleanup();
          };

          const cleanup = () => {
            window.removeEventListener('click', resume);
            window.removeEventListener('scroll', resume);
            window.removeEventListener('keydown', resume);
            window.removeEventListener('touchstart', resume);
          };

          window.addEventListener('click', resume, { once: true });
          window.addEventListener('scroll', resume, { once: true });
          window.addEventListener('keydown', resume, { once: true });
          window.addEventListener('touchstart', resume, { once: true });
        });
    };

    attemptPlay();

    // ── Visibility change ──────────────────────────────────────
    const onVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else if (!audio.muted) {
        audio.play().catch(() => {
          /* silently ignore */
        });
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearFade();
      document.removeEventListener('visibilitychange', onVisibility);
      audio.pause();
      audio.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Toggle handler ───────────────────────────────────────────
  const handleToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.play().catch(() => {
        /* silently ignore */
      });
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isMuted, fadeIn, fadeOut]);

  // ── Render ───────────────────────────────────────────────────
  return (
    <motion.div
      className="music-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
    >
      {/* Pulse ring — only when playing */}
      {isReady && !isMuted && (
        <motion.span
          className="music-pulse"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Main button */}
      <motion.button
        id="music-toggle-btn"
        className="music-btn"
        aria-label={isMuted
          ? 'Unmute ambient music'
          : 'Mute ambient music'
        }
        onClick={handleToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Icon swap */}
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.span
              key="muted"
              initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="music-icon"
            >
              <VolumeX size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="playing"
              initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="music-icon"
            >
              <Volume2 size={20} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Sound wave bars — only when playing */}
        {isReady && !isMuted && (
          <span className="music-bars" aria-hidden="true">
            <span className="music-bar bar-1" />
            <span className="music-bar bar-2" />
            <span className="music-bar bar-3" />
          </span>
        )}
      </motion.button>
    </motion.div>
  );
};

BackgroundMusic.displayName = 'BackgroundMusic';
export default BackgroundMusic;