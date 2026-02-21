import { Calendar, ArrowRight, Stethoscope, Scissors, Monitor } from 'lucide-react'
import WhatsAppButton from './WhatsAppButton'

export default function Hero() {
  const quickServices = [
    { icon: Stethoscope, label: 'Especialidades Veterinarias', color: 'text-blue-600' },
    { icon: Scissors, label: 'Centro de Cirugía', color: 'text-green-600' },
    { icon: Monitor, label: 'Centro de Imágenes', color: 'text-purple-600' },
  ]

  return (
    <section className="gradient-hero min-h-[85vh] flex items-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-vetivet-teal/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-vetivet-navy leading-tight mb-6">
              Tu clínica veterinaria{' '}
              <span className="text-vetivet-green">de confianza</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Nos dedicamos a garantizar el bienestar y la salud de tu mascota con la más alta calidad en cada tratamiento.
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
              {/* Main image placeholder - veterinarian with pet */}
              <div className="bg-gradient-to-br from-vetivet-green-light to-white rounded-3xl p-8 relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-vetivet-green/20 to-vetivet-teal/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-vetivet-green/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Stethoscope className="w-16 h-16 text-vetivet-green" />
                    </div>
                    <p className="text-vetivet-green font-medium">Cuidado profesional</p>
                    <p className="text-gray-500 text-sm">para tu mascota</p>
                  </div>
                </div>
                
                {/* Decorative paw prints */}
                <div className="absolute -top-4 -right-4 text-6xl opacity-20">🐾</div>
                <div className="absolute -bottom-4 -left-4 text-4xl opacity-20">🐾</div>
              </div>
            </div>
          </div>
        </div>

        {/* Home breadcrumb */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2 text-gray-500">
            <span>←</span>
            <span>Home</span>
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
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-vetivet-green group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-vetivet-teal/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <p className="font-semibold">Agenda con uno de nuestros especialistas</p>
              <p className="text-white/80 text-sm">Llámanos al 01 748 8000</p>
            </div>
            <div className="flex gap-4">
              <WhatsAppButton 
                type="bath"
                className="btn bg-white/20 text-white border border-white/30 hover:bg-white hover:text-vetivet-teal text-sm"
              >
                Agendar Baño
              </WhatsAppButton>
              <WhatsAppButton 
                type="consultation"
                className="btn bg-vetivet-orange text-white hover:bg-orange-600 text-sm"
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
