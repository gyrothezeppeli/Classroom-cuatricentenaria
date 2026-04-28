"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PALETTE = {
  sandBorder: '#5c7564', 
  darkBanner: 'linear-gradient(160deg, #102d22 0%, #081a14 100%)',
  deepBg: '#1a2e26', 
  textLight: '#f3f4f6',
  accent: '#00BB7E',
  glass: 'rgba(255, 255, 255, 0.08)'
};

// --- HOOK PARA DETECTAR TAMAÑO DE PANTALLA ---
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// --- HOOK PARA DETECTAR ORIENTACIÓN ---
const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  return orientation;
};

const ClassroomPortalPage: React.FC = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const orientation = useOrientation();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isLandscape = orientation === 'landscape' && isMobile;
  
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [tempYear, setTempYear] = useState<string>("");
  const [tempSection, setTempSection] = useState<string>("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const sections = ["A", "B", "C"];

  const levels = [
    { 
      id: "inicial",
      href: "/Classroom/inicial", 
      label: "Educación Inicial", 
      sub: "Preescolar y Maternal",
      hasYearSelect: false
    },
    { 
      id: "primaria",
      href: "/Classroom/primaria", 
      label: "Educación Primaria", 
      sub: "1ero a 6to Grado",
      hasYearSelect: true,
      years: ["1ero", "2do", "3ero", "4to", "5to", "6to"]
    },
    { 
      id: "media",
      href: "/Classroom/media", 
      label: "Educación Media", 
      sub: "Bachillerato",
      hasYearSelect: true,
      years: ["1er Año", "2do Año", "3er Año", "4to Año", "5to Año"]
    }
  ];

  const handleNavigation = (basePath: string) => {
    if (tempYear && tempSection) {
      const yearSlug = tempYear.toLowerCase().replace(" ", "-").replace("ñ", "n");
      const sectionSlug = tempSection.toLowerCase();
      router.push(`${basePath}/${yearSlug}/${sectionSlug}`);
      setActiveMenu(null);
      setTempYear("");
      setTempSection("");
    } else {
      alert("Por favor selecciona Grado/Año y Sección");
    }
  };

  // Cerrar menús al hacer click fuera
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
      setShowMobileMenu(false);
    };
    
    if (isMobile && showMobileMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobile, showMobileMenu]);

  return (
    <div style={{ 
      fontFamily: "'Montserrat', sans-serif", 
      background: PALETTE.deepBg, 
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      {/* Navegación Responsive */}
      <nav style={{
        ...navStyle,
        padding: isMobile ? '1rem 5%' : '1.5rem 8%',
        position: isMobile ? 'relative' : 'absolute',
        background: isMobile ? PALETTE.deepBg : 'transparent'
      }}>
        <Link href="/" style={{ 
          color: 'white', 
          fontWeight: 'bold', 
          textDecoration: 'none', 
          fontSize: isMobile ? '1rem' : '1.2rem',
          maxWidth: isMobile ? '60%' : 'auto'
        }}>
          U.E Ciudad Cuatricentenaria
        </Link>
        
        {/* Botón Hamburguesa para móviles */}
        {isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMobileMenu(!showMobileMenu);
            }}
            style={hamburgerButtonStyle}
            aria-label="Menú"
          >
            <div style={{ ...hamburgerLineStyle, transform: showMobileMenu ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ ...hamburgerLineStyle, opacity: showMobileMenu ? 0 : 1 }} />
            <div style={{ ...hamburgerLineStyle, transform: showMobileMenu ? 'rotate(-45deg) translate(7px, -6px)' : 'none' }} />
          </button>
        )}
        
        {/* Menú Desktop / Mobile */}
        <div style={{
          ...menuContainerStyle,
          display: isMobile 
            ? (showMobileMenu ? 'flex' : 'none')
            : 'flex',
          position: isMobile ? 'absolute' : 'relative',
          top: isMobile ? '100%' : 'auto',
          left: isMobile ? 0 : 'auto',
          right: isMobile ? 0 : 'auto',
          background: isMobile ? PALETTE.deepBg : 'transparent',
          flexDirection: isMobile ? 'column' : 'row',
          padding: isMobile ? '20px' : '0',
          gap: isMobile ? '15px' : '35px',
          boxShadow: isMobile ? '0 10px 20px rgba(0,0,0,0.3)' : 'none',
          zIndex: 1000
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            gap: isMobile ? '15px' : '25px',
            width: isMobile ? '100%' : 'auto'
          }}>
            <Link href="/" style={{ ...navLinkStyle, textAlign: 'center' }} onClick={() => setShowMobileMenu(false)}>Inicio</Link>
            <Link href="/#contacto" style={{ ...navLinkStyle, textAlign: 'center' }} onClick={() => setShowMobileMenu(false)}>Contacto</Link>
          </div>
          <Link 
            href="/inicio" 
            style={{ 
              ...unifiedButtonStyle, 
              textAlign: 'center',
              padding: isMobile ? '10px 20px' : '12px 24px',
              fontSize: isMobile ? '0.85rem' : '0.9rem'
            }}
            onClick={() => setShowMobileMenu(false)}
          >
            Acceso Docente
          </Link>
        </div>
      </nav>

      {/* Hero Section Responsive */}
      <header style={{
        ...headerStyle,
        height: isMobile ? (isLandscape ? '40vh' : '50vh') : '65vh',
        padding: isMobile ? '0 5%' : '0 10%',
        borderBottom: isMobile ? `20px solid ${PALETTE.sandBorder}` : `45px solid ${PALETTE.sandBorder}`
      }}>
        <div style={bgGifStyle} />
        <div style={overlayStyle} />
        <div style={{ maxWidth: '800px', zIndex: 10, position: 'relative' }}>
          <h1 style={{
            ...heroTitleStyle,
            fontSize: isMobile ? (isLandscape ? 'clamp(2rem, 6vw, 3rem)' : 'clamp(2.5rem, 8vw, 3.5rem)') : 'clamp(3.5rem, 9vw, 6rem)',
            letterSpacing: isMobile ? '-1px' : '-3px'
          }}>
            Portal de<br/>Aprendizaje
          </h1>
          <p style={{
            ...heroSubStyle,
            fontSize: isMobile ? (isLandscape ? '1rem' : '1.1rem') : '1.4rem'
          }}>
            Accede a tus aulas virtuales seleccionando tu nivel académico y sección.
          </p>
        </div>
      </header>

      {/* Sección de Niveles - Responsive */}
      <section style={{ 
        marginTop: isMobile ? '-40px' : '-85px', 
        padding: isMobile ? '0 5%' : '0 5%', 
        position: 'relative', 
        zIndex: 50 
      }}>
        <div style={{
          ...bannerContainerStyle,
          borderRadius: isMobile ? (isLandscape ? '40px' : '30px') : '120px',
          padding: isMobile ? (isLandscape ? '1.5rem 1rem' : '2rem 1rem') : '2.5rem 4rem',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '20px' : '0',
          justifyContent: isMobile ? 'center' : 'space-around'
        }}>
          {levels.map((item, i) => (
            <div 
              key={i} 
              style={{ 
                position: 'relative',
                width: isMobile ? '100%' : 'auto',
                textAlign: 'center'
              }}
              onMouseEnter={() => !isMobile && setActiveMenu(i)}
              onMouseLeave={() => !isMobile && setActiveMenu(null)}
            >
              <div 
                style={{
                  ...levelTriggerStyle,
                  cursor: 'pointer',
                  padding: isMobile ? '15px' : '10px 20px',
                  borderRadius: isMobile ? '15px' : '20px',
                  background: activeMenu === i && !isMobile ? 'rgba(255,255,255,0.05)' : 'transparent'
                }}
                onClick={() => {
                  if (isMobile) {
                    setActiveMenu(activeMenu === i ? null : i);
                  }
                }}
              >
                <h3 style={{ 
                  fontSize: isMobile ? (isLandscape ? '1.1rem' : '1.2rem') : '1.4rem',
                  margin: '0 0 5px 0'
                }}>{item.label}</h3>
                <p style={{ 
                  fontSize: isMobile ? (isLandscape ? '0.75rem' : '0.85rem') : '0.95rem',
                  margin: 0
                }}>{item.sub}</p>
              </div>

              {(activeMenu === i) && (
                <div style={{
                  ...dropdownStyle,
                  position: isMobile ? 'relative' : 'absolute',
                  top: isMobile ? 'auto' : '110%',
                  left: isMobile ? '0' : '50%',
                  transform: isMobile ? 'none' : 'translateX(-50%)',
                  marginTop: isMobile ? '10px' : '0',
                  width: isMobile ? '100%' : 'auto',
                  minWidth: isMobile ? 'auto' : '220px'
                }} className="fade-in">
                  {item.hasYearSelect ? (
                    <>
                      <span style={dropdownTitleStyle}>Seleccionar Grado</span>
                      <select 
                        style={selectInputStyle}
                        value={tempYear}
                        onChange={(e) => setTempYear(e.target.value)}
                      >
                        <option value="">-- Elige --</option>
                        {item.years?.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>

                      <span style={dropdownTitleStyle}>Sección</span>
                      <div style={{ 
                        display: 'flex', 
                        gap: isMobile ? '8px' : '10px', 
                        justifyContent: 'center', 
                        marginBottom: '15px',
                        flexWrap: 'wrap'
                      }}>
                        {sections.map((sec) => (
                          <button 
                            key={sec} 
                            onClick={() => setTempSection(sec)}
                            style={{
                              ...sectionButtonStyle,
                              width: isMobile ? '40px' : '45px',
                              height: isMobile ? '40px' : '45px',
                              background: tempSection === sec ? PALETTE.accent : 'rgba(255,255,255,0.05)',
                              color: tempSection === sec ? '#081a14' : 'white',
                              cursor: 'pointer'
                            }}
                          >
                            {sec}
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          handleNavigation(item.href);
                          if (isMobile) setActiveMenu(null);
                        }} 
                        style={confirmButtonStyle}
                      >
                        CONFIRMAR
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={dropdownTitleStyle}>Secciones</span>
                      <div style={{ 
                        display: 'flex', 
                        gap: isMobile ? '8px' : '12px', 
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                      }}>
                        {sections.map((sec) => (
                          <Link 
                            key={sec} 
                            href={`${item.href}/${sec.toLowerCase()}`}
                            style={{
                              ...sectionButtonStyle,
                              width: isMobile ? '40px' : '45px',
                              height: isMobile ? '40px' : '45px'
                            }}
                            className="sec-btn"
                            onClick={() => isMobile && setActiveMenu(null)}
                          >
                            {sec}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sección Calendario - Responsive */}
      <section style={{ 
        padding: isMobile ? (isLandscape ? '60px 5%' : '80px 5%') : '140px 10% 100px', 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'center' 
      }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <div style={{
            ...calendarCardStyle,
            padding: isMobile ? (isLandscape ? '2rem 1.5rem' : '3rem 1.5rem') : '4rem 3rem',
            borderRadius: isMobile ? '30px' : '50px'
          }}>
            <h4 style={{ 
              fontSize: isMobile ? (isLandscape ? '1.5rem' : '1.8rem') : '2.5rem', 
              fontWeight: '900', 
              marginBottom: '1rem', 
              letterSpacing: '-1px' 
            }}>
              CALENDARIO ESCOLAR
            </h4>
            <p style={{ 
              fontSize: isMobile ? (isLandscape ? '0.9rem' : '1rem') : '1.3rem', 
              opacity: 0.8, 
              lineHeight: '1.6', 
              maxWidth: '600px', 
              margin: '0 auto' 
            }}>
              Mantente al tanto de eventos, feriados y evaluaciones para este año escolar 2026.
            </p>
            <button style={{
              ...calendarButtonStyle,
              marginTop: isMobile ? '1.5rem' : '2.5rem',
              padding: isMobile ? '12px 30px' : '16px 40px',
              fontSize: isMobile ? '0.9rem' : '1.1rem'
            }}>
              Ver Agenda Completa
            </button>
          </div>
        </div>
      </section>

      {/* Footer Responsive */}
      <footer style={{ 
        textAlign: 'center', 
        padding: isMobile ? '40px 20px' : '60px', 
        color: '#6b7280', 
        fontSize: isMobile ? '0.9rem' : '1.1rem' 
      }}>
        U.E Ciudad Cuatricentenaria © 2026
      </footer>

      {/* Scroll to top button */}
      {isMobile && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={scrollTopButtonStyle}
        >
          ↑
        </button>
      )}

      <style jsx global>{`
        body { margin: 0; padding: 0; overflow-x: hidden; }
        .nav-item { cursor: pointer; transition: 0.3s; }
        .nav-item:hover { background: rgba(255,255,255,0.05); }
        .fade-in { animation: fadeIn 0.25s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sec-btn:hover {
          background: ${PALETTE.accent} !important;
          color: #081a14 !important;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 187, 126, 0.4);
        }
        @media (max-width: 768px) {
          .sec-btn:active {
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};

/* --- ESTILOS MEJORADOS --- */
const navStyle: React.CSSProperties = { 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  width: '100%', 
  zIndex: 100, 
  boxSizing: 'border-box',
  transition: 'all 0.3s ease'
};

const hamburgerButtonStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  border: 'none',
  cursor: 'pointer',
  padding: '10px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  zIndex: 1001
};

const hamburgerLineStyle: React.CSSProperties = {
  width: '25px',
  height: '2px',
  background: 'white',
  transition: 'all 0.3s ease'
};

const menuContainerStyle: React.CSSProperties = {
  transition: 'all 0.3s ease'
};

const navLinkStyle: React.CSSProperties = { 
  color: 'white', 
  textDecoration: 'none', 
  fontSize: '0.95rem', 
  fontWeight: '500', 
  opacity: 0.8,
  transition: 'opacity 0.3s ease'
};

const unifiedButtonStyle: React.CSSProperties = { 
  background: 'rgba(255, 255, 255, 0.05)', 
  color: 'white', 
  textDecoration: 'none', 
  fontWeight: '700', 
  borderRadius: '15px', 
  border: `1px solid ${PALETTE.accent}`, 
  transition: '0.3s', 
  boxShadow: `0 0 15px rgba(0, 187, 126, 0.15)`, 
  textTransform: 'uppercase', 
  letterSpacing: '1px' 
};

const headerStyle: React.CSSProperties = { 
  position: 'relative', 
  display: 'flex', 
  alignItems: 'center', 
  overflow: 'hidden' 
};

const bgGifStyle: React.CSSProperties = { 
  position: 'absolute', 
  top: 0, 
  left: 0, 
  width: '100%', 
  height: '100%', 
  backgroundImage: 'url("/assets/img/fondo2.gif")', 
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  zIndex: 1 
};

const overlayStyle: React.CSSProperties = { 
  position: 'absolute', 
  top: 0, 
  left: 0, 
  width: '100%', 
  height: '100%', 
  background: 'linear-gradient(135deg, rgba(45, 62, 54, 0.85) 0%, rgba(26, 46, 38, 0.65) 100%)', 
  zIndex: 2 
};

const heroTitleStyle: React.CSSProperties = { 
  color: PALETTE.textLight, 
  fontWeight: '900', 
  lineHeight: '0.9', 
  marginBottom: '1.5rem', 
  textTransform: 'uppercase' 
};

const heroSubStyle: React.CSSProperties = { 
  color: '#d1d5db', 
  fontWeight: '400', 
  maxWidth: '600px', 
  lineHeight: '1.4' 
};

const bannerContainerStyle: React.CSSProperties = { 
  background: PALETTE.darkBanner, 
  boxShadow: '0 40px 80px rgba(0,0,0,0.6)', 
  border: '1px solid rgba(255,255,255,0.12)', 
  backdropFilter: 'blur(12px)' 
};

const levelTriggerStyle: React.CSSProperties = { 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  color: 'white', 
  textAlign: 'center' 
};

const dropdownStyle: React.CSSProperties = { 
  background: '#081a14', 
  padding: '20px', 
  borderRadius: '25px', 
  border: `1px solid ${PALETTE.accent}`, 
  boxShadow: '0 20px 40px rgba(0,0,0,0.8)', 
  zIndex: 100 
};

const dropdownTitleStyle: React.CSSProperties = { 
  display: 'block', 
  color: PALETTE.accent, 
  fontSize: '0.7rem', 
  fontWeight: 'bold', 
  textTransform: 'uppercase', 
  marginBottom: '8px', 
  letterSpacing: '2px', 
  textAlign: 'center' 
};

const selectInputStyle: React.CSSProperties = { 
  width: '100%', 
  padding: '8px', 
  borderRadius: '10px', 
  background: '#1a2e26', 
  color: 'white', 
  border: '1px solid rgba(255,255,255,0.2)', 
  marginBottom: '15px', 
  outline: 'none' 
};

const sectionButtonStyle: React.CSSProperties = { 
  textDecoration: 'none', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  borderRadius: '12px', 
  fontWeight: 'bold', 
  transition: '0.3s', 
  border: '1px solid rgba(255,255,255,0.1)', 
  color: 'white', 
  background: 'rgba(255,255,255,0.03)' 
};

const confirmButtonStyle: React.CSSProperties = { 
  width: '100%', 
  padding: '12px', 
  borderRadius: '15px', 
  border: 'none', 
  background: PALETTE.accent, 
  color: '#081a14', 
  fontWeight: 'bold', 
  cursor: 'pointer', 
  transition: '0.3s', 
  textTransform: 'uppercase', 
  fontSize: '0.8rem' 
};

const calendarCardStyle: React.CSSProperties = { 
  background: 'rgba(255, 255, 255, 0.04)', 
  border: '1px solid rgba(255,255,255,0.08)', 
  textAlign: 'center', 
  backdropFilter: 'blur(5px)' 
};

const calendarButtonStyle: React.CSSProperties = { 
  border: 'none', 
  background: 'linear-gradient(180deg, #e3c5a5 0%, #c1a17b 100%)', 
  fontWeight: 'bold', 
  color: '#1a2e26', 
  cursor: 'pointer', 
  transition: '0.3s' 
};

const scrollTopButtonStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: PALETTE.accent,
  color: '#081a14',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
  zIndex: 1000,
  transition: 'all 0.3s ease'
};

export default ClassroomPortalPage;