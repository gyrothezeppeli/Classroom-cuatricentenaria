"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const COLORES = {
  principal: '#00BB7E',
  oscuro: '#102d22',
  acento: '#064E3B',
  sandBorder: 'rgba(92, 117, 100, 0.5)',
  deepBg: '#1a2e26',
  textLight: '#f3f4f6'
};

const GRADOS_PRIMARIA = ['1er grado', '2do grado', '3er grado', '4to grado', '5to grado', '6to grado'];
const SECCIONES = ['A', 'B', 'C'];

const getKey = (grado: string, seccion: string): string => `${grado}_${seccion}`;

const ClassroomPage: React.FC = () => {
  const [gradoActual, setGradoActual] = useState<string>('1er grado');
  const [seccionActual, setSeccionActual] = useState<string>('A');
  const [seccionActiva, setSeccionActiva] = useState('tareas');

  const [tareas, setTareas] = useState<any[]>([]);
  const [avisos, setAvisos] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [guias, setGuias] = useState<any[]>([]);
  const [planEvaluacion, setPlanEvaluacion] = useState<any[]>([]);

  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fechaEntrega: '', materia: '' });
  const [nuevoAviso, setNuevoAviso] = useState({ titulo: '', mensaje: '', importante: false });
  const [nuevoMaterial, setNuevoMaterial] = useState({ titulo: '', tipo: 'material', archivo: '', materia: '' });

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
  useEffect(() => { localStorage.setItem(`avisos_${currentKey}`, JSON.stringify(avisos)); }, [avisos, currentKey]);
  useEffect(() => { localStorage.setItem(`materiales_${currentKey}`, JSON.stringify(materiales)); }, [materiales, currentKey]);

  const agregarTarea = () => {
    if (!nuevaTarea.titulo || !nuevaTarea.fechaEntrega) return;
    setTareas([...tareas, { ...nuevaTarea, id: Date.now(), completado: false }]);
    setNuevaTarea({ titulo: '', descripcion: '', fechaEntrega: '', materia: '' });
  };

  const agregarAviso = () => {
    if (!nuevoAviso.titulo || !nuevoAviso.mensaje) return;
    setAvisos([...avisos, { ...nuevoAviso, id: Date.now(), fecha: new Date().toLocaleDateString() }]);
    setNuevoAviso({ titulo: '', mensaje: '', importante: false });
  };

  const eliminarElemento = (id: number, tipo: string) => {
    if (!confirm('¿Seguro que desea eliminar este registro?')) return;
    if (tipo === 'tarea') setTareas(tareas.filter(t => t.id !== id));
    if (tipo === 'aviso') setAvisos(avisos.filter(a => a.id !== id));
    if (tipo === 'material') setMateriales(materiales.filter(m => m.id !== id));
  };

  return (
    <div style={{ 
      fontFamily: "'Montserrat', sans-serif", 
      background: COLORES.deepBg, 
      minHeight: '100vh', 
      color: 'white',
      backgroundImage: 'radial-gradient(circle at top right, rgba(0, 187, 126, 0.05), transparent)',
    }}>
      
      <nav style={{ 
        background: 'rgba(16, 45, 34, 0.8)', 
        backdropFilter: 'blur(10px)',
        padding: '1.2rem 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: `1px solid ${COLORES.sandBorder}`,
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <Link href="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '1px' }}>
          U.E CIUDAD CUATRICENTENARIA
        </Link>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select value={gradoActual} onChange={(e) => setGradoActual(e.target.value)} style={selectStyle}>
            {GRADOS_PRIMARIA.map(g => <option key={g} value={g}>{g.toUpperCase()}</option>)}
          </select>
          <select value={seccionActual} onChange={(e) => setSeccionActual(e.target.value)} style={selectStyle}>
            {SECCIONES.map(s => <option key={s} value={s}>SECCIÓN {s}</option>)}
          </select>
        </div>
      </nav>

      <header style={{ padding: '5rem 10% 3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', margin: 0, textTransform: 'uppercase', color: COLORES.principal }}>
          {gradoActual}
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.6, letterSpacing: '3px', marginTop: '10px' }}>
          SECCIÓN {seccionActual} • PRIMARIA
        </p>
      </header>

      <section style={{ padding: '0 10%', marginBottom: '4rem' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          backdropFilter: 'blur(5px)',
          borderRadius: '100px', 
          padding: '0.6rem', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '8px', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          maxWidth: '900px',
          margin: '0 auto',
          flexWrap: 'wrap'
        }}>
          {['tareas', 'avisos', 'materiales', 'guias', 'plan'].map(sec => (
            <button key={sec} onClick={() => setSeccionActiva(sec)} style={{ 
              padding: '0.7rem 1.8rem', 
              borderRadius: '50px', 
              border: 'none', 
              background: seccionActiva === sec ? COLORES.principal : 'transparent',
              color: seccionActiva === sec ? '#1a2e26' : 'white', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              fontSize: '0.75rem',
              letterSpacing: '1px'
            }}>
              {sec.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        
        {seccionActiva === 'tareas' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={formCardStyle}>
              <h3 style={labelStyle}>Nueva Asignación</h3>
              <div style={gridStyle}>
                <input type="text" placeholder="TÍTULO" value={nuevaTarea.titulo} onChange={(e) => setNuevaTarea({...nuevaTarea, titulo: e.target.value})} style={inputStyle} />
                <input type="date" value={nuevaTarea.fechaEntrega} onChange={(e) => setNuevaTarea({...nuevaTarea, fechaEntrega: e.target.value})} style={inputStyle} />
                <input type="text" placeholder="MATERIA" value={nuevaTarea.materia} onChange={(e) => setNuevaTarea({...nuevaTarea, materia: e.target.value})} style={inputStyle} />
                <button onClick={agregarTarea} style={btnPrincipalStyle}>AÑADIR</button>
              </div>
            </div>

            {tareas.map(tarea => (
              <div key={tarea.id} style={itemCardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                  <input type="checkbox" checked={tarea.completado} onChange={() => {}} style={{ width: '20px', height: '20px', accentColor: COLORES.principal }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{tarea.titulo}</h4>
                    <p style={{ margin: '5px 0 0', color: COLORES.principal, fontSize: '0.85rem', fontWeight: '600' }}>
                      {tarea.materia.toUpperCase()} • ENTREGA: {tarea.fechaEntrega}
                    </p>
                  </div>
                </div>
                <button onClick={() => eliminarElemento(tarea.id, 'tarea')} style={btnDangerStyle}>ELIMINAR</button>
              </div>
            ))}
          </div>
        )}

        {seccionActiva === 'avisos' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={formCardStyle}>
              <h3 style={labelStyle}>Publicar Aviso</h3>
              <div style={gridStyle}>
                <input type="text" placeholder="TÍTULO DEL AVISO" value={nuevoAviso.titulo} onChange={(e) => setNuevoAviso({...nuevoAviso, titulo: e.target.value})} style={inputStyle} />
                <input type="text" placeholder="MENSAJE" value={nuevoAviso.mensaje} onChange={(e) => setNuevoAviso({...nuevoAviso, mensaje: e.target.value})} style={inputStyle} />
                <button onClick={agregarAviso} style={btnPrincipalStyle}>PUBLICAR</button>
              </div>
            </div>

            {avisos.map(aviso => (
              <div key={aviso.id} style={itemCardStyle}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{aviso.titulo}</h4>
                  <p style={{ margin: '8px 0', opacity: 0.7, lineHeight: '1.5' }}>{aviso.mensaje}</p>
                  <small style={{ color: COLORES.principal, fontWeight: 'bold' }}>{aviso.fecha}</small>
                </div>
                <button onClick={() => eliminarElemento(aviso.id, 'aviso')} style={btnDangerStyle}>ELIMINAR</button>
              </div>
            ))}
          </div>
        )}

        {seccionActiva === 'plan' && (
          <div style={{...formCardStyle, overflowX: 'auto'}}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', fontSize: '0.7rem', opacity: 0.5, letterSpacing: '2px' }}>
                  <th style={{ padding: '15px' }}>MATERIA</th>
                  <th style={{ padding: '15px' }}>EVALUACIÓN</th>
                  <th style={{ padding: '15px' }}>%</th>
                  <th style={{ padding: '15px' }}>FECHA</th>
                </tr>
              </thead>
              <tbody>
                {planEvaluacion.map(e => (
                  <tr key={e.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{e.materia}</td>
                    <td style={{ padding: '15px', opacity: 0.8 }}>{e.tipoEvaluacion}</td>
                    <td style={{ padding: '15px', color: COLORES.principal, fontWeight: '900' }}>{e.porcentaje}%</td>
                    <td style={{ padding: '15px' }}>{e.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>

      <footer style={{ textAlign: 'center', padding: '4rem', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '2px' }}>
        © 2026 U.E CIUDAD CUATRICENTENARIA
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        select option { background: #102d22; color: white; }
      `}</style>
    </div>
  );
};

const selectStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  borderRadius: '50px',
  background: 'rgba(0, 0, 0, 0.3)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  fontWeight: 'bold',
  fontSize: '0.7rem',
  cursor: 'pointer',
  outline: 'none'
};

const inputStyle: React.CSSProperties = {
  padding: '1.2rem',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  background: 'rgba(0,0,0,0.2)',
  color: 'white',
  fontSize: '0.85rem',
  outline: 'none',
  fontWeight: '600'
};

const labelStyle: React.CSSProperties = {
  marginTop: 0, 
  fontSize: '0.75rem', 
  opacity: 0.5, 
  textTransform: 'uppercase', 
  letterSpacing: '2px'
};

const formCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(15px)',
  padding: '2.5rem',
  borderRadius: '40px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  marginBottom: '2rem',
  boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
};

const itemCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.03)',
  padding: '1.8rem 2.5rem',
  borderRadius: '30px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const btnPrincipalStyle: React.CSSProperties = {
  background: COLORES.principal,
  color: '#1a2e26',
  border: 'none',
  borderRadius: '15px',
  fontWeight: '900',
  cursor: 'pointer',
  padding: '1.2rem',
  fontSize: '0.75rem',
  letterSpacing: '1px'
};

const btnDangerStyle: React.CSSProperties = {
  background: 'transparent',
  color: '#ff4d4d',
  border: '1px solid rgba(255, 77, 77, 0.2)',
  borderRadius: '50px',
  padding: '0.6rem 1.2rem',
  fontSize: '0.65rem',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '12px',
  marginTop: '1.5rem'
};

export default ClassroomPage;