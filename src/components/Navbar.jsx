import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown, Calendar, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import WhatsAppButton from './WhatsAppButton'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const { isAuthenticated, isAdmin } = useAuth()

  const navItems = [
    { label: 'Nosotros', href: '#nosotros' },
    { 
      label: 'Servicios', 
      href: '#servicios',
      dropdown: [
        { label: 'Especialidades', href: '#servicios' },
        { label: 'Cirugía', href: '#servicios' },
        { label: 'Imágenes', href: '#servicios' },
      ]
    },
    { 
      label: 'Tienda', 
      href: '#tienda',
      dropdown: [
        { label: 'Juguetes', href: '#juguetes' },
        { label: 'Accesorios', href: '#accesorios' },
      ]
    },
    { label: 'Blog', href: '#blog' },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/images/mascofriends-logo.png" 
              alt="Masco Friends" 
              className="h-12 w-auto"
            />
            <span className="hidden sm:inline text-sm text-gray-500 border-l border-gray-300 pl-2">
              Baños y cortes<br />para tu mascota
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => item.dropdown && setDropdownOpen(index)}
                onMouseLeave={() => item.dropdown && setDropdownOpen(null)}
              >
                <a 
                  href={item.href}
                  className="nav-link flex items-center gap-1 py-4"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                
                {item.dropdown && (
                  <div className={`absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${
                    dropdownOpen === index ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}>
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-600 hover:bg-vetivet-blue-light hover:text-vetivet-blue transition-colors"
                        onClick={() => setDropdownOpen(null)}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <WhatsAppButton type="consultation" className="btn btn-primary text-sm px-4 py-2">
              <Calendar className="w-4 h-4" />
              Agendar una cita
            </WhatsAppButton>
            
            {isAuthenticated && isAdmin() ? (
              <Link to="/admin" className="nav-link flex items-center gap-1">
                <LogIn className="w-4 h-4" />
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="nav-link flex items-center gap-1">
                <LogIn className="w-4 h-4" />
                Inicia sesión
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-fade-in">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block py-3 px-4 text-gray-600 hover:bg-vetivet-blue-light hover:text-vetivet-blue rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
              <WhatsAppButton type="consultation" className="btn btn-primary w-full text-sm">
                <Calendar className="w-4 h-4" />
                Agendar una cita
              </WhatsAppButton>
              <Link 
                to="/login" 
                className="btn btn-secondary w-full text-sm"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                Inicia sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
