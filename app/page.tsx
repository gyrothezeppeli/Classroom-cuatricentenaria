"use client";

import React, { useState } from 'react';
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

const ClassroomPortalPage: React.FC = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  
  // Estados para la selección
  const [tempYear, setTempYear] = useState<string>("");
  const [tempSection, setTempSection] = useState<string>("");

  const sections = ["A", "B", "C"];

  const levels = [
    { 
      href: "/Classroom/inicial", 
      label: "Educación Inicial", 
      sub: "Preescolar y Maternal",
      years: ["Maternal", "1er Grupo", "2do Grupo", "3er Grupo"]
    },
    { 
      href: "/Classroom/primaria", 
      label: "Educación Primaria", 
      sub: "1ero a 6to Grado",
      years: ["1ero", "2do", "3ero", "4to", "5to", "6to"]
    },
    { 
      href: "/Classroom/media", 
      label: "Educación Media", 
      sub: "Bachillerato",
      years: ["1er Año", "2do Año", "3er Año", "4to Año", "5to Año"]
    }
  ];

  const handleNavigation = (basePath: string) => {
    if (tempYear && tempSection) {
      // Normalizamos el texto para la URL (ej: "1er Año" -> "1er-ano")
      const yearSlug = tempYear.toLowerCase().replace(" ", "-").replace("ñ", "n");
      const sectionSlug = tempSection.toLowerCase();
      router.push(`${basePath}/${yearSlug}/${sectionSlug}`);
    } else {
      alert("Por favor selecciona Grado/Año y Sección");
    }
  };

  return (
    <div style={{ 
      fontFamily: "'Montserrat', sans-serif", 
      background: PALETTE.deepBg, 
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      {/* Barra de Navegación */}
      <nav style={navStyle}>
        <Link href="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem' }}>
          U.E Ciudad Cuatricentenaria
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
          <div style={{ display: 'flex', gap: '25px' }}>
            <Link href="/" style={navLinkStyle}>Inicio</Link>
            <Link href="/#contacto" style={navLinkStyle}>Contacto</Link>
          </div>
          <Link href="/inicio" style={unifiedButtonStyle}>
            Acceso Docente
          </Link>
        </div>
      </nav>

      <header style={headerStyle}>
        <div style={bgGifStyle} />
        <div style={overlayStyle} />
        
        <div style={{ maxWidth: '800px', zIndex: 10, position: 'relative' }}>
          <h1 style={heroTitleStyle}>
            Portal de<br/>Aprendizaje
          </h1>
          <p style={heroSubStyle}>
            Accede a tus aulas virtuales seleccionando tu nivel académico y sección.
          </p>
        </div>
      </header>

      {/* Selector de Aulas con Pestaña Desplegable Modificada */}
      <section style={{ marginTop: '-85px', padding: '0 5%', position: 'relative', zIndex: 50 }}>
        <div style={bannerContainerStyle}>
          {levels.map((item, i) => (
            <div 
              key={i} 
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveMenu(i)}
              onMouseLeave={() => {
                setActiveMenu(null);
                setTempYear("");
                setTempSection("");
              }}
            >
              <div style={levelTriggerStyle} className="nav-item">
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 5px 0', letterSpacing: '-0.5px' }}>{item.label}</h3>
                <p style={{ fontSize: '0.95rem', color: '#9ca3af', margin: 0, fontWeight: '500', opacity: 0.9 }}>{item.sub}</p>
              </div>

              {activeMenu === i && (
                <div style={dropdownStyle} className="fade-in">
                  <span style={dropdownTitleStyle}>Seleccionar Grado</span>
                  <select 
                    style={selectInputStyle}
                    value={tempYear}
                    onChange={(e) => setTempYear(e.target.value)}
                  >
                    <option value="">-- Elige --</option>
                    {item.years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>

                  <span style={dropdownTitleStyle}>Sección</span>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px' }}>
                    {sections.map((sec) => (
                      <button 
                        key={sec} 
                        onClick={() => setTempSection(sec)}
                        style={{
                          ...sectionButtonStyle,
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
                    onClick={() => handleNavigation(item.href)}
                    style={confirmButtonStyle}
                  >
                    CONFIRMAR
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Calendario Escolar */}
      <section style={{ padding: '140px 10% 100px', color: 'white', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <div style={calendarCardStyle}>
            <h4 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              CALENDARIO ESCOLAR
            </h4>
            <p style={{ fontSize: '1.3rem', opacity: 0.8, lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
              Mantente al tanto de eventos, feriados y evaluaciones para este año escolar 2026.
            </p>
            <button style={calendarButtonStyle}>Ver Agenda Completa</button>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '60px', color: '#6b7280', fontSize: '1.1rem' }}>
        U.E Ciudad Cuatricentenaria © 2026
      </footer>

      <style jsx global>{`
        body { margin: 0; padding: 0; }
        .nav-item { cursor: pointer; transition: 0.3s; padding: 10px 20px; border-radius: 20px; }
        .nav-item:hover { background: rgba(255,255,255,0.05); }
        .fade-in { animation: fadeIn 0.25s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

/* --- ESTILOS (MANTENIDOS IGUAL + NUEVOS PARA SELECT Y BOTÓN) --- */

const navStyle: React.CSSProperties = {
  padding: '1.5rem 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  position: 'absolute', width: '100%', zIndex: 100, boxSizing: 'border-box'
};

const navLinkStyle: React.CSSProperties = {
  color: 'white', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500', opacity: 0.8
};

const unifiedButtonStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)', color: 'white', textDecoration: 'none', fontSize: '0.9rem',
  fontWeight: '700', padding: '12px 24px', borderRadius: '15px', border: `1px solid ${PALETTE.accent}`,
  transition: '0.3s', boxShadow: `0 0 15px rgba(0, 187, 126, 0.15)`, textTransform: 'uppercase', letterSpacing: '1px'
};

const headerStyle: React.CSSProperties = {
  height: '65vh', position: 'relative', display: 'flex', alignItems: 'center',
  padding: '0 10%', borderBottom: `45px solid ${PALETTE.sandBorder}`, overflow: 'hidden'
};

const bgGifStyle: React.CSSProperties = {
  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
  backgroundImage: 'url("/assets/img/fondo2.gif")', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1
};

const overlayStyle: React.CSSProperties = {
  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
  background: 'linear-gradient(135deg, rgba(45, 62, 54, 0.85) 0%, rgba(26, 46, 38, 0.65) 100%)', zIndex: 2
};

const heroTitleStyle: React.CSSProperties = {
  fontSize: 'clamp(3.5rem, 9vw, 6rem)', color: PALETTE.textLight, fontWeight: '900', 
  lineHeight: '0.9', marginBottom: '1.5rem', letterSpacing: '-3px', textTransform: 'uppercase'
};

const heroSubStyle: React.CSSProperties = { 
  color: '#d1d5db', fontSize: '1.4rem', fontWeight: '400', maxWidth: '600px', lineHeight: '1.4' 
};

const bannerContainerStyle: React.CSSProperties = {
  background: PALETTE.darkBanner, borderRadius: '120px', padding: '2.5rem 4rem',
  display: 'flex', justifyContent: 'space-around', alignItems: 'center',
  boxShadow: '0 40px 80px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)'
};

const levelTriggerStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', textAlign: 'center'
};

const dropdownStyle: React.CSSProperties = {
  position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)',
  background: '#081a14', padding: '20px', borderRadius: '25px', border: `1px solid ${PALETTE.accent}`,
  boxShadow: '0 20px 40px rgba(0,0,0,0.8)', minWidth: '220px', zIndex: 100
};

const dropdownTitleStyle: React.CSSProperties = {
  display: 'block', color: PALETTE.accent, fontSize: '0.7rem', fontWeight: 'bold',
  textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '2px', textAlign: 'center'
};

const selectInputStyle: React.CSSProperties = {
  width: '100%', padding: '8px', borderRadius: '10px', background: '#1a2e26', color: 'white',
  border: '1px solid rgba(255,255,255,0.2)', marginBottom: '15px', outline: 'none'
};

const sectionButtonStyle: React.CSSProperties = {
  textDecoration: 'none', width: '45px', height: '45px', display: 'flex', 
  alignItems: 'center', justifyContent: 'center', borderRadius: '12px', 
  fontWeight: 'bold', transition: '0.3s', border: '1px solid rgba(255,255,255,0.1)'
};

const confirmButtonStyle: React.CSSProperties = {
  width: '100%', padding: '12px', borderRadius: '15px', border: 'none',
  background: PALETTE.accent, color: '#081a14', fontWeight: 'bold', cursor: 'pointer',
  transition: '0.3s', textTransform: 'uppercase', fontSize: '0.8rem'
};

const calendarCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.04)', padding: '4rem 3rem', borderRadius: '50px',
  border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', backdropFilter: 'blur(5px)'
};

const calendarButtonStyle: React.CSSProperties = {
  marginTop: '2.5rem', padding: '16px 40px', borderRadius: '50px', border: 'none',
  background: 'linear-gradient(180deg, #e3c5a5 0%, #c1a17b 100%)', fontWeight: 'bold',
  fontSize: '1.1rem', color: '#1a2e26', cursor: 'pointer', transition: '0.3s'
};

export default ClassroomPortalPage;