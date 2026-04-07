import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Calendar, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: true
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(formData.username, formData.password)
    
    if (result.success) {
      toast.success('¡Bienvenido!')
      navigate('/admin')
    } else {
      toast.error(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-vetivet-blue py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-white hover:text-white/80 transition-colors">
              Nosotros
            </Link>
            <Link to="/#contacto" className="text-white hover:text-white/80 transition-colors">
              Contacto
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="btn bg-vetivet-red text-white hover:bg-vetivet-red-hover text-sm px-4 py-2">
              <Calendar className="w-4 h-4" />
              Agendar una cita
            </button>
            <Link to="/login" className="text-white flex items-center gap-1 hover:text-white/80 transition-colors">
              <LogIn className="w-4 h-4" />
              Inicia sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gray-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Iniciar Sesión</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Email/Username Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Correo o código"
                  className="input pl-12"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className="input pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 text-vetivet-blue border-gray-300 rounded focus:ring-vetivet-blue"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Recordar
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn bg-blue-600 text-white hover:bg-blue-700 w-auto px-8 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-vetivet-blue py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-white text-sm">
          © Copyright 2019 - {new Date().getFullYear()} | Desarrollado por <span className="font-bold">BUILD</span>
        </div>
      </footer>
    </div>
  )
}
