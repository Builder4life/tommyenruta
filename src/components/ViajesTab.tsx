import { Plane, Hotel, Home, UtensilsCrossed } from 'lucide-react';

interface TravelCard {
  title: string;
  icon: typeof Hotel;
  color: string;
  bgColor: string;
  borderColor: string;
  items: string[];
}

const travelCards: TravelCard[] = [
  {
    title: 'Bici Estacionaria en Hotel',
    icon: Hotel,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/50',
    items: [
      '45-60 minutos de duración total',
      '10 min calentamiento gradual en Z1',
      '20-30 min ritmo constante Z2 (mantener base aeróbica)',
      '3-4 bloques de 3-5 min en Z3 con 2-3 min recuperación entre bloques',
      '5-10 min enfriamiento suave en Z1',
      'Enfoque: mantener intensidad moderada sin fatiga excesiva',
      'Hidratación: llevar 2 botellas de agua al gimnasio del hotel',
      'Si no hay bici estacionaria: elíptica o remo como alternativa'
    ]
  },
  {
    title: 'Rutina Sin Equipo (Fuerza)',
    icon: Hotel,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/50',
    items: [
      '30-35 minutos en la habitación del hotel',
      'Calentamiento: 5 min de movilidad articular',
      'Circuito (3-4 rondas): 15 sentadillas + 10 estocadas por pierna + 15 push-ups + 45 seg plancha + 20 mountain climbers',
      'Descanso entre rondas: 90 segundos',
      'Enfoque en forma correcta, no en velocidad',
      'Sentadillas: profundidad completa, peso en talones',
      'Plancha: core activo, espalda neutra',
      'Estiramiento final: 5 min enfocado en caderas y cuádriceps'
    ]
  },
  {
    title: 'Protocolo de Regreso a Casa',
    icon: Home,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/50',
    items: [
      'DÍA DE LLEGADA: Descanso total, hidratación, comida ligera',
      'DÍA 2: Reactivación suave 30-45 min Z1, solo activar las piernas',
      'DÍA 3: Retomar el plan normal según calendario',
      '⚠️ NUNCA compensar volumen perdido - es contraproducente',
      'El descanso forzado puede ser beneficioso para asimilación',
      'Priorizar calidad de sueño las primeras 48h de regreso',
      'Monitorear FC en reposo: si está 5+ bpm elevada, día extra de recuperación',
      'Escuchar al cuerpo: fatiga de viaje es real'
    ]
  },
  {
    title: 'Nutrición Durante Viajes',
    icon: UtensilsCrossed,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/50',
    items: [
      'Restaurantes: pedir proteína magra (pollo, pescado, pavo) + vegetales + arroz/batata',
      'Desayuno hotel: huevos, avena, frutas frescas, yogurt - evitar bollería',
      'Llevar en maleta: mix de nueces, barras proteicas, avena instantánea, proteína en polvo',
      'Hidratación en vuelo: 500ml de agua por hora de vuelo',
      'Evitar alcohol 48h antes y después del viaje',
      'Snacks de aeropuerto: nuts, frutas, wraps de pavo en lugar de comida rápida',
      'Mantener horarios regulares de comida lo más posible',
      'Suplementos: llevar multivitamínico, electrolitos, probióticos'
    ]
  }
];

export default function ViajesTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">PLANIFICACIÓN DE VIAJES</h2>

      {/* Intro Card */}
      <div className="bg-gradient-to-br from-cyan/10 to-cyan/5 border border-cyan-500/30 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <Plane className="w-10 h-10 text-cyan-400" strokeWidth={2} />
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Estrategia de Viajes Laborales</h3>
            <p className="text-gray-300 mb-3 leading-relaxed">
              El plan contempla <strong className="text-cyan-400">2 viajes mensuales de 4 días</strong> durante las semanas 7 y 11.
              Durante estas semanas, el volumen de entrenamiento se reduce aproximadamente un 50% para adaptarse a las
              limitaciones de viaje.
            </p>
            <p className="text-gray-300 mb-3 leading-relaxed">
              <strong className="text-white">Filosofía clave:</strong> Aunque el volumen baja, se mantiene el estímulo de
              entrenamiento mediante sesiones más cortas pero efectivas. La consistencia es más importante que el volumen
              durante estas semanas.
            </p>
            <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-sm text-cyan-200">
                <strong>Objetivo:</strong> Mantener la condición física sin generar fatiga adicional por la combinación
                de estrés de viaje + entrenamiento. El descanso relativo puede incluso mejorar la asimilación del
                entrenamiento previo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {travelCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`${card.bgColor} border ${card.borderColor} rounded-xl p-5 hover:border-opacity-80 transition-all`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`w-6 h-6 ${card.color}`} strokeWidth={2} />
                <h3 className={`text-lg font-bold ${card.color}`}>{card.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {card.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-2 leading-relaxed">
                    <span className={`${card.color} mt-1 font-bold`}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Additional Tips */}
      <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h4 className="text-lg font-bold text-gold mb-3">Tips Adicionales</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <p className="mb-2"><strong className="text-white">Equipaje:</strong></p>
            <ul className="space-y-1 ml-4">
              <li>• Ropa de entrenamiento (2-3 sets)</li>
              <li>• Zapatillas deportivas</li>
              <li>• Banda de resistencia (ocupa poco espacio)</li>
              <li>• Foam roller inflable</li>
            </ul>
          </div>
          <div>
            <p className="mb-2"><strong className="text-white">Gestión del tiempo:</strong></p>
            <ul className="space-y-1 ml-4">
              <li>• Entrenar temprano (antes de reuniones)</li>
              <li>• Sesiones cortas son mejores que nada</li>
              <li>• Priorizar sueño sobre entrenamiento si hay que elegir</li>
              <li>• Usar tiempo de aeropuerto para caminar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
