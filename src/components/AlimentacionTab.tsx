import { useState } from 'react';
import { Sunrise, Sun, Moon, Zap, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { meals, mealSchedule } from '../data/nutritionPlan';
import { MealCategory } from '../types/nutrition';

const categoryIcons = {
  desayuno: Sunrise,
  almuerzo: Sun,
  cena: Moon,
  snacks: Zap,
};

const categoryLabels = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  cena: 'Cena',
  snacks: 'Snacks',
};

export default function AlimentacionTab() {
  const [activeCategory, setActiveCategory] = useState<MealCategory>('desayuno');
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const categories: MealCategory[] = ['desayuno', 'almuerzo', 'cena', 'snacks'];
  const filteredMeals = meals.filter((meal) => meal.category === activeCategory);

  const toggleMeal = (mealName: string) => {
    setExpandedMeal(expandedMeal === mealName ? null : mealName);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">PLAN DE ALIMENTACIÓN</h2>

      {/* Goals Card */}
      <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Metas Nutricionales</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Días Entrenamiento</div>
            <div className="text-2xl font-bold text-gold">2800-3200</div>
            <div className="text-xs text-gray-400">calorías</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Días Descanso</div>
            <div className="text-2xl font-bold text-blue-400">2200-2400</div>
            <div className="text-xs text-gray-400">calorías</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Proteína Diaria</div>
            <div className="text-2xl font-bold text-green-400">180-200g</div>
            <div className="text-xs text-gray-400">~2g por kg peso</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Meta Peso</div>
            <div className="text-2xl font-bold text-orange-400">194→184</div>
            <div className="text-xs text-gray-400">libras (-10 lbs)</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Carbs Durante Ride</div>
            <div className="text-2xl font-bold text-yellow-400">60-90g</div>
            <div className="text-xs text-gray-400">por hora</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Hidratación</div>
            <div className="text-2xl font-bold text-cyan-400">3 litros</div>
            <div className="text-xs text-gray-400">diarios mínimo</div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="overflow-x-auto -mx-2 px-2 pb-2">
        <div className="flex gap-2 mb-6 min-w-max">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-gold text-navy-dark'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {categoryLabels[category]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Meals List */}
      <div className="space-y-3 mb-8">
        {filteredMeals.map((meal) => (
          <div
            key={meal.name}
            className={`bg-gray-800/50 border rounded-lg overflow-hidden transition-all ${
              expandedMeal === meal.name ? 'border-gold' : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            {/* Meal Header */}
            <button
              onClick={() => toggleMeal(meal.name)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
            >
              <div className="text-left flex-1">
                <h4 className="text-lg font-bold text-white mb-1">{meal.name}</h4>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-gold font-semibold">{meal.macros.calories} kcal</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-yellow-400">C: {meal.macros.carbs}g</span>
                  <span className="text-green-400">P: {meal.macros.protein}g</span>
                  <span className="text-orange-400">G: {meal.macros.fats}g</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                    {meal.timing}
                  </span>
                </div>
              </div>
              <div className="text-gray-400 ml-4">
                {expandedMeal === meal.name ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>

            {/* Expanded Details */}
            {expandedMeal === meal.name && (
              <div className="px-5 py-4 border-t border-gray-700 bg-gray-900/30 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Ingredients */}
                  <div>
                    <h5 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">
                      Ingredientes
                    </h5>
                    <ul className="space-y-2">
                      {meal.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-gold mt-1">•</span>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h5 className="text-sm font-bold text-gold uppercase tracking-wider mb-3">
                      Preparación
                    </h5>
                    <ol className="space-y-2">
                      {meal.instructions.map((instruction, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-gold font-semibold min-w-[20px]">{idx + 1}.</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Meal Schedule */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-gold" />
          <h3 className="text-xl font-bold text-white">Horario Tipo - Día de Entrenamiento</h3>
        </div>
        <div className="space-y-3">
          {mealSchedule.map((schedule, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors"
            >
              <div className="min-w-[80px]">
                <span className="text-lg font-bold text-gold">{schedule.time}</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white mb-1">{schedule.meal}</div>
                <div className="text-sm text-gray-400">{schedule.example}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-gray-300">
            <strong className="text-blue-400">Nota:</strong> La nutrición durante el ride es crítica. Consumir 60-90g de carbohidratos por hora usando combinación de geles, barras y bebida deportiva. No esperar a tener hambre - comer cada 20-30 minutos.
          </p>
        </div>
      </div>
    </div>
  );
}
