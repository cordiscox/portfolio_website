import { motion } from 'motion/react';
import { Code2, Heart, Zap, Award, ShieldCheck, Terminal, Cloud, Server, Activity, Brain } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Me from '../../src/img/me.png';

export function About() {
  const highlights = [
    {
      title: "DevOps & Cloud",
      description: "AWS, Docker, Kubernetes & Terraform",
      icon: Cloud,
      color: "#4ecdc4" // Cyan/Turquoise
    },
    {
      title: "Automatización",
      description: "Scripting Python, Bash & n8n",
      icon: Terminal,
      color: "#ff8c42" // Orange
    },
    {
      title: "Development & IA",
      description: "Python, LangChain, RAG & Prompt Engineering",
      icon: Brain,
      color: "#8b5cf6" // Violeta para IA
    },
    {
      title: "Monitoreo & Observabilidad",
      description: "Grafana, Prometheus & Logging",
      icon: Activity,
      color: "#ff8c42" // Reuse Orange
    },
  ];

  return (
    <section id="about" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl mb-6 text-white">
            Sobre <span className="text-[#ff8c42]">mí</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ImageWithFallback
              src={Me}
              alt="Joaquin Cordisco"
              className="rounded-3xl shadow-2xl shadow-[#ff8c42]/20 w-full border-4 border-[#ff8c42]/20"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Párrafo 1: Introducción y Rol Principal */}
            <p className="text-xl text-zinc-300 leading-relaxed">
              Más que código, busco soluciones. Soy un Analista de Sistemas especializado en{' '}
              <span className="text-[#ff8c42]">Automatización y DevOps</span> {' '}
              con una misión clara: transformar tareas repetitivas en flujos de trabajo eficientes.
            </p>

            {/* Párrafo 2: Experiencia y Enfoque */}
            <p className="text-xl text-zinc-300 leading-relaxed">
              Cuento con una base sólida de más de 7 años asegurando la continuidad de negocio en industrias exigentes 
              (Automotriz/Industrial), donde la precisión es innegociable. Esa experiencia gestionando cientos de instancias 
              y procesos batch  es lo que hoy aplico al mundo Cloud.
            </p>

            {/* Párrafo 3: Objetivo Profesional */}
            <p className="text-xl text-zinc-300 leading-relaxed">
              Actualmente, integro{' '}
              <span className="text-[#95e1d3]">Infraestructura como Código, IA y Observabilidad</span> para construir sistemas que 
              no solo funcionan, sino que evolucionan. Me motiva automatizar 'lo aburrido' para que las personas 
              puedan dedicar su talento a lo extraordinario.
            </p>
          </motion.div>
        </div>

        {/* Grid de Highlights (Skills) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-10 mt-10"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all backdrop-blur-sm h-full">
                <div
                  className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon size={24} style={{ color: item.color }} />
                </div>
                <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
