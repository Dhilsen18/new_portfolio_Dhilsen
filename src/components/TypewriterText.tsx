import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Efecto para el parpadeo del cursor
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  // Efecto principal de máquina de escribir
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Terminó de escribir, esperar y empezar a borrar
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      } else {
        // Borrando
        if (currentIndex > 0) {
          setDisplayText(text.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Terminó de borrar completamente, empezar a escribir de nuevo
          setIsDeleting(false);
          setDisplayText('');
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, text, speed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {displayText}
      <span className={`text-cyan-400 transition-opacity duration-100 font-bold ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
        |
      </span>
    </span>
  );
};

export default TypewriterText;