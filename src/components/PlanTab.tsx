import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { trainingPlan } from '../data/trainingPlan';
import { Week, WorkoutType, HeartRateZone } from '../types/training';

const workoutEmojis: Record<WorkoutType, string> = {
  rest: '😴',
  ride: '🚴',
  strength: '💪',
  long: '🏔️',
  recovery: '🌿',
  travel: '✈️',
  race: '🏆',
};

const zoneColors: Record<HeartRateZone, { bg: string; text: string }> = {
  Z1: { bg: 'bg-green-500/20', text: 'text-green-400' },
  Z2: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  Z3: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  Z4: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  Z5: { bg: 'bg-red-500/20', text: 'text-red-400' },
};

export default function PlanTab() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const currentWeek = trainingPlan.find((w) => w.weekNumber === selectedWeek) as Week;

  const getWeekButtonStyle = (week: Week) => {
    if (week.isEvent) {
      return 'bg-red-600 hover:bg-red-500 text-white';
    }
    if (week.isTravel) {
      return 'bg-cyan-600 hover:bg-cyan-500 text-white';
    }
    if (week.isRecovery) {
      return 'bg-green-600 hover:bg-green-500 text-white';
    }
    return 'bg-gray-700 hover:bg-gray-600 text-gray-200';
  };

  const getWeekEmoji = (week: Week) => {
    if (week.isEvent) return '🏆';
    if (week.isTravel) return '✈️';
    if (week.isRecovery) return '🌿';
    return '';
  };

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">PLAN DE ENTRENAMIENTO</h2>

      {/* Week Selector */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
          Seleccionar Semana
        </h3>
        <div className="overflow-x-auto -mx-2 px-2 pb-2">
          <div className="flex gap-2 min-w-max">
            {trainingPlan.map((week) => (
              <button
                key={week.weekNumber}
                onClick={() => setSelectedWeek(week.weekNumber)}
                className={`py-3 px-4 rounded-lg font-bold text-xs transition-all ${
                  selectedWeek === week.weekNumber
                    ? 'bg-gold text-navy-dark scale-105'
                    : getWeekButtonStyle(week)
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  {getWeekEmoji(week) && <span className="text-base">{getWeekEmoji(week)}</span>}
                  <span>S{week.weekNumber}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Week Summary Card */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-bold px-3 py-1 rounded-full bg-gold/20 text-gold">
                {currentWeek.phase}
              </span>
              <h3 className="text-2xl font-bold text-white">Semana {currentWeek.weekNumber}</h3>
            </div>
            <h4 className="text-xl text-gray-300 mb-2">{currentWeek.name}</h4>
            <p className="text-gray-400 text-sm">
              {currentWeek.startDate} - {currentWeek.endDate}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gold mb-1">{currentWeek.tss}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">TSS Total</div>
            <div className="text-2xl font-bold text-white">{currentWeek.volume.toFixed(1)}h</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Volumen</div>
          </div>
        </div>

        {(currentWeek.isRecovery || currentWeek.isTravel || currentWeek.isEvent) && (
          <div className="mt-4 p-3 rounded-lg bg-gray-900/50 border border-gray-600">
            <p className="text-sm text-gray-300 flex items-center gap-2">
              <span className="text-lg">
                {currentWeek.isEvent ? '🏆' : currentWeek.isTravel ? '✈️' : '🌿'}
              </span>
              {currentWeek.isEvent && 'Semana del evento - Tapering y carrera'}
              {currentWeek.isTravel && 'Semana de viaje - Volumen reducido'}
              {currentWeek.isRecovery && 'Semana de recuperación - Descanso activo'}
            </p>
          </div>
        )}
      </div>

      {/* Daily Workouts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
          Entrenamientos de la Semana
        </h3>
        {currentWeek.workouts.map((workout) => (
          <div
            key={workout.day}
            className={`bg-gray-800/50 border rounded-lg overflow-hidden transition-all ${
              expandedDay === workout.day
                ? 'border-gold'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            {/* Day Header */}
            <button
              onClick={() => toggleDay(workout.day)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{workoutEmojis[workout.type]}</div>
                <div className="text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-400 w-10">{workout.day}</span>
                    <span className="text-base font-semibold text-white">{workout.name}</span>
                  </div>
                  {workout.duration > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400">{workout.duration} min</span>
                      {workout.zones.length > 0 && (
                        <>
                          <span className="text-gray-600">•</span>
                          <div className="flex gap-1">
                            {Array.from(new Set(workout.zones.map((z) => z.zone))).map((zone) => (
                              <span
                                key={zone}
                                className={`text-xs px-2 py-0.5 rounded ${zoneColors[zone].bg} ${zoneColors[zone].text} font-semibold`}
                              >
                                {zone}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-gray-400">
                {expandedDay === workout.day ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>

            {/* Expanded Details */}
            {expandedDay === workout.day && workout.description && (
              <div className="px-5 py-4 border-t border-gray-700 bg-gray-900/30 animate-fadeIn">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Descripción
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{workout.description}</p>
                  </div>

                  {workout.zones.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Distribución de Zonas
                      </h4>
                      <div className="space-y-2">
                        {workout.zones.map((zone, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span
                              className={`text-xs px-2 py-1 rounded ${zoneColors[zone.zone].bg} ${zoneColors[zone.zone].text} font-semibold min-w-[40px] text-center`}
                            >
                              {zone.zone}
                            </span>
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${zoneColors[zone.zone].bg.replace('/20', '')}`}
                                style={{
                                  width: `${(zone.duration / workout.duration) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400 min-w-[50px] text-right">
                              {zone.duration} min
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
