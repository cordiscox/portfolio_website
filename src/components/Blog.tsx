import { motion } from 'motion/react';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const articles = [
  {
    title: 'Cómo la Tecnología Está Revolucionando el Adiestramiento Canino',
    excerpt:
      'Exploramos las últimas tendencias tech en el mundo del adiestramiento: desde apps móviles hasta collares inteligentes y plataformas de IA.',
    date: '15 Nov 2024',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=500&fit=crop',
    category: 'Tecnología',
    gradient: 'from-[#ff8c42] to-[#e67a35]',
    alt: 'Entrenadora canina utilizando tablet y clicker junto a un perro',
  },
  {
    title: 'Desarrollo de Apps para el Sector Canino: Guía Completa',
    excerpt:
      'Todo lo que necesitas saber para crear apps exitosas en la industria del cuidado y entrenamiento de perros, desde la idea hasta el lanzamiento.',
    date: '8 Nov 2024',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=500&fit=crop',
    category: 'Desarrollo',
    gradient: 'from-[#4ecdc4] to-[#38b2ac]',
    alt: 'Desarrollador diseñando app móvil sobre escritorio con ilustraciones caninas',
  },
  {
    title: 'UX Design para Plataformas de Adiestramiento',
    excerpt:
      'Diseñando experiencias intuitivas para entrenadores y dueños de mascotas: principios, mejores prácticas y casos de estudio.',
    date: '28 Oct 2024',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&h=500&fit=crop',
    category: 'UX/UI',
    gradient: 'from-[#95e1d3] to-[#6dd5c3]',
    alt: 'Diseñadora revisando wireframes coloridos para plataforma de entrenamiento',
  },
];

export function Blog() {
  return (
    <section id="blog" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl mb-6 text-white">
            Blog & <span className="text-[#ff8c42]">Recursos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] mx-auto rounded-full mb-6" />
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Artículos sobre tecnología, adiestramiento canino y desarrollo de software para el sector pet-tech.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl bg-zinc-900/50 border-2 border-zinc-800 hover:border-[#ff8c42]/30 transition-all duration-300 h-full flex flex-col hover:shadow-2xl hover:shadow-[#ff8c42]/10">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.alt}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 bg-gradient-to-r ${article.gradient} text-white rounded-full text-sm backdrop-blur-sm shadow-lg`}>
                      {article.category}
                    </span>
                  </div>

                  {/* Arrow icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 border border-zinc-700">
                    <ArrowUpRight size={20} className="text-[#ff8c42]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-zinc-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl mb-3 text-white group-hover:text-[#ff8c42] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed flex-grow line-clamp-3">{article.excerpt}</p>
                </div>

                {/* Hover gradient */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${article.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff8c42] to-[#e67a35] text-white rounded-full hover:shadow-xl hover:shadow-[#ff8c42]/30 transition-all duration-300 group"
          >
            Ver todos los artículos
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
