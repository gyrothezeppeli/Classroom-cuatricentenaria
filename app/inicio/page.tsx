"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const COLORES = {
  principal: '#00BB7E',
  oscuro: '#102d22',
  deepBg: '#1a2e26',
  textLight: '#f3f4f6'
};

const TeacherAuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    codigoDocente: ''
  });

  const CODIGO_VALIDO = "1234";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      if (formData.codigoDocente !== CODIGO_VALIDO) {
        alert("El Código de Docente es incorrecto. Contacte a la dirección.");
        return;
      }
      alert("Cuenta creada con éxito (Modo Prueba)");
    } else {
      console.log("Iniciando sesión con:", formData.email);
    }
  };

  return (
    <div style={{ 
      fontFamily: "'Montserrat', sans-serif", 
      background: COLORES.deepBg, 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      
      {/* BOTÓN VOLVER AL INICIO */}
      <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 20 }}>
        <Link href="/" style={backButtonStyle}>
          ← Volver al Inicio
        </Link>
      </div>

      {/* Fondo decorativo sutil */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'url("/assets/img/fondo2.gif")',
        backgroundSize: 'cover',
        opacity: 0.1,
        zIndex: 1
      }} />

      <main style={{ zIndex: 10, width: '100%', maxWidth: '450px', padding: '20px' }}>
        <div style={glassCardStyle}>
          
          <div style={tabContainerStyle}>
            <button 
              onClick={() => setIsLogin(true)}
              style={{ ...tabButtonStyle, background: isLogin ? COLORES.principal : 'transparent', color: isLogin ? '#1a2e26' : 'white' }}
            >
              INGRESAR
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              style={{ ...tabButtonStyle, background: !isLogin ? COLORES.principal : 'transparent', color: !isLogin ? '#1a2e26' : 'white' }}
            >
              REGISTRARSE
            </button>
          </div>

          <h1 style={titleStyle}>{isLogin ? 'DOCENTES' : 'NUEVO REGISTRO'}</h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {!isLogin && (
              <div style={{ textAlign: 'left' }}>
                <label style={labelStyle}>Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="Ej. Prof. García" 
                  style={inputStyle} 
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required
                />
              </div>
            )}

            <div style={{ textAlign: 'left' }}>
              <label style={labelStyle}>Correo Institucional</label>
              <input 
                type="email" 
                placeholder="usuario@colegio.com" 
                style={inputStyle} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div style={{ textAlign: 'left' }}>
              <label style={labelStyle}>Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                style={inputStyle} 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            {!isLogin && (
              <div style={{ textAlign: 'left' }}>
                <label style={{...labelStyle, color: '#ffcc00'}}>Código Docente (Requerido)</label>
                <input 
                  type="text" 
                  placeholder="Ingrese el código de seguridad" 
                  style={{...inputStyle, border: '1px solid #ffcc00'}} 
                  onChange={(e) => setFormData({...formData, codigoDocente: e.target.value})}
                  required
                />
              </div>
            )}

            <button type="submit" style={btnSubmitStyle}>
              {isLogin ? 'ACCEDER AL PANEL' : 'FINALIZAR REGISTRO'}
            </button>
          </form>

          {isLogin && (
            <p style={{ marginTop: '20px', color: '#9ca3af', fontSize: '0.85rem' }}>
              ¿Olvidó sus credenciales? Contacte a soporte técnico.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

// Estilos adicionales
const backButtonStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: '600',
  opacity: 0.7,
  transition: '0.3s',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const glassCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(20px)',
  padding: '3rem 2rem',
  borderRadius: '35px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
  textAlign: 'center'
};

const tabContainerStyle: React.CSSProperties = {
  display: 'flex', 
  marginBottom: '2rem', 
  background: 'rgba(0,0,0,0.3)', 
  borderRadius: '15px', 
  padding: '4px'
};

const tabButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '10px',
  border: 'none',
  borderRadius: '12px',
  fontSize: '0.85rem',
  fontWeight: '800',
  cursor: 'pointer',
  transition: '0.3s'
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: '900',
  color: 'white',
  marginBottom: '2rem',
  letterSpacing: '1px'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: COLORES.principal,
  fontSize: '0.75rem',
  fontWeight: 'bold',
  marginBottom: '6px',
  marginLeft: '5px'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(0, 0, 0, 0.3)',
  color: 'white',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const btnSubmitStyle: React.CSSProperties = {
  marginTop: '1rem',
  padding: '1.1rem',
  borderRadius: '12px',
  border: 'none',
  background: COLORES.principal,
  color: '#1a2e26',
  fontWeight: '900',
  fontSize: '0.9rem',
  cursor: 'pointer',
  boxShadow: '0 10px 20px rgba(0, 187, 126, 0.2)',
  textTransform: 'uppercase'
};

export default TeacherAuthPage;