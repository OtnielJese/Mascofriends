import { Calendar, ArrowRight, Zap, PawPrint, Cookie } from 'lucide-react'
import WhatsAppButton from './WhatsAppButton'
import PawLogo from './PawLogo'

export default function Hero() {
  const quickServices = [
    { icon: Zap, label: 'Tipos de Cortes', color: 'text-green-600' },
    { icon: PawPrint, label: 'Juguetes', color: 'text-purple-600' },
    { icon: Cookie, label: 'Alimentos', color: 'text-orange-600' },
  ]

  return (
    <section className="gradient-hero min-h-[85vh] flex items-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-vetivet-blue/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up flex flex-col items-center lg:items-start">
            {/* Modern Paw Logo + Brand Name */}
            <div className="mb-12 flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-4 mb-2">
                <PawLogo size={72} color="#FF4444" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800">Mascofriends</h1>
                  <p className="text-md text-vetivet-red font-semibold">Grooming & Shop</p>
                </div>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg text-center lg:text-left">
              Nos dedicamos a garantizar el bienestar y tranquilidad de tu mascota, dejándolo con el estilo que tú desees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <WhatsAppButton 
                type="consultation"
                className="btn btn-primary"
              >
                <Calendar className="w-5 h-5" />
                Agenda una consulta
              </WhatsAppButton>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative animate-fade-in">
            <div className="relative">
              {/* Main image - portada */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/portada-spa.png" 
                  alt="Servicios veterinarios Masco Friends" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {quickServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-800">{service.label}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-vetivet-red group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-vetivet-blue/95 backdrop-blur-sm z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <p className="font-semibold">Agenda con uno de nuestros especialistas</p>
              <p className="text-white/80 text-sm">Llámanos al 01 748 8000</p>
            </div>
            <div className="flex gap-4">
              <WhatsAppButton 
                type="bath"
                className="btn bg-white/20 text-white border border-white/30 hover:bg-white hover:text-vetivet-blue text-sm"
              >
                Agendar Baño
              </WhatsAppButton>
              <WhatsAppButton 
                type="consultation"
                className="btn bg-vetivet-red text-white hover:bg-vetivet-red-hover text-sm"
              >
                Agendar Consulta
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
