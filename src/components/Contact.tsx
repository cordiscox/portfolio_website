import { motion } from 'motion/react';
import { Mail, MapPin, Send, Linkedin, Github, Twitter, Download, Phone } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl mb-6 text-white">
            ¿Tienes un proyecto <span className="text-[#ff8c42]">canino</span>?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] mx-auto rounded-full mb-6" />
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Conectemos y creemos algo increíble para el mundo del adiestramiento canino 🐾
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-3xl mb-4 text-white">¡Hablemos!</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Ya sea que necesites una app para tu escuela de adiestramiento, una plataforma web o 
                consultoría tech para tu negocio canino, estoy aquí para ayudarte.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl hover:border-[#ff8c42]/30 transition-colors backdrop-blur-sm">
                <div className="p-3 bg-gradient-to-br from-[#ff8c42] to-[#e67a35] rounded-xl shadow-lg">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white mb-1">Email</p>
                  <a
                    href="mailto:joaquincordisco@gmail.com"
                    className="text-zinc-400 hover:text-[#ff8c42] transition-colors"
                  >
                    joaquincordisco@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl hover:border-[#4ecdc4]/30 transition-colors backdrop-blur-sm">
                <div className="p-3 bg-gradient-to-br from-[#4ecdc4] to-[#38b2ac] rounded-xl shadow-lg">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white mb-1">Teléfono</p>
                  <p className="text-zinc-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl hover:border-[#95e1d3]/30 transition-colors backdrop-blur-sm">
                <div className="p-3 bg-gradient-to-br from-[#95e1d3] to-[#6dd5c3] rounded-xl shadow-lg">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white mb-1">Ubicación</p>
                  <p className="text-zinc-400">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-white mb-4">Sígueme en redes</p>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: Github, href: 'https://github.com', label: 'GitHub' },
                  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 bg-zinc-900/50 border-2 border-zinc-800 hover:border-[#ff8c42] rounded-xl transition-all hover:scale-110 backdrop-blur-sm"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="text-zinc-400 group-hover:text-[#ff8c42] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#ff8c42]/10 to-[#4ecdc4]/10 border-2 border-[#ff8c42]/20 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white">📄 Descargar CV</p>
                <Download size={20} className="text-[#ff8c42]" />
              </div>
              <a
                href="/CV_JMCordisco.pdf"
                download
                className="text-sm text-zinc-400 hover:text-[#ff8c42] transition-colors"
              >
                CV_JMCordisco.pdf
              </a>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl focus:border-[#ff8c42] focus:outline-none transition-colors text-white placeholder-zinc-600 backdrop-blur-sm"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl focus:border-[#ff8c42] focus:outline-none transition-colors text-white placeholder-zinc-600 backdrop-blur-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl focus:border-[#ff8c42] focus:outline-none transition-colors text-white placeholder-zinc-600 backdrop-blur-sm"
                  placeholder="Proyecto de app para mi escuela canina"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl focus:border-[#ff8c42] focus:outline-none transition-colors resize-none text-white placeholder-zinc-600 backdrop-blur-sm"
                  placeholder="Cuéntame sobre tu proyecto canino..."
                />
              </div>

              <button
                type="submit"
                className="group w-full px-8 py-5 bg-gradient-to-r from-[#ff8c42] to-[#e67a35] text-white rounded-2xl hover:shadow-2xl hover:shadow-[#ff8c42]/30 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <span>Enviar mensaje</span>
                <Send
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
