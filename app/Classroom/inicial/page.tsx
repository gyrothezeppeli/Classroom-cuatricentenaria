"use client";

import React, { useState, useEffect } from 'react';

// ============================================
// 📁 ARCHIVO DE CONFIGURACIÓN FÁCIL DE EDITAR
// ============================================

// 🎨 COLORES (Puedes cambiarlos aquí)
const COLORES = {
  principal: '#00BB7E',
  oscuro: '#083344',
  acento: '#064E3B',
  fondo: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
};

// 📚 NIVELES DE EDUCACIÓN INICIAL (Edita aquí para agregar/quitar niveles)
const NIVELES_INICIAL = ['Maternal', 'Pre-kínder', 'Kínder', 'Preparatorio'];

// 🔤 SECCIONES (Edita aquí)
const SECCIONES = ['A', 'B', 'C'];

// ============================================
// 📦 INTERFACES (No necesitas modificar esto)
// ============================================

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaEntrega: string;
  materia: string;
  completado: boolean;
}

interface Aviso {
  id: number;
  titulo: string;
  mensaje: string;
  fecha: string;
  importante: boolean;
}

interface Material {
  id: number;
  titulo: string;
  tipo: 'guia' | 'material' | 'recurso';
  archivo: string;
  materia: string;
}

interface GuiaEscolar {
  id: number;
  titulo: string;
  descripcion: string;
  nivel: string;
  grado: string;
  materia: string;
  pdfUrl: string;
}

interface PlanEvaluacion {
  id: number;
  periodo: string;
  materia: string;
  tipoEvaluacion: string;
  porcentaje: number;
  fecha: string;
}

// ============================================
// 📝 DATOS INICIALES (Edita aquí para cambiar ejemplos)
// ============================================

const TAREAS_INICIALES: Record<string, Tarea[]> = {
  'Maternal': [
    { id: 1, titulo: "Dibujo libre", descripcion: "Dibujar lo que más le gusta", fechaEntrega: "2026-04-21", materia: "Arte", completado: false },
    { id: 2, titulo: "Canción de bienvenida", descripcion: "Aprender canción", fechaEntrega: "2026-04-22", materia: "Música", completado: false }
  ],
  'Pre-kínder': [
    { id: 1, titulo: "Colorear vocales", descripcion: "Colorear la letra A", fechaEntrega: "2026-04-23", materia: "Lenguaje", completado: false },
    { id: 2, titulo: "Contar hasta 5", descripcion: "Práctica con objetos", fechaEntrega: "2026-04-24", materia: "Matemática", completado: false }
  ],
  'Kínder': [
    { id: 1, titulo: "Mi familia", descripcion: "Dibujar a la familia", fechaEntrega: "2026-04-23", materia: "Personal Social", completado: false },
    { id: 2, titulo: "Figuras geométricas", descripcion: "Identificar círculo y cuadrado", fechaEntrega: "2026-04-25", materia: "Matemática", completado: false }
  ],
  'Preparatorio': [
    { id: 1, titulo: "Escribir nombre", descripcion: "Practicar escritura", fechaEntrega: "2026-04-24", materia: "Lenguaje", completado: false },
    { id: 2, titulo: "Sumas simples", descripcion: "Sumar hasta 10", fechaEntrega: "2026-04-26", materia: "Matemática", completado: false }
  ]
};

const AVISOS_INICIALES: Record<string, any> = {
  'Maternal': { titulo: "Bienvenida", mensaje: "Inicio de adaptación", importante: true },
  'Pre-kínder': { titulo: "Materiales", mensaje: "Traer cartucheras", importante: false },
  'Kínder': { titulo: "Actividades", mensaje: "Preparación para proyecto", importante: true },
  'Preparatorio': { titulo: "Orientación", mensaje: "Reunión de padres", importante: false }
};

const PLAN_EVALUACION_INICIAL: Record<string, PlanEvaluacion[]> = {
  'Maternal': [
    { id: 1, periodo: "I Lapso", materia: "Arte", tipoEvaluacion: "Observación", porcentaje: 30, fecha: "2026-05-15" }
  ],
  'Pre-kínder': [
    { id: 1, periodo: "I Lapso", materia: "Lenguaje", tipoEvaluacion: "Evaluación continua", porcentaje: 35, fecha: "2026-05-16" }
  ],
  'Kínder': [
    { id: 1, periodo: "I Lapso", materia: "Matemática", tipoEvaluacion: "Actividad práctica", porcentaje: 30, fecha: "2026-05-17" }
  ],
  'Preparatorio': [
    { id: 1, periodo: "I Lapso", materia: "Lenguaje", tipoEvaluacion: "Escritura guiada", porcentaje: 40, fecha: "2026-05-19" }
  ]
};

// ============================================
// 🎨 ESTILOS (No necesitas modificar esto)
// ============================================

const LIQUID_GLASS = {
  container: {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(12px) saturate(180%)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
  title: {
    background: `linear-gradient(135deg, ${COLORES.oscuro} 0%, ${COLORES.principal} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
};

const getKey = (nivel: string, seccion: string): string => `${nivel}_${seccion}`;

// ============================================
// 🧩 COMPONENTE PRINCIPAL
// ============================================

const ClassroomPage: React.FC = () => {
  const [nivelActual, setNivelActual] = useState<string>('Maternal');
  const [seccionActual, setSeccionActual] = useState<string>('A');
  const [seccionActiva, setSeccionActiva] = useState('tareas');

  // Estados de datos
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [guias, setGuias] = useState<GuiaEscolar[]>([]);
  const [planEvaluacion, setPlanEvaluacion] = useState<PlanEvaluacion[]>([]);

  // Estados de formularios
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fechaEntrega: '', materia: '' });
  const [nuevoAviso, setNuevoAviso] = useState({ titulo: '', mensaje: '', importante: false });
  const [nuevoMaterial, setNuevoMaterial] = useState({ titulo: '', tipo: 'material' as const, archivo: '', materia: '' });
  const [nuevaGuia, setNuevaGuia] = useState({ titulo: '', descripcion: '', materia: '', pdfUrl: '' });

  const currentKey = getKey(nivelActual, seccionActual);

  // Cargar datos
  useEffect(() => {
    const cargarDatos = () => {
      // Tareas
      const stored = localStorage.getItem(`tareas_${currentKey}`);
      if (stored) setTareas(JSON.parse(stored));
      else setTareas(TAREAS_INICIALES[nivelActual] || []);

      // Avisos
      const avisosStored = localStorage.getItem(`avisos_${currentKey}`);
      if (avisosStored) setAvisos(JSON.parse(avisosStored));
      else if (AVISOS_INICIALES[nivelActual]) {
        setAvisos([{
          id: 1,
          ...AVISOS_INICIALES[nivelActual],
          mensaje: `${AVISOS_INICIALES[nivelActual].mensaje} - Sección ${seccionActual}`,
          fecha: new Date().toISOString().split('T')[0]
        }]);
      } else setAvisos([]);

      // Materiales
      const materialesStored = localStorage.getItem(`materiales_${currentKey}`);
      setMateriales(materialesStored ? JSON.parse(materialesStored) : []);

      // Guías
      const guiasStored = localStorage.getItem(`guias_${currentKey}`);
      setGuias(guiasStored ? JSON.parse(guiasStored) : []);

      // Plan de evaluación
      const planStored = localStorage.getItem(`plan_${currentKey}`);
      setPlanEvaluacion(planStored ? JSON.parse(planStored) : (PLAN_EVALUACION_INICIAL[nivelActual] || []));
    };

    cargarDatos();
  }, [nivelActual, seccionActual, currentKey]);

  // Guardar datos
  useEffect(() => { localStorage.setItem(`tareas_${currentKey}`, JSON.stringify(tareas)); }, [tareas, currentKey]);
  useEffect(() => { localStorage.setItem(`avisos_${currentKey}`, JSON.stringify(avisos)); }, [avisos, currentKey]);
  useEffect(() => { localStorage.setItem(`materiales_${currentKey}`, JSON.stringify(materiales)); }, [materiales, currentKey]);
  useEffect(() => { localStorage.setItem(`guias_${currentKey}`, JSON.stringify(guias)); }, [guias, currentKey]);
  useEffect(() => { localStorage.setItem(`plan_${currentKey}`, JSON.stringify(planEvaluacion)); }, [planEvaluacion, currentKey]);

  // CRUD Tareas
  const agregarTarea = () => {
    if (!nuevaTarea.titulo || !nuevaTarea.fechaEntrega) return;
    setTareas([...tareas, { ...nuevaTarea, id: Date.now(), completado: false, descripcion: nuevaTarea.descripcion || '' }]);
    setNuevaTarea({ titulo: '', descripcion: '', fechaEntrega: '', materia: '' });
  };

  const toggleTarea = (id: number) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completado: !t.completado } : t));
  };

  const eliminarTarea = (id: number) => {
    if (confirm('¿Eliminar tarea?')) setTareas(tareas.filter(t => t.id !== id));
  };

  // CRUD Avisos
  const agregarAviso = () => {
    if (!nuevoAviso.titulo || !nuevoAviso.mensaje) return;
    setAvisos([...avisos, { ...nuevoAviso, id: Date.now(), fecha: new Date().toISOString().split('T')[0] }]);
    setNuevoAviso({ titulo: '', mensaje: '', importante: false });
  };

  const eliminarAviso = (id: number) => {
    if (confirm('¿Eliminar aviso?')) setAvisos(avisos.filter(a => a.id !== id));
  };

  // CRUD Materiales
  const agregarMaterial = () => {
    if (!nuevoMaterial.titulo || !nuevoMaterial.archivo) return;
    setMateriales([...materiales, { ...nuevoMaterial, id: Date.now() }]);
    setNuevoMaterial({ titulo: '', tipo: 'material', archivo: '', materia: '' });
  };

  const eliminarMaterial = (id: number) => {
    if (confirm('¿Eliminar material?')) setMateriales(materiales.filter(m => m.id !== id));
  };

  // CRUD Guías
  const agregarGuia = () => {
    if (!nuevaGuia.titulo || !nuevaGuia.pdfUrl) return;
    setGuias([...guias, { ...nuevaGuia, id: Date.now(), descripcion: nuevaGuia.descripcion || '', nivel: 'Educación Inicial', grado: nivelActual }]);
    setNuevaGuia({ titulo: '', descripcion: '', materia: '', pdfUrl: '' });
  };

  const eliminarGuia = (id: number) => {
    if (confirm('¿Eliminar guía?')) setGuias(guias.filter(g => g.id !== id));
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: COLORES.fondo, minHeight: '100vh' }}>
      {/* Barra de navegación */}
      <nav style={{ background: `linear-gradient(135deg, ${COLORES.oscuro} 0%, ${COLORES.acento} 100%)`, padding: '1rem 0', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ color: 'white', margin: 0 }}>U.E Ciudad Cuatricentenaria - Educación Inicial</h2>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <select value={nivelActual} onChange={(e) => setNivelActual(e.target.value)} style={{ padding: '0.5rem 1rem', borderRadius: '25px', border: 'none', background: COLORES.principal, color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                {NIVELES_INICIAL.map(n => <option key={n}>{n}</option>)}
              </select>
              
              <select value={seccionActual} onChange={(e) => setSeccionActual(e.target.value)} style={{ padding: '0.5rem 1rem', borderRadius: '25px', border: 'none', background: COLORES.oscuro, color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                {SECCIONES.map(s => <option key={s}>Sección {s}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['tareas', 'avisos', 'materiales', 'guias', 'plan'].map(sec => (
                <button key={sec} onClick={() => setSeccionActiva(sec)} style={{ padding: '0.5rem 1rem', borderRadius: '25px', border: 'none', background: seccionActiva === sec ? COLORES.principal : 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                  {sec === 'tareas' && 'Tareas'}
                  {sec === 'avisos' && 'Avisos'}
                  {sec === 'materiales' && 'Materiales'}
                  {sec === 'guias' && 'Guías PDF'}
                  {sec === 'plan' && 'Plan de Evaluación'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Título */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <h2 style={{ ...LIQUID_GLASS.title, fontSize: '1.8rem', margin: 0 }}>
          Educación Inicial - {nivelActual} - Sección {seccionActual}
        </h2>
      </div>

      {/* Contenido principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* SECCIÓN TAREAS */}
        {seccionActiva === 'tareas' && (
          <div>
            <h2 style={{ ...LIQUID_GLASS.title, textAlign: 'center' }}>Mis Tareas</h2>
            
            <div style={{ ...LIQUID_GLASS.container, padding: '1.5rem', marginBottom: '2rem' }}>
              <h4>Nueva Tarea</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <input type="text" placeholder="Título" value={nuevaTarea.titulo} onChange={(e) => setNuevaTarea({...nuevaTarea, titulo: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="Descripción" value={nuevaTarea.descripcion} onChange={(e) => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <input type="date" value={nuevaTarea.fechaEntrega} onChange={(e) => setNuevaTarea({...nuevaTarea, fechaEntrega: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="Materia" value={nuevaTarea.materia} onChange={(e) => setNuevaTarea({...nuevaTarea, materia: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <button onClick={agregarTarea} style={{ background: `linear-gradient(135deg, ${COLORES.principal} 0%, ${COLORES.acento} 100%)`, color: 'white', border: 'none', borderRadius: '10px', padding: '0.5rem', cursor: 'pointer' }}>Agregar</button>
              </div>
            </div>

            {tareas.map(tarea => (
              <div key={tarea.id} style={{ ...LIQUID_GLASS.container, padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input type="checkbox" checked={tarea.completado} onChange={() => toggleTarea(tarea.id)} style={{ width: '20px', height: '20px' }} />
                  <div>
                    <h4 style={{ textDecoration: tarea.completado ? 'line-through' : 'none', margin: 0 }}>{tarea.titulo}</h4>
                    <small>{tarea.descripcion} | {tarea.fechaEntrega} | {tarea.materia}</small>
                  </div>
                </div>
                <button onClick={() => eliminarTarea(tarea.id)} style={{ background: '#dc3545', color: 'white', border: 'none', borderRadius: '10px', padding: '0.25rem 0.75rem', cursor: 'pointer' }}>Eliminar</button>
              </div>
            ))}
            {tareas.length === 0 && <p style={{ textAlign: 'center' }}>No hay tareas</p>}
          </div>
        )}

        {/* SECCIÓN AVISOS */}
        {seccionActiva === 'avisos' && (
          <div>
            <h2 style={{ ...LIQUID_GLASS.title, textAlign: 'center' }}>Avisos</h2>
            
            <div style={{ ...LIQUID_GLASS.container, padding: '1.5rem', marginBottom: '2rem' }}>
              <h4>Nuevo Aviso</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <input type="text" placeholder="Título" value={nuevoAviso.titulo} onChange={(e) => setNuevoAviso({...nuevoAviso, titulo: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="Mensaje" value={nuevoAviso.mensaje} onChange={(e) => setNuevoAviso({...nuevoAviso, mensaje: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <label><input type="checkbox" checked={nuevoAviso.importante} onChange={(e) => setNuevoAviso({...nuevoAviso, importante: e.target.checked})} /> Importante</label>
                <button onClick={agregarAviso} style={{ background: `linear-gradient(135deg, ${COLORES.principal} 0%, ${COLORES.acento} 100%)`, color: 'white', border: 'none', borderRadius: '10px', padding: '0.5rem', cursor: 'pointer' }}>Publicar</button>
              </div>
            </div>

            {avisos.map(aviso => (
              <div key={aviso.id} style={{ ...LIQUID_GLASS.container, padding: '1rem', marginBottom: '1rem', borderLeft: aviso.importante ? `5px solid ${COLORES.principal}` : 'none', position: 'relative' }}>
                <button onClick={() => eliminarAviso(aviso.id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '10px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>X</button>
                <h4>{aviso.titulo}</h4>
                <p>{aviso.mensaje}</p>
                <small>{aviso.fecha}</small>
                {aviso.importante && <span style={{ marginLeft: '1rem', background: COLORES.principal, padding: '0.2rem 0.5rem', borderRadius: '5px', color: 'white' }}>IMPORTANTE</span>}
              </div>
            ))}
          </div>
        )}

        {/* SECCIÓN MATERIALES */}
        {seccionActiva === 'materiales' && (
          <div>
            <h2 style={{ ...LIQUID_GLASS.title, textAlign: 'center' }}>Materiales</h2>
            
            <div style={{ ...LIQUID_GLASS.container, padding: '1.5rem', marginBottom: '2rem' }}>
              <h4>Subir Material</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <input type="text" placeholder="Título" value={nuevoMaterial.titulo} onChange={(e) => setNuevoMaterial({...nuevoMaterial, titulo: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <select value={nuevoMaterial.tipo} onChange={(e) => setNuevoMaterial({...nuevoMaterial, tipo: e.target.value as any})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }}>
                  <option value="guia">Guía</option>
                  <option value="material">Material</option>
                  <option value="recurso">Recurso</option>
                </select>
                <input type="text" placeholder="URL del archivo" value={nuevoMaterial.archivo} onChange={(e) => setNuevoMaterial({...nuevoMaterial, archivo: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="Materia" value={nuevoMaterial.materia} onChange={(e) => setNuevoMaterial({...nuevoMaterial, materia: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <button onClick={agregarMaterial} style={{ background: `linear-gradient(135deg, ${COLORES.principal} 0%, ${COLORES.acento} 100%)`, color: 'white', border: 'none', borderRadius: '10px', padding: '0.5rem', cursor: 'pointer' }}>Subir</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {materiales.map(mat => (
                <div key={mat.id} style={{ ...LIQUID_GLASS.container, padding: '1rem', textAlign: 'center', position: 'relative' }}>
                  <button onClick={() => eliminarMaterial(mat.id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '10px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>X</button>
                  <div style={{ fontSize: '2rem' }}>{mat.tipo === 'guia' ? '📘' : mat.tipo === 'material' ? '📄' : '🔗'}</div>
                  <h4>{mat.titulo}</h4>
                  <p>{mat.materia || 'General'}</p>
                  <a href={mat.archivo} target="_blank" rel="noopener noreferrer" style={{ background: `linear-gradient(135deg, ${COLORES.principal} 0%, ${COLORES.acento} 100%)`, color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>Abrir</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECCIÓN GUÍAS PDF */}
        {seccionActiva === 'guias' && (
          <div>
            <h2 style={{ ...LIQUID_GLASS.title, textAlign: 'center' }}>Guías PDF</h2>
            
            <div style={{ ...LIQUID_GLASS.container, padding: '1.5rem', marginBottom: '2rem' }}>
              <h4>Agregar Guía PDF</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <input type="text" placeholder="Título" value={nuevaGuia.titulo} onChange={(e) => setNuevaGuia({...nuevaGuia, titulo: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="Descripción" value={nuevaGuia.descripcion} onChange={(e) => setNuevaGuia({...nuevaGuia, descripcion: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="Materia" value={nuevaGuia.materia} onChange={(e) => setNuevaGuia({...nuevaGuia, materia: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="URL del PDF" value={nuevaGuia.pdfUrl} onChange={(e) => setNuevaGuia({...nuevaGuia, pdfUrl: e.target.value})} style={{ padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' }} />
                <button onClick={agregarGuia} style={{ background: `linear-gradient(135deg, ${COLORES.principal} 0%, ${COLORES.acento} 100%)`, color: 'white', border: 'none', borderRadius: '10px', padding: '0.5rem', cursor: 'pointer' }}>Agregar</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {guias.map(guia => (
                <div key={guia.id} style={{ ...LIQUID_GLASS.container, padding: '1.2rem', position: 'relative' }}>
                  <button onClick={() => eliminarGuia(guia.id)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '10px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>X</button>
                  <div style={{ fontSize: '3rem', textAlign: 'center' }}>📄</div>
                  <h4 style={{ textAlign: 'center' }}>{guia.titulo}</h4>
                  <p style={{ textAlign: 'center' }}>{guia.descripcion}</p>
                  <p><strong>Materia:</strong> {guia.materia}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <a href={guia.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ background: `linear-gradient(135deg, ${COLORES.principal} 0%, ${COLORES.acento} 100%)`, color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', textDecoration: 'none' }}>Ver</a>
                    <a href={guia.pdfUrl} download style={{ background: '#28a745', color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', textDecoration: 'none' }}>Descargar</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECCIÓN PLAN DE EVALUACIÓN */}
        {seccionActiva === 'plan' && (
          <div>
            <h2 style={{ ...LIQUID_GLASS.title, textAlign: 'center' }}>Plan de Evaluación</h2>
            
            <div style={{ ...LIQUID_GLASS.container, overflowX: 'auto', padding: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: `linear-gradient(135deg, ${COLORES.oscuro} 0%, ${COLORES.acento} 100%)`, color: 'white' }}>
                    <th style={{ padding: '0.75rem' }}>Periodo</th>
                    <th style={{ padding: '0.75rem' }}>Materia</th>
                    <th style={{ padding: '0.75rem' }}>Tipo</th>
                    <th style={{ padding: '0.75rem' }}>Porcentaje</th>
                    <th style={{ padding: '0.75rem' }}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {planEvaluacion.map(e => (
                    <tr key={e.id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '0.75rem' }}>{e.periodo}</td>
                      <td>{e.materia}</td>
                      <td>{e.tipoEvaluacion}</td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold', color: COLORES.principal }}>{e.porcentaje}%</td>
                      <td>{e.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: '#f8f9fa', borderTop: `1px solid ${COLORES.principal}`, marginTop: '2rem', padding: '1.5rem', textAlign: 'center' }}>
        <span style={{ background: `linear-gradient(135deg, ${COLORES.oscuro} 0%, ${COLORES.principal} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>
          U.E Ciudad Cuatricentenaria - Educación Inicial
        </span>
      </footer>
    </div>
  );
};

export default ClassroomPage;