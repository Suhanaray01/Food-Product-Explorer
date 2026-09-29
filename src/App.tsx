import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('food-explorer-theme') === 'dark')

  useEffect(() => {
    localStorage.setItem('food-explorer-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <BrowserRouter>
      <div className={isDark ? 'app-shell dark' : 'app-shell'}>
        <Navbar isDark={isDark} onToggleTheme={() => setIsDark((current) => !current)} />
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
