import { Heart, AlertCircle } from 'lucide-react';

interface Zone {
  number: number;
  name: string;
  minBpm: number;
  maxBpm: number;
  percentMin: number;
  percentMax: number;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
}

const zones: Zone[] = [
  {
    number: 1,
    name: 'Recuperación',
    minBpm: 0,
    maxBpm: 100,
    percentMin: 0,
    percentMax: 60,
    description: 'Conversación fácil, esfuerzo mínimo. Ideal para calentamiento, enfriamiento y días de recuperación activa.',
    color: 'green',
    bgColor: 'bg-green-500',
    textColor: 'text-green-400',
  },
  {
    number: 2,
    name: 'Aeróbico Base',
    minBpm: 100,
    maxBpm: 120,
    percentMin: 60,
    percentMax: 72,
    description: 'Ritmo conversacional cómodo. Construye resistencia aeróbica y quema grasas eficientemente. Base del entrenamiento.',
    color: 'blue',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-400',
  },
  {
    number: 3,
    name: 'Tempo',
    minBpm: 120,
    maxBpm: 133,
    percentMin: 72,
    percentMax: 80,
    description: 'Esfuerzo moderado-alto. Conversación en frases cortas. Mejora eficiencia y capacidad aeróbica. "Sweet Spot".',
    color: 'yellow',
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-400',
  },
  {
    number: 4,
    name: 'Umbral',
    minBpm: 133,
    maxBpm: 149,
    percentMin: 80,
    percentMax: 90,
    description: 'Esfuerzo duro y sostenido. Difícil hablar. Aumenta umbral de lactato y potencia sostenible. Máximo 60min.',
    color: 'orange',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-400',
  },
  {
    number: 5,
    name: 'VO2 Max',
    minBpm: 149,
    maxBpm: 166,
    percentMin: 90,
    percentMax: 100,
    description: 'Esfuerzo máximo. Imposible hablar. Mejora capacidad cardiovascular máxima. Solo intervalos cortos (3-5min).',
    color: 'red',
    bgColor: 'bg-red-500',
    textColor: 'text-red-400',
  },
];

export default function ZonasTab() {
  const maxHR = 166;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">ZONAS DE FRECUENCIA CARDÍACA</h2>

      {/* Max HR Card */}
      <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <Heart className="w-12 h-12 text-gold" strokeWidth={2} />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Frecuencia Cardíaca Máxima</h3>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-5xl font-bold text-gold">{maxHR}</span>
              <span className="text-2xl text-gray-400">BPM</span>
            </div>
            <p className="text-sm text-gray-300">
              Calculada con la Fórmula de Tanaka: <span className="font-mono text-gold">208 - (0.7 × 60 años) = 166 bpm</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Esta fórmula es más precisa para adultos mayores que la fórmula tradicional 220-edad
            </p>
          </div>
        </div>
      </div>

      {/* Zones Cards */}
      <div className="space-y-4 mb-6">
        {zones.map((zone) => (
          <div
            key={zone.number}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full ${zone.bgColor}/20 ${zone.textColor}`}
                  >
                    ZONA {zone.number}
                  </span>
                  <h3 className="text-xl font-bold text-white">{zone.name}</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className={`text-3xl font-bold ${zone.textColor}`}>
                    {zone.minBpm > 0 ? `${zone.minBpm}-${zone.maxBpm}` : `< ${zone.maxBpm}`}
                  </span>
                  <span className="text-lg text-gray-400">BPM</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({zone.percentMin}-{zone.percentMax}% FC Máx)
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{zone.description}</p>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="relative h-3 bg-gray-900 rounded-full overflow-hidden">
              <div
                className={`h-full ${zone.bgColor} transition-all duration-1000`}
                style={{ width: `${zone.percentMax}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-end pr-2">
                <span className="text-xs font-bold text-white mix-blend-difference">
                  {zone.percentMax}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Warning Card */}
      <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-5">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-lg font-bold text-red-400 mb-2">IMPORTANTE: Distribución de Zonas</h4>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              <strong className="text-white">80% del entrenamiento debe ser en Z1-Z2.</strong> Este enfoque de "polarización" maximiza las adaptaciones aeróbicas sin sobreentrenar.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">A los 60 años, la recuperación toma 20-30% más tiempo.</strong> Respeta los días de descanso y recuperación activa. No sacrifiques la calidad por el volumen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
