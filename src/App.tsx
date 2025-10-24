import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TechCard from './components/TechCard';
import {
  FaReact,
  FaPython,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaJava,
  FaBootstrap,
  FaDatabase,
  FaLightbulb,
  FaUsers,
  FaCode,
  FaExternalLinkAlt,
  FaCertificate,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaNodeJs,
  FaAngular,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaTimes
} from 'react-icons/fa';
import {
  SiMongodb,
  SiTiktok,
  SiTailwindcss,
  SiMysql,
  SiSpringboot,
  SiCplusplus
} from 'react-icons/si';
import emojiAvatar from './assets/images/emoji_avatar2.png';
import emojiAvatarHero from './assets/images/emoji_avatar.png';
import logoUpc from './assets/images/LogoUpc.png';
import logoIpcna from './assets/images/LogoIpcna.png';
import TypewriterText from './components/TypewriterText';
import ParticlesBackground from './components/ParticlesBackground';
import LeafletMap from './components/LeafletMap';
import MapComponent from './components/MapComponent';
import './App.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [activeTab, setActiveTab] = useState('proyectos');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);
  const [activeSocialIcon, setActiveSocialIcon] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [activeFrameworkCard, setActiveFrameworkCard] = useState(0);
  const [activeEducationCard, setActiveEducationCard] = useState(0);
  const [activeExperienceCard, setActiveExperienceCard] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Funciones para manejar el carrusel de imágenes
  const openProjectGallery = (projectId: string) => {
    setSelectedProject(projectId);
    setCurrentImageIndex(0);
  };

  const closeProjectGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 5);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 5) % 5);
  };

  // Detectar sección activa automáticamente al hacer scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas las secciones
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Animación secuencial de iconos sociales
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setActiveIcon(prev => (prev + 1) % 3);
    }, 2000); // Cambia cada 2 segundos

    return () => clearInterval(iconInterval);
  }, []);

  // Animación secuencial de iconos sociales en "Sobre mí"
  useEffect(() => {
    const socialIconInterval = setInterval(() => {
      setActiveSocialIcon(prev => {
        switch (prev) {
          case 0: // Instagram
            return 1; // Facebook
          case 1: // Facebook
            return 3; // TikTok
          case 3: // TikTok
            return 2; // WhatsApp
          case 2: // WhatsApp
            return 0; // Instagram
          default:
            return 0; // Fallback to Instagram
        }
      });
    }, 2500); // Cambia cada 2.5 segundos

    return () => clearInterval(socialIconInterval);
  }, []);

  // Animación secuencial de todos los cuadros de "Sobre mí"
  useEffect(() => {
    const cardInterval = setInterval(() => {
      setActiveCard(prev => {
        switch (prev) {
          case 0: // Cuadro grande (Dhilsen Mallqui Vilca)
            return 1; // Redes sociales
          case 1: // Redes sociales
            return 2; // CV
          case 2: // CV
            return 3; // UPC
          case 3: // UPC
            return 5; // Mapa
          case 5: // Mapa
            return 4; // Hobbies
          case 4: // Hobbies
            return 0; // Cuadro grande (vuelve al inicio)
          default:
            return 0; // Fallback - empezar con cuadro grande
        }
      });
    }, 2000); // Cambia cada 2 segundos

    return () => clearInterval(cardInterval);
  }, []);

  // Animación secuencial de los cuadros grandes de tecnologías
  useEffect(() => {
    const frameworkInterval = setInterval(() => {
      setActiveFrameworkCard(prev => {
        switch (prev) {
          case 0: // Frontend
            return 1; // Frameworks
          case 1: // Frameworks
            return 3; // Bases de Datos
          case 3: // Bases de Datos
            return 2; // Backend
          case 2: // Backend
            return 0; // Frontend (vuelve al inicio)
          default:
            return 0; // Fallback - empezar con Frontend
        }
      });
    }, 2000);

    return () => clearInterval(frameworkInterval);
  }, []);

  // Animación secuencial para los cuadros de educación
  useEffect(() => {
    const educationInterval = setInterval(() => {
      setActiveEducationCard((prev) => {
        // Orden: UPC (0) -> ICPNA (1) -> UPC (0)
        return (prev + 1) % 2;
      });
    }, 2500);

    return () => clearInterval(educationInterval);
  }, []);

  // Animación secuencial para los cuadros de experiencia
  useEffect(() => {
    const experienceInterval = setInterval(() => {
      setActiveExperienceCard((prev) => {
        // Orden: Proyectos I+D (0) -> IEEE (1) -> Concursos (2) -> Proyectos I+D (0)
        return (prev + 1) % 3;
      });
    }, 2500);

    return () => clearInterval(experienceInterval);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'competencias', label: 'Tecnologías' },
    { id: 'educacion', label: 'Educación' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'proyectos', label: 'Proyectos' }
  ];

  return (
        <div className="min-h-screen relative overflow-hidden bg-black">
          {/* Fondo negro base */}
          <div className="absolute inset-0 bg-black"></div>
          
          {/* Overlay sutil para mejorar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Partículas animadas */}
            <ParticlesBackground />
      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-6 fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900 via-black to-transparent backdrop-blur-sm">
          <nav className="flex items-center max-w-7xl mx-auto">
            {/* Portfolio text */}
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white font-display transition-all duration-500 hover:from-blue-200 hover:via-white hover:to-blue-200 hover:scale-105">
                Portfolio
            </div>

            {/* Desktop Navigation - súper a la derecha */}
            <div className="hidden md:block ml-44 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 transition-all duration-500 hover:bg-gradient-to-r hover:from-white/10 hover:via-white/15 hover:to-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-cyan-500/30">
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`} 
                    onClick={() => setActiveSection(item.id)}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'text-white bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/30'
                        : 'text-gray-300 hover:text-cyan-300 hover:bg-white/10 hover:border hover:border-cyan-400/20'
                    }`}
                  >
                    {activeSection === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl blur-sm"></div>
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button - alineado a la derecha */}
            <div className="md:hidden ml-auto">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:bg-white/15 hover:border-white/30"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                  <div className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </div>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`} 
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`transition-all duration-300 font-body text-sm font-medium px-0 py-1 rounded-xl transform hover:scale-105 text-center ${
                      activeSection === item.id 
                        ? 'text-blue-400 bg-blue-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20' 
                        : 'text-white hover:text-blue-300 hover:bg-white/10 hover:shadow-md'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </header>

            {/* Hero Section Mejorada */}
            <main id="inicio" className="container mx-auto px-6 py-20 relative pt-32">
              {/* Efectos de fondo dinámicos */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>
              
              <div className="flex flex-col items-center justify-center text-center max-w-6xl mx-auto min-h-[80vh] relative z-10">
                {/* Contenido principal con efectos avanzados */}
                <motion.div 
                  className="w-full space-y-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  {/* Emoji flotante con luz */}
                  <motion.div 
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    <div className="relative">
                      {/* Luz de fondo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-500/30 to-pink-500/30 rounded-full blur-2xl scale-150 animate-pulse"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 rounded-full blur-xl scale-125 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      
                      {/* Emoji con animación flotante */}
                      <motion.img 
                        src={emojiAvatarHero} 
                        alt="Dhilsen Mallqui" 
                        className="relative w-36 h-36 md:w-40 md:h-40 object-cover z-10"
                        animate={{
                          y: [-10, -20, -10],
                          rotate: [0, 2, 0]
                        }}
                        whileHover={{
                          scale: 1.1,
                          filter: [
                            'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))',
                            'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))',
                            'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))'
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                  </div>
                  </motion.div>

                  {/* Saludo con animación mejorada */}
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                  <div className="text-2xl md:text-4xl lg:text-5xl font-black mb-4">
                    <TypewriterText 
                      text="Hi, I'm Dhilsen Mallqui"
                      speed={100}
                      deleteSpeed={50}
                      pauseTime={2000}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400"
                    />
                  </div>
                  </motion.div>
                  
                  {/* Título principal con efectos avanzados */}
                  <motion.h1 
                    className="text-xl md:text-3xl lg:text-4xl font-display font-bold mb-6 leading-tight text-center relative overflow-hidden mt-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.4,
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Texto base */}
                    <span className="text-white/90 relative z-10">
                    Full Stack Developer
                    </span>
                    
                    {/* Efecto de resaltado animado */}
                    <motion.span
                      className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-transparent via-white to-transparent"
                      animate={{
                        backgroundPosition: ['-100% 0%', '200% 0%'],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), rgba(255,255,255,0.4), rgba(255,255,255,0.8), transparent)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Full Stack Developer
                    </motion.span>
                    
                    {/* Efecto de brillo adicional */}
                    <motion.span
                      className="absolute inset-0 text-transparent bg-clip-text"
                      animate={{
                        backgroundPosition: ['-150% 0%', '250% 0%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 0.5
                      }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), rgba(255,255,255,0.6), rgba(255,255,255,0.3), transparent)',
                        backgroundSize: '300% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Full Stack Developer
                    </motion.span>
                  </motion.h1>
                  
              
                  {/* Botón de acción mejorado */}
                  <motion.div 
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {/* Botón Conóceme con diseño animado */}
                    <motion.button 
                      className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        document.getElementById('sobre-mi')?.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection('sobre-mi');
                      }}
                    >
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#06b6d4_100%)]"></span>
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                        Conóceme
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 448 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path>
                        </svg>
                      </span>
                    </motion.button>
                  </motion.div>
                  
                  {/* Iconos sociales con efectos avanzados */}
                  <motion.div 
                    className="flex justify-center gap-6 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    <motion.a 
                      href="https://github.com/Dhilsen18" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon relative"
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-full bg-gray-800/50 scale-0 group-hover/icon:scale-125 transition-all duration-500 ${activeIcon === 0 ? 'scale-125' : ''}`}></div>
                        <div className={`absolute inset-0 rounded-full bg-blue-500/30 scale-0 group-hover/icon:scale-110 transition-all duration-300 ${activeIcon === 0 ? 'scale-110' : ''}`}></div>
                        <div className={`relative bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-full p-3 group-hover/icon:bg-gray-700/50 group-hover/icon:border-blue-400/50 transition-all duration-300 group-hover/icon:shadow-lg group-hover/icon:shadow-blue-500/30 ${activeIcon === 0 ? 'bg-gray-700/50 border-blue-400/50 shadow-lg shadow-blue-500/50' : ''}`}>
                          <FaGithub className={`text-xl text-gray-400 group-hover/icon:text-blue-400 transition-all duration-300 ${activeIcon === 0 ? 'text-blue-300' : ''}`} />
                      </div>
                  </div>
                    </motion.a>
                    
                    <motion.a 
                      href="https://www.linkedin.com/in/dhilsenmallqui" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon relative"
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-full bg-gray-800/50 scale-0 group-hover/icon:scale-125 transition-all duration-500 ${activeIcon === 1 ? 'scale-125' : ''}`}></div>
                        <div className={`absolute inset-0 rounded-full bg-yellow-500/20 scale-0 group-hover/icon:scale-110 transition-all duration-300 ${activeIcon === 1 ? 'scale-110' : ''}`}></div>
                        <div className={`relative bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-full p-3 group-hover/icon:bg-gray-700/50 group-hover/icon:border-yellow-400/50 transition-all duration-300 group-hover/icon:shadow-lg group-hover/icon:shadow-yellow-500/30 ${activeIcon === 1 ? 'bg-gray-700/50 border-yellow-400/50 shadow-lg shadow-yellow-500/30' : ''}`}>
                          <FaLinkedin className={`text-xl text-gray-400 group-hover/icon:text-yellow-400 transition-all duration-300 ${activeIcon === 1 ? 'text-yellow-400' : ''}`} />
                      </div>
                  </div>
                    </motion.a>
                    
                    <motion.a 
                      href="mailto:dhilsenamv@gmail.com" 
                      className="group/icon relative"
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-full bg-gray-800/50 scale-0 group-hover/icon:scale-125 transition-all duration-500 ${activeIcon === 2 ? 'scale-125' : ''}`}></div>
                        <div className={`absolute inset-0 rounded-full bg-red-500/20 scale-0 group-hover/icon:scale-110 transition-all duration-300 ${activeIcon === 2 ? 'scale-110' : ''}`}></div>
                        <div className={`relative bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-full p-3 group-hover/icon:bg-gray-700/50 group-hover/icon:border-red-400/50 transition-all duration-300 group-hover/icon:shadow-lg group-hover/icon:shadow-red-500/30 ${activeIcon === 2 ? 'bg-gray-700/50 border-red-400/50 shadow-lg shadow-red-500/30' : ''}`}>
                          <svg className={`w-5 h-5 text-gray-400 group-hover/icon:text-red-400 transition-all duration-300 ${activeIcon === 2 ? 'text-red-400' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                  </div>
                </div>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </main>

        {/* Sección Sobre mí */}
        <section id="sobre-mi" className="container mx-auto px-6 py-20 pt-36">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
                Sobre mí
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Conoce más sobre mi trayectoria profesional y experiencia
              </p>
            </motion.div>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {/* Layout mejorado con efectos avanzados */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Tarjeta principal: Información personal */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="lg:col-span-2 group relative"
              >
                {/* Efectos de fondo avanzados */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/4 to-cyan-500/3 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeCard === 0 ? 'blur-lg' : ''}`}></div>
                <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/1 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCard === 0 ? 'opacity-20' : ''}`}></div>
                
                {/* Contenedor principal con glassmorphism avanzado */}
                <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl px-4 py-8 md:py-6 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-3 overflow-hidden ${activeCard === 0 ? 'bg-gradient-to-br from-white/8.5 via-white/5.2 to-white/3.2 border-white/22 shadow-md shadow-blue-500/10 -translate-y-0' : ''}`}>
                  
                  {/* Partículas de fondo animadas */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-6 left-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-12 right-8 w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>

                  <div className="text-center h-full flex flex-col justify-end pb-8 md:pb-16 relative z-10">
                    {/* Emoji personalizado con efectos avanzados */}
                    <div className="mb-8 mt-8 md:mb-12 md:mt-12 flex justify-center">
                      <motion.div
                        className="relative"
                        animate={{
                          y: [-10, -30, -10],
                          rotate: [0, 1, 0]
                        }}
                        whileHover={{
                          scale: 1.15,
                          filter: [
                            'drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))',
                            'drop-shadow(0 0 35px rgba(147, 51, 234, 0.6))',
                            'drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))'
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Efecto de halo alrededor del emoji */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-cyan-400/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCard === 0 ? 'opacity-100' : ''}`}></div>
                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-400/25 via-purple-500/25 to-cyan-400/25 rounded-full blur-xl scale-175 opacity-0 transition-opacity duration-500 ${activeCard === 0 ? 'opacity-100' : ''}`}></div>
                        <img 
                          src={emojiAvatar} 
                          alt="Dhilsen Mallqui Vilca" 
                          className={`relative w-40 h-40 object-cover z-10 transition-all duration-500 ${activeCard === 0 ? 'drop-shadow-lg drop-shadow-blue-400/30' : ''}`}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Contenido con efectos avanzados */}
                    <div className="mt-auto">
                      <motion.h3 
                        className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-4 tracking-wide"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        Dhilsen Mallqui Vilca
                      </motion.h3>
                      <motion.p 
                        className="text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 font-bold tracking-wide"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        Desarrollador Web
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Columna derecha con efectos avanzados */}
              <div className="lg:col-span-3 space-y-8">
                {/* Fila superior: Redes Sociales y CV lado a lado en móvil */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                  {/* Tarjeta Redes Sociales */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="group relative md:col-span-1"
                  >
                    {/* Efectos de fondo avanzados */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-red-500/10 via-pink-500/15 to-rose-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeCard === 1 ? 'blur-3xl' : ''}`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCard === 1 ? 'opacity-100' : ''}`}></div>
                    
                    {/* Contenedor principal con glassmorphism avanzado */}
                    <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-3 md:p-0 min-h-[60px] md:min-h-[50px] hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-3 overflow-hidden ${activeCard === 1 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-red-500/30 -translate-y-3' : ''}`}>
                      
                      {/* Partículas de fondo animadas */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-4 left-6 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-12 right-8 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-8 left-12 w-1 h-1 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-16 right-6 w-1.5 h-1.5 bg-red-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                      </div>

                      <div className="text-center relative z-10 flex flex-col items-center justify-end h-full pb-16">
                        {/* Iconos con efectos avanzados */}
                        <div className="grid grid-cols-2 gap-4 md:gap-8 relative z-20 items-center justify-items-center mt-8">
                          {/* Instagram */}
                          <motion.a 
                            href="https://www.instagram.com/dhilsen_mv/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/icon flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="relative">
                              <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 scale-0 group-hover/icon:scale-125 transition-all duration-500 ${activeSocialIcon === 0 ? 'scale-125' : ''}`}></div>
                              <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 scale-0 group-hover/icon:scale-110 transition-all duration-300 ${activeSocialIcon === 0 ? 'scale-110' : ''}`}></div>
                              <div className={`relative bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-full p-2 md:p-2 group-hover/icon:bg-gradient-to-r group-hover/icon:from-purple-500/20 group-hover/icon:to-pink-500/20 group-hover/icon:border-purple-400/50 transition-all duration-300 group-hover/icon:scale-110 ${activeSocialIcon === 0 ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 scale-110' : ''}`}>
                                <FaInstagram className={`w-6 h-6 md:w-8 md:h-8 text-white group-hover/icon:text-pink-500 transition-all duration-300 ${activeSocialIcon === 0 ? 'text-pink-500' : ''}`} />
                              </div>
                            </div>
                          </motion.a>
                          
                          {/* Facebook */}
                          <motion.a 
                            href="#" 
                            className="group/icon flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="relative">
                              <div className={`absolute inset-0 rounded-full bg-blue-600/10 scale-0 group-hover/icon:scale-125 transition-all duration-500 ${activeSocialIcon === 1 ? 'scale-125' : ''}`}></div>
                              <div className={`absolute inset-0 rounded-full bg-blue-600/20 scale-0 group-hover/icon:scale-110 transition-all duration-300 ${activeSocialIcon === 1 ? 'scale-110' : ''}`}></div>
                              <div className={`relative bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-full p-2 md:p-2 group-hover/icon:bg-blue-600/20 group-hover/icon:border-blue-500/50 transition-all duration-300 group-hover/icon:scale-110 ${activeSocialIcon === 1 ? 'bg-blue-600/20 border-blue-500/50 scale-110' : ''}`}>
                                <FaFacebook className={`w-6 h-6 md:w-8 md:h-8 text-white group-hover/icon:text-blue-600 transition-all duration-300 ${activeSocialIcon === 1 ? 'text-blue-600' : ''}`} />
                              </div>
                            </div>
                          </motion.a>
                          
                          {/* WhatsApp */}
                          <motion.a 
                            href="https://wa.me/51932694975" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/icon flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="relative">
                              <div className={`absolute inset-0 rounded-full bg-green-500/10 scale-0 group-hover/icon:scale-125 transition-all duration-500 ${activeSocialIcon === 2 ? 'scale-125' : ''}`}></div>
                              <div className={`absolute inset-0 rounded-full bg-green-500/20 scale-0 group-hover/icon:scale-110 transition-all duration-300 ${activeSocialIcon === 2 ? 'scale-110' : ''}`}></div>
                              <div className={`relative bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-full p-2 md:p-2 group-hover/icon:bg-green-500/20 group-hover/icon:border-green-400/50 transition-all duration-300 group-hover/icon:scale-110 ${activeSocialIcon === 2 ? 'bg-green-500/20 border-green-400/50 scale-110' : ''}`}>
                                <FaWhatsapp className={`w-6 h-6 md:w-8 md:h-8 text-white group-hover/icon:text-green-500 transition-all duration-300 ${activeSocialIcon === 2 ? 'text-green-500' : ''}`} />
                              </div>
                            </div>
                          </motion.a>
                          
                          {/* TikTok */}
                          <motion.a 
                            href="#" 
                            className="group/icon flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="relative">
                              <div className={`absolute inset-0 rounded-full bg-pink-500/10 scale-0 group-hover/icon:scale-125 transition-all duration-500 ${activeSocialIcon === 3 ? 'scale-125' : ''}`}></div>
                              <div className={`absolute inset-0 rounded-full bg-pink-500/20 scale-0 group-hover/icon:scale-110 transition-all duration-300 ${activeSocialIcon === 3 ? 'scale-110' : ''}`}></div>
                              <div className={`relative bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-full p-2 md:p-2 group-hover/icon:bg-pink-500/20 group-hover/icon:border-pink-400/50 transition-all duration-300 group-hover/icon:scale-110 ${activeSocialIcon === 3 ? 'bg-pink-500/20 border-pink-400/50 scale-110' : ''}`}>
                                <SiTiktok className={`w-6 h-6 md:w-8 md:h-8 text-white group-hover/icon:text-pink-500 transition-all duration-300 ${activeSocialIcon === 3 ? 'text-pink-500' : ''}`} />
                              </div>
                            </div>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tarjeta Descargar CV con vista previa */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    {/* Efectos de fondo avanzados */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/15 to-teal-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeCard === 2 ? 'blur-3xl' : ''}`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCard === 2 ? 'opacity-100' : ''}`}></div>
                    
                    {/* Contenedor principal con glassmorphism avanzado */}
                    <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-3 md:p-8 min-h-[220px] md:min-h-[230px] hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-3 overflow-hidden ${activeCard === 2 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-green-500/30 -translate-y-3' : ''}`}>
                      
                      {/* Partículas de fondo animadas */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-6 left-8 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-12 right-8 w-1 h-1 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                      </div>
                      
                      {/* Vista previa del CV como fondo completo */}
                      <div className="absolute inset-x-0 top-0 bottom-0 md:inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500">
                        <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                          {/* Simulación de documento PDF */}
                          <div className="w-full h-full relative">
                            {/* Header del documento */}
                            <div className="h-10 bg-gradient-to-r from-gray-600/30 to-gray-700/30 rounded-t-lg flex items-center px-4">
                              <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                              </div>
                              <div className="ml-4 text-sm text-white/70 font-mono">CV - DHILSEN MALLQUI VILCA.pdf</div>
                            </div>
                            
                            {/* Contenido del documento */}
                            <div className="bg-white/5 p-6 rounded-b-lg h-full">
                              <div className="space-y-3">
                                <div className="h-3 bg-white/25 rounded w-4/5"></div>
                                <div className="h-2 bg-white/20 rounded w-3/5"></div>
                                <div className="h-3 bg-white/25 rounded w-5/6"></div>
                                <div className="h-2 bg-white/15 rounded w-2/3"></div>
                                <div className="h-3 bg-white/20 rounded w-4/5"></div>
                                <div className="h-2 bg-white/25 rounded w-3/4"></div>
                                <div className="h-2 bg-white/15 rounded w-1/2"></div>
                                <div className="h-3 bg-white/20 rounded w-5/6"></div>
                              </div>
                              
                              {/* Logo/Icono PDF */}
                              <div className="absolute bottom-6 right-6">
                                <div className="w-12 h-12 bg-red-500/40 rounded-lg flex items-center justify-center">
                                  <span className="text-red-300 text-sm font-bold">PDF</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Botón de descarga centrado */}
                      <div className="relative z-10 flex justify-center items-end md:items-end h-full pb-16 md:pb-8">
                        <motion.a
                          href="/cv/CV - DHILSEN MALLQUI VILCA (1).pdf"
                          download="CV_Dhilsen_Mallqui_Vilca.pdf"
                          className={`group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium py-2 px-4 md:py-3 md:px-6 rounded-xl transition-all duration-500 hover:bg-white/20 hover:border-white/40 hover:text-green-300 hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 whitespace-nowrap text-sm md:text-base ${activeCard === 2 ? 'bg-white/20 border-white/40 text-green-300 shadow-2xl shadow-green-500/30 scale-105' : ''}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-300 group-hover:text-green-400 ${activeCard === 2 ? 'text-green-400' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs md:text-sm">Descargar CV</span>
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tarjeta Experiencia */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    {/* Efectos de fondo avanzados */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/15 to-amber-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeCard === 3 ? 'blur-3xl' : ''}`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCard === 3 ? 'opacity-100' : ''}`}></div>
                    
                    {/* Contenedor principal con glassmorphism avanzado */}
                    <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl px-8 py-8 md:px-16 md:py-14 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-3 overflow-hidden md:h-[230px] ${activeCard === 3 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-yellow-500/30 -translate-y-3' : ''}`}>
                      
                      {/* Partículas de fondo animadas */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-4 left-6 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-12 right-8 w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-8 left-12 w-1 h-1 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-16 right-6 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                      </div>

                      <div className="text-center relative z-10">
                        <motion.div
                          initial={{ scale: 0.8 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-1">UPC</div>
                          <p className="text-xs md:text-lg text-gray-300 text-center md:text-left">Estudiante</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Mapa Card - Solo visible en móvil */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="group relative md:hidden"
                  >
                    {/* Efectos de fondo avanzados */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/15 to-teal-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Contenedor principal con glassmorphism avanzado */}
                    <div className="relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-3 overflow-hidden h-full flex flex-col">
                      
                      {/* Partículas de fondo animadas */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-4 left-6 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-12 right-8 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-8 left-12 w-1 h-1 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-16 right-6 w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                      </div>

                      {/* Contenido del mapa */}
                      <LeafletMap className="w-full h-full absolute inset-0" />
                    </div>
                  </motion.div>
                </div>

                {/* Fila inferior: 2 tarjetas con efectos avanzados */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                  {/* Tarjeta Descripción Full-Stack Mejorada */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="col-span-2 md:col-span-2 group relative"
                  >
                    {/* Efectos de fondo avanzados */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/15 to-indigo-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeCard === 4 ? 'blur-3xl' : ''}`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCard === 4 ? 'opacity-100' : ''}`}></div>
                    
                    {/* Contenedor principal con glassmorphism avanzado */}
                    <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl px-0 py-7 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-3 overflow-hidden ${activeCard === 4 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-purple-500/30 -translate-y-3' : ''}`}>
                      
                      {/* Efectos de fondo animados */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-6 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-12 right-8 w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                      </div>

                      <div className="relative z-10 flex items-center justify-center h-full">
                        {/* Animación de scroll infinito */}
                        <div className="w-full h-full overflow-hidden">
                          {/* Fila superior - se desplaza a la derecha */}
                          <div className="flex animate-scroll-right">
                            <div className="flex space-x-4 whitespace-nowrap">
                              {/* Duplicamos el contenido para el scroll infinito */}
                              {[...Array(3)].map((_, i) => (
                                <React.Fragment key={i}>
                                  <div className="relative bg-gradient-to-br from-purple-500/30 via-blue-500/25 to-indigo-500/30 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 flex items-center justify-center gap-3 min-w-fit shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                                      <span className="text-lg">👥</span>
                                    </div>
                                    <span className="relative z-10 text-white font-semibold text-sm tracking-wide">Voluntariado</span>
                                  </div>
                                  <div className="relative bg-gradient-to-br from-blue-500/30 via-cyan-500/25 to-teal-500/30 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 flex items-center justify-center gap-3 min-w-fit shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                                      <span className="text-lg">🌍</span>
                                    </div>
                                    <span className="relative z-10 text-white font-semibold text-sm tracking-wide">Viajar</span>
                                  </div>
                                  <div className="relative bg-gradient-to-br from-pink-500/30 via-purple-500/25 to-fuchsia-500/30 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 flex items-center justify-center gap-3 min-w-fit shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300 group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                                      <span className="text-lg">📱</span>
                                    </div>
                                    <span className="relative z-10 text-white font-semibold text-sm tracking-wide">TikTok</span>
                                  </div>
                                  <div className="relative bg-gradient-to-br from-indigo-500/30 via-purple-500/25 to-violet-500/30 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 flex items-center justify-center gap-3 min-w-fit shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                                      <span className="text-lg">🎭</span>
                                    </div>
                                    <span className="relative z-10 text-white font-semibold text-sm tracking-wide">Danza</span>
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>

                          {/* Fila inferior - se desplaza a la izquierda */}
                          <div className="flex animate-scroll-left mt-4">
                            <div className="flex space-x-4 whitespace-nowrap">
                              {/* Duplicamos el contenido para el scroll infinito */}
                              {[...Array(3)].map((_, i) => (
                                <React.Fragment key={i}>
                                  <div className="relative bg-gradient-to-br from-green-500/30 via-emerald-500/25 to-teal-500/30 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 flex items-center justify-center gap-3 min-w-fit shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                                      <span className="text-lg">💪</span>
                                    </div>
                                    <span className="relative z-10 text-white font-semibold text-sm tracking-wide">Fitness</span>
                                  </div>
                                  <div className="relative bg-gradient-to-br from-yellow-500/30 via-orange-500/25 to-amber-500/30 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 flex items-center justify-center gap-3 min-w-fit shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300 group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                                      <span className="text-lg">🎼</span>
                                    </div>
                                    <span className="relative z-10 text-white font-semibold text-sm tracking-wide">Música</span>
                                  </div>
                                  <div className="relative bg-gradient-to-br from-red-500/30 via-pink-500/25 to-rose-500/30 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 flex items-center justify-center gap-3 min-w-fit shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                                      <span className="text-lg">🎮</span>
                                    </div>
                                    <span className="relative z-10 text-white font-semibold text-sm tracking-wide">Juegos</span>
                                  </div>
                                  <div className="relative bg-gradient-to-br from-cyan-500/30 via-blue-500/25 to-indigo-500/30 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 flex items-center justify-center gap-3 min-w-fit shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative z-10 bg-white/20 rounded-full p-2 backdrop-blur-sm">
                                      <span className="text-lg">📷</span>
                                    </div>
                                    <span className="relative z-10 text-white font-semibold text-sm tracking-wide">Fotografía</span>
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tarjeta Mapa de Ubicación */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="group relative hidden md:block"
                  >
                    {/* Efectos de fondo avanzados */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/15 to-blue-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeCard === 5 ? 'blur-3xl' : ''}`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCard === 5 ? 'opacity-100' : ''}`}></div>
                    
                    {/* Contenedor principal con glassmorphism avanzado */}
                    <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-0 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-3 overflow-hidden ${activeCard === 5 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-teal-500/30 -translate-y-3' : ''}`}>
                      <div className="h-48 w-full">
                        <MapComponent />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Tecnologías */}
        <section id="competencias" className="container mx-auto px-6 py-20 pt-36">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
              Tecnologías
            </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Herramientas y tecnologías que domino para crear soluciones innovadoras
              </p>
            </motion.div>
          </div>
          
          {/* Grid 2x2 con efectos avanzados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            
            {/* Frontend */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Efectos de fondo avanzados */}
              <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/10 via-blue-500/15 to-purple-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeFrameworkCard === 0 ? 'blur-3xl' : ''}`}></div>
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeFrameworkCard === 0 ? 'opacity-100' : ''}`}></div>
              
              {/* Contenedor principal con glassmorphism avanzado */}
              <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-10 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-3 overflow-hidden ${activeFrameworkCard === 0 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-orange-500/30 -translate-y-3' : ''}`}>
                
                {/* Partículas de fondo animadas */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-6 left-8 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-12 right-8 w-1 h-1 bg-orange-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>

                {/* Header */}
                <div className="text-center mb-6 md:mb-10 relative z-10">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">Frontend</h3>
                  <p className="text-blue-400 text-sm md:text-lg font-medium">Tecnologías Web • Desarrollo UI/UX</p>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6 md:mb-10"></div>

                {/* Technologies Grid */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 relative z-10">
                  <TechCard 
                    icon={FaHtml5}
                    name="HTML"
                    percentage={60}
                    color="text-orange-500"
                    bgColor="bg-gradient-to-br from-orange-500/20 via-orange-400/15 to-orange-600/20"
                    borderColor="border-orange-400/30"
                  />
                  
                  <TechCard 
                    icon={FaCss3Alt}
                    name="CSS"
                    percentage={60}
                    color="text-blue-500"
                    bgColor="bg-gradient-to-br from-blue-500/20 via-blue-400/15 to-blue-600/20"
                    borderColor="border-blue-400/30"
                  />
                  
                  <TechCard 
                    icon={FaJs}
                    name="JavaScript"
                    percentage={50}
                    color="text-yellow-500"
                    bgColor="bg-gradient-to-br from-yellow-500/20 via-yellow-400/15 to-yellow-600/20"
                    borderColor="border-yellow-400/30"
                  />
                  
                  <TechCard 
                    icon={SiTailwindcss}
                    name="Tailwind"
                    percentage={50}
                    color="text-cyan-500"
                    bgColor="bg-gradient-to-br from-cyan-500/20 via-cyan-400/15 to-cyan-600/20"
                    borderColor="border-cyan-400/30"
                  />
                  
                  <TechCard 
                    icon={FaBootstrap}
                    name="Bootstrap"
                    percentage={50}
                    color="text-purple-500"
                    bgColor="bg-gradient-to-br from-purple-500/20 via-purple-400/15 to-purple-600/20"
                    borderColor="border-purple-400/30"
                  />
                </div>
              </div>
            </motion.div>

            {/* Frameworks */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Efectos de fondo avanzados */}
              <div className={`absolute inset-0 bg-gradient-to-br from-green-500/10 via-cyan-500/15 to-blue-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeFrameworkCard === 1 ? 'blur-3xl' : ''}`}></div>
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeFrameworkCard === 1 ? 'opacity-100' : ''}`}></div>
              
              {/* Contenedor principal con glassmorphism avanzado */}
              <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-10 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-3 overflow-hidden ${activeFrameworkCard === 1 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-green-500/30 -translate-y-3' : ''}`}>
                
                {/* Partículas de fondo animadas */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-6 left-8 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-12 right-8 w-1 h-1 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>

                {/* Header */}
                <div className="text-center mb-6 md:mb-10 relative z-10">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">Frameworks</h3>
                  <p className="text-green-400 text-sm md:text-lg font-medium">Desarrollo Full-Stack • Arquitectura Moderna</p>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6 md:mb-10"></div>

                {/* Technologies Grid */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 relative z-10">
                  <TechCard 
                    icon={FaReact}
                    name="React"
                    percentage={50}
                    color="text-cyan-400"
                    bgColor="bg-gradient-to-br from-cyan-500/20 via-cyan-400/15 to-cyan-600/20"
                    borderColor="border-cyan-400/30"
                  />
                  
                  <TechCard 
                    icon={FaAngular}
                    name="Angular"
                    percentage={30}
                    color="text-red-500"
                    bgColor="bg-gradient-to-br from-red-500/20 via-red-400/15 to-red-600/20"
                    borderColor="border-red-400/30"
                  />
                  
                  <TechCard 
                    icon={FaNodeJs}
                    name="Nest.js"
                    percentage={20}
                    color="text-green-500"
                    bgColor="bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-600/20"
                    borderColor="border-green-400/30"
                  />
                  
                  <TechCard 
                    icon={SiSpringboot}
                    name="SpringBoot"
                    percentage={20}
                    color="text-green-500"
                    bgColor="bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-600/20"
                    borderColor="border-green-400/30"
                  />
                </div>
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Efectos de fondo avanzados */}
              <div className={`absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/15 to-yellow-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeFrameworkCard === 2 ? 'blur-3xl' : ''}`}></div>
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeFrameworkCard === 2 ? 'opacity-100' : ''}`}></div>
              
              {/* Contenedor principal con glassmorphism avanzado */}
              <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-10 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-3 overflow-hidden ${activeFrameworkCard === 2 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-red-500/30 -translate-y-3' : ''}`}>
                
                {/* Partículas de fondo animadas */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-6 left-8 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-12 right-8 w-1 h-1 bg-red-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>

                {/* Header */}
                <div className="text-center mb-6 md:mb-10 relative z-10">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">Backend</h3>
                  <p className="text-red-400 text-sm md:text-lg font-medium">Lenguajes de Programación • Servidores</p>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6 md:mb-10"></div>

                {/* Technologies Grid */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 relative z-10">
                  <TechCard 
                    icon={FaJava}
                    name="Java"
                    percentage={30}
                    color="text-red-500"
                    bgColor="bg-gradient-to-br from-red-500/20 via-red-400/15 to-red-600/20"
                    borderColor="border-red-400/30"
                  />
                  
                  <TechCard 
                    icon={FaPython}
                    name="Python"
                    percentage={20}
                    color="text-blue-500"
                    bgColor="bg-gradient-to-br from-blue-500/20 via-blue-400/15 to-blue-600/20"
                    borderColor="border-blue-400/30"
                  />
                  
                  <TechCard 
                    icon={SiCplusplus}
                    name="C++"
                    percentage={40}
                    color="text-purple-500"
                    bgColor="bg-gradient-to-br from-purple-500/20 via-purple-400/15 to-purple-600/20"
                    borderColor="border-purple-400/30"
                  />
                </div>
              </div>
            </motion.div>

            {/* Bases de Datos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Efectos de fondo avanzados */}
              <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/15 to-indigo-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeFrameworkCard === 3 ? 'blur-3xl' : ''}`}></div>
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeFrameworkCard === 3 ? 'opacity-100' : ''}`}></div>
              
              {/* Contenedor principal con glassmorphism avanzado */}
              <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-10 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-3 overflow-hidden ${activeFrameworkCard === 3 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-purple-500/30 -translate-y-3' : ''}`}>
                
                {/* Partículas de fondo animadas */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-6 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-12 right-8 w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>

                {/* Header */}
                <div className="text-center mb-6 md:mb-10 relative z-10">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">Bases de Datos</h3>
                  <p className="text-purple-400 text-sm md:text-lg font-medium">Gestión de Datos • SQL y NoSQL</p>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6 md:mb-10"></div>

                {/* Technologies Grid */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 relative z-10">
                  <TechCard 
                    icon={FaDatabase}
                    name="SQL Server"
                    percentage={10}
                    color="text-red-500"
                    bgColor="bg-gradient-to-br from-red-500/20 via-red-400/15 to-red-600/20"
                    borderColor="border-red-400/30"
                  />
                  
                  <TechCard 
                    icon={SiMysql}
                    name="MySQL"
                    percentage={10}
                    color="text-blue-400"
                    bgColor="bg-gradient-to-br from-blue-400/20 via-blue-300/15 to-blue-500/20"
                    borderColor="border-blue-300/30"
                  />
                  
                  <TechCard 
                    icon={SiMongodb}
                    name="MongoDB"
                    percentage={10}
                    color="text-green-500"
                    bgColor="bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-600/20"
                    borderColor="border-green-400/30"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Sección de educación */}
        <section id="educacion" className="container mx-auto px-6 py-20 pt-36">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
                Educación
            </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Mi formación académica y desarrollo profesional continuo
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            
            {/* UPC Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Efectos de fondo avanzados */}
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/15 to-pink-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeEducationCard === 0 ? 'blur-3xl opacity-100' : ''}`}></div>
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeEducationCard === 0 ? 'opacity-100' : ''}`}></div>
              
              {/* Contenedor principal con glassmorphism avanzado */}
              <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl px-8 py-8 md:p-4 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-3 overflow-hidden h-full min-h-[60px] md:min-h-[100px] flex flex-col ${activeEducationCard === 0 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-blue-500/30 -translate-y-3' : ''}`}>
                
                {/* Partículas de fondo animadas */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-6 left-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
                
                {/* Header con animaciones avanzadas */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between mb-3 md:mb-4 relative z-10 flex-1 min-h-[100px] md:min-h-auto">
                  <div className="flex-1 text-center md:text-left w-full">
                    <motion.h3 
                      className="text-base md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-4 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      UPC
                    </motion.h3>
                    
                    <motion.div 
                      className="space-y-1 md:space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <motion.span 
                          className="text-blue-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          viewport={{ once: true }}
                        >
                          Marzo 2023
                        </motion.span>
                        <span className="text-gray-400">-</span>
                        <motion.span 
                          className="text-blue-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          viewport={{ once: true }}
                        >
                          En curso
                        </motion.span>
                        <motion.span 
                          className="text-blue-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          viewport={{ once: true }}
                        >
                          (6to Ciclo)
                        </motion.span>
                      </div>
                      
                      <motion.p 
                        className="text-sm md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-bold"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        Ingeniería de Software
                      </motion.p>
                    </motion.div>
                  </div>
                  
                  {/* Logo UPC con efectos avanzados */}
                  <motion.div 
                    className="mt-4 md:mt-0 md:ml-6 relative"
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 flex items-center justify-center relative">
                      {/* Efecto de halo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                      <img 
                        src={logoUpc} 
                        alt="Logo UPC" 
                        className="w-full h-full object-contain relative z-10 drop-shadow-lg"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>

                {/* Tags con animaciones secuenciales */}
                <motion.div 
                  className="flex flex-row gap-2 md:gap-3 mb-3 md:mb-4 relative z-10 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-blue-500/30 transition-all duration-300 text-center w-fit"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Desarrollo de Software
                  </motion.span>
                  
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-purple-500/30 transition-all duration-300 text-center w-fit"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Gestión de Proyectos
                  </motion.span>
                </motion.div>

                {/* Barra de progreso animada */}
                <motion.div 
                  className="mt-auto relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <motion.span 
                      className="text-xs md:text-sm text-gray-300 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      viewport={{ once: true }}
                    >
                      Progreso académico
                    </motion.span>
                    <motion.span 
                      className="text-sm md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                      viewport={{ once: true }}
                    >
                      65%
                    </motion.span>
                  </div>
                  
                  {/* Contenedor de la barra */}
                  <div className="relative h-2 md:h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/30">
                    {/* Barra de progreso animada */}
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "65%" }}
                      transition={{ duration: 2, delay: 1.7, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      {/* Efecto de brillo animado */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                    
                    {/* Indicador de progreso */}
                    <motion.div
                      className="absolute top-1/2 right-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full transform -translate-y-1/2 translate-x-0.5 md:translate-x-1 shadow-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  
                  {/* Texto descriptivo */}
                  <motion.p 
                    className="text-xs text-gray-400 mt-1 md:mt-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.0 }}
                    viewport={{ once: true }}
                  >
                    6to ciclo completado • 4 ciclos restantes
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>

            {/* ICPNA Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Efectos de fondo avanzados */}
              <div className={`absolute inset-0 bg-gradient-to-br from-green-500/10 via-teal-500/15 to-emerald-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeEducationCard === 1 ? 'blur-3xl opacity-100' : ''}`}></div>
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeEducationCard === 1 ? 'opacity-100' : ''}`}></div>
              
              {/* Contenedor principal con glassmorphism avanzado */}
              <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 md:p-8 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-3 overflow-hidden h-full min-h-[150px] md:min-h-[400px] flex flex-col ${activeEducationCard === 1 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-green-500/30 -translate-y-3' : ''}`}>
                
                {/* Partículas de fondo animadas */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-6 left-8 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-12 right-8 w-1 h-1 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
                
                {/* Header con animaciones avanzadas */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between mb-3 md:mb-4 relative z-10 flex-1">
                  <div className="flex-1 text-center md:text-left w-full">
                    <motion.h3 
                      className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      ICPNA
                    </motion.h3>
                    
                    <motion.div 
                      className="space-y-2 md:space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <motion.span 
                          className="text-green-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          viewport={{ once: true }}
                        >
                          Agosto 2024
                        </motion.span>
                        <span className="text-gray-400">-</span>
                        <motion.span 
                          className="text-green-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          viewport={{ once: true }}
                        >
                          Julio 2025
                        </motion.span>
                      </div>
                      
                      <motion.p 
                        className="text-sm md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-emerald-400 font-bold text-center md:text-left"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        Inglés
                      </motion.p>
                    </motion.div>
                  </div>
                  
                  {/* Logo ICPNA con efectos avanzados */}
                  <motion.div 
                    className="mt-4 md:mt-0 md:ml-6 relative"
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center relative">
                      {/* Efecto de halo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                      <img 
                        src={logoIpcna} 
                        alt="Logo ICPNA" 
                        className="w-full h-full object-contain relative z-10 drop-shadow-lg"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-3 md:mb-6"></div>

                {/* Tags con animaciones secuenciales */}
                <motion.div 
                  className="flex flex-row gap-2 md:gap-3 mb-3 md:mb-4 relative z-10 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-green-500/30 transition-all duration-300 text-center w-fit"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Intermedio 1
                  </motion.span>
                  
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-green-500/30 transition-all duration-300 text-center w-fit"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Comunicación Oral
                  </motion.span>
                  
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-green-500/30 transition-all duration-300 text-center w-fit"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Comprensión Lectora
                  </motion.span>
                </motion.div>

                {/* Barra de progreso animada */}
                <motion.div 
                  className="mt-auto relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <motion.span 
                      className="text-xs md:text-sm text-gray-300 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      viewport={{ once: true }}
                    >
                      Progreso del curso
                    </motion.span>
                    <motion.span 
                      className="text-sm md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 font-bold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                      viewport={{ once: true }}
                    >
                      40%
                    </motion.span>
                  </div>
                  
                  {/* Contenedor de la barra */}
                  <div className="relative h-2 md:h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/30">
                    {/* Barra de progreso animada */}
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "40%" }}
                      transition={{ duration: 2, delay: 1.7, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      {/* Efecto de brillo animado */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                    
                    {/* Indicador de progreso */}
                    <motion.div
                      className="absolute top-1/2 right-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full transform -translate-y-1/2 translate-x-0.5 md:translate-x-1 shadow-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  
                  {/* Texto descriptivo */}
                  <motion.p 
                    className="text-xs text-gray-400 mt-1 md:mt-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.0 }}
                    viewport={{ once: true }}
                  >
                    Curso en progreso • 6 meses restantes
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sección de experiencia */}
        <section id="experiencia" className="container mx-auto px-6 py-20 pt-36">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
                Experiencia Laboral
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Mi trayectoria profesional y proyectos destacados
              </p>
            </motion.div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Timeline vertical */}
            <div className="relative">
              {/* Línea vertical del timeline */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
            
              {/* Experiencia 1: Proyectos de I+D */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative mb-8 md:mb-16 pl-12 md:pl-20 pt-16 md:pt-0"
              >
                {/* Punto del timeline */}
                <div className="absolute left-2 md:left-6 top-6 md:top-8 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 md:border-4 border-black shadow-lg"></div>
                
                {/* Badge de fecha */}
                <div className="absolute left-2 md:-left-[74px] top-2 md:top-8 bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm border border-green-400/30 rounded-lg px-2 py-1 md:px-3 md:py-1 shadow-lg">
                  <span className="text-white text-xs md:text-xs font-bold uppercase tracking-wider">2023 - PRESENTE</span>
                </div>
              {/* Efectos de fondo avanzados */}
              <div className={`absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/15 to-teal-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeExperienceCard === 0 ? 'blur-3xl opacity-100' : ''}`}></div>
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeExperienceCard === 0 ? 'opacity-100' : ''}`}></div>
              
              {/* Contenedor principal con glassmorphism avanzado */}
              <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 md:p-6 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-3 overflow-hidden h-full min-h-[200px] md:min-h-[400px] flex flex-col ${activeExperienceCard === 0 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-green-500/30 -translate-y-3' : ''}`}>
                
                {/* Partículas de fondo animadas */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-6 left-8 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-12 right-8 w-1 h-1 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
                
                {/* Header con animaciones avanzadas */}
                <div className="flex items-start justify-between mb-3 md:mb-6 relative z-10">
                  <div className="flex-1">
                    <motion.h3 
                      className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      Proyectos de I+D
                    </motion.h3>
                    
                    <motion.div 
                      className="space-y-1 md:space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-2">
                        <motion.span 
                          className="text-green-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          viewport={{ once: true }}
                        >
                          2023
                        </motion.span>
                        <span className="text-gray-400">-</span>
                        <motion.span 
                          className="text-green-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          viewport={{ once: true }}
                        >
                          Presente
                        </motion.span>
                      </div>
                      
                      <motion.p 
                        className="text-sm md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 font-bold"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        Investigación y Desarrollo
                      </motion.p>
                    </motion.div>
                  </div>
                  
                  {/* Icon con efectos avanzados */}
                  <motion.div 
                    className="ml-2 md:ml-6 relative"
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 lg:w-20 lg:h-20 flex items-center justify-center relative">
                      {/* Efecto de halo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                      <FaLightbulb className="text-lg md:text-3xl lg:text-5xl text-green-400 relative z-10 drop-shadow-lg" />
                    </div>
                  </motion.div>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-3 md:mb-6"></div>

                {/* Descripción con animaciones */}
                <motion.div 
                  className="flex-1 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-gray-300 text-xs md:text-lg mb-3 md:mb-4 leading-relaxed">
                    Participación activa en proyectos de investigación y desarrollo utilizando C++ para la implementación de algoritmos avanzados y soluciones innovadoras.
                  </p>
                </motion.div>

                {/* Tags con animaciones secuenciales */}
                <motion.div 
                  className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-green-500/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    C++
                  </motion.span>
                  
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-emerald-500/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Investigación
                  </motion.span>
                  
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-teal-500/20 to-teal-600/20 backdrop-blur-sm border border-teal-400/30 text-teal-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-teal-500/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Desarrollo
                  </motion.span>
                </motion.div>

              </div>
            </motion.div>

              {/* Experiencia 2: Comunidad IEEE */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative mb-8 md:mb-16 pl-12 md:pl-20 pt-16 md:pt-0"
              >
                {/* Punto del timeline */}
                <div className="absolute left-2 md:left-6 top-6 md:top-8 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-2 md:border-4 border-black shadow-lg"></div>
                
                {/* Badge de fecha */}
                <div className="absolute left-2 md:-left-[74px] top-2 md:top-8 bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-sm border border-orange-400/30 rounded-lg px-2 py-1 md:px-3 md:py-1 shadow-lg">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">MIEMBRO ACTIVO</span>
                </div>
              {/* Efectos de fondo avanzados */}
              <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/15 to-pink-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeExperienceCard === 1 ? 'blur-3xl opacity-100' : ''}`}></div>
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeExperienceCard === 1 ? 'opacity-100' : ''}`}></div>
              
              {/* Contenedor principal con glassmorphism avanzado */}
              <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 md:p-6 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-3 overflow-hidden h-full min-h-[200px] md:min-h-[400px] flex flex-col ${activeExperienceCard === 1 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-orange-500/30 -translate-y-3' : ''}`}>
                
                {/* Partículas de fondo animadas */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-6 left-8 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-12 right-8 w-1 h-1 bg-orange-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
                
                {/* Header con animaciones avanzadas */}
                <div className="flex items-start justify-between mb-3 md:mb-6 relative z-10">
                  <div className="flex-1">
                    <motion.h3 
                      className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      Comunidad IEEE – UPC
                    </motion.h3>
                    
                    <motion.div 
                      className="space-y-1 md:space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-2">
                        <motion.span 
                          className="text-orange-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          viewport={{ once: true }}
                        >
                          Miembro
                        </motion.span>
                        <span className="text-gray-400">-</span>
                        <motion.span 
                          className="text-orange-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          viewport={{ once: true }}
                        >
                          Activo
                        </motion.span>
                      </div>
                      
                      <motion.p 
                        className="text-sm md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 font-bold"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        Comunidad Internacional
                      </motion.p>
                    </motion.div>
                  </div>
                  
                  {/* Icon con efectos avanzados */}
                  <motion.div 
                    className="ml-2 md:ml-6 relative"
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 lg:w-20 lg:h-20 flex items-center justify-center relative">
                      {/* Efecto de halo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                      <FaUsers className="text-lg md:text-3xl lg:text-5xl text-orange-400 relative z-10 drop-shadow-lg" />
                    </div>
                  </motion.div>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-3 md:mb-6"></div>

                {/* Descripción con animaciones */}
                <motion.div 
                  className="flex-1 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-gray-300 text-xs md:text-lg mb-3 md:mb-4 leading-relaxed">
                    Participación activa en la comunidad internacional IEEE de la UPC, colaborando en proyectos tecnológicos y eventos de networking profesional.
                  </p>
                </motion.div>

                {/* Tags con animaciones secuenciales */}
                <motion.div 
                  className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-400/30 text-orange-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-orange-500/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    IEEE
                  </motion.span>
                  
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-400/30 text-red-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-red-500/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Comunidad
                  </motion.span>
                  
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-pink-500/20 to-pink-600/20 backdrop-blur-sm border border-pink-400/30 text-pink-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-pink-500/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Networking
                  </motion.span>
                </motion.div>

              </div>
            </motion.div>

              {/* Experiencia 3: Concursos de Programación */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative pl-12 md:pl-20 pt-16 md:pt-0"
              >
                {/* Punto del timeline */}
                <div className="absolute left-2 md:left-6 top-6 md:top-8 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-2 md:border-4 border-black shadow-lg"></div>
                
                {/* Badge de fecha */}
                <div className="absolute left-2 md:-left-[74px] top-2 md:top-8 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-2 py-1 md:px-3 md:py-1 shadow-lg">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">AGOSTO 2023</span>
                </div>
              {/* Efectos de fondo avanzados */}
              <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/15 to-indigo-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 ${activeExperienceCard === 2 ? 'blur-3xl opacity-100' : ''}`}></div>
              <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeExperienceCard === 2 ? 'opacity-100' : ''}`}></div>
              
              {/* Contenedor principal con glassmorphism avanzado */}
              <div className={`relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 md:p-6 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-3 overflow-hidden h-full min-h-[200px] md:min-h-[400px] flex flex-col ${activeExperienceCard === 2 ? 'bg-gradient-to-br from-white/12 via-white/8 to-white/5 border-white/40 shadow-2xl shadow-cyan-500/30 -translate-y-3' : ''}`}>
                
                {/* Partículas de fondo animadas */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-6 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-12 right-8 w-1 h-1 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
                
                {/* Header con animaciones avanzadas */}
                <div className="flex items-start justify-between mb-3 md:mb-6 relative z-10">
                  <div className="flex-1">
                    <motion.h3 
                      className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      Concursos de Programación
                    </motion.h3>
                    
                    <motion.div 
                      className="space-y-1 md:space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-2">
                        <motion.span 
                          className="text-cyan-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          viewport={{ once: true }}
                        >
                          Agosto
                        </motion.span>
                        <span className="text-gray-400">-</span>
                        <motion.span 
                          className="text-cyan-400 font-semibold text-xs md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          viewport={{ once: true }}
                        >
                          2023
                        </motion.span>
                      </div>
                      
                      <motion.p 
                        className="text-sm md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 font-bold"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        Programación Competitiva
                      </motion.p>
                    </motion.div>
                  </div>
                  
                  {/* Icon con efectos avanzados */}
                  <motion.div 
                    className="ml-2 md:ml-6 relative"
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 lg:w-20 lg:h-20 flex items-center justify-center relative">
                      {/* Efecto de halo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                      <FaCode className="text-lg md:text-3xl lg:text-5xl text-cyan-400 relative z-10 drop-shadow-lg" />
                    </div>
                  </motion.div>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-3 md:mb-6"></div>

                {/* Descripción con animaciones */}
                <motion.div 
                  className="flex-1 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-gray-300 text-xs md:text-lg mb-3 md:mb-4 leading-relaxed">
                    Participación en concursos de programación competitiva desarrollando habilidades en algoritmos avanzados y resolución de problemas complejos.
                  </p>
                </motion.div>

                {/* Tags con animaciones secuenciales */}
                <motion.div 
                  className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-cyan-500/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Programación Competitiva
                  </motion.span>
                  
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-blue-500/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Algoritmos
                  </motion.span>
                  
                  <motion.span
                    className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 backdrop-blur-sm border border-indigo-400/30 text-indigo-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-indigo-500/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    C++
                  </motion.span>
                </motion.div>

              </div>
            </motion.div>
            </div>
          </div>
        </section>

        {/* Sección de proyectos destacados */}
        <section id="proyectos" className="container mx-auto px-6 py-20 pt-36">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Proyectos Destacados
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Esta sección representa un hito en mi camino de aprendizaje continuo
            </p>
          </div>
          
          {/* Contenedor principal con tabs */}
          <div className="group relative max-w-7xl mx-auto">
            {/* Efectos de fondo avanzados */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/15 to-pink-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Contenedor principal con glassmorphism avanzado */}
            <div className="relative bg-gradient-to-br from-white/8 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 md:p-8 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/8 hover:to-white/5 hover:border-white/40 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-3 overflow-hidden">
              
              {/* Partículas de fondo animadas */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-6 left-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-12 right-8 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
              {/* Tabs de navegación con animaciones avanzadas */}
              <motion.div 
                className="flex justify-center space-x-2 md:space-x-4 mb-6 md:mb-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={() => setActiveTab('proyectos')}
                  className={`flex items-center space-x-2 md:space-x-4 px-6 md:px-16 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold transition-all duration-500 relative overflow-hidden backdrop-blur-xl border ${
                    activeTab === 'proyectos'
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/20 text-white shadow-2xl shadow-blue-500/20'
                      : 'bg-white/10 border-white/20 text-gray-300 hover:text-white hover:bg-white/15 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <FaCode className="text-lg md:text-xl" />
                    {activeTab === 'proyectos' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                  <span className="text-sm md:text-lg font-medium">Proyectos</span>
                  {activeTab === 'proyectos' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-xl md:rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                  )}
                </motion.button>
                
                <motion.button
                  onClick={() => setActiveTab('certificados')}
                  className={`flex items-center space-x-2 md:space-x-4 px-6 md:px-16 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold transition-all duration-500 relative overflow-hidden backdrop-blur-xl border ${
                    activeTab === 'certificados'
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/20 text-white shadow-2xl shadow-blue-500/20'
                      : 'bg-white/10 border-white/20 text-gray-300 hover:text-white hover:bg-white/15 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <FaCertificate className="text-lg md:text-xl" />
                    {activeTab === 'certificados' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                  <span className="text-sm md:text-lg font-medium">Certificados</span>
                  {activeTab === 'certificados' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-xl md:rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                  )}
                </motion.button>
              </motion.div>

              {/* Contenido de los tabs con animaciones avanzadas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                {activeTab === 'proyectos' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                {/* Proyecto 1: La Avenida */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-black/40 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 group"
                >
                  {/* Screenshot del proyecto */}
                  <div className="mb-4 md:mb-6 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 p-2 md:p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group-la-avenida relative" onClick={() => openProjectGallery('la-avenida')}>
                      <img 
                        src="/src/assets/images/projects_and_certificates/project2-image1.jpg" 
                        alt="La Avenida - Cafetería en Huarmey" 
                        className="w-full h-auto object-cover transition-transform duration-300 group-la-avenida-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-la-avenida-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-la-avenida-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3">
                          <FaEye className="text-gray-800 text-lg md:text-xl" />
                        </div>
                      </div>
                      <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm font-medium text-gray-800">
                        5 imágenes
                      </div>
                    </div>
                  </div>

                  {/* Información del proyecto */}
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      La Avenida - Cafetería en Huarmey
                    </h3>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      Desarrollo de una plataforma web para la cafetería La Avenida en Huarmey, permitiendo la visualización de la carta y gestión de reservas. Implementado con HTML, CSS y JavaScript para una experiencia de usuario interactiva y fluida.
                    </p>
                    
                    {/* Tags de tecnologías */}
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-md md:rounded-lg text-xs md:text-sm font-medium">
                        HTML
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 rounded-md md:rounded-lg text-xs md:text-sm font-medium">
                        CSS
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-300 rounded-md md:rounded-lg text-xs md:text-sm font-medium">
                        JavaScript
                      </span>
                    </div>

                    {/* Enlaces */}
                    <div className="flex space-x-3 md:space-x-4 pt-2 md:pt-4">
                      <a
                        href="https://github.com/Dhilsen18/ProyectoPersonal_LaAvenida"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 md:space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        <FaGithub className="text-base md:text-lg" />
                        <span className="text-sm md:text-base">Code</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center space-x-1 md:space-x-2 text-green-400 hover:text-green-300 transition-colors duration-300"
                      >
                        <FaExternalLinkAlt className="text-base md:text-lg" />
                        <span className="text-sm md:text-base">Live Demo</span>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Proyecto 2: PsyCare */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-black/40 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 group"
                >
                  {/* Screenshot del proyecto */}
                  <div className="mb-4 md:mb-6 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-2 md:p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group-psycare relative" onClick={() => openProjectGallery('psycare')}>
                      <img 
                        src="/src/assets/images/projects_and_certificates/psy1.png" 
                        alt="PsyCare - Detección de Trastornos Psicológicos" 
                        className="w-full h-auto object-cover transition-transform duration-300 group-psycare-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-psycare-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-psycare-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3">
                          <FaEye className="text-gray-800 text-lg md:text-xl" />
                        </div>
                      </div>
                      <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm font-medium text-gray-800">
                        5 imágenes
                      </div>
                    </div>
                  </div>

                  {/* Información del proyecto */}
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                      PsyCare - Detección de Trastornos Psicológicos
                    </h3>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      Aplicación web diseñada para la detección temprana de trastornos psicológicos en estudiantes universitarios. Utiliza HTML, CSS, JavaScript y Node.js para un sistema robusto y fácil de usar que apoya la salud mental estudiantil.
                    </p>
                    
                    {/* Tags de tecnologías */}
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-md md:rounded-lg text-xs md:text-sm font-medium">
                        HTML
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 rounded-md md:rounded-lg text-xs md:text-sm font-medium">
                        CSS
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-300 rounded-md md:rounded-lg text-xs md:text-sm font-medium">
                        JavaScript
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-green-600/20 backdrop-blur-sm border border-green-600/30 text-green-400 rounded-md md:rounded-lg text-xs md:text-sm font-medium">
                        Node.js
                      </span>
                    </div>

                    {/* Enlaces */}
                    <div className="flex space-x-3 md:space-x-4 pt-2 md:pt-4">
                      <a
                        href="#"
                        className="flex items-center space-x-1 md:space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        <FaGithub className="text-base md:text-lg" />
                        <span className="text-sm md:text-base">Code</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center space-x-1 md:space-x-2 text-green-400 hover:text-green-300 transition-colors duration-300"
                      >
                        <FaExternalLinkAlt className="text-base md:text-lg" />
                        <span className="text-sm md:text-base">Live Demo</span>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Proyecto 3: La Avenida React */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-black/40 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 group"
                >
                  {/* Screenshot del proyecto */}
                  <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group-la-avenida-react relative" onClick={() => openProjectGallery('la-avenida-react')}>
                      <img 
                        src="/src/assets/images/projects_and_certificates/Ave1.png" 
                        alt="La Avenida React - Cafetería en Huarmey" 
                        className="w-full h-auto object-cover transition-transform duration-300 group-la-avenida-react-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-la-avenida-react-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-la-avenida-react-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <FaEye className="text-gray-800 text-xl" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                        5 imágenes
                      </div>
                    </div>
                  </div>

                  {/* Información del proyecto */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                      La Avenida - Cafetería en Huarmey (New)
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Versión moderna y completa de la plataforma web para la cafetería La Avenida, desarrollada con React, Tailwind CSS, Node.js, TypeScript y base de datos SQL. Incluye sistema de reservas, gestión de menú, autenticación de usuarios y panel administrativo completo.
                    </p>
                    
                    {/* Tags de tecnologías */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 rounded-lg text-sm font-medium">
                        React
                      </span>
                      <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 rounded-lg text-sm font-medium">
                        Tailwind CSS
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-lg text-sm font-medium">
                        Node.js
                      </span>
                      <span className="px-3 py-1 bg-blue-600/20 backdrop-blur-sm border border-blue-600/30 text-blue-400 rounded-lg text-sm font-medium">
                        TypeScript
                      </span>
                      <span className="px-3 py-1 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 text-orange-300 rounded-lg text-sm font-medium">
                        SQL
                      </span>
                    </div>

                    {/* Enlaces */}
                    <div className="flex space-x-4 pt-4">
                      <a
                        href="https://github.com/Dhilsen18/ProyectoPersonal_LaAvenida"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        <FaGithub className="text-lg" />
                        <span>Code</span>
                      </a>
                      <a
                        href="https://la-avenida.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors duration-300"
                      >
                        <FaExternalLinkAlt className="text-lg" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Proyecto 4: Portfolio Programador */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-black/40 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 group"
                >
                  {/* Screenshot del proyecto */}
                  <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group-portfolio relative" onClick={() => openProjectGallery('portfolio')}>
                      <img 
                        src="/src/assets/images/projects_and_certificates/Portfol.png" 
                        alt="Portfolio Programador" 
                        className="w-full h-auto object-cover transition-transform duration-300 group-portfolio-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-portfolio-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-portfolio-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <FaEye className="text-gray-800 text-xl" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                        5 imágenes
                      </div>
                    </div>
                  </div>

                  {/* Información del proyecto */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                      Portfolio Programador
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Portfolio personal moderno y profesional desarrollado con React, Tailwind CSS y TypeScript. Incluye secciones de experiencia, habilidades técnicas, proyectos destacados y información personal. Diseño responsive con animaciones fluidas y una interfaz intuitiva que destaca las competencias como desarrollador frontend.
                    </p>
                    
                    {/* Tags de tecnologías */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 rounded-lg text-sm font-medium">
                        React
                      </span>
                      <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 rounded-lg text-sm font-medium">
                        Tailwind CSS
                      </span>
                      <span className="px-3 py-1 bg-blue-600/20 backdrop-blur-sm border border-blue-600/30 text-blue-400 rounded-lg text-sm font-medium">
                        TypeScript
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-lg text-sm font-medium">
                        Responsive
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 rounded-lg text-sm font-medium">
                        Animaciones
                      </span>
                    </div>

                    {/* Enlaces */}
                    <div className="flex space-x-4 pt-4">
                      <a
                        href="https://github.com/Dhilsen18/pilsen_portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        <FaGithub className="text-lg" />
                        <span>Code</span>
                      </a>
                      <a
                        href="https://pilsenportfolio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
                      >
                        <FaExternalLinkAlt className="text-lg" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Proyecto 5: Waze Aéreo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-black/40 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2 group"
                >
                  {/* Screenshot del proyecto */}
                  <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-orange-50 to-red-100 p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group-waze relative" onClick={() => openProjectGallery('waze')}>
                      <img 
                        src="/src/assets/images/projects_and_certificates/Waze1.png" 
                        alt="Waze Aéreo - Sistema de Optimización de Rutas" 
                        className="w-full h-auto object-cover transition-transform duration-300 group-waze-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-waze-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-waze-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <FaEye className="text-gray-800 text-xl" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                        5 imágenes
                      </div>
                    </div>
                  </div>

                  {/* Información del proyecto */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                      Waze Aéreo - Sistema de Optimización de Rutas
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Sistema avanzado de optimización de rutas aéreas desarrollado con React y JavaScript. Utiliza algoritmos de optimización para planificar rutas eficientes considerando múltiples factores como tiempo de vuelo, probabilidades de retraso, tiempos de conexión y capacidad de aeropuertos. Implementado con una dataset real de aerolíneas de Estados Unidos.
                    </p>
                    
                    {/* Tags de tecnologías */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 rounded-lg text-sm font-medium">
                        React
                      </span>
                      <span className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-300 rounded-lg text-sm font-medium">
                        JavaScript
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 rounded-lg text-sm font-medium">
                        Bootstrap
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-lg text-sm font-medium">
                        Python
                      </span>
                      <span className="px-3 py-1 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 text-orange-300 rounded-lg text-sm font-medium">
                        HTML
                      </span>
                      <span className="px-3 py-1 bg-blue-600/20 backdrop-blur-sm border border-blue-600/30 text-blue-400 rounded-lg text-sm font-medium">
                        JSON
                      </span>
                    </div>

                    {/* Enlaces */}
                    <div className="flex space-x-4 pt-4">
                      <a
                        href="https://github.com/Dhilsen18/Waze_Aereo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        <FaGithub className="text-lg" />
                        <span>Code</span>
                      </a>
                      <a
                        href="https://github.com/Dhilsen18/Waze_Aereo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors duration-300"
                      >
                        <FaExternalLinkAlt className="text-lg" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-black/30 hover:border-white/20 transition-all duration-500 group"
                >
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center">
                      <FaCode className="text-4xl mb-4 mx-auto opacity-50" />
                      <p className="text-lg">Proyecto en desarrollo</p>
                      <p className="text-sm opacity-75">Próximamente...</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'certificados' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Certificado 1: Concept Art for Video Games */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="group-cert-1 group relative bg-gradient-to-br from-indigo-500/30 to-purple-600/30 backdrop-blur-xl border border-indigo-400/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-indigo-300/60"
                >
                  {/* Partículas de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 right-8 w-6 h-6 bg-purple-400/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-indigo-300/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-purple-300/25 rounded-full animate-bounce"></div>
                  </div>
                  
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src="/src/assets/images/projects_and_certificates/Concept Art for Video Games.jpeg" 
                      alt="Concept Art for Video Games Certificate" 
                      className="w-full h-48 object-cover group-cert-1-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent group-cert-1-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">Concept Art for Video Games</h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Certificación en arte conceptual para videojuegos</p>
                </motion.div>

                {/* Certificado 2: Demand Analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="group-cert-2 group relative bg-gradient-to-br from-red-500/30 to-orange-600/30 backdrop-blur-xl border border-red-400/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-red-300/60"
                >
                  {/* Partículas de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 right-8 w-6 h-6 bg-orange-400/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-red-300/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-orange-300/25 rounded-full animate-bounce"></div>
                  </div>
                  
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src="/src/assets/images/projects_and_certificates/Demand Analytics.jpeg" 
                      alt="Demand Analytics Certificate" 
                      className="w-full h-48 object-cover group-cert-2-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent group-cert-2-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-300 transition-colors duration-300">Demand Analytics</h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Certificación en análisis de demanda</p>
                </motion.div>

                {/* Certificado 3: Introduction Scrum Master */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="group-cert-3 group relative bg-gradient-to-br from-emerald-500/30 to-green-600/30 backdrop-blur-xl border border-emerald-400/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-emerald-300/60"
                >
                  {/* Partículas de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 right-8 w-6 h-6 bg-green-400/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-emerald-300/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-green-300/25 rounded-full animate-bounce"></div>
                  </div>
                  
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src="/src/assets/images/projects_and_certificates/IntroducctionScrumMaster.jpeg" 
                      alt="Introduction Scrum Master Certificate" 
                      className="w-full h-48 object-cover group-cert-3-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent group-cert-3-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">Introduction Scrum Master</h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Certificación en metodología Scrum</p>
                </motion.div>

                {/* Certificado 4: Inventory Analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="group-cert-4 group relative bg-gradient-to-br from-rose-500/30 to-pink-600/30 backdrop-blur-xl border border-rose-400/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-rose-300/60"
                >
                  {/* Partículas de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-rose-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 right-8 w-6 h-6 bg-pink-400/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-rose-300/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-pink-300/25 rounded-full animate-bounce"></div>
                  </div>
                  
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src="/src/assets/images/projects_and_certificates/Inventory Analytics.jpeg" 
                      alt="Inventory Analytics Certificate" 
                      className="w-full h-48 object-cover group-cert-4-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent group-cert-4-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-300 transition-colors duration-300">Inventory Analytics</h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Certificación en análisis de inventario</p>
                </motion.div>

                {/* Certificado 5: Programming for Everybody */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="group-cert-5 group relative bg-gradient-to-br from-amber-500/30 to-yellow-600/30 backdrop-blur-xl border border-amber-400/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-amber-300/60"
                >
                  {/* Partículas de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 right-8 w-6 h-6 bg-yellow-400/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-amber-300/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-yellow-300/25 rounded-full animate-bounce"></div>
                  </div>
                  
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src="/src/assets/images/projects_and_certificates/Programming for Everybody (Getting Started with Python).jpeg" 
                      alt="Programming for Everybody Certificate" 
                      className="w-full h-48 object-cover group-cert-5-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent group-cert-5-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">Programming for Everybody</h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Certificación en programación con Python</p>
                </motion.div>

                {/* Certificado 6: Python Data Structures */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="group-cert-6 group relative bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-xl border border-cyan-400/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-cyan-300/60"
                >
                  {/* Partículas de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 right-8 w-6 h-6 bg-blue-400/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-cyan-300/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-blue-300/25 rounded-full animate-bounce"></div>
                  </div>
                  
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src="/src/assets/images/projects_and_certificates/Python Data Structures.jpeg" 
                      alt="Python Data Structures Certificate" 
                      className="w-full h-48 object-cover group-cert-6-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent group-cert-6-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">Python Data Structures</h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Certificación en estructuras de datos con Python</p>
                </motion.div>

                {/* Certificado 7: Retrieving, Processing, and Visualizing Data */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="group-cert-7 group relative bg-gradient-to-br from-violet-500/30 to-purple-600/30 backdrop-blur-xl border border-violet-400/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-violet-300/60"
                >
                  {/* Partículas de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-violet-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 right-8 w-6 h-6 bg-purple-400/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-violet-300/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-purple-300/25 rounded-full animate-bounce"></div>
                  </div>
                  
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src="/src/assets/images/projects_and_certificates/Retrieving, Processing, and Visualizing Data with Python.jpeg" 
                      alt="Retrieving, Processing, and Visualizing Data Certificate" 
                      className="w-full h-48 object-cover group-cert-7-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 to-transparent group-cert-7-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors duration-300">Data Processing & Visualization</h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Certificación en procesamiento y visualización de datos</p>
                </motion.div>

                {/* Certificado 8: Scaling Agile and Team-of-Teams */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="group-cert-8 group relative bg-gradient-to-br from-teal-500/30 to-emerald-600/30 backdrop-blur-xl border border-teal-400/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-teal-300/60"
                >
                  {/* Partículas de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 right-8 w-6 h-6 bg-emerald-400/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-teal-300/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-emerald-300/25 rounded-full animate-bounce"></div>
                  </div>
                  
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src="/src/assets/images/projects_and_certificates/Scaling Agile and the Team-of-Teams.jpeg" 
                      alt="Scaling Agile Certificate" 
                      className="w-full h-48 object-cover group-cert-8-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent group-cert-8-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">Scaling Agile</h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Certificación en escalado de metodologías ágiles</p>
                </motion.div>

                {/* Certificado 9: Supply Chain Analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                  className="group-cert-9 group relative bg-gradient-to-br from-slate-500/30 to-gray-600/30 backdrop-blur-xl border border-slate-400/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-slate-500/30 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-slate-300/60"
                >
                  {/* Partículas de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-slate-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 right-8 w-6 h-6 bg-gray-400/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-slate-300/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-gray-300/25 rounded-full animate-bounce"></div>
                  </div>
                  
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src="/src/assets/images/projects_and_certificates/Supply Chain Analytics Essentials.jpeg" 
                      alt="Supply Chain Analytics Certificate" 
                      className="w-full h-48 object-cover group-cert-9-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-500/20 to-transparent group-cert-9-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-300 transition-colors duration-300">Supply Chain Analytics</h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Certificación en análisis de cadena de suministro</p>
                </motion.div>

                {/* Certificado 10: Using Python to Access Web Data */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="group-cert-10 group relative bg-gradient-to-br from-lime-500/30 to-green-600/30 backdrop-blur-xl border border-lime-400/40 rounded-3xl p-6 hover:shadow-2xl hover:shadow-lime-500/30 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-lime-300/60"
                >
                  {/* Partículas de fondo */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-lime-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 right-8 w-6 h-6 bg-green-400/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-lime-300/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-green-300/25 rounded-full animate-bounce"></div>
                  </div>
                  
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src="/src/assets/images/projects_and_certificates/Using Python to Access Web Data.jpeg" 
                      alt="Using Python to Access Web Data Certificate" 
                      className="w-full h-48 object-cover group-cert-10-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-lime-500/20 to-transparent group-cert-10-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-lime-300 transition-colors duration-300">Python Web Data Access</h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">Certificación en acceso a datos web con Python</p>
                </motion.div>
              </div>
            )}
              </motion.div>
              </div>
          </div>
        </section>

        {/* Modal del carrusel de imágenes */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProjectGallery}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/3 backdrop-blur-2xl border border-white/20 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="flex items-center justify-center p-6 border-b border-white/10 relative">
                <button
                  onClick={closeProjectGallery}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
                >
                  <FaTimes className="text-white text-xl" />
                </button>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    {selectedProject === 'la-avenida' ? (
                      <img 
                        src="/src/assets/images/projects_and_certificates/Logo2025.jpg" 
                        alt="La Avenida Logo" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : selectedProject === 'la-avenida-react' ? (
                      <img 
                        src="/src/assets/images/projects_and_certificates/Logo2025.jpg" 
                        alt="La Avenida React Logo" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : selectedProject === 'portfolio' ? (
                      <img 
                        src="/src/assets/images/emoji_avatar2.png" 
                        alt="Portfolio Logo" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <img 
                        src="/src/assets/images/projects_and_certificates/logoPsyCare.jpeg" 
                        alt="PsyCare Logo" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white">
                      {selectedProject === 'la-avenida' ? 'La Avenida - Cafetería' : 
                       selectedProject === 'la-avenida-react' ? 'La Avenida - Cafetería (New)' : 
                       selectedProject === 'portfolio' ? 'Portfolio Programador' :
                       selectedProject === 'waze' ? 'Waze Aéreo - Sistema de Optimización de Rutas' :
                       'PsyCare - Detección de Trastornos Psicológicos'}
                    </h3>
                    <p className="text-gray-300">Galería de imágenes del proyecto</p>
                  </div>
                </div>
              </div>

              {/* Contenido del carrusel */}
              <div className="relative p-6">
                {/* Imagen principal */}
                <div className="relative mb-6">
                  <motion.img
                    key={currentImageIndex}
                    src={`/src/assets/images/projects_and_certificates/${
                      selectedProject === 'la-avenida' ? `project2-image${currentImageIndex + 1}.jpg` : 
                      selectedProject === 'la-avenida-react' ? `Ave${currentImageIndex + 1}.png` : 
                      selectedProject === 'portfolio' ? `Portfol${currentImageIndex === 0 ? '' : currentImageIndex}.png` :
                      selectedProject === 'waze' ? `Waze${currentImageIndex + 1}.png` :
                      `psy${currentImageIndex + 1}.png`
                    }`}
                    alt={`${
                      selectedProject === 'la-avenida' ? 'La Avenida' : 
                      selectedProject === 'la-avenida-react' ? 'La Avenida React' : 
                      selectedProject === 'portfolio' ? 'Portfolio Programador' :
                      selectedProject === 'waze' ? 'Waze Aéreo' :
                      'PsyCare'
                    } - Imagen ${currentImageIndex + 1}`}
                    className="w-full h-auto max-h-[60vh] object-contain rounded-2xl shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Botones de navegación */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300"
                  >
                    <FaChevronLeft className="text-white text-xl" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300"
                  >
                    <FaChevronRight className="text-white text-xl" />
                </button>
              </div>

                {/* Indicadores */}
                <div className="flex justify-center space-x-3 mb-4">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'bg-blue-500 scale-125'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
          </div>

                {/* Información de la imagen */}
                <div className="text-center">
                  <p className="text-white text-sm font-medium">
                    Imagen {currentImageIndex + 1} de 5
                  </p>
                  <p className="text-gray-300 text-xs mt-1">
                    Captura de pantalla del proyecto {
                      selectedProject === 'la-avenida' ? 'La Avenida' : 
                      selectedProject === 'la-avenida-react' ? 'La Avenida React' : 
                      selectedProject === 'portfolio' ? 'Portfolio Programador' :
                      selectedProject === 'waze' ? 'Waze Aéreo' :
                      'PsyCare'
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 text-center text-gray-400">
          <div className="border-t border-gray-700/30 pt-8">
            <p className="text-lg">&copy; 2025 Portfolio</p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="https://www.linkedin.com/in/dhilsenmallqui" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="https://github.com/Dhilsen18" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="text-2xl" />
        </a>
      </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
