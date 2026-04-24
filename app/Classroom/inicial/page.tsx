"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const COLORES = {
  principal: '#00BB7E',
  oscuro: '#102d22',
  acento: '#064E3B',
  sandBorder: '#5c7564',
  deepBg: '#1a2e26',
  darkBanner: 'linear-gradient(160deg, #102d22 0%, #081a14 100%)',
  textLight: '#f3f4f6'
};

// Se eliminó Maternal y el resto de niveles, dejando solo Preescolar
const NIVELES_INICIAL = ['Preescolar'];
const SECCIONES = ['A', 'B', 'C'];

const getKey = (nivel: string, seccion: string): string => `${nivel}_${seccion}`;

const ClassroomPage: React.FC = () => {
  const [nivelActual, setNivelActual] = useState<string>('Preescolar');
  const [seccionActual, setSeccionActual] = useState<string>('A');
  const [seccionActiva, setSeccionActiva] = useState('tareas');

  const [tareas, setTareas] = useState<any[]>([]);
  const [avisos, setAvisos] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [guias, setGuias] = useState<any[]>([]);
  const [planEvaluacion, setPlanEvaluacion] = useState<any[]>([]);

  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fechaEntrega: '', materia: '' });

  const currentKey = getKey(nivelActual, seccionActual);

  useEffect(() => {
    const cargarDatos = () => {
      const storedTareas = localStorage.getItem(`tareas_${currentKey}`);
      setTareas(storedTareas ? JSON.parse(storedTareas) : []);

      const avisosStored = localStorage.getItem(`avisos_${currentKey}`);
      setAvisos(avisosStored ? JSON.parse(avisosStored) : []);

      const materialesStored = localStorage.getItem(`materiales_${currentKey}`);
      setMateriales(materialesStored ? JSON.parse(materialesStored) : []);

      const guiasStored = localStorage.getItem(`guias_${currentKey}`);
      setGuias(guiasStored ? JSON.parse(guiasStored) : []);

      const planStored = localStorage.getItem(`plan_${currentKey}`);
      setPlanEvaluacion(planStored ? JSON.parse(planStored) : []);
    };
    cargarDatos();
  }, [nivelActual, seccionActual, currentKey]);

  useEffect(() => { localStorage.setItem(`tareas_${currentKey}`, JSON.stringify(tareas)); }, [tareas, currentKey]);
  useEffect(() => { localStorage.setItem(`avisos_${currentKey}`, JSON.stringify(avisos)); }, [avisos, currentKey]);
  useEffect(() => { localStorage.setItem(`materiales_${currentKey}`, JSON.stringify(materiales)); }, [materiales, currentKey]);
  useEffect(() => { localStorage.setItem(`guias_${currentKey}`, JSON.stringify(guias)); }, [guias, currentKey]);
  useEffect(() => { localStorage.setItem(`plan_${currentKey}`, JSON.stringify(planEvaluacion)); }, [planEvaluacion, currentKey]);

  const agregarTarea = () => {
    if (!nuevaTarea.titulo || !nuevaTarea.fechaEntrega) return;
    setTareas([...tareas, { ...nuevaTarea, id: Date.now(), completado: false }]);
    setNuevaTarea({ titulo: '', descripcion: '', fechaEntrega: '', materia: '' });
  };

  const toggleTarea = (id: number) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completado: !t.completado } : t));
  };

  const eliminarElemento = (id: number, tipo: string) => {
    if (!confirm('¿Seguro que desea eliminar este registro?')) return;
    if (tipo === 'tarea') setTareas(tareas.filter(t => t.id !== id));
    if (tipo === 'aviso') setAvisos(avisos.filter(a => a.id !== id));
    if (tipo === 'material') setMateriales(materiales.filter(m => m.id !== id));
    if (tipo === 'guia') setGuias(guias.filter(g => g.id !== id));
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: COLORES.deepBg, minHeight: '100vh', color: 'white' }}>
      
      <nav style={{ background: COLORES.darkBanner, padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${COLORES.sandBorder}` }}>
        <Link href="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem' }}>
          U.E Ciudad Cuatricentenaria
        </Link>
        <div style={{ display: 'flex', gap: '15px' }}>
          {/* El selector ahora solo tiene "Preescolar" */}
          <select value={nivelActual} onChange={(e) => setNivelActual(e.target.value)} style={selectStyle}>
            {NIVELES_INICIAL.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <select value={seccionActual} onChange={(e) => setSeccionActual(e.target.value)} style={selectStyle}>
            {SECCIONES.map(s => <option key={s} value={s}>Sección {s}</option>)}
          </select>
        </div>
      </nav>

      <header style={{ padding: '4rem 10% 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px', margin: 0, textTransform: 'uppercase' }}>
          {nivelActual}
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Sección {seccionActual} - Educación Inicial</p>
      </header>

      <section style={{ padding: '0 10%', marginBottom: '3rem' }}>
        <div style={{ background: COLORES.darkBanner, borderRadius: '100px', padding: '1rem', display: 'flex', justifyContent: 'center', gap: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
          {['tareas', 'avisos', 'materiales', 'guias', 'plan'].map(sec => (
            <button key={sec} onClick={() => setSeccionActiva(sec)} style={{ 
              padding: '0.8rem 1.5rem', borderRadius: '50px', border: 'none', 
              background: seccionActiva === sec ? COLORES.principal : 'transparent',
              color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s'
            }}>
              {sec.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        
        {seccionActiva === 'tareas' && (
          <div>
            <div style={formCardStyle}>
              <h3 style={{ marginTop: 0 }}>Nueva Tarea</h3>
              <div style={gridStyle}>
                <input type="text" placeholder="Título" value={nuevaTarea.titulo} onChange={(e) => setNuevaTarea({...nuevaTarea, titulo: e.target.value})} style={inputStyle} />
                <input type="date" value={nuevaTarea.fechaEntrega} onChange={(e) => setNuevaTarea({...nuevaTarea, fechaEntrega: e.target.value})} style={inputStyle} />
                <input type="text" placeholder="Materia" value={nuevaTarea.materia} onChange={(e) => setNuevaTarea({...nuevaTarea, materia: e.target.value})} style={inputStyle} />
                <button onClick={agregarTarea} style={btnPrincipalStyle}>Añadir</button>
              </div>
            </div>

            {tareas.length > 0 ? tareas.map(tarea => (
              <div key={tarea.id} style={itemCardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <input type="checkbox" checked={tarea.completado} onChange={() => toggleTarea(tarea.id)} style={{ width: '25px', height: '25px' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.3rem', textDecoration: tarea.completado ? 'line-through' : 'none' }}>{tarea.titulo}</h4>
                    <p style={{ margin: '5px 0 0', color: '#9ca3af' }}>{tarea.materia} - Entrega: {tarea.fechaEntrega}</p>
                  </div>
                </div>
                <button onClick={() => eliminarElemento(tarea.id, 'tarea')} style={btnDangerStyle}>Eliminar</button>
              </div>
            )) : <p style={{textAlign: 'center', opacity: 0.5}}>No hay tareas registradas para esta sección.</p>}
          </div>
        )}

        {/* ... (resto de las secciones se mantienen igual) */}

      </main>

      <footer style={{ textAlign: 'center', padding: '4rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#6b7280' }}>
        U.E Ciudad Cuatricentenaria © 2026
      </footer>
    </div>
  );
};

const selectStyle: React.CSSProperties = {
  padding: '0.6rem 1rem',
  borderRadius: '10px',
  background: '#102d22',
  color: 'white',
  border: '1px solid #5c7564',
  fontWeight: 'bold',
  cursor: 'pointer',
  appearance: 'none' // Para un look más limpio
};

const inputStyle: React.CSSProperties = {
  padding: '1rem',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(0,0,0,0.2)',
  color: 'white',
  fontSize: '1rem'
};

const formCardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  padding: '2.5rem',
  borderRadius: '30px',
  border: '1px solid rgba(255,255,255,0.08)',
  marginBottom: '2rem'
};

const itemCardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)',
  padding: '1.5rem 2rem',
  borderRadius: '20px',
  border: '1px solid rgba(255,255,255,0.05)',
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const btnPrincipalStyle: React.CSSProperties = {
  background: COLORES.principal,
  color: '#1a2e26',
  border: 'none',
  borderRadius: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  padding: '1rem'
};

const btnDangerStyle: React.CSSProperties = {
  background: 'rgba(220, 53, 69, 0.2)',
  color: '#ff4d4d',
  border: '1px solid #ff4d4d',
  borderRadius: '10px',
  padding: '0.5rem 1rem',
  cursor: 'pointer'
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '15px'
};

export default ClassroomPage;