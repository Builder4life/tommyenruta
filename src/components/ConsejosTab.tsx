import { useState } from 'react';
import { ChevronDown, ChevronUp, FlaskConical, Mountain, TrendingUp, Zap } from 'lucide-react';

interface TipSection {
  id: string;
  icon: typeof FlaskConical;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  content: {
    subtitle?: string;
    items: string[];
  }[];
}

const tipSections: TipSection[] = [
  {
    id: 'fisiologia',
    icon: FlaskConical,
    title: 'Fisiología a los 60 Años',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/50',
    content: [
      {
        subtitle: 'Recuperación y Adaptación',
        items: [
          'La recuperación toma 20-30% más tiempo que en atletas de 40 años',
          'Los microdaños musculares se reparan más lentamente - respetar días de descanso',
          'La síntesis de proteínas es ligeramente menor: consumir 2g proteína/kg peso',
          'El sueño es el mejor suplemento: objetivo 7-9 horas de calidad',
          'Inflamación post-ejercicio dura más: Omega-3 y alimentos antiinflamatorios ayudan'
        ]
      },
      {
        subtitle: 'Capacidad Aeróbica',
        items: [
          'El VO2 max puede disminuir 10% por década, PERO se mantiene con entrenamiento consistente',
          'La eficiencia (economía de pedaleo) mejora con la experiencia - compensar con técnica',
          'La capacidad de quemar grasas se mantiene excelente - ideal para fondos largos',
          'El umbral de lactato responde muy bien al entrenamiento estructurado',
          'La frecuencia cardíaca máxima es menor, pero las zonas relativas funcionan igual de bien'
        ]
      },
      {
        subtitle: 'Consideraciones Importantes',
        items: [
          'Mayor susceptibilidad a deshidratación - beber antes de tener sed',
          'Termorregulación menos eficiente - cuidado extra en calor y frío',
          'Densidad ósea: el ciclismo de alto volumen es excelente para mantenerla',
          'Flexibilidad: 10-15 min de estiramiento diario previene lesiones',
          'Escuchar señales del cuerpo: dolor vs molestia - nunca entrenar con dolor agudo'
        ]
      }
    ]
  },
  {
    id: 'estrategia',
    icon: Mountain,
    title: 'Estrategia Gran Fondo NY',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
    borderColor: 'border-gold/50',
    content: [
      {
        subtitle: 'Primeros 30 Minutos - CRÍTICO',
        items: [
          'Salir CONSERVADOR: resiste el impulso de seguir al pelotón rápido',
          'FC debe estar en Z2 alta, máximo Z3 baja - guardar fósforos para después',
          'El evento tiene 100+ millas: los primeros 30 min NO determinan el resultado',
          'Usar el grupo para drafting pero sin acelerar innecesariamente',
          'Respiración debe ser controlada y rítmica'
        ]
      },
      {
        subtitle: 'Gestión de Subidas',
        items: [
          'Cadencia mínima 70 rpm, ideal 75-80 rpm en todas las subidas',
          'Cambiar antes de que la cadencia baje de 70 rpm',
          'Mantenerse sentado el mayor tiempo posible - conservar energía',
          'Atacar solo en los últimos 2km de subidas largas, si acaso',
          'Respiración profunda y rítmica: inspirar 3 segundos, exhalar 3 segundos'
        ]
      },
      {
        subtitle: 'Nutrición Durante el Evento',
        items: [
          'Comer ANTES de tener hambre: cada 20-30 minutos',
          'Objetivo: 60-90g carbohidratos por hora (2-3 geles o 1.5-2 barras)',
          'Empezar a comer desde el minuto 15-20, no esperar',
          'Alternar sólidos (barras) con líquidos (geles) para digestión',
          'En cada estación de hidratación: beber aunque no tengas sed',
          'Llevar sales/electrolitos propios - no depender solo de estaciones'
        ]
      },
      {
        subtitle: 'Mentalidad de Carrera',
        items: [
          'Dividir el evento en segmentos de 1 hora - enfocarse solo en la hora actual',
          'Millas 0-30: Calentamiento activo y posicionamiento',
          'Millas 30-70: Ritmo de crucero, mantener Z2-Z3',
          'Millas 70-90: Gestionar fatiga, mantener nutrición',
          'Millas 90-105: Dar lo que queda, incrementar intensidad gradualmente',
          'Celebrar cada pequeño logro: cada subida completada, cada hora cumplida'
        ]
      }
    ]
  },
  {
    id: 'metricas',
    icon: TrendingUp,
    title: 'Métricas de Progreso',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/50',
    content: [
      {
        subtitle: 'Baseline Actual (Semana 1)',
        items: [
          'Distancia cómoda: 21 millas (34 km) a ritmo Z2',
          'Velocidad promedio: 17 mph (27 km/h) en terreno llano',
          'FC promedio en rides: Z2 estable 100-115 bpm',
          'TSS semanal: 180-200 puntos',
          'Este es tu punto de partida - todo mejorará desde aquí'
        ]
      },
      {
        subtitle: 'Meta Semana 8 (Fin de Build I)',
        items: [
          'Salida larga: 50-60 millas (80-95 km) cómodamente',
          'Mantener 18-19 mph (29-30 km/h) en Z2-Z3',
          'TSS semanal: 280-310 puntos',
          'Umbral (Z4): poder mantener 20+ min consecutivos',
          'Recuperación más eficiente: FC basal 2-3 bpm menor'
        ]
      },
      {
        subtitle: 'Meta Semana 12 (Pre-Taper)',
        items: [
          'Salida larga: 70-80 millas (110-130 km) con terreno ondulado',
          'Velocidad sostenida: 18-20 mph (29-32 km/h) en ritmo mixto',
          'TSS semanal pico: 350 puntos',
          'Poder completar 3-4 horas en Z2-Z3 sin fatiga extrema',
          'FTP estimado: aumentar 10-15% desde baseline'
        ]
      },
      {
        subtitle: 'Objetivo Día del Evento',
        items: [
          'Completar 105 millas (169 km) en 6-7 horas',
          'Promedio 15-17 mph (24-27 km/h) incluyendo paradas',
          'Tiempo en movimiento: 16-18 mph (26-29 km/h)',
          'FC promedio Z2-Z3, picos breves a Z4 en subidas',
          'OBJETIVO PRINCIPAL: Cruzar la meta sintiéndose fuerte y celebrando'
        ]
      }
    ]
  },
  {
    id: 'equipo',
    icon: Zap,
    title: 'Equipo Esencial',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/50',
    content: [
      {
        subtitle: 'Monitor de Frecuencia Cardíaca - INDISPENSABLE',
        items: [
          'Es la métrica más importante para tu entrenamiento a los 60 años',
          'Permite entrenar en zonas correctas sin sobreentrenamiento',
          'Opciones: banda pectoral (más precisa) o reloj con sensor óptico',
          'Marcas recomendadas: Polar H10, Garmin HRM-Pro, Wahoo TICKR',
          'Sincronizar con ciclocomputador o reloj GPS',
          'Verificar FC en reposo cada mañana: indicador de recuperación'
        ]
      },
      {
        subtitle: 'Medidor de Potencia - OPCIONAL pero Útil',
        items: [
          'Permite cuantificar esfuerzo independiente de factores externos',
          'Útil para pacing en el evento: mantener watts constantes',
          'Opciones: pedales (Garmin Vector, Favero Assioma) o biela (4iiii, Stages)',
          'NO es esencial para completar el plan exitosamente',
          'Si el presupuesto es limitado, priorizar el monitor de FC',
          'Potencia útil en subidas: evita sobresforzarse por querer seguir al grupo'
        ]
      },
      {
        subtitle: 'Bike Fit Profesional - MUY IMPORTANTE a los 60',
        items: [
          'Previene lesiones por sobreuso (rodilla, espalda baja, cuello)',
          'A los 60 años, la flexibilidad es menor: ajuste debe ser más erguido',
          'Altura de sillín crítica: 25-30 grados de flexión de rodilla al extender',
          'Manubrio: posición que no fuerce la espalda baja ni el cuello',
          'Revisitar fit si aparece dolor recurrente en cualquier zona',
          'Costo: $150-300 bien invertidos para 13 semanas de entrenamiento'
        ]
      },
      {
        subtitle: 'Accesorios Importantes',
        items: [
          'Culotte de calidad con badana adecuada (crítico para rides largos)',
          'Guantes acolchados: protegen nervios de las manos en rides +2 horas',
          'Gafas de ciclismo: protección ocular aumenta con la edad',
          'Luces delantera/trasera: incluso para rides diurnos (visibilidad)',
          'Kit de reparación: bombín, cámaras, parches, multiherramienta',
          'Botelleros: mínimo 2 para rides +90 minutos'
        ]
      }
    ]
  }
];

