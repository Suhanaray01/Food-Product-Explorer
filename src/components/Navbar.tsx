import { useState } from 'react'
import { Leaf, Menu, Moon, Sun, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
}

function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const linkClass = ({ isActive }: { isActive: boolean }) => `nav-link${isActive ? ' active' : ''}`

  return (
    <header className="site-nav">
      <nav className="nav-inner" aria-label="Main navigation">
        <NavLink className="brand-mark" to="/products" onClick={() => setMenuOpen(false)}><span className="brand-icon"><Leaf size={21} aria-hidden="true" /></span><span className="brand-name">Food Product Explorer</span></NavLink>
        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          <NavLink className={linkClass} to="/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
          <NavLink className={linkClass} to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        </div>
        <div className="nav-actions">
          <button className="icon-button" type="button" onClick={onToggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} title={isDark ? 'Light mode' : 'Dark mode'}>{isDark ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar