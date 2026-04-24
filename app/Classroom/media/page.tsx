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

const GRADOS_BACHILLERATO = ['1er año', '2do año', '3er año', '4to año', '5to año'];
const SECCIONES = ['A', 'B', 'C'];

const getKey = (grado: string, seccion: string): string => `${grado}_${seccion}`;

const ClassroomPage: React.FC = () => {
  const [gradoActual, setGradoActual] = useState<string>('1er año');
  const [seccionActual, setSeccionActual] = useState<string>('A');
  const [seccionActiva, setSeccionActiva] = useState('tareas');

  const [tareas, setTareas] = useState<any[]>([]);
  const [avisos, setAvisos] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [guias, setGuias] = useState<any[]>([]);
  const [planEvaluacion, setPlanEvaluacion] = useState<any[]>([]);

  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fechaEntrega: '', materia: '' });

  const currentKey = getKey(gradoActual, seccionActual);

  useEffect(() => {
    const cargarDatos = () => {
      const t = localStorage.getItem(`tareas_${currentKey}`);
      setTareas(t ? JSON.parse(t) : []);
      const a = localStorage.getItem(`avisos_${currentKey}`);
      setAvisos(a ? JSON.parse(a) : []);
      const m = localStorage.getItem(`materiales_${currentKey}`);
      setMateriales(m ? JSON.parse(m) : []);
      const g = localStorage.getItem(`guias_${currentKey}`);
      setGuias(g ? JSON.parse(g) : []);
      const p = localStorage.getItem(`plan_${currentKey}`);
      setPlanEvaluacion(p ? JSON.parse(p) : []);
    };
    cargarDatos();
  }, [gradoActual, seccionActual, currentKey]);

  useEffect(() => { localStorage.setItem(`tareas_${currentKey}`, JSON.stringify(tareas)); }, [tareas, currentKey]);

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
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: COLORES.deepBg, minHeight: '100vh', color: 'white' }}>
      
      <nav style={{ background: COLORES.darkBanner, padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${COLORES.sandBorder}` }}>
        <Link href="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem' }}>
          U.E Ciudad Cuatricentenaria
        </Link>
        <div style={{ display: 'flex', gap: '15px' }}>
          <select value={gradoActual} onChange={(e) => setGradoActual(e.target.value)} style={selectStyle}>
            {GRADOS_BACHILLERATO.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select value={seccionActual} onChange={(e) => setSeccionActual(e.target.value)} style={selectStyle}>
            {SECCIONES.map(s => <option key={s} value={s}>Sección {s}</option>)}
          </select>
        </div>
      </nav>

      <header style={{ padding: '4rem 10% 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px', margin: 0, textTransform: 'uppercase' }}>
          {gradoActual}
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Sección {seccionActual} - Educación Media</p>
      </header>

      <section style={{ padding: '0 10%', marginBottom: '3rem' }}>
        <div style={{ background: COLORES.darkBanner, borderRadius: '100px', padding: '0.8rem', display: 'flex', justifyContent: 'center', gap: '10px', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
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

            {tareas.map(tarea => (
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
            ))}
          </div>
        )}

        {seccionActiva === 'plan' && (
          <div style={formCardStyle}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.1rem' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${COLORES.sandBorder}`, textAlign: 'left' }}>
                  <th style={{ padding: '15px' }}>Materia</th>
                  <th style={{ padding: '15px' }}>Tipo</th>
                  <th style={{ padding: '15px' }}>Porcentaje</th>
                  <th style={{ padding: '15px' }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {planEvaluacion.length > 0 ? planEvaluacion.map(e => (
                  <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '15px' }}>{e.materia}</td>
                    <td style={{ padding: '15px' }}>{e.tipoEvaluacion}</td>
                    <td style={{ padding: '15px', color: COLORES.principal, fontWeight: 'bold' }}>{e.porcentaje}%</td>
                    <td style={{ padding: '15px' }}>{e.fecha}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} style={{padding: '2rem', textAlign: 'center', opacity: 0.5}}>No hay registros</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </main>

      <footer style={{ textAlign: 'center', padding: '4rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#6b7280' }}>
        U.E Ciudad Cuatricentenaria 2026
      </footer>
    </div>
  );
};

const selectStyle: React.CSSProperties = {
  padding: '0.6rem 1rem',
  borderRadius: '10px',
  background: COLORES.oscuro,
  color: 'white',
  border: `1px solid ${COLORES.sandBorder}`,
  fontWeight: 'bold',
  cursor: 'pointer'
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