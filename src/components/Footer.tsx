import { Heart, ArrowUp, Terminal, Code2, Coffee } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    // CAMBIO AQUÍ: Aumenté 'pt-16' a 'pt-32' para dar más espacio arriba
    <footer className="relative py-20 px-6 border-t-2 border-zinc-800/50 bg-[#0a0a0a] pt-32 pb-8 px-6 overflow-hidden">
      
      {/* Efecto de luz ambiental opcional */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ff8c42]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl w-full px-6 relative z-10">
        
        {/* Call to Action Final */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Terminal className="text-[#4ecdc4] opacity-80" size={28} />
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Construyamos algo{' '}
              <span className="bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] bg-clip-text text-transparent">
                extraordinario
              </span>
            </h3>
            <Code2 className="text-[#ff8c42] opacity-80" size={28} />
          </div>
          
          <p className="text-zinc-400 mb-8 max-w-xl text-lg leading-relaxed">
            Desde la automatización de scripts hasta arquitecturas cloud complejas.
            Si buscas eficiencia y escalabilidad, estoy listo para el desafío.
          </p>
          
          <a
            href="#contact"
            className="group px-8 py-4 bg-zinc-900 border border-zinc-700 text-white rounded-full hover:border-[#ff8c42] hover:bg-zinc-800 transition-all duration-300 inline-flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          >
            <span className="font-medium group-hover:text-[#ff8c42] transition-colors">Iniciar conversación</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff8c42] to-[#e67a35] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUp size={16} className="rotate-45 text-white" />
            </div>
          </a>
        </div>

        {/* Línea divisoria inferior */}
        <div className="border-t border-zinc-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Créditos Tech */}
          <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
            <span>Desarrollado con</span>
            <Heart size={16} className="fill-[#ff8c42] text-[#ff8c42] animate-pulse" />
            <span>y mucho</span>
            <Coffee size={16} className="text-[#4ecdc4]" />
            <span>por <span className="text-zinc-300">Mí</span></span>
          </div>

          {/* Copyright */}
          <p className="text-zinc-600 text-xs md:text-sm">
            © {currentYear} Todos los derechos reservados.
          </p>

          {/* Botón Scroll Top */}
          <button
            onClick={scrollToTop}
            className="group p-3 bg-zinc-900/80 border border-zinc-700 rounded-full hover:border-[#4ecdc4] hover:shadow-[0_0_15px_rgba(78,205,196,0.2)] transition-all duration-300 backdrop-blur-sm"
            aria-label="Volver arriba"
          >
            <ArrowUp size={20} className="text-zinc-400 group-hover:text-[#4ecdc4] transition-colors" />
          </button>
        </div>
      </div>

      {/* Línea Gradiente Inferior (Decorativa) */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff8c42]/50 to-transparent" />
    </footer>
  );
}