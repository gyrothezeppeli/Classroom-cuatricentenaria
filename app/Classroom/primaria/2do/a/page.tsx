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

// Fijo para 2do grado, Seccion A
const GRADO_ACTUAL = '2do grado';
const SECCION_ACTUAL = 'A';

const getKey = (): string => `${GRADO_ACTUAL}_${SECCION_ACTUAL}`;

const ClassroomPage: React.FC = () => {
  const [seccionActiva, setSeccionActiva] = useState('tareas');

  const [tareas, setTareas] = useState<any[]>([]);
  const [avisos, setAvisos] = useState<any[]>([]);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [guias, setGuias] = useState<any[]>([]);
  const [planEvaluacion, setPlanEvaluacion] = useState<any[]>([]);

  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fechaEntrega: '', materia: '' });
  const [nuevoAviso, setNuevoAviso] = useState({ titulo: '', mensaje: '', importante: false });
  const [nuevoMaterial, setNuevoMaterial] = useState({ titulo: '', tipo: 'material', archivo: '', materia: '' });
  const [nuevaGuia, setNuevaGuia] = useState({ titulo: '', descripcion: '', materia: '', archivo: '' });
  const [nuevoPlan, setNuevoPlan] = useState({ materia: '', tipoEvaluacion: '', porcentaje: '', fecha: '' });

  const currentKey = getKey();

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
  }, [currentKey]);

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

  const agregarAviso = () => {
    if (!nuevoAviso.titulo || !nuevoAviso.mensaje) return;
    setAvisos([...avisos, { ...nuevoAviso, id: Date.now(), fecha: new Date().toLocaleDateString() }]);
    setNuevoAviso({ titulo: '', mensaje: '', importante: false });
  };

  const agregarMaterial = () => {
    if (!nuevoMaterial.titulo) return;
    setMateriales([...materiales, { ...nuevoMaterial, id: Date.now(), fecha: new Date().toLocaleDateString() }]);
    setNuevoMaterial({ titulo: '', tipo: 'material', archivo: '', materia: '' });
  };

  const agregarGuia = () => {
    if (!nuevaGuia.titulo) return;
    setGuias([...guias, { ...nuevaGuia, id: Date.now(), fecha: new Date().toLocaleDateString() }]);
    setNuevaGuia({ titulo: '', descripcion: '', materia: '', archivo: '' });
  };

  const agregarPlan = () => {
    if (!nuevoPlan.materia || !nuevoPlan.tipoEvaluacion) return;
    setPlanEvaluacion([...planEvaluacion, { ...nuevoPlan, id: Date.now() }]);
    setNuevoPlan({ materia: '', tipoEvaluacion: '', porcentaje: '', fecha: '' });
  };

  const eliminarElemento = (id: number, tipo: string) => {
    if (!confirm('¿Seguro que desea eliminar este registro?')) return;
    if (tipo === 'tarea') setTareas(tareas.filter(t => t.id !== id));
    if (tipo === 'aviso') setAvisos(avisos.filter(a => a.id !== id));
    if (tipo === 'material') setMateriales(materiales.filter(m => m.id !== id));
    if (tipo === 'guia') setGuias(guias.filter(g => g.id !== id));
    if (tipo === 'plan') setPlanEvaluacion(planEvaluacion.filter(p => p.id !== id));
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
        zIndex: 100,
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <Link href="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '1px' }}>
          U.E CIUDAD CUATRICENTENARIA
        </Link>
        <div style={{ 
          background: 'rgba(0, 187, 126, 0.15)', 
          padding: '0.5rem 1.2rem', 
          borderRadius: '50px',
          border: `1px solid ${COLORES.principal}`,
          fontSize: '0.8rem',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          {GRADO_ACTUAL.toUpperCase()} - SECCION {SECCION_ACTUAL}
        </div>
      </nav>

      <header style={{ padding: '5rem 10% 3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', margin: 0, textTransform: 'uppercase', color: COLORES.principal }}>
          2DO GRADO
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.6, letterSpacing: '3px', marginTop: '10px' }}>
          SECCION A • EDUCACION PRIMARIA
        </p>
        <div style={{ 
          marginTop: '1.5rem', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <span style={infoBadge}>Docente: Ana Martínez</span>
          <span style={infoBadge}>Año Escolar: 2025-2026</span>
          <span style={infoBadge}>Horario: 7:00 AM - 12:00 PM</span>
          <span style={infoBadge}>28 Estudiantes</span>
        </div>
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
          {[
            { id: 'tareas', label: 'TAREAS' },
            { id: 'avisos', label: 'AVISOS' },
            { id: 'materiales', label: 'MATERIALES' },
            { id: 'guias', label: 'GUIAS' },
            { id: 'plan', label: 'PLAN EVALUACION' }
          ].map(sec => (
            <button key={sec.id} onClick={() => setSeccionActiva(sec.id)} style={{ 
              padding: '0.7rem 1.5rem', 
              borderRadius: '50px', 
              border: 'none', 
              background: seccionActiva === sec.id ? COLORES.principal : 'transparent',
              color: seccionActiva === sec.id ? '#1a2e26' : 'white', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              fontSize: '0.7rem',
              letterSpacing: '1px'
            }}>
              {sec.label}
            </button>
          ))}
        </div>
      </section>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        
        {seccionActiva === 'tareas' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={formCardStyle}>
              <h3 style={labelStyle}>Nueva Asignacion - 2do A</h3>
              <div style={gridStyle}>
                <input 
                  type="text" 
                  placeholder="TITULO DE LA TAREA" 
                  value={nuevaTarea.titulo} 
                  onChange={(e) => setNuevaTarea({...nuevaTarea, titulo: e.target.value})} 
                  style={inputStyle} 
                />
                <input 
                  type="text" 
                  placeholder="MATERIA" 
                  value={nuevaTarea.materia} 
                  onChange={(e) => setNuevaTarea({...nuevaTarea, materia: e.target.value})} 
                  style={inputStyle} 
                />
                <input 
                  type="date" 
                  value={nuevaTarea.fechaEntrega} 
                  onChange={(e) => setNuevaTarea({...nuevaTarea, fechaEntrega: e.target.value})} 
                  style={inputStyle} 
                />
                <textarea 
                  placeholder="DESCRIPCION" 
                  value={nuevaTarea.descripcion} 
                  onChange={(e) => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})} 
                  style={{...inputStyle, gridColumn: '1/-1'}} 
                  rows={2} 
                />
                <button onClick={agregarTarea} style={btnPrincipalStyle}>AGREGAR TAREA</button>
              </div>
            </div>

            {tareas.length === 0 && (
              <div style={emptyStateStyle}>
                <p>No hay tareas asignadas para 2do A</p>
                <small>Agrega la primera tarea usando el formulario</small>
              </div>
            )}
            
            {tareas.map(tarea => (
              <div key={tarea.id} style={itemCardStyle}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    <input 
                      type="checkbox" 
                      checked={tarea.completado} 
                      onChange={() => {
                        setTareas(tareas.map(t => t.id === tarea.id ? {...t, completado: !t.completado} : t));
                      }} 
                      style={{ width: '22px', height: '22px', accentColor: COLORES.principal, cursor: 'pointer' }} 
                    />
                    <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700', textDecoration: tarea.completado ? 'line-through' : 'none', opacity: tarea.completado ? 0.6 : 1 }}>
                      {tarea.titulo}
                    </h4>
                    {tarea.materia && <span style={badgeStyle}>{tarea.materia}</span>}
                  </div>
                  {tarea.descripcion && <p style={{ margin: '10px 0 0 37px', opacity: 0.7, fontSize: '0.9rem' }}>{tarea.descripcion}</p>}
                  <p style={{ margin: '8px 0 0 37px', color: COLORES.principal, fontSize: '0.8rem', fontWeight: '600' }}>
                    ENTREGA: {tarea.fechaEntrega}
                  </p>
                </div>
                <button onClick={() => eliminarElemento(tarea.id, 'tarea')} style={btnDangerStyle}>ELIMINAR</button>
              </div>
            ))}
          </div>
        )}

        {seccionActiva === 'avisos' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={formCardStyle}>
              <h3 style={labelStyle}>Publicar Aviso para 2do A</h3>
              <div style={gridStyle}>
                <input 
                  type="text" 
                  placeholder="TITULO DEL AVISO" 
                  value={nuevoAviso.titulo} 
                  onChange={(e) => setNuevoAviso({...nuevoAviso, titulo: e.target.value})} 
                  style={{...inputStyle, gridColumn: '1/-1'}} 
                />
                <textarea 
                  placeholder="MENSAJE DEL AVISO" 
                  value={nuevoAviso.mensaje} 
                  onChange={(e) => setNuevoAviso({...nuevoAviso, mensaje: e.target.value})} 
                  style={{...inputStyle, gridColumn: '1/-1'}} 
                  rows={3} 
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={nuevoAviso.importante} 
                    onChange={(e) => setNuevoAviso({...nuevoAviso, importante: e.target.checked})} 
                  />
                  <span style={{ fontSize: '0.8rem' }}>Marcar como importante</span>
                </label>
                <button onClick={agregarAviso} style={btnPrincipalStyle}>PUBLICAR AVISO</button>
              </div>
            </div>

            {avisos.length === 0 && (
              <div style={emptyStateStyle}>
                <p>No hay avisos publicados para 2do A</p>
                <small>Comparte informacion importante con los padres y estudiantes</small>
              </div>
            )}

            {avisos.map(aviso => (
              <div key={aviso.id} style={{...itemCardStyle, borderLeft: aviso.importante ? `4px solid ${COLORES.principal}` : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '15px' }}>
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>
                      {aviso.importante && 'IMPORTANTE - '}{aviso.titulo}
                    </h4>
                    <small style={{ color: COLORES.principal, fontWeight: 'bold' }}>{aviso.fecha}</small>
                  </div>
                  <p style={{ margin: '12px 0 0', opacity: 0.8, lineHeight: '1.5' }}>{aviso.mensaje}</p>
                </div>
                <button onClick={() => eliminarElemento(aviso.id, 'aviso')} style={btnDangerStyle}>ELIMINAR</button>
              </div>
            ))}
          </div>
        )}

        {seccionActiva === 'materiales' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={formCardStyle}>
              <h3 style={labelStyle}>Agregar Material de Estudio - 2do A</h3>
              <div style={gridStyle}>
                <input 
                  type="text" 
                  placeholder="TITULO DEL MATERIAL" 
                  value={nuevoMaterial.titulo} 
                  onChange={(e) => setNuevoMaterial({...nuevoMaterial, titulo: e.target.value})} 
                  style={inputStyle} 
                />
                <input 
                  type="text" 
                  placeholder="MATERIA" 
                  value={nuevoMaterial.materia} 
                  onChange={(e) => setNuevoMaterial({...nuevoMaterial, materia: e.target.value})} 
                  style={inputStyle} 
                />
                <select 
                  value={nuevoMaterial.tipo} 
                  onChange={(e) => setNuevoMaterial({...nuevoMaterial, tipo: e.target.value})} 
                  style={inputStyle}
                >
                  <option value="material">Material de lectura</option>
                  <option value="video">Video educativo</option>
                  <option value="ejercicio">Ejercicios practicos</option>
                  <option value="recurso">Recurso externo</option>
                </select>
                <input 
                  type="text" 
                  placeholder="ENLACE / REFERENCIA" 
                  value={nuevoMaterial.archivo} 
                  onChange={(e) => setNuevoMaterial({...nuevoMaterial, archivo: e.target.value})} 
                  style={inputStyle} 
                />
                <button onClick={agregarMaterial} style={btnPrincipalStyle}>AGREGAR MATERIAL</button>
              </div>
            </div>

            {materiales.length === 0 && (
              <div style={emptyStateStyle}>
                <p>No hay materiales disponibles para 2do A</p>
                <small>Comparte recursos educativos con tus estudiantes</small>
              </div>
            )}

            <div style={{ display: 'grid', gap: '1rem' }}>
              {materiales.map(material => (
                <div key={material.id} style={itemCardStyle}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {material.tipo === 'video' ? 'VIDEO' : material.tipo === 'ejercicio' ? 'EJERCICIO' : material.tipo === 'recurso' ? 'RECURSO' : 'MATERIAL'}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{material.titulo}</h4>
                      {material.materia && <span style={badgeStyle}>{material.materia}</span>}
                    </div>
                    {material.archivo && (
                      <p style={{ margin: '8px 0 0 0px', fontSize: '0.8rem', opacity: 0.6 }}>
                        ENLACE: {material.archivo}
                      </p>
                    )}
                    <small style={{ margin: '5px 0 0 0px', display: 'block', color: COLORES.principal }}>
                      Agregado: {material.fecha}
                    </small>
                  </div>
                  <button onClick={() => eliminarElemento(material.id, 'material')} style={btnDangerStyle}>ELIMINAR</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {seccionActiva === 'guias' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={formCardStyle}>
              <h3 style={labelStyle}>Agregar Guia de Estudio - 2do A</h3>
              <div style={gridStyle}>
                <input 
                  type="text" 
                  placeholder="TITULO DE LA GUIA" 
                  value={nuevaGuia.titulo} 
                  onChange={(e) => setNuevaGuia({...nuevaGuia, titulo: e.target.value})} 
                  style={{...inputStyle, gridColumn: '1/-1'}} 
                />
                <input 
                  type="text" 
                  placeholder="MATERIA" 
                  value={nuevaGuia.materia} 
                  onChange={(e) => setNuevaGuia({...nuevaGuia, materia: e.target.value})} 
                  style={inputStyle} 
                />
                <input 
                  type="text" 
                  placeholder="ENLACE / DESCARGA" 
                  value={nuevaGuia.archivo} 
                  onChange={(e) => setNuevaGuia({...nuevaGuia, archivo: e.target.value})} 
                  style={inputStyle} 
                />
                <textarea 
                  placeholder="DESCRIPCION DE LA GUIA" 
                  value={nuevaGuia.descripcion} 
                  onChange={(e) => setNuevaGuia({...nuevaGuia, descripcion: e.target.value})} 
                  style={{...inputStyle, gridColumn: '1/-1'}} 
                  rows={2} 
                />
                <button onClick={agregarGuia} style={btnPrincipalStyle}>AGREGAR GUIA</button>
              </div>
            </div>

            {guias.length === 0 && (
              <div style={emptyStateStyle}>
                <p>No hay guias de estudio disponibles para 2do A</p>
                <small>Comparte guias para apoyar el aprendizaje</small>
              </div>
            )}

            {guias.map(guia => (
              <div key={guia.id} style={itemCardStyle}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>GUIA</span>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{guia.titulo}</h4>
                    {guia.materia && <span style={badgeStyle}>{guia.materia}</span>}
                  </div>
                  {guia.descripcion && <p style={{ margin: '8px 0 0 0px', opacity: 0.7 }}>{guia.descripcion}</p>}
                  {guia.archivo && (
                    <p style={{ margin: '5px 0 0 0px', fontSize: '0.8rem' }}>
                      <a href={guia.archivo} target="_blank" rel="noopener noreferrer" style={{ color: COLORES.principal, textDecoration: 'none' }}>Ver/Descargar Guia</a>
                    </p>
                  )}
                  <small style={{ margin: '5px 0 0 0px', display: 'block', color: COLORES.principal }}>{guia.fecha}</small>
                </div>
                <button onClick={() => eliminarElemento(guia.id, 'guia')} style={btnDangerStyle}>ELIMINAR</button>
              </div>
            ))}
          </div>
        )}

        {seccionActiva === 'plan' && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={formCardStyle}>
              <h3 style={labelStyle}>Plan de Evaluacion - 2do Grado A</h3>
              <div style={gridStyle}>
                <input 
                  type="text" 
                  placeholder="MATERIA" 
                  value={nuevoPlan.materia} 
                  onChange={(e) => setNuevoPlan({...nuevoPlan, materia: e.target.value})} 
                  style={inputStyle} 
                />
                <input 
                  type="text" 
                  placeholder="TIPO DE EVALUACION" 
                  value={nuevoPlan.tipoEvaluacion} 
                  onChange={(e) => setNuevoPlan({...nuevoPlan, tipoEvaluacion: e.target.value})} 
                  style={inputStyle} 
                />
                <input 
                  type="number" 
                  placeholder="PORCENTAJE" 
                  value={nuevoPlan.porcentaje} 
                  onChange={(e) => setNuevoPlan({...nuevoPlan, porcentaje: e.target.value})} 
                  style={inputStyle} 
                />
                <input 
                  type="date" 
                  placeholder="FECHA" 
                  value={nuevoPlan.fecha} 
                  onChange={(e) => setNuevoPlan({...nuevoPlan, fecha: e.target.value})} 
                  style={inputStyle} 
                />
                <button onClick={agregarPlan} style={btnPrincipalStyle}>AGREGAR EVALUACION</button>
              </div>
            </div>

            {planEvaluacion.length === 0 ? (
              <div style={emptyStateStyle}>
                <p>No hay evaluaciones registradas para 2do A</p>
                <small>Completa el plan de evaluacion del periodo</small>
              </div>
            ) : (
              <div style={{...formCardStyle, overflowX: 'auto', padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', fontSize: '0.7rem', opacity: 0.5, letterSpacing: '2px', borderBottom: `1px solid ${COLORES.sandBorder}` }}>
                      <th style={{ padding: '20px 15px' }}>MATERIA</th>
                      <th style={{ padding: '20px 15px' }}>EVALUACION</th>
                      <th style={{ padding: '20px 15px' }}>%</th>
                      <th style={{ padding: '20px 15px' }}>FECHA</th>
                      <th style={{ padding: '20px 15px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {planEvaluacion.map(e => (
                      <tr key={e.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '15px', fontWeight: 'bold' }}>{e.materia}</td>
                        <td style={{ padding: '15px', opacity: 0.8 }}>{e.tipoEvaluacion}</td>
                        <td style={{ padding: '15px', color: COLORES.principal, fontWeight: '900' }}>{e.porcentaje}%</td>
                        <td style={{ padding: '15px' }}>{e.fecha || 'Por definir'}</td>
                        <td style={{ padding: '15px' }}>
                          <button onClick={() => eliminarElemento(e.id, 'plan')} style={{...btnDangerStyle, padding: '0.3rem 0.8rem' }}>ELIMINAR</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>

      <footer style={{ textAlign: 'center', padding: '4rem', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '2px' }}>
        <p>2026 U.E CIUDAD CUATRICENTENARIA - 2do Grado - Seccion A</p>
        <p style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>Plataforma educativa - Todos los derechos reservados</p>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        select option { background: #102d22; color: white; }
        * {
          box-sizing: border-box;
        }
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
  padding: '1rem 1.2rem',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  background: 'rgba(0,0,0,0.2)',
  color: 'white',
  fontSize: '0.85rem',
  outline: 'none',
  fontWeight: '600',
  fontFamily: 'inherit'
};

const labelStyle: React.CSSProperties = {
  marginTop: 0, 
  fontSize: '0.75rem', 
  opacity: 0.5, 
  textTransform: 'uppercase', 
  letterSpacing: '2px',
  marginBottom: '1rem'
};

const formCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(15px)',
  padding: '2rem',
  borderRadius: '30px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  marginBottom: '2rem',
  boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
};

const itemCardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.03)',
  padding: '1.5rem',
  borderRadius: '25px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '15px',
  flexWrap: 'wrap'
};

const btnPrincipalStyle: React.CSSProperties = {
  background: COLORES.principal,
  color: '#1a2e26',
  border: 'none',
  borderRadius: '15px',
  fontWeight: '800',
  cursor: 'pointer',
  padding: '1rem',
  fontSize: '0.75rem',
  letterSpacing: '1px',
  transition: 'all 0.3s ease'
};

const btnDangerStyle: React.CSSProperties = {
  background: 'transparent',
  color: '#ff4d4d',
  border: '1px solid rgba(255, 77, 77, 0.3)',
  borderRadius: '12px',
  padding: '0.5rem 1rem',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const badgeStyle: React.CSSProperties = {
  background: 'rgba(0, 187, 126, 0.2)',
  color: COLORES.principal,
  padding: '3px 10px',
  borderRadius: '50px',
  fontSize: '0.7rem',
  fontWeight: 'bold'
};

const emptyStateStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '3rem',
  opacity: 0.6,
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: '30px',
  margin: '2rem 0'
};

const infoBadge: React.CSSProperties = {
  background: 'rgba(0, 187, 126, 0.15)',
  padding: '0.4rem 1rem',
  borderRadius: '50px',
  fontSize: '0.75rem',
  border: '1px solid rgba(0, 187, 126, 0.3)'
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '12px',
  marginTop: '1rem'
};

export default ClassroomPage;