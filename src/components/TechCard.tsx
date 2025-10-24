import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TechCardProps {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  percentage: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

const TechCard: React.FC<TechCardProps> = ({ 
  icon: Icon, 
  name, 
  percentage, 
  color, 
  bgColor, 
  borderColor 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-28 h-28 cursor-pointer flex flex-col items-center"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Contenedor principal */}
      <div className="relative w-full h-full">
        
        {/* Cara frontal - Icono */}
        <AnimatePresence mode="wait">
          {!isFlipped && (
            <motion.div
              key="front"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className={`relative w-full h-full ${bgColor} backdrop-blur-xl border ${borderColor} rounded-3xl flex items-center justify-center group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}>
                {/* Efecto de fondo sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl"></div>
                
                {/* Icono */}
                <Icon className={`text-4xl ${color} group-hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-sm`} />
                
                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                
                {/* Borde brillante al hover */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${borderColor.replace('/30', '/60')} border-2`}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cara trasera - Porcentaje circular */}
        <AnimatePresence mode="wait">
          {isFlipped && (
            <motion.div
              key="back"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, rotateY: -180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className={`relative w-full h-full ${bgColor} backdrop-blur-xl border ${borderColor} rounded-3xl flex items-center justify-center group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}>
                {/* Efecto de fondo sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl"></div>
                
                {/* Círculo de progreso */}
                <div className="relative w-16 h-16">
                  {/* Círculo de fondo */}
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="stroke-gray-600/30"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Círculo de progreso */}
                    <motion.path
                      className={`stroke-current ${color}`}
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: percentage / 100 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </svg>
                  
                  {/* Porcentaje */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-sm font-bold ${color} drop-shadow-sm`}>{percentage}%</span>
                  </div>
                </div>
                
                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                
                {/* Borde brillante al hover */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${borderColor.replace('/30', '/60')} border-2`}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Nombre de la tecnología */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-200 font-semibold tracking-wide">{name}</span>
      </div>
    </motion.div>
  );
};

export default TechCard;
