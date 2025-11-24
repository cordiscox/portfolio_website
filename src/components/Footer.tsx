import { Heart, ArrowUp } from 'lucide-react';
import { PawIcon } from './ui/paw-icon';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t-2 border-zinc-800 py-12 px-6">
      <div className="mx-auto max-w-6xl w-full px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <PawIcon className="text-[#ff8c42]" />
            <h3 className="text-4xl md:text-5xl text-white">
              Hagamos realidad tu{' '}
              <span className="bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] bg-clip-text text-transparent">
                proyecto canino
              </span>
            </h3>
            <PawIcon className="text-[#4ecdc4]" />
          </div>
          <p className="text-zinc-400 mb-8 max-w-xl">
            ¿Listo para llevar tu negocio de adiestramiento al siguiente nivel? 
            Estoy a solo un mensaje de distancia 🐕
          </p>
          <a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-[#ff8c42] to-[#e67a35] text-white rounded-full hover:shadow-2xl hover:shadow-[#ff8c42]/30 transition-all duration-300 inline-flex items-center gap-2"
          >
            <Heart size={20} className="fill-white" />
            Comenzar un proyecto
          </a>
        </div>

        <div className="border-t-2 border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <span>Hecho con</span>
            <Heart size={18} className="fill-[#ff8c42] text-[#ff8c42] animate-pulse" />
            <span>por Joaquin Cordisco </span>
            <PawIcon className="text-[#ff8c42] animate-bounce" />
          </div>

          <p className="text-zinc-500 text-sm">
            © {currentYear} Joaquin. Tech + Dogs = 💚
          </p>

          <button
            onClick={scrollToTop}
            className="group p-3 bg-zinc-900 border-2 border-zinc-800 rounded-full hover:border-[#ff8c42] hover:bg-zinc-800 transition-all hover:scale-110"
            aria-label="Volver arriba"
          >
            <ArrowUp size={20} className="text-zinc-400 group-hover:text-[#ff8c42] transition-colors" />
          </button>
        </div>
      </div>

      {/* Gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff8c42] to-transparent opacity-30" />
    </footer>
  );
}
