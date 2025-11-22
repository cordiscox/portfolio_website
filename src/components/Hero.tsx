import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PawIcon } from './ui/paw-icon';

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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#ff8c42]/20 to-[#4ecdc4]/20 border border-[#ff8c42]/30 rounded-full backdrop-blur-sm"
          >
            <Heart size={16} className="text-[#ff8c42] fill-[#ff8c42]" />
            <span className="text-[#ff8c42] tracking-wide">Tecnología + Adiestramiento Canino</span>
            <PawIcon size={16} className="text-[#ff8c42]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl mb-6 text-white tracking-tight"
          >
            Hola, soy{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#ff8c42] via-[#4ecdc4] to-[#95e1d3] bg-clip-text text-transparent">
                Joaquin Cordisco
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff8c42] via-[#4ecdc4] to-[#95e1d3] blur-2xl opacity-40" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl text-zinc-400 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Desarrollo{' '}
            <span className="text-[#ff8c42]">soluciones tecnológicas innovadoras</span>{' '}
            para el mundo del adiestramiento canino, conectando entrenadores con dueños de mascotas.
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
            className="flex items-center justify-center gap-4"
          >
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
          </motion.div>
        </motion.div>
      </div>
      
      {/* Gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff8c42] to-transparent opacity-30" />
    </section>
  );
}
