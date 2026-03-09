import { useState } from 'react';
import { Calendar, Heart, Utensils, Plane, Lightbulb, Bike, BarChart3 } from 'lucide-react';
import PlanTab from './components/PlanTab';
import ZonasTab from './components/ZonasTab';
import AlimentacionTab from './components/AlimentacionTab';
import ViajesTab from './components/ViajesTab';
import ConsejosTab from './components/ConsejosTab';
import ProgresoTab from './components/ProgresoTab';

type Tab = 'plan' | 'zonas' | 'alimentacion' | 'viajes' | 'consejos' | 'progreso';

interface Phase {
  name: string;
  weeks: string;
  color: string;
  bgColor: string;
  width: string;
}

const phases: Phase[] = [
  { name: 'BASE', weeks: '1-4', color: 'text-blue-400', bgColor: 'bg-blue-500', width: 'w-[30.77%]' },
  { name: 'BUILD I', weeks: '5-8', color: 'text-yellow-400', bgColor: 'bg-yellow-500', width: 'w-[30.77%]' },
  { name: 'BUILD II', weeks: '9-12', color: 'text-orange-400', bgColor: 'bg-orange-500', width: 'w-[30.77%]' },
  { name: 'PEAK', weeks: '13', color: 'text-red-400', bgColor: 'bg-red-500', width: 'w-[7.69%]' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('plan');

  const tabs = [
    { id: 'plan' as Tab, label: 'PLAN', icon: Calendar },
    { id: 'zonas' as Tab, label: 'ZONAS FC', icon: Heart },
    { id: 'alimentacion' as Tab, label: 'ALIMENTACIÓN', icon: Utensils },
    { id: 'viajes' as Tab, label: 'VIAJES', icon: Plane },
    { id: 'consejos' as Tab, label: 'CONSEJOS', icon: Lightbulb },
    { id: 'progreso' as Tab, label: 'PROGRESO', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-navy-dark font-barlow text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bike className="w-10 h-10 text-gold" strokeWidth={2.5} />
              <div>
                <h1 className="text-4xl font-bold tracking-wider text-gold uppercase">
                  60 y Sin Frenos
                </h1>
                <p className="text-gray-400 text-base mt-1">
                  Tommy Moya · En la Ruta
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-gold text-navy-dark px-4 py-2 rounded-lg font-bold text-sm">
                13 SEMANAS
              </div>
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                Jun 7 EVENTO
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex gap-1 h-8 rounded-lg overflow-hidden bg-gray-900">
              {phases.map((phase, index) => (
                <div
                  key={index}
                  className={`${phase.bgColor} ${phase.width} flex items-center justify-center relative group cursor-pointer transition-all hover:brightness-110`}
                >
                  <div className="text-xs font-bold tracking-wider">
                    {phase.name}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                    Sem {phase.weeks}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-8"></div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-gray-800 sticky top-0 bg-navy-dark z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm tracking-wider transition-all relative whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-gold'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-8">
          {activeTab === 'plan' && <PlanTab />}

          {activeTab === 'zonas' && <ZonasTab />}

          {activeTab === 'alimentacion' && <AlimentacionTab />}

          {activeTab === 'viajes' && <ViajesTab />}

          {activeTab === 'consejos' && <ConsejosTab />}

          {activeTab === 'progreso' && <ProgresoTab />}
        </div>
      </main>
    </div>
  );
}

export default App;
