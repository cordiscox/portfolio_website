import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { AnimatedGradientText } from './ui/animated-gradient-text';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      
      <div className="mx-auto max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Badge o Etiqueta superior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#4ecdc4]/60 bg-black/90 text-[#4ecdc4] mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: '"Fira Code", "Courier New", monospace' }}
          >
            <Terminal size={16} className="text-[#4ecdc4]" />
            <span className="text-[0.75rem] uppercase tracking-[0.35em]">
              DISPONIBLE PARA NUEVOS DESAFÍOS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl mb-8 text-white tracking-tight leading-[1.05]"
          >
            <span className="block text-white">Llevo tus sistemas al</span>
            <span className="block">
              <AnimatedGradientText className="font-bold">
                siguiente nivel.
              </AnimatedGradientText>
            </span>
          </motion.h1>


          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12 text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-white"
          >
            <span className="px-5 py-2 text-2xl text-[#ff8c42] font-semibold">
              &lt; DevOps <span className="text-white"> & </span>
              <span className="block sm:inline">Automation Engineer /&gt; </span>
            </span>
            
            <span className="px-5 py-2 text-2xl text-[#4ecdc4] font-semibold">
              &lt; Soporte de Aplicaciones /&gt;
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl text-zinc-400 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            No solo mantengo sistemas funcionando:{' '}
            <span className="text-[#ff8c42] font-semibold">diseño y automatizo procesos</span>{' '}
            para que tus aplicaciones sean más estables, tus releases más seguros y tu equipo trabaje con menos urgencias.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#ff8c42] to-[#e67a35] text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#ff8c42]/30 flex items-center gap-2"
            >
              <span className="relative z-10">Ver mis proyectos</span>
              <ArrowRight
                size={20}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-[#4ecdc4] text-[#4ecdc4] rounded-full hover:bg-[#4ecdc4]/10 transition-all duration-300 backdrop-blur-sm"
            >
              Hablemos
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-center justify-center gap-6"
          >
            <div className="flex items-center justify-center gap-4">
              {[
                { icon: Github, href: 'https://github.com/cordiscox', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/joaquin-cordisco', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:joaquincordisco@gmail.com', label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  className="p-4 bg-zinc-800/50 hover:bg-[#ff8c42]/10 border border-zinc-700 hover:border-[#ff8c42] rounded-full transition-all hover:scale-110 backdrop-blur-sm group"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="text-zinc-400 group-hover:text-[#ff8c42] transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff8c42] to-transparent opacity-30" />
    </section>
  );
}
