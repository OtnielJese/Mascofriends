import { Link } from 'react-router-dom'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Heart, 
  Shield, 
  Award,
  ChevronRight,
  Stethoscope,
  Scissors,
  Syringe,
  Monitor,
  Calendar,
  MessageCircle
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Home() {
  const services = [
    {
      icon: Stethoscope,
      title: 'Especialidades Veterinarias',
      description: 'Consultas especializadas con médicos veterinarios expertos en diferentes áreas.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Scissors,
      title: 'Centro de Cirugía',
      description: 'Procedimientos quirúrgicos con equipos de última generación y personal capacitado.',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Monitor,
      title: 'Centro de Imágenes',
      description: 'Rayos X, ecografías y diagnóstico por imágenes de alta resolución.',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: Syringe,
      title: 'Vacunación',
      description: 'Plan de vacunación completo para proteger la salud de tu mascota.',
      color: 'bg-orange-50 text-orange-600'
    },
  ]

  const features = [
    {
      icon: Heart,
      title: 'Atención con Amor',
      description: 'Tratamos a cada mascota como si fuera nuestra.'
    },
    {
      icon: Shield,
      title: 'Profesionales Certificados',
      description: 'Equipo de veterinarios altamente calificados.'
    },
    {
      icon: Award,
      title: '10+ Años de Experiencia',
      description: 'Décadas cuidando de tu mejor amigo.'
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Nuestros Servicios</h2>
            <p className="section-subtitle">
              Ofrecemos atención integral para tu mascota con los más altos estándares de calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card group hover:-translate-y-2 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-vetivet-green font-medium">
                  Ver más <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Appointment Booking */}
      <section id="citas" className="py-20 gradient-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Listo para agendar una cita?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Reserva tu cita de forma rápida y sencilla. Nuestro equipo está listo para atenderte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton 
                type="consultation"
                className="btn bg-white text-vetivet-green hover:bg-gray-100"
              >
                <Calendar className="w-5 h-5" />
                Agendar Consulta
              </WhatsAppButton>
              
              <WhatsAppButton 
                type="bath"
                className="btn bg-orange-500 text-white hover:bg-orange-600"
              >
                <Scissors className="w-5 h-5" />
                Agendar Baño
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">¿Por qué elegirnos?</h2>
            <p className="section-subtitle">
              Tu mascota merece lo mejor, y eso es exactamente lo que ofrecemos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-vetivet-green-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-vetivet-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title text-left">Contáctanos</h2>
              <p className="text-gray-600 mb-8">
                Estamos aquí para responder tus preguntas y cuidar de tu mascota.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-vetivet-green-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-vetivet-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Teléfono</h4>
                    <p className="text-gray-600">01 748 8000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-vetivet-green-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-vetivet-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">contacto@vetivet.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-vetivet-green-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-vetivet-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Dirección</h4>
                    <p className="text-gray-600">Av. La Marina 1234, Lima, Perú</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-vetivet-green-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-vetivet-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Horario</h4>
                    <p className="text-gray-600">Lun - Sáb: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Dom: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Envíanos un mensaje
              </h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Tu nombre"
                    className="input"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico"
                    className="input"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Asunto"
                    className="input"
                  />
                </div>
                <div>
                  <textarea 
                    rows={4}
                    placeholder="Tu mensaje"
                    className="input resize-none"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-vetivet-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img 
                src="/images/mascofriends-logo.png" 
                alt="Masco Friends" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-400 mb-4">
                Tu clínica veterinaria de confianza. Nos dedicamos a garantizar el bienestar 
                y la salud de tu mascota con la más alta calidad en cada tratamiento.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#servicios" className="hover:text-vetivet-teal transition-colors">Servicios</a></li>
                <li><a href="#citas" className="hover:text-vetivet-teal transition-colors">Citas</a></li>
                <li><a href="#contacto" className="hover:text-vetivet-teal transition-colors">Contacto</a></li>
                <li><Link to="/login" className="hover:text-vetivet-teal transition-colors">Inicia sesión</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Síguenos</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-vetivet-teal transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Vetivet. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton 
        floating 
        type="general"
        className="fixed bottom-6 right-6 z-50"
      />
    </div>
  )
}
