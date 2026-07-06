import { motion } from 'motion/react';
import { Download, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Eduardo  Bellazzi',
    role: 'Líder',
    content: 'Este reconocimiento para Joaquin es por su esfuerzo y excelente desempeño con el cliente en todos los trabajos referidos a proyectos criticos de PLPR (LUX & APS), reconociendo su productividad y compromiso para con el equipo .- Felicitaciones y Buen trabajo',
    rating: 5,
    avatar: '🏆',
    gradient: 'from-[#ff8c42] to-[#e67a35]',
    attachment: {
      label: 'Diploma Accolade 2023 Q2',
      file: '/Diplomas Accolade 2023 Q2. Joaquin Miguel Cordisco.pdf',
    },
  },
  {
    name: 'Luciano Mazzoni',
    role: 'Oracle DBA',
    content: 'Tuve la oportunidad de trabajar con Joaquin Cordisco y puedo asegurar que es un profesional altamente orientado a la automatización, con un excelente dominio de scripting y un enfoque muy sólido en la resolución de problemas. Su capacidad para identificar oportunidades de mejora, automatizar tareas repetitivas y simplificar procesos complejos marcó una diferencia real en el equipo...',
    rating: 5,
    avatar: '👌',
    gradient: 'from-[#4ecdc4] to-[#38b2ac]',
  },
  {
    name: 'Martín Cimino',
    role: 'SAP Basis Team Leader en Atos',
    content: 'Tuve la suerte de haber conocido a Joaquín trabajando en ATOS, donde formaba parte de nuestro equipo de proyectos para el área de Analista Técnico, Admin Unix/Linux y Soporte SAP Basis. Durante ese tiempo en nuestro equipo, Joaquín demostró ser un profesional altamente capacitado y dedicado, con una gran pasión por la resolución de problemas y fue fundamental para el éxito de nuestros proyectos...',
    rating: 5,
    avatar: '👊',
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

          <h2 className="text-5xl md:text-7xl mb-6 text-white font-bold">
            Feedback & <span className="text-[#ff8c42]">Trayectoria</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] mx-auto rounded-full mb-6" />

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Lo que dicen mis colegas y compañeros de equipo en
            <span className="text-[#0077b5] font-semibold"> LinkedIn</span>.
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

                  {testimonial.attachment && (
                    <a
                      href={testimonial.attachment.file}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#ff8c42]/40 text-[#ff8c42] text-sm font-medium hover:bg-[#ff8c42]/10 transition-colors mb-6"
                    >
                      <Download size={16} />
                      Descargar {testimonial.attachment.label}
                    </a>
                  )}

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
      </div>
    </section>
  );
}
