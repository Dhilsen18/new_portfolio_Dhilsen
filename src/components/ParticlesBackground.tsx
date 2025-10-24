import React, { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'meteor' | 'floating';
  rotation: number;
  rotationSpeed: number;
}

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Crear partículas iniciales
    const createParticles = () => {
      const particles: Particle[] = [];
      
      // Meteoritos cayendo
      for (let i = 0; i < 15; i++) {
        particles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: -50 - Math.random() * 200,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          type: 'meteor',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: Math.random() * 0.02 + 0.01
        });
      }

      // Partículas flotantes
      for (let i = 0; i < 25; i++) {
        particles.push({
          id: i + 15,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.6 + 0.1,
          type: 'floating',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: Math.random() * 0.01 + 0.005
        });
      }

      particlesRef.current = particles;
    };

    createParticles();

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Actualizar posición según el tipo
        if (particle.type === 'meteor') {
          particle.y += particle.speed;
          particle.x += Math.sin(particle.y * 0.01) * 0.5; // Movimiento ondulante
          
          // Resetear cuando sale de la pantalla
          if (particle.y > canvas.height + 50) {
            particle.y = -50;
            particle.x = Math.random() * canvas.width;
          }
        } else {
          // Partículas flotantes - movimiento circular suave
          particle.x += Math.cos(particle.rotation) * particle.speed;
          particle.y += Math.sin(particle.rotation) * particle.speed * 0.3;
          
          // Mantener dentro de la pantalla
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        }

        particle.rotation += particle.rotationSpeed;

        // Dibujar partícula
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);

        if (particle.type === 'meteor') {
          // Dibujar meteorito con cola
          const gradient = ctx.createLinearGradient(0, -particle.size * 3, 0, particle.size);
          gradient.addColorStop(0, '#60a5fa'); // Azul brillante
          gradient.addColorStop(0.5, '#3b82f6'); // Azul
          gradient.addColorStop(1, '#1e40af'); // Azul oscuro
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.ellipse(0, 0, particle.size, particle.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Cola del meteorito
          ctx.fillStyle = 'rgba(96, 165, 250, 0.3)';
          ctx.beginPath();
          ctx.ellipse(-particle.size * 2, 0, particle.size * 1.5, particle.size * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Dibujar partícula flotante
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.5, '#e0e7ff');
          gradient.addColorStop(1, '#c7d2fe');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Brillo interno
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(-particle.size * 0.3, -particle.size * 0.3, particle.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticlesBackground;