import { motion } from 'motion/react';

const skillCategories = [
  {
    title: 'Desarrollo Frontend',
    icon: '💻',
    gradient: 'from-[#ff8c42] to-[#e67a35]',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Mobile Apps'],
  },
  {
    title: 'Backend & Database',
    icon: '⚙️',
    gradient: 'from-[#4ecdc4] to-[#38b2ac]',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'Adiestramiento Canino',
    icon: '🐕',
    gradient: 'from-[#95e1d3] to-[#6dd5c3]',
    skills: ['Comportamiento Canino', 'Metodologías Positivas', 'Psicología Animal', 'Primeros Auxilios'],
  },
  {
    title: 'Herramientas & DevOps',
    icon: '🚀',
    gradient: 'from-[#ff6b9d] to-[#ee5a8a]',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'CI/CD', 'Analytics'],
  },
];

const specializations = [
  { name: 'IoT para Mascotas', icon: '📡' },
  { name: 'Video Streaming', icon: '📹' },
  { name: 'Gamificación', icon: '🎮' },
  { name: 'Machine Learning', icon: '🤖' },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl mb-6 text-white">
            Skills & <span className="text-[#ff8c42]">Especialización</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] mx-auto rounded-full mb-6" />
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            La combinación perfecta entre desarrollo tecnológico y conocimiento del comportamiento canino.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-8 bg-zinc-900/50 border-2 border-zinc-800 rounded-3xl hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm">
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`text-5xl`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl text-white">
                    {category.title}
                  </h3>
                </div>
                
                <div className={`h-1 w-20 bg-gradient-to-r ${category.gradient} rounded-full mb-6`} />

                {/* Skills */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                      className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 text-zinc-300 rounded-xl hover:border-[#ff8c42]/50 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Hover gradient effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="p-8 bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 border-2 border-[#ff8c42]/20 rounded-3xl backdrop-blur-sm">
            <h3 className="text-2xl mb-6 text-center text-white flex items-center justify-center gap-3">
              <span className="text-3xl">⚡</span>
              Especializaciones Únicas
              <span className="text-3xl">⚡</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {specializations.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex flex-col items-center text-center p-6 bg-zinc-800/30 border border-zinc-700 rounded-2xl hover:border-[#ff8c42]/50 transition-all hover:scale-105 cursor-default"
                >
                  <span className="text-4xl mb-3">{spec.icon}</span>
                  <p className="text-white">{spec.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
