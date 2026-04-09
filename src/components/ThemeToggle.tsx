import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark
        ? 'Switch to light mode'
        : 'Switch to dark mode'
      }
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'relative',
        width: '48px',
        height: '26px',
        borderRadius: '13px',
        border: '1px solid var(--clr-gold)',
        background: isDark
          ? 'rgba(184,150,90,0.08)'
          : 'rgba(154,122,58,0.12)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '3px',
        flexShrink: 0,
        outline: 'none',
      }}
    >

      <motion.div
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '13px',
          background: 'rgba(154,122,58,0.15)',
        }}
      />


      <motion.div
        animate={{ x: isDark ? 0 : 22 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
        }}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'var(--clr-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Moon
                size={11}
                color="#080808"
                strokeWidth={2.5}
              />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Sun
                size={11}
                color="#F5F0E8"
                strokeWidth={2.5}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
