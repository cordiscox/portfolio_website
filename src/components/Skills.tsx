import { motion } from 'motion/react';

const techCards = [
  // Cloud & DevOps
  { name: 'AWS', type: 'Cloud', icon: '☁️' },
  { name: 'Docker', type: 'DevOps', icon: '🐳' },
  { name: 'Terraform', type: 'IaC', icon: '🧱' },
  { name: 'Jenkins', type: 'CI/CD', icon: '🤖' },
  { name: 'GitHub Actions', type: 'CI/CD', icon: '⚡' },
  { name: 'Linux', type: 'OS', icon: '🐧' },
  { name: 'Windows', type: 'OS', icon: '🪟' },
  { name: 'n8n', type: 'Automation', icon: '🧩' },
  { name: 'Grafana', type: 'Observability', icon: '📊' },
  { name: 'Prometheus', type: 'Monitoring', icon: '🔥' },
  { name: 'Logging', type: 'Reliability', icon: '📓' },
  
  // Backend & Scripting
  { name: 'Python', type: 'Scripting & Backend', icon: '🐍' },
  { name: 'Bash', type: 'Scripting', icon: '💻' },
  
  // Data & Tools
  { name: 'PostgreSQL', type: 'Database', icon: '🐘' }, 
  { name: 'Git', type: 'VCS', icon: '🐙' },
  { name: 'React', type: 'Frontend', icon: '⚛️' },
  { name: 'Markdown', type: 'Docs', icon: '✍️' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Skills() {
  return (
    <section id="skills" className="relative py-20 px-6">

      <div className="mx-auto max-w-7xl w-full relative z-10">
        
        {/* Header de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl mb-6 text-white">
            Skills & <span className=" text-[#ff8c42]">Tools</span>
          </h2>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#ff8c42] to-[#4ecdc4] mx-auto rounded-full mb-8" />
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Herramientas que utilizo para diseñar arquitecturas resilientes, 
            automatizar flujos complejos y asegurar la escalabilidad.
          </p>
        </motion.div>

        {/* Grid de Skills */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {techCards.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative flex flex-col items-center justify-center p-6 gap-4 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-[#ff8c42]/50 transition-colors duration-300"
            >
              {/* Efecto Glow interno al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff8c42]/0 to-[#ff8c42]/0 group-hover:from-[#ff8c42]/5 group-hover:to-[#ff8c42]/0 rounded-2xl transition-all duration-500" />

              <div className="relative text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl filter group-hover:drop-shadow-[0_0_15px_rgba(255,140,66,0.3)]">
                {tech.icon}
              </div>
              
              <div className="text-center relative z-10">
                <p className="text-base font-medium text-zinc-200 group-hover:text-white transition-colors">
                  {tech.name}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#ff8c42] mt-1 font-semibold opacity-70 group-hover:opacity-100">
                  {tech.type}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
