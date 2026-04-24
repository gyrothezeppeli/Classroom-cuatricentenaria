"use client";

import React from 'react';
import Link from 'next/link';

// --- CONFIGURACIÓN DE COLORES Y TEXTURAS ---
const THEME = {
  bgSand: '#94a3b8', // Simulación de fondo base
  earthBrown: '#5c4033',
  forestGreen: '#064E3B',
  softGreen: '#dcfce7',
  accentTan: '#d2b48c',
  // Colores de las tarjetas de la imagen
  cardGreen: '#86a076',
  cardBrown: '#7d5233',
  cardSand: '#e3c5a5'
};

const GRADIENTS = {
  hero: 'linear-gradient(180deg, #2d4a3e 0%, #1a2e26 100%)',
  mainCard: 'linear-gradient(135deg, rgba(16, 45, 34, 0.9) 0%, rgba(8, 26, 20, 0.95) 100%)',
  button3D: 'linear-gradient(180deg, #e3c5a5 0%, #c1a17b 100%)'
};

const ClassroomHomePage: React.FC = () => {
  return (
    <div style={{ 
      fontFamily: "'Montserrat', sans-serif", 
      background: '#2d3e36', // Fondo oscuro general
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      
      {/* 1. HERO SECTION (PARTE SUPERIOR ORGÁNICA) */}
      <section style={{
        height: '70vh',
        background: 'linear-gradient(135deg, #4b6354 0%, #2d3e36 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10%',
        borderBottom: '20px solid #5c7564'
      }}>
        <div style={{ maxWidth: '600px', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: '5rem', 
            color: '#f3f4f6', 
            fontWeight: '900', 
            lineHeight: '1',
            marginBottom: '1rem',
            fontFamily: "'Saira Stencil One', cursive"
          }}>
            Rennale<br/>Renuelly
          </h1>
          <p style={{ color: '#d1d5db', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Explora una nueva forma de aprendizaje digital inspirada en la naturaleza. 
            Nuestra plataforma conecta la educación con la fluidez del entorno.
          </p>
          <button style={{
            padding: '12px 40px',
            borderRadius: '50px',
            border: 'none',
            background: GRADIENTS.button3D,
            fontWeight: 'bold',
            boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}>
            Ver Detalles
          </button>
        </div>
        {/* Simulación de hojas/elementos decorativos (puedes reemplazarlos por imágenes reales) */}
        <div style={{
          position: 'absolute',
          right: '5%',
          top: '10%',
          fontSize: '15rem',
          opacity: 0.3,
          rotate: '15deg'
        }}>🍃</div>
      </section>

      {/* 2. BANNER CENTRAL (LA TARJETA GRANDE OSCURA) */}
      <section style={{ 
        marginTop: '-100px', 
        padding: '0 5%',
        position: 'relative',
        zIndex: 5 
      }}>
        <div style={{
          background: GRADIENTS.mainCard,
          borderRadius: '50px',
          padding: '4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { icon: '🎯', title: 'Exetgaris', text: 'Gestión de objetivos educativos de alto nivel.' },
            { icon: '📊', title: 'Narcomersi', text: 'Seguimiento métrico de progreso estudiantil.' },
            { icon: '🧹', title: 'Cleonews', text: 'Entorno de trabajo limpio y organizado.' },
            { icon: '🌍', title: 'Woah', text: 'Acceso global desde cualquier dispositivo.' }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{item.title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GRILLA DE TARJETAS (ESTILO 3D NEUMÓRFICO) */}
      <section style={{ 
        padding: '80px 5%', 
        background: '#1a2e26', // Fondo tierra oscura
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            
            {/* Tarjeta Verde */}
            <div style={cardStyle(THEME.cardGreen)}>
              <div style={iconCircle}>🌸</div>
              <h3>Siara Seador</h3>
              <p>Nivel de educación inicial y primaria básica.</p>
            </div>

            {/* Tarjeta Café */}
            <div style={cardStyle(THEME.cardBrown)}>
              <div style={iconCircle}>☕</div>
              <h3>Teovrt</h3>
              <p>Educación técnica y talleres especializados.</p>
            </div>

            {/* Tarjeta Arena */}
            <div style={cardStyle(THEME.cardSand)}>
              <div style={iconCircle}>🌾</div>
              <h3>Vouihufercs</h3>
              <p>Bachillerato avanzado y preparación universitaria.</p>
            </div>

            {/* Tarjeta con Imagen */}
            <div style={{
              ...cardStyle('#000'),
              backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80")',
              backgroundSize: 'cover',
              color: 'white',
              justifyContent: 'flex-end'
            }}>
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '10px' }}>
                <h3 style={{ margin: 0 }}>Naturaleza Viva</h3>
              </div>
            </div>

            {/* Tarjeta Dark con Sombra Larga */}
            <div style={cardStyle('#3d2b1f')}>
              <div style={iconCircle}>❄️</div>
              <h3 style={{ color: 'white' }}>Esoci Fias</h3>
              <p style={{ color: '#a8a29e' }}>Plataforma de investigación científica.</p>
            </div>

            {/* Tarjeta Menú */}
            <div style={cardStyle('#d9c5b2')}>
              <div style={{ ...iconCircle, background: '#7d5233' }}>☰</div>
              <h3>Blisstdare</h3>
              <p>Panel de configuración y recursos extra.</p>
            </div>

          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '0.9rem' }}>
        Pestres 1 | U.E Ciudad Cuatricentenaria © 2026
      </footer>

      {/* ESTILOS GLOBALES */}
      <style jsx global>{`
        body { margin: 0; padding: 0; }
        .container { max-width: 1200px; margin: 0 auto; }
      `}</style>
    </div>
  );
};

// --- HELPER STYLES ---

const cardStyle = (bgColor: string): React.CSSProperties => ({
  backgroundColor: bgColor,
  height: '350px',
  borderRadius: '35px',
  padding: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  boxShadow: '20px 20px 60px #14221c, -5px -5px 20px rgba(255,255,255,0.05)', // Sombra neumórfica
  transition: 'transform 0.3s ease',
  cursor: 'pointer'
});

const iconCircle: React.CSSProperties = ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.5rem',
  marginBottom: '20px',
  boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.2)'
});

export default ClassroomHomePage;