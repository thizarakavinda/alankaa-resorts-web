import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
  isLight: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true,
  isLight: false,
})

export const ThemeProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alankaa-theme')
      return (saved as Theme) || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    
    // Save preference
    localStorage.setItem('alankaa-theme', theme)
    
    // Set data attribute — drives ALL CSS
    root.setAttribute('data-theme', theme)
    
    // Set class for Tailwind compatibility
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    
    // Update meta theme color for mobile browsers
    const metaTheme = document.querySelector(
      'meta[name="theme-color"]'
    )
    if (metaTheme) {
      metaTheme.setAttribute(
        'content', 
        theme === 'dark' ? '#080808' : '#F5F0E8'
      )
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      isDark: theme === 'dark',
      isLight: theme === 'light',
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
export default ThemeContext
