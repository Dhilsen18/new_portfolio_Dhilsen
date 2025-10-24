import React from 'react';
import { motion } from 'framer-motion';

interface BorderGlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: number;
  animationDuration?: number;
}

const BorderGlowCard: React.FC<BorderGlowCardProps> = ({
  children,
  className = '',
  glowColor = 'white',
  animationDuration = 3
}) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Card content */}
      <div className="relative z-10 bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-700/90 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-900/50 hover:-translate-y-1">
        {/* Border Glow Animation - DENTRO DEL BORDE */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {/* Glow que recorre el borde superior */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                ${glowColor} 25%, 
                ${glowColor} 50%, 
                ${glowColor} 75%, 
                transparent 100%)`,
              opacity: 0.8,
              filter: 'blur(1px)',
              boxShadow: `0 0 10px ${glowColor}`
            }}
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Glow que recorre el borde derecho */}
          <motion.div
            className="absolute top-0 right-0 w-1 h-full rounded-r-2xl"
            style={{
              background: `linear-gradient(180deg, 
                transparent 0%, 
                ${glowColor} 25%, 
                ${glowColor} 50%, 
                ${glowColor} 75%, 
                transparent 100%)`,
              opacity: 0.8,
              filter: 'blur(1px)',
              boxShadow: `0 0 10px ${glowColor}`
            }}
            animate={{
              y: ['-100%', '100%']
            }}
            transition={{
              duration: animationDuration + 0.5,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.25
            }}
          />
          
          {/* Glow que recorre el borde inferior */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 rounded-b-2xl"
            style={{
              background: `linear-gradient(270deg, 
                transparent 0%, 
                ${glowColor} 25%, 
                ${glowColor} 50%, 
                ${glowColor} 75%, 
                transparent 100%)`,
              opacity: 0.8,
              filter: 'blur(1px)',
              boxShadow: `0 0 10px ${glowColor}`
            }}
            animate={{
              x: ['100%', '-100%']
            }}
            transition={{
              duration: animationDuration + 1,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.5
            }}
          />
          
          {/* Glow que recorre el borde izquierdo */}
          <motion.div
            className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
            style={{
              background: `linear-gradient(0deg, 
                transparent 0%, 
                ${glowColor} 25%, 
                ${glowColor} 50%, 
                ${glowColor} 75%, 
                transparent 100%)`,
              opacity: 0.8,
              filter: 'blur(1px)',
              boxShadow: `0 0 10px ${glowColor}`
            }}
            animate={{
              y: ['100%', '-100%']
            }}
            transition={{
              duration: animationDuration + 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.75
            }}
          />
        </div>
        
        {/* Contenido con z-index más alto */}
        <div className="relative z-20">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BorderGlowCard;