export default function ConsejosTab() {
  const [expandedSection, setExpandedSection] = useState<string>('fisiologia');

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">CONSEJOS Y RECOMENDACIONES</h2>

      {/* Tip Sections */}
      <div className="space-y-4">
        {tipSections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <div
              key={section.id}
              className={`${section.bgColor} border ${section.borderColor} rounded-xl overflow-hidden transition-all ${
                isExpanded ? 'ring-2 ring-offset-2 ring-offset-navy-dark' : ''
              }`}
            >
              {/* Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-black/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Icon className={`w-7 h-7 ${section.color}`} strokeWidth={2} />
                  <h3 className={`text-xl font-bold ${section.color}`}>{section.title}</h3>
                </div>
                <div className={section.color}>
                  {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </div>
              </button>

              {/* Content */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-6 animate-fadeIn">
                  {section.content.map((block, idx) => (
                    <div key={idx}>
                      {block.subtitle && (
                        <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <span className={`w-1.5 h-6 ${section.bgColor.replace('/10', '')} rounded`}></span>
                          {block.subtitle}
                        </h4>
                      )}
                      <ul className="space-y-2.5 ml-3">
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-sm text-gray-300 flex items-start gap-3 leading-relaxed">
                            <span className={`${section.color} mt-1 font-bold text-lg`}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Motivational Footer */}
      <div className="mt-6 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gold mb-3">Recordatorio Final</h3>
        <p className="text-gray-300 leading-relaxed mb-3">
          A los 60 años, completar un Gran Fondo de 105 millas es un logro extraordinario. Este plan está diseñado
          específicamente para tu fisiología y circunstancias. La clave del éxito no es entrenar más duro, sino
          entrenar más inteligente.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong className="text-white">La consistencia vence a la intensidad.</strong> Es mejor hacer el 80% del plan
          consistentemente que intentar el 100% y quemarse. Escucha a tu cuerpo, respeta la recuperación, y confía en el
          proceso. El 7 de junio estarás listo.
        </p>
      </div>
    </div>
  );
}
