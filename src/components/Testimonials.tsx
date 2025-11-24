import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Laura Martínez',
    role: 'Entrenadora Canina Certificada',
    content:
      'La plataforma que Joaquin desarrolló para mi academia transformó completamente mi negocio. Ahora puedo gestionar todos mis clientes, enviar planes personalizados y hacer seguimiento del progreso de cada perro. ¡Mis ingresos aumentaron un 150%!',
    rating: 5,
    avatar: '🦮',
    gradient: 'from-[#ff8c42] to-[#e67a35]',
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Veterinario y Director de K9 Center',
    content:
      'Trabajar con Joaquin fue excepcional. No solo entiende de tecnología, sino que realmente comprende las necesidades de los profesionales caninos. La app que creó para nosotros es intuitiva, potente y nuestros clientes la adoran.',
    rating: 5,
    avatar: '🐕‍🦺',
    gradient: 'from-[#4ecdc4] to-[#38b2ac]',
  },
  {
    name: 'Ana Silva',
    role: 'Dueña de Golden Retriever',
    content:
      'Como dueña primeriza de un perro, la app de entrenamiento que desarrolló me dio la confianza que necesitaba. Las lecciones paso a paso y los videos son clarísimos. Mi perro Luna ahora sabe 15 comandos gracias a esta herramienta.',
    rating: 5,
    avatar: '🐾',
    gradient: 'from-[#95e1d3] to-[#6dd5c3]',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl mb-6 text-white">
            Lo que dicen <span className="text-[#ff8c42]">los clientes</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] mx-auto rounded-full mb-6" />
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Testimonios reales de entrenadores, veterinarios y dueños de mascotas que confían en mis soluciones.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-8 bg-zinc-900/50 border-2 border-zinc-800 rounded-3xl hover:border-[#ff8c42]/30 transition-all duration-300 backdrop-blur-sm h-full flex flex-col hover:shadow-2xl hover:shadow-[#ff8c42]/10">
                {/* Avatar */}
                <div className="absolute -top-6 left-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-3xl shadow-xl`}>
                    {testimonial.avatar}
                  </div>
                </div>

                <div className="mt-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-[#ff8c42] text-[#ff8c42]" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-zinc-300 mb-6 leading-relaxed italic flex-grow">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-white mb-1">{testimonial.name}</p>
                    <p className="text-sm text-zinc-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-zinc-500 italic flex items-center justify-center gap-2">
            <span className="text-2xl">🐶</span>
            ¿Quieres ser el próximo en transformar tu negocio canino? ¡Hablemos!
            <span className="text-2xl">🐶</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
