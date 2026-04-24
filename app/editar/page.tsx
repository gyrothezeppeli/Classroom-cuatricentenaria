"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const PALETTE = {
  principal: '#00BB7E',
  deepBg: '#1a2e26',
  cardBg: 'rgba(255, 255, 255, 0.03)',
  textGray: '#9ca3af'
};

const EditTasksPage: React.FC = () => {
  const [nivelSeleccionado, setNivelSeleccionado] = useState('media');
  const [tarea, setTarea] = useState({ titulo: '', descripcion: '', fecha: '' });

  const niveles = [
    { id: 'inicial', nombre: 'Educación Inicial' },
    { id: 'primaria', nombre: 'Educación Primaria' },
    { id: 'media', nombre: 'Educación Media' }
  ];

  const handlePublicar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Publicando en ${nivelSeleccionado}:`, tarea);
    alert(`Contenido actualizado con éxito en la sección de ${nivelSeleccionado.toUpperCase()}`);
  };

  return (
    <div style={{ 
      fontFamily: "'Montserrat', sans-serif", 
      background: PALETTE.deepBg, 
      minHeight: '100vh', 
      color: 'white',
      paddingBottom: '50px'
    }}>
      {/* Navegación Simple */}
      <nav style={{ padding: '2rem 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem' }}>
          ← Volver al Portal
        </Link>
        <div style={{ color: PALETTE.principal, fontWeight: '800', letterSpacing: '1px' }}>
          EDITOR DE CONTENIDO
        </div>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>GESTIÓN DE TAREAS</h1>
          <p style={{ color: PALETTE.textGray, fontSize: '1.1rem' }}>
            Actualiza las actividades académicas para los estudiantes de la institución.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
          
          {/* Formulario de Edición */}
          <section style={glassCardStyle}>
            <form onSubmit={handlePublicar} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Título de la Actividad</label>
                <input 
                  type="text" 
                  placeholder="Ej: Análisis Literario - El Coronel no tiene quien le escriba" 
                  style={inputStyle}
                  value={tarea.titulo}
                  onChange={(e) => setTarea({...tarea, titulo: e.target.value})}
                  required 
                />
              </div>

              <div>
                <label style={labelStyle}>Instrucciones detalladas</label>
                <textarea 
                  placeholder="Indique los objetivos, bibliografía y pasos a seguir..." 
                  style={{ ...inputStyle, minHeight: '180px', resize: 'vertical' }}
                  value={tarea.descripcion}
                  onChange={(e) => setTarea({...tarea, descripcion: e.target.value})}
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Fecha Límite</label>
                  <input 
                    type="date" 
                    style={inputStyle} 
                    value={tarea.fecha}
                    onChange={(e) => setTarea({...tarea, fecha: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Material de apoyo</label>
                  <input type="file" style={{ ...inputStyle, padding: '10px' }} />
                </div>
              </div>

              <button type="submit" style={publishButtonStyle}>
                ACTUALIZAR CONTENIDO PÚBLICO
              </button>
            </form>
          </section>

          {/* Selector de Nivel Académico */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: PALETTE.principal, textTransform: 'uppercase' }}>
              Nivel de Publicación
            </h3>
            {niveles.map((nivel) => (
              <div 
                key={nivel.id}
                onClick={() => setNivelSeleccionado(nivel.id)}
                style={{
                  ...levelCardStyle,
                  border: nivelSeleccionado === nivel.id ? `1px solid ${PALETTE.principal}` : '1px solid rgba(255,255,255,0.1)',
                  background: nivelSeleccionado === nivel.id ? 'rgba(0,187,126,0.08)' : 'rgba(0,0,0,0.2)',
                  boxShadow: nivelSeleccionado === nivel.id ? `0 0 20px rgba(0,187,126,0.1)` : 'none'
                }}
              >
                <span style={{ 
                  fontSize: '1rem', 
                  fontWeight: '700', 
                  color: nivelSeleccionado === nivel.id ? PALETTE.principal : 'white' 
                }}>
                  {nivel.nombre}
                </span>
                <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                  {nivel.id === 'inicial' ? 'Preescolar' : nivel.id === 'primaria' ? '1er a 6to' : 'Bachillerato'}
                </span>
              </div>
            ))}
            
            <div style={{ marginTop: '20px', padding: '20px', borderRadius: '15px', background: 'rgba(255,204,0,0.05)', border: '1px solid rgba(255,204,0,0.2)' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#ffcc00', lineHeight: '1.4' }}>
                <strong>Nota:</strong> Los cambios realizados aquí se reflejarán inmediatamente en el Portal de Aprendizaje para todos los estudiantes.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

// Estilos
const glassCardStyle: React.CSSProperties = {
  background: PALETTE.cardBg,
  backdropFilter: 'blur(15px)',
  padding: '40px',
  borderRadius: '30px',
  border: '1px solid rgba(255,255,255,0.05)',
  boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: '800',
  color: PALETTE.principal,
  marginBottom: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1.2rem',
  background: 'rgba(0,0,0,0.4)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '15px',
  color: 'white',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border 0.3s'
};

const levelCardStyle: React.CSSProperties = {
  padding: '22px',
  borderRadius: '18px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  transition: 'all 0.3s ease'
};

const publishButtonStyle: React.CSSProperties = {
  marginTop: '15px',
  padding: '20px',
  background: PALETTE.principal,
  border: 'none',
  borderRadius: '15px',
  color: '#1a2e26',
  fontWeight: '900',
  fontSize: '1rem',
  cursor: 'pointer',
  boxShadow: '0 10px 30px rgba(0, 187, 126, 0.3)',
  transition: 'transform 0.2s, background 0.2s',
  textTransform: 'uppercase'
};

export default EditTasksPage;