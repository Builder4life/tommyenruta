import { Week } from '../types/training';

export const trainingPlan: Week[] = [
  {
    weekNumber: 1,
    phase: 'BASE',
    name: 'Inicio Suave',
    startDate: '10 Mar',
    endDate: '16 Mar',
    tss: 180,
    volume: 6.0,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso Activo', duration: 0, zones: [] },
      { day: 'MAR', type: 'ride', name: 'Ride Fácil Z1-Z2', duration: 60, zones: [{ zone: 'Z1', duration: 30 }, { zone: 'Z2', duration: 30 }], description: 'Calentamiento suave, mantener cadencia 80-90 rpm' },
      { day: 'MIE', type: 'strength', name: 'Fuerza Core', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Plancha, puente glúteos, sentadillas' },
      { day: 'JUE', type: 'ride', name: 'Endurance Z2', duration: 75, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 60 }], description: 'Terreno plano, ritmo conversacional' },
      { day: 'VIE', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'SAB', type: 'ride', name: 'Tempo Fácil', duration: 60, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 40 }, { zone: 'Z3', duration: 5 }], description: 'Introducir pequeños esfuerzos Z3' },
      { day: 'DOM', type: 'long', name: 'Salida Larga Z2', duration: 120, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 100 }], description: 'Ruta tranquila, enfoque en nutrición' }
    ]
  },
  {
    weekNumber: 2,
    phase: 'BASE',
    name: 'Construcción Base',
    startDate: '17 Mar',
    endDate: '23 Mar',
    tss: 220,
    volume: 7.5,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'MAR', type: 'ride', name: 'Endurance Z2', duration: 75, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 60 }], description: 'Mantener FC estable en Z2' },
      { day: 'MIE', type: 'strength', name: 'Fuerza Piernas', duration: 50, zones: [{ zone: 'Z1', duration: 50 }], description: 'Sentadillas, zancadas, peso muerto rumano' },
      { day: 'JUE', type: 'ride', name: 'Tempo Z2-Z3', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 50 }, { zone: 'Z3', duration: 20 }, { zone: 'Z1', duration: 5 }], description: '3x6min Z3 con 4min recuperación' },
      { day: 'VIE', type: 'recovery', name: 'Recuperación Activa', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Rodillo muy suave o caminar' },
      { day: 'SAB', type: 'ride', name: 'Sweet Spot', duration: 75, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z3', duration: 30 }, { zone: 'Z2', duration: 30 }], description: '2x15min Z3 alto con 5min recuperación' },
      { day: 'DOM', type: 'long', name: 'Salida Larga', duration: 150, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 120 }, { zone: 'Z3', duration: 10 }], description: 'Incluir algunas subidas suaves' }
    ]
  },
  {
    weekNumber: 3,
    phase: 'BASE',
    name: 'Progresión Base',
    startDate: '24 Mar',
    endDate: '30 Mar',
    tss: 260,
    volume: 8.5,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'MAR', type: 'ride', name: 'Endurance', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 75 }], description: 'Ritmo aeróbico constante' },
      { day: 'MIE', type: 'strength', name: 'Fuerza Total', duration: 60, zones: [{ zone: 'Z1', duration: 60 }], description: 'Circuito completo cuerpo' },
      { day: 'JUE', type: 'ride', name: 'Intervalos Tempo', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z3', duration: 40 }, { zone: 'Z2', duration: 30 }, { zone: 'Z1', duration: 5 }], description: '4x8min Z3 con 4min recuperación' },
      { day: 'VIE', type: 'recovery', name: 'Spin Fácil', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Cadencia alta, resistencia baja' },
      { day: 'SAB', type: 'ride', name: 'Sweet Spot Extended', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z3', duration: 45 }, { zone: 'Z2', duration: 25 }, { zone: 'Z1', duration: 5 }], description: '3x15min Z3 con 5min recuperación' },
      { day: 'DOM', type: 'long', name: 'Salida Larga Variada', duration: 180, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 140 }, { zone: 'Z3', duration: 20 }], description: 'Terreno ondulado, practicar nutrición' }
    ]
  },
  {
    weekNumber: 4,
    phase: 'BASE',
    name: 'Recuperación',
    startDate: '31 Mar',
    endDate: '6 Abr',
    tss: 150,
    volume: 5.0,
    isRecovery: true,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso Total', duration: 0, zones: [] },
      { day: 'MAR', type: 'recovery', name: 'Recuperación Z1', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Muy suave, enfoque en movilidad' },
      { day: 'MIE', type: 'strength', name: 'Yoga/Estiramiento', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Flexibilidad y movilidad' },
      { day: 'JUE', type: 'ride', name: 'Endurance Suave', duration: 60, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 40 }], description: 'Sin esfuerzo, disfrutar' },
      { day: 'VIE', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'SAB', type: 'ride', name: 'Ride Recreativo', duration: 60, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 45 }], description: 'Salida social, sin presión' },
      { day: 'DOM', type: 'long', name: 'Larga Fácil', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 75 }], description: 'Semana de recuperación activa' }
    ]
  },
  {
    weekNumber: 5,
    phase: 'BUILD I',
    name: 'Inicio Build',
    startDate: '7 Abr',
    endDate: '13 Abr',
    tss: 280,
    volume: 9.0,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'MAR', type: 'ride', name: 'Sweet Spot', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z3', duration: 50 }, { zone: 'Z2', duration: 20 }, { zone: 'Z1', duration: 5 }], description: '2x20min Z3 alto con 5min recuperación' },
      { day: 'MIE', type: 'strength', name: 'Fuerza Potencia', duration: 60, zones: [{ zone: 'Z1', duration: 60 }], description: 'Ejercicios explosivos, pliométricos' },
      { day: 'JUE', type: 'ride', name: 'Threshold Intervals', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z4', duration: 30 }, { zone: 'Z2', duration: 40 }, { zone: 'Z1', duration: 5 }], description: '3x8min Z4 con 5min recuperación' },
      { day: 'VIE', type: 'recovery', name: 'Recuperación', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Spin fácil o caminar' },
      { day: 'SAB', type: 'ride', name: 'Tempo con Subidas', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 30 }, { zone: 'Z3', duration: 35 }, { zone: 'Z2', duration: 10 }], description: 'Buscar terreno ondulado' },
      { day: 'DOM', type: 'long', name: 'Salida Larga Build', duration: 195, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 150 }, { zone: 'Z3', duration: 25 }], description: 'Incluir 3x10min Z3 en segunda mitad' }
    ]
  },
  {
    weekNumber: 6,
    phase: 'BUILD I',
    name: 'Sweet Spot Focus',
    startDate: '14 Abr',
    endDate: '20 Abr',
    tss: 310,
    volume: 10.0,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'MAR', type: 'ride', name: 'Sweet Spot Extended', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z3', duration: 60 }, { zone: 'Z1', duration: 15 }], description: '3x18min Z3 con 4min recuperación' },
      { day: 'MIE', type: 'strength', name: 'Fuerza Resistencia', duration: 60, zones: [{ zone: 'Z1', duration: 60 }], description: 'Mayor volumen, menos descanso' },
      { day: 'JUE', type: 'ride', name: 'Threshold Work', duration: 105, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z4', duration: 35 }, { zone: 'Z2', duration: 45 }, { zone: 'Z1', duration: 10 }], description: '4x8min Z4 con 4min recuperación' },
      { day: 'VIE', type: 'recovery', name: 'Activa Suave', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Recuperación activa ligera' },
      { day: 'SAB', type: 'ride', name: 'Over-Unders', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z3', duration: 30 }, { zone: 'Z4', duration: 20 }, { zone: 'Z2', duration: 20 }, { zone: 'Z1', duration: 5 }], description: '3x(3min Z3 + 2min Z4) x2' },
      { day: 'DOM', type: 'long', name: 'Gran Fondo Simulación', duration: 210, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 160 }, { zone: 'Z3', duration: 30 }], description: 'Simular ritmo de carrera, terreno similar' }
    ]
  },
  {
    weekNumber: 7,
    phase: 'BUILD I',
    name: 'Semana Viaje',
    startDate: '21 Abr',
    endDate: '27 Abr',
    tss: 180,
    volume: 6.0,
    isTravel: true,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'MAR', type: 'travel', name: 'Viaje/Desplazamiento', duration: 0, zones: [], description: 'Movilidad y estiramiento' },
      { day: 'MIE', type: 'ride', name: 'Endurance Adaptación', duration: 60, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 45 }], description: 'Adaptarse al nuevo entorno' },
      { day: 'JUE', type: 'recovery', name: 'Recuperación', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Spin muy suave' },
      { day: 'VIE', type: 'ride', name: 'Tempo Corto', duration: 75, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 30 }, { zone: 'Z3', duration: 25 }, { zone: 'Z1', duration: 5 }], description: 'Mantener algo de intensidad' },
      { day: 'SAB', type: 'rest', name: 'Descanso/Turismo', duration: 0, zones: [] },
      { day: 'DOM', type: 'long', name: 'Salida Exploratoria', duration: 120, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 95 }, { zone: 'Z1', duration: 5 }], description: 'Conocer rutas locales' }
    ]
  },
  {
    weekNumber: 8,
    phase: 'BUILD I',
    name: 'Recuperación Build',
    startDate: '28 Abr',
    endDate: '4 May',
    tss: 170,
    volume: 5.5,
    isRecovery: true,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso Total', duration: 0, zones: [] },
      { day: 'MAR', type: 'recovery', name: 'Recuperación Z1', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Cadencia alta, muy suave' },
      { day: 'MIE', type: 'strength', name: 'Movilidad', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Yoga, foam roller' },
      { day: 'JUE', type: 'ride', name: 'Endurance Fácil', duration: 75, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 55 }], description: 'Sin presión, disfrutar' },
      { day: 'VIE', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'SAB', type: 'ride', name: 'Tempo Suave', duration: 60, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 35 }, { zone: 'Z3', duration: 10 }], description: 'Sentir las piernas frescas' },
      { day: 'DOM', type: 'long', name: 'Larga Recreativa', duration: 105, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 90 }], description: 'Semana de regeneración' }
    ]
  },
  {
    weekNumber: 9,
    phase: 'BUILD II',
    name: 'Intensidad VO2',
    startDate: '5 May',
    endDate: '11 May',
    tss: 320,
    volume: 10.5,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'MAR', type: 'ride', name: 'VO2 Max Intervals', duration: 90, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z5', duration: 20 }, { zone: 'Z2', duration: 40 }, { zone: 'Z1', duration: 10 }], description: '5x3min Z5 con 3min recuperación' },
      { day: 'MIE', type: 'strength', name: 'Fuerza Mantenimiento', duration: 50, zones: [{ zone: 'Z1', duration: 50 }], description: 'Mantener fuerza ganada' },
      { day: 'JUE', type: 'ride', name: 'Threshold Blocks', duration: 105, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z4', duration: 40 }, { zone: 'Z2', duration: 40 }, { zone: 'Z1', duration: 10 }], description: '2x15min Z4 con 10min recuperación' },
      { day: 'VIE', type: 'recovery', name: 'Recuperación Activa', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Muy suave post-intensidad' },
      { day: 'SAB', type: 'ride', name: 'Race Pace Practice', duration: 105, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 30 }, { zone: 'Z3', duration: 50 }, { zone: 'Z1', duration: 10 }], description: 'Practicar ritmo de carrera sostenido' },
      { day: 'DOM', type: 'long', name: 'Salida Larga Intensa', duration: 210, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 140 }, { zone: 'Z3', duration: 40 }, { zone: 'Z1', duration: 10 }], description: 'Incluir segmentos Z3 en última hora' }
    ]
  },
  {
    weekNumber: 10,
    phase: 'BUILD II',
    name: 'Pico Volumen',
    startDate: '12 May',
    endDate: '18 May',
    tss: 350,
    volume: 11.5,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'MAR', type: 'ride', name: 'VO2 Max Extended', duration: 105, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z5', duration: 25 }, { zone: 'Z2', duration: 50 }, { zone: 'Z1', duration: 10 }], description: '6x3.5min Z5 con 3.5min recuperación' },
      { day: 'MIE', type: 'strength', name: 'Fuerza Específica', duration: 60, zones: [{ zone: 'Z1', duration: 60 }], description: 'Enfoque en piernas y core' },
      { day: 'JUE', type: 'ride', name: 'Threshold + Sweet Spot', duration: 120, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z4', duration: 25 }, { zone: 'Z3', duration: 40 }, { zone: 'Z2', duration: 30 }, { zone: 'Z1', duration: 10 }], description: '2x10min Z4 + 2x15min Z3' },
      { day: 'VIE', type: 'recovery', name: 'Spin Recuperación', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Activar piernas suavemente' },
      { day: 'SAB', type: 'ride', name: 'Climbing Practice', duration: 105, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 30 }, { zone: 'Z3', duration: 45 }, { zone: 'Z2', duration: 10 }, { zone: 'Z1', duration: 5 }], description: 'Subidas largas al ritmo GF' },
      { day: 'DOM', type: 'long', name: 'Gran Fondo Dress Rehearsal', duration: 240, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 160 }, { zone: 'Z3', duration: 50 }, { zone: 'Z1', duration: 10 }], description: 'Ensayo completo: nutrición, ritmo, equipo' }
    ]
  },
  {
    weekNumber: 11,
    phase: 'BUILD II',
    name: 'Semana Viaje',
    startDate: '19 May',
    endDate: '25 May',
    tss: 190,
    volume: 6.5,
    isTravel: true,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'MAR', type: 'travel', name: 'Viaje/Desplazamiento', duration: 0, zones: [], description: 'Hidratación, movilidad' },
      { day: 'MIE', type: 'ride', name: 'Endurance Suave', duration: 60, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 45 }], description: 'Mantener las piernas sueltas' },
      { day: 'JUE', type: 'recovery', name: 'Recuperación Activa', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Muy ligero' },
      { day: 'VIE', type: 'ride', name: 'Openers Suaves', duration: 75, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 35 }, { zone: 'Z3', duration: 15 }, { zone: 'Z1', duration: 5 }], description: '3x3min Z3 para mantener piernas activas' },
      { day: 'SAB', type: 'rest', name: 'Descanso/Turismo', duration: 0, zones: [] },
      { day: 'DOM', type: 'long', name: 'Salida Turística', duration: 135, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 110 }, { zone: 'Z1', duration: 5 }], description: 'Disfrutar sin presión' }
    ]
  },
  {
    weekNumber: 12,
    phase: 'BUILD II',
    name: 'Recuperación Pre-Peak',
    startDate: '26 May',
    endDate: '1 Jun',
    tss: 160,
    volume: 5.0,
    isRecovery: true,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso Total', duration: 0, zones: [] },
      { day: 'MAR', type: 'recovery', name: 'Spin Muy Suave', duration: 45, zones: [{ zone: 'Z1', duration: 45 }], description: 'Soltar piernas' },
      { day: 'MIE', type: 'strength', name: 'Movilidad Suave', duration: 40, zones: [{ zone: 'Z1', duration: 40 }], description: 'Estiramiento, yoga ligero' },
      { day: 'JUE', type: 'ride', name: 'Endurance Corto', duration: 60, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 40 }], description: 'Mantener ritmo sin fatiga' },
      { day: 'VIE', type: 'rest', name: 'Descanso', duration: 0, zones: [] },
      { day: 'SAB', type: 'ride', name: 'Openers Ligeros', duration: 60, zones: [{ zone: 'Z1', duration: 20 }, { zone: 'Z2', duration: 25 }, { zone: 'Z3', duration: 10 }, { zone: 'Z1', duration: 5 }], description: '2x3min Z3, sentir piernas frescas' },
      { day: 'DOM', type: 'long', name: 'Larga Fácil', duration: 90, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 75 }], description: 'Última salida larga antes del evento' }
    ]
  },
  {
    weekNumber: 13,
    phase: 'PEAK',
    name: 'Semana del Evento',
    startDate: '2 Jun',
    endDate: '8 Jun',
    tss: 220,
    volume: 7.0,
    isEvent: true,
    workouts: [
      { day: 'LUN', type: 'rest', name: 'Descanso Total', duration: 0, zones: [], description: 'Hidratación, nutrición óptima' },
      { day: 'MAR', type: 'recovery', name: 'Spin Suavísimo', duration: 30, zones: [{ zone: 'Z1', duration: 30 }], description: 'Solo activar piernas' },
      { day: 'MIE', type: 'ride', name: 'Openers', duration: 45, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 15 }, { zone: 'Z3', duration: 10 }, { zone: 'Z1', duration: 5 }], description: '3x2min Z3 con recuperación completa' },
      { day: 'JUE', type: 'recovery', name: 'Spin Muy Corto', duration: 30, zones: [{ zone: 'Z1', duration: 30 }], description: 'Mantener piernas sueltas' },
      { day: 'VIE', type: 'rest', name: 'Descanso Pre-Evento', duration: 0, zones: [], description: 'Preparar equipo, nutrición, dormir bien' },
      { day: 'SAB', type: 'recovery', name: 'Shakeout Ride', duration: 30, zones: [{ zone: 'Z1', duration: 25 }, { zone: 'Z3', duration: 3 }, { zone: 'Z1', duration: 2 }], description: 'Breve activación, 1x1min Z3' },
      { day: 'DOM', type: 'race', name: 'GRAN FONDO NEW YORK', duration: 285, zones: [{ zone: 'Z1', duration: 15 }, { zone: 'Z2', duration: 180 }, { zone: 'Z3', duration: 70 }, { zone: 'Z4', duration: 20 }], description: 'DÍA DE LA CARRERA! Disfrutar cada kilómetro' }
    ]
  }
];
