import { motion } from 'motion/react';
import { TrendingUp, Users, Clock } from 'lucide-react';

const caseStudies = [
  {
    title: 'Academia Canina Digital',
    client: 'Happy Paws Training Center',
    problem: 'Centro de entrenamiento tenía dificultad para gestionar 200+ estudiantes caninos y sus dueños, perdiendo seguimiento del progreso individual.',
    solution: 'Desarrollé una plataforma completa con perfiles de mascotas, planes personalizados, sistema de reservas y reportes de progreso automatizados.',
    results: [
      { icon: Users, label: 'Clientes Activos', value: '+180%' },
      { icon: TrendingUp, label: 'Retención', value: '+92%' },
      { icon: Clock, label: 'Tiempo Admin', value: '-65%' },
    ],
    gradient: 'from-[#ff8c42] to-[#e67a35]',
  },
  {
    title: 'App de Adiestramiento en Casa',
    client: 'PetSmart Education',
    problem: 'Dueños de perros abandonaban el entrenamiento por falta de guía estructurada y motivación, con tasa de abandono del 70%.',
    solution: 'Creé app gamificada con lecciones paso a paso, sistema de recompensas, recordatorios inteligentes y comunidad de apoyo integrada.',
    results: [
      { icon: TrendingUp, label: 'Completación', value: '+85%' },
      { icon: Users, label: 'Engagement Diario', value: '+150%' },
      { icon: Clock, label: 'Tiempo de Sesión', value: '+200%' },
    ],
    gradient: 'from-[#4ecdc4] to-[#38b2ac]',
  },
  {
    title: 'Plataforma de Certificación',
    client: 'International K9 Trainers',
    problem: 'Proceso de certificación de entrenadores era manual, lento y costoso, limitando el crecimiento de la industria.',
    solution: 'Implementé plataforma de e-learning con cursos interactivos, exámenes online, emisión automática de certificados y base de datos verificable.',
    results: [
      { icon: Users, label: 'Certificaciones', value: '+320%' },
      { icon: Clock, label: 'Proceso', value: '-80%' },
      { icon: TrendingUp, label: 'Satisfacción', value: '4.9/5' },
    ],
    gradient: 'from-[#95e1d3] to-[#6dd5c3]',
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl mb-6 text-white">
            Casos de <span className="text-[#ff8c42]">éxito</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] mx-auto rounded-full mb-6" />
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Transformando el adiestramiento canino con tecnología innovadora y resultados medibles.
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-zinc-900/50 border-2 border-zinc-800 rounded-3xl overflow-hidden hover:border-[#ff8c42]/30 transition-all duration-300 backdrop-blur-sm hover:shadow-2xl hover:shadow-[#ff8c42]/10">
                {/* Gradient accent */}
                <div className={`h-2 bg-gradient-to-r ${study.gradient}`} />
                
                <div className="p-8 md:p-12">
                  <div className="mb-8">
                    <h3 className="text-3xl mb-2 text-white">{study.title}</h3>
                    <p className="text-[#ff8c42] flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#ff8c42] rounded-full animate-pulse" />
                      {study.client}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-12 h-1 bg-red-500 rounded-full" />
                        <h4 className="text-xl text-white">El Desafío</h4>
                      </div>
                      <p className="text-zinc-400 leading-relaxed">{study.problem}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-12 h-1 bg-[#4ecdc4] rounded-full" />
                        <h4 className="text-xl text-white">La Solución</h4>
                      </div>
                      <p className="text-zinc-400 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl mb-6 text-white flex items-center gap-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#ff8c42]">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                      </svg>
                      Resultados
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {study.results.map((result, resultIndex) => (
                        <div
                          key={resultIndex}
                          className="relative p-6 bg-zinc-800/30 border-2 border-zinc-700/50 rounded-2xl text-center group/item hover:border-[#ff8c42]/50 transition-all hover:shadow-lg hover:shadow-[#ff8c42]/10"
                        >
                          <div className="flex justify-center mb-3">
                            <div className={`p-3 bg-gradient-to-br ${study.gradient} rounded-xl shadow-lg`}>
                              <result.icon size={24} className="text-white" />
                            </div>
                          </div>
                          <p className="text-4xl mb-2 bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent">
                            {result.value}
                          </p>
                          <p className="text-sm text-zinc-500">{result.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
