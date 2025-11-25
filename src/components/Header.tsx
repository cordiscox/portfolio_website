import { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hasSolidBackground = isScrolled || isMobileMenuOpen;
  const cvFileUrl = 'CV_JMCordisco.pdf';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#home' },
    { label: 'Sobre mí', href: '#about' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasSolidBackground
          ? 'bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-zinc-800'
          : 'bg-[#0a0a0f]/50 backdrop-blur-lg border-b-0'
      }`}
    >
      <div className="mx-auto max-w-6xl w-full px-6 py-5">
        <nav className="flex items-center justify-between gap-4">
          <a href="#home" className="text-2xl tracking-tight text-[#00ff94] font-bold relative group">
            <span className="relative z-10 bg-gradient-to-r from-[#ff8c42] via-[#4ecdc4] to-[#95e1d3] bg-clip-text text-transparent">
              Joaquin M. Cordisco
            </span>
            <span className="absolute inset-0 bg-[#00ff94] blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
          </a>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-zinc-400 hover:text-[#00ff94] transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ff94] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <a
                href={cvFileUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#ff8c42] text-white font-semibold shadow-lg shadow-[#ff8c42]/30 hover:shadow-[#ff8c42]/50 hover:-translate-y-0.5 transition-all"
              >
                <Download size={16} />
                Descargar CV
              </a>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <a
                href={cvFileUrl}
                download
                className="inline-flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-gradient-to-r from-[#ff8c42] to-[#e67a35] text-white text-[0.65rem] font-semibold shadow-lg shadow-[#ff8c42]/25 hover:shadow-[#ff8c42]/40 transition-all"
                aria-label="Descargar CV"
              >
                <Download size={16} />
                <span className="uppercase tracking-widest">CV</span>
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 border border-[#00ff94]/50 rounded-lg text-[#00ff94] hover:bg-[#00ff94]/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-3 pt-4 border-t border-[#1f1f2b] flex flex-col gap-2"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-white font-medium rounded-xl px-3 hover:bg-white/5 hover:pl-4 transition-all"
              >
                {item.label}
              </a>
            ))}
            <a
              href={cvFileUrl}
              download
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#ff8c42] to-[#e67a35] text-white font-semibold border border-[#ff8c42]/40 shadow-lg shadow-[#ff8c42]/25"
            >
              <Download size={18} />
              Descargar CV
            </a>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
