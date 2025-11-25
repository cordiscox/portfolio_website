import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimatedGradientTextProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedGradientText({
  children,
  className = '',
}: AnimatedGradientTextProps) {
  const classes = ['inline-block', className].filter(Boolean).join(' ');

  return (
    <motion.span
      className={classes}
      style={{
        background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FF6B6B 100%)',
        backgroundSize: '220% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{
        backgroundPosition: ['0% center', '100% center', '0% center'],
      }}
      transition={{
        duration: 7,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      {children}
    </motion.span>
  );
}

export default AnimatedGradientText;
