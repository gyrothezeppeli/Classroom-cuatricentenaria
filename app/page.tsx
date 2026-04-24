"use client";

import React from 'react';
import Link from 'next/link';

const PALETTE = {
  sandBorder: '#5c7564', 
  darkBanner: 'linear-gradient(160deg, #102d22 0%, #081a14 100%)',
  deepBg: '#1a2e26', 
  textLight: '#f3f4f6',
  accent: '#00BB7E'
};

const ClassroomPortalPage: React.FC = () => {
  return (
    <div style={{ 
      fontFamily: "'Montserrat', sans-serif", 
      background: PALETTE.deepBg, 
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      {/* Barra de Navegación con Botón Unificado */}
      <nav style={{ 
        padding: '1.5rem 8%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        zIndex: 100,
        boxSizing: 'border-box'
      }}>
        <Link href="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem' }}>
          U.E Ciudad Cuatricentenaria
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
          <div style={{ display: 'flex', gap: '25px' }}>
            <Link href="/" style={navLinkStyle}>Inicio</Link>
            <Link href="/#contacto" style={navLinkStyle}>Contacto</Link>
          </div>

          {/* Botón Unificado */}
          <Link href="/inicio" style={unifiedButtonStyle}>
            Acceso Docente
          </Link>
        </div>
      </nav>

      <header style={{
        height: '65vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10%',
        borderBottom: `45px solid ${PALETTE.sandBorder}`,
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url("/assets/img/fondo2.gif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }} />
        
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(135deg, rgba(45, 62, 54, 0.85) 0%, rgba(26, 46, 38, 0.65) 100%)',
          zIndex: 2
        }} />

        <div style={{ maxWidth: '800px', zIndex: 10, position: 'relative' }}>
          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 9vw, 6rem)', 
            color: PALETTE.textLight, 
            fontWeight: '900', 
            lineHeight: '0.9',
            marginBottom: '1.5rem',
            letterSpacing: '-3px',
            textTransform: 'uppercase'
          }}>
            Portal de<br/>Aprendizaje
          </h1>
          <p style={{ color: '#d1d5db', fontSize: '1.4rem', fontWeight: '400', maxWidth: '600px', lineHeight: '1.4' }}>
            Accede a tus aulas virtuales seleccionando tu nivel académico en la barra inferior.
          </p>
        </div>
      </header>

      {/* Selector de Aulas */}
      <section style={{ marginTop: '-85px', padding: '0 5%', position: 'relative', zIndex: 20 }}>
        <div style={{
          background: PALETTE.darkBanner,
          borderRadius: '120px', 
          padding: '2.5rem 4rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)'
        }}>
          {[
            { href: "/Classroom/inicial", label: "Educación Inicial", sub: "Preescolar y Maternal" },
            { href: "/Classroom/primaria", label: "Educación Primaria", sub: "1ero a 6to Grado" },
            { href: "/Classroom/media", label: "Educación Media", sub: "Bachillerato" }
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{ textDecoration: 'none', transition: '0.3s' }} className="nav-item">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', textAlign: 'center', padding: '0 20px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 5px 0', letterSpacing: '-0.5px' }}>{item.label}</h3>
                <p style={{ fontSize: '0.95rem', color: '#9ca3af', margin: 0, fontWeight: '500', opacity: 0.9 }}>{item.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Calendario y Footer se mantienen igual */}
      <section style={{ padding: '120px 10% 100px', color: 'white', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <div style={calendarCardStyle}>
            <h4 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              CALENDARIO ESCOLAR
            </h4>
            <p style={{ fontSize: '1.3rem', opacity: 0.8, lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
              Mantente al tanto de eventos, feriados y evaluaciones para este año escolar 2026.
            </p>
            <button style={buttonStyle}>Ver Agenda Completa</button>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '60px', color: '#6b7280', fontSize: '1.1rem' }}>
        U.E Ciudad Cuatricentenaria © 2026
      </footer>

      <style jsx global>{`
        body { margin: 0; padding: 0; }
        .nav-item:hover { transform: scale(1.05) translateY(-5px); }
      `}</style>
    </div>
  );
};

const navLinkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: '500',
  opacity: 0.8
};

const unifiedButtonStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  color: 'white',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: '700',
  padding: '12px 24px',
  borderRadius: '15px',
  border: `1px solid ${PALETTE.accent}`,
  transition: '0.3s',
  boxShadow: `0 0 15px rgba(0, 187, 126, 0.15)`,
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const calendarCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.04)',
  padding: '4rem 3rem',
  borderRadius: '50px',
  border: '1px solid rgba(255,255,255,0.08)',
  textAlign: 'center',
  backdropFilter: 'blur(5px)'
};

const buttonStyle: React.CSSProperties = {
  marginTop: '2.5rem',
  padding: '16px 40px',
  borderRadius: '50px',
  border: 'none',
  background: 'linear-gradient(180deg, #e3c5a5 0%, #c1a17b 100%)',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  color: '#1a2e26',
  cursor: 'pointer'
};

export default ClassroomPortalPage;