import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import SpeechImg from '../../src/assets/speechtotext.png';
import AHKImg from '../../src/assets/autohotkeyimg.png';
import UrlImg from '../../src/assets/urlshortener.png';
import BasgImg from '../../src/assets/bashscripts.png';
import dogTrainingImg from '../../src/assets/dogtraining.png';
import ChatbotImg from '../../src/assets/chatbot.png';

type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  gradient: string;
  github?: string;
  demo?: string;
  status?: string;
};

const isUnderConstruction = (project: Project) => project.status === 'under construction';
const hasGithub = (project: Project) => Boolean(project.github);
const hasDemo = (project: Project) => Boolean(project.demo);
const hasLinks = (project: Project) => hasGithub(project) || hasDemo(project);

const projects: Project[] = [
    {
        title: 'Bash Automation Scripts',
        description: 'Colección de scripts en Bash para automatizar copia, compresión, envío y recepción de archivos, verificación de duplicados y ejecución genérica de procesos en entornos Linux.',
        image: BasgImg,
        tech: ['Bash', 'Shell Script', 'Linux', 'Automation'],
        gradient: 'from-[#10b981] to-[#059669]',
        github: 'https://github.com/cordiscox/bash_scripts'
    },
    {
        title: 'Speech-to-Text Tool',
        description: 'Herramienta para convertir audio a texto en tiempo real o por archivo, enfocada en reconocimiento de voz, utilidades de CLI y/o integración con APIs externas.',
        image: SpeechImg,
        tech: ['Python', 'Speech Recognition', 'Audio Processing', 'CLI'],
        gradient: 'from-[#6366f1] to-[#4f46e5]',
        github: 'https://github.com/cordiscox/SpeechToText'
    },
    {
        title: 'Chatbot RAG Profesional',
        description: 'Asistente IA para recruiters con LangChain y FastAPI. Integra respuestas en streaming, seguridad avanzada y métricas para Prometheus.',
        image: ChatbotImg,
        tech: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'Docker', 'Prometheus & Grafana', 'hCaptcha'],
        gradient: 'from-[#5b9df6] to-[#7ad7c4]'
    },
    {
        title: 'URL Shortener',
        description: 'Servicio rápido y escalable para acortar URLs, construido con FastAPI y desplegado en AWS mediante Docker, ECS Fargate y Terraform.',
        image: UrlImg,
        tech: ['Python','FastAPI', 'Docker', 'Terraform', 'ECS', 'ECR'],
        gradient: 'from-[#ff6b9d] to-[#ee5a8a]',
        github: 'https://github.com/cordiscox/url_shortener'  
    },
    {
        title: 'AutoHotKey Toolkit',
        description: 'Diseñado para acceder rápidamente a comandos de distintas tecnologias, gestionar menús dinámicos, lanzar utilidades del sistema.',
        image: AHKImg,
        tech: ['AutoHotkey', 'Tools', 'Productivity'],
        gradient: 'from-[#06b6d4] to-[#0ea5e9]',
        github: 'https://github.com/cordiscox/AutoHotKeys'
    },
    {
        title: 'Entrenadores Caninos',
        description: 'Plataforma Entrenadores Caninos, construido con FastAPI y PostgreSQL/PostGIS.',
        image: dogTrainingImg,
        tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Terraform', 'AWS'],
        gradient: 'from-[#f97316] to-[#ea580c]',
        status: 'under construction'
    },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-20 px-6">
      
      <div className="mx-auto max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl mb-6 text-white font-bold">
            Proyectos <span className="text-[#ff8c42]">destacados</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto px-2">
            Todos los proyectos que desarrollo están diseñados para resolver problemas reales y aportar valor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: isUnderConstruction(project) ? 0.3 : 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-full"
            >
              <div className="relative overflow-hidden rounded-3xl bg-zinc-900/50 border-2 border-zinc-800 hover:border-[#ff8c42]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#ff8c42]/10 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-56 md:h-64 overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
                  
                  {/* Construction overlay */}
                  {isUnderConstruction(project) && (
                    <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700 text-white text-sm font-semibold">
                        <Lock size={22} className="text-[#ff8c42]" />
                        <span>under construction</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Floating buttons */}
                  {!isUnderConstruction(project) && hasLinks(project) && (
                    <div className="absolute top-4 right-4 flex gap-2 z-10"> {/* Añadido z-10 y quitada la animación de opacidad en móvil para mejorar UX táctil si se desea, o dejarla igual */}
                       <div className="flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-2 md:group-hover:translate-y-0">
                        {hasGithub(project) && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-black/80 backdrop-blur-sm rounded-full hover:bg-[#ff8c42] hover:text-white transition-colors border border-zinc-700"
                            aria-label="GitHub"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {hasDemo(project) && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-black/80 backdrop-blur-sm rounded-full hover:bg-[#4ecdc4] hover:text-white transition-colors border border-zinc-700"
                            aria-label="Demo"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex flex-wrap items-start justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#ff8c42] transition-colors break-words">
                        {project.title}
                      </h3>
                      {isUnderConstruction(project) && (
                        <span className="shrink-0 inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded-full bg-zinc-800/70 border border-zinc-700 text-zinc-300">
                          <Lock size={10} />
                          construction
                        </span>
                      )}
                    </div>
                    {isUnderConstruction(project) ? (
                      <Lock className="text-zinc-600 group-hover:text-[#ff8c42] transition-colors shrink-0" size={18} />
                    ) : (
                      <ArrowUpRight className="text-zinc-600 group-hover:text-[#ff8c42] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" size={20} />
                    )}
                  </div>
                  
                  <p className="text-zinc-400 mb-6 leading-relaxed text-sm md:text-base flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 text-zinc-300 rounded-full text-xs md:text-sm hover:border-[#ff8c42]/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-5 blur-xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <a
            href="https://github.com/cordiscox"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-[#ff8c42] to-[#e67a35] text-white rounded-full hover:shadow-2xl hover:shadow-[#ff8c42]/30 transition-all duration-300 inline-flex items-center gap-2"
          >
            <Github size={20} />
            Ver todos en GitHub
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}