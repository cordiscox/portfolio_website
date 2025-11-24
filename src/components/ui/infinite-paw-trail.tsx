import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { PawIcon } from './paw-icon';

// --- COMPONENTE PRINCIPAL ---
export const InfinitePawTrail = () => {
  const numberOfPaws = 111; 
  const spacing = 100; // Aumenté el espacio vertical para que no se saturen

  // Generar las huellas una sola vez para evitar cambios en cada render
  const paws = useMemo(
    () =>
      Array.from({ length: numberOfPaws }).map((_, index) => {
        const isLeft = index % 2 === 0; 
        const isEven = index % 2 === 0; 
        const xBase = isLeft ? 20 : 100; 
        const randomOffset = Math.floor(Math.random() * 30) - 15; 
        
        return {
          id: index,
          x: xBase + randomOffset,
          y: index * spacing + 80, 
          rotate: isLeft ? 200 : 160, 
          color: isEven ? "#ff8c42" : "#4ecdc4",
          scale: 0.8 + Math.random() * 0.4, 
        };
      }),
    []
  );

  const trailHeight = numberOfPaws * spacing + 200;

  return (
    <div
      className="absolute top-0 left-0 w-full pointer-events-none z-0"
      style={{ minHeight: trailHeight }}
    >
      {paws.map((paw) => (
        <motion.div
          key={paw.id}
          initial={{ opacity: 0, scale: 0, y: 20 }} 
          whileInView={{ 
            opacity: 0.3, // MEJORA 2: Subí la opacidad de 0.2 a 0.3 para mejor visibilidad
            scale: paw.scale,
            y: 0 
          }}
          viewport={{ once: true, amount: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            // MEJORA 3: Delay más rápido.
            // Antes empezaba en 1.0s, ahora en 0.2s. La secuencia es más ágil.
            delay: paw.id < 9 ? 0.2 + (paw.id * 0.3) : 0 
          }}
          className="absolute"
          style={{
            left: `${paw.x}px`,
            top: `${paw.y}px`,
            rotate: paw.rotate, 
            color: paw.color
          }}
        >
          <PawIcon size={40} />
        </motion.div>
      ))}
    </div>
  );
};
