import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { WhatsAppService } from '../services/dataService'

export default function WhatsAppButton({ 
  type = 'general', 
  message,
  appointmentType,
  petName,
  floating = false,
  className = '',
  children 
}) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      let response
      
      switch (type) {
        case 'bath':
          response = await WhatsAppService.getBathLink()
          break
        case 'consultation':
          response = await WhatsAppService.getConsultationLink()
          break
        default:
          response = await WhatsAppService.getLink(message, appointmentType, petName)
      }

      if (response?.link) {
        window.open(response.link, '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      // Fallback: Open WhatsApp with default message if API fails
      const fallbackNumber = '51000000000'
      const fallbackMessage = encodeURIComponent('Hola! Me gustaría agendar una cita para mi mascota.')
      window.open(`https://wa.me/${fallbackNumber}?text=${fallbackMessage}`, '_blank', 'noopener,noreferrer')
    } finally {
      setLoading(false)
    }
  }

  if (floating) {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-20 h-20 bg-transparent rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 ${className}`}
        aria-label="Contactar por WhatsApp"
      >
        <img 
          src="/images/Whatsapp_V1.png" 
          alt="WhatsApp" 
          className="w-full h-full group-hover:scale-110 transition-transform object-contain"
        />
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${className} ${loading ? 'opacity-70 cursor-wait' : ''}`}
    >
      {loading ? (
        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></span>
      ) : children ? (
        children
      ) : (
        <>
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </>
      )}
    </button>
  )
}
