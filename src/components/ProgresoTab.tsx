import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Clock, Heart, Activity, Target, CheckCircle2, Circle, Trash2, BarChart3, ChevronRight, Scale, RefreshCw } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { supabase } from '../lib/supabase';
import type { Ride, RideFormData, RideMetrics, ProgressGoal, HeartRateZone, StravaActivity } from '../types/ride';
import { trainingPlan } from '../data/trainingPlan';
import { useStrava } from '../hooks/useStrava';

const zoneColors: Record<HeartRateZone, { bg: string; text: string; hex: string }> = {
  Z1: { bg: 'bg-green-500/20', text: 'text-green-400', hex: '#4ade80' },
  Z2: { bg: 'bg-blue-500/20', text: 'text-blue-400', hex: '#60a5fa' },
  Z3: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', hex: '#facc15' },
  Z4: { bg: 'bg-orange-500/20', text: 'text-orange-400', hex: '#fb923c' },
  Z5: { bg: 'bg-red-500/20', text: 'text-red-400', hex: '#f87171' },
};

const progressGoals: ProgressGoal[] = [
  {
    id: 'baseline',
    title: 'Baseline (Semana 1)',
    distanceTarget: 21,
    speedTarget: 17,
    description: '21 millas a 17 mph',
  },
  {
    id: 'week8',
    title: 'Meta Semana 8',
    distanceTarget: 25,
    speedTarget: 18.5,
    description: '25 millas a 18.5 mph',
  },
  {
    id: 'week12',
    title: 'Meta Semana 12',
    distanceTarget: 30,
    speedTarget: 19,
    description: '30 millas a 19 mph',
  },
  {
    id: 'granfondo',
    title: 'Gran Fondo',
    distanceTarget: 105,
    speedTarget: 17,
    description: 'Completar 105 millas',
  },
];

interface WeightEntry {
  id: string;
  date: string;
  weight_lbs: number;
  created_at: string;
}


export default function ProgresoTab() {
  const { isConnected, athlete, athleteProfile, athleteStats, loading: stravaLoading, connectStrava, disconnect, getAccessToken } = useStrava();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [formData, setFormData] = useState<RideFormData>({
    date: new Date().toISOString().split('T')[0],
    distance_miles: '',
    duration_hours: '',
    duration_minutes: '',
    avg_speed_mph: '',
    avg_heart_rate: '',
    predominant_zone: 'Z2',
    notes: '',
  });

  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [weeklyProgressId, setWeeklyProgressId] = useState<string | null>(null);

  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [weightFormData, setWeightFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight_lbs: '',
  });

  useEffect(() => {
    fetchRides();
    fetchWeeklyProgress();
    fetchWeightEntries();
    loadLastSync();
  }, []);

  const loadLastSync = () => {
    const stored = localStorage.getItem('strava_last_sync');
    if (stored) {
      setLastSync(new Date(stored));
    }
  };

  const fetchRides = async () => {
    try {
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setRides(data || []);
    } catch (error) {
      console.error('Error fetching rides:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('weekly_progress')
        .select('*')
        .eq('current_week', true)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setCurrentWeek(data.week_number);
        setCompletedWorkouts(data.completed_workouts as number[]);
        setWeeklyProgressId(data.id);
      }
    } catch (error) {
      console.error('Error fetching weekly progress:', error);
    }
  };

  const fetchWeightEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('weight_entries')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setWeightEntries(data || []);
    } catch (error) {
      console.error('Error fetching weight entries:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const totalMinutes =
      parseInt(formData.duration_hours || '0') * 60 + parseInt(formData.duration_minutes || '0');

    const newRide = {
      date: formData.date,
      distance_miles: parseFloat(formData.distance_miles),
      duration_minutes: totalMinutes,
      avg_speed_mph: parseFloat(formData.avg_speed_mph),
      avg_heart_rate: parseInt(formData.avg_heart_rate),
      predominant_zone: formData.predominant_zone,
      notes: formData.notes,
    };

    try {
      const { error } = await supabase.from('rides').insert([newRide]);

      if (error) throw error;

      await fetchRides();

      setFormData({
        date: new Date().toISOString().split('T')[0],
        distance_miles: '',
        duration_hours: '',
        duration_minutes: '',
        avg_speed_mph: '',
        avg_heart_rate: '',
        predominant_zone: 'Z2',
        notes: '',
      });
    } catch (error) {
      console.error('Error saving ride:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este ride?')) return;

    try {
      const { error } = await supabase.from('rides').delete().eq('id', id);

      if (error) throw error;
      await fetchRides();
    } catch (error) {
      console.error('Error deleting ride:', error);
    }
  };

  const calculateMetrics = (): RideMetrics & { totalElevation: number } => {
    const startDate = new Date('2026-03-09');
    const filteredRides = rides.filter(ride => new Date(ride.date) >= startDate);

    if (filteredRides.length === 0) {
      return { totalMiles: 0, avgSpeed: 0, longestRide: 0, totalRides: 0, totalElevation: 0 };
    }

    const totalMiles = filteredRides.reduce((sum, ride) => sum + parseFloat(ride.distance_miles.toString()), 0);
    const avgSpeed =
      filteredRides.reduce((sum, ride) => sum + parseFloat(ride.avg_speed_mph.toString()), 0) / filteredRides.length;
    const longestRide = Math.max(...filteredRides.map((ride) => parseFloat(ride.distance_miles.toString())));
    const totalElevation = filteredRides.reduce((sum, ride) => sum + (ride.elevation_feet || 0), 0);

    return {
      totalMiles: Math.round(totalMiles * 10) / 10,
      avgSpeed: Math.round(avgSpeed * 10) / 10,
      longestRide: Math.round(longestRide * 10) / 10,
      totalRides: filteredRides.length,
      totalElevation: Math.round(totalElevation),
    };
  };

  const getBestRide = () => {
    if (rides.length === 0) return null;

    return rides.reduce((best, current) => {
      const currentDistance = parseFloat(current.distance_miles.toString());
      const currentSpeed = parseFloat(current.avg_speed_mph.toString());
      const bestDistance = parseFloat(best.distance_miles.toString());
      const bestSpeed = parseFloat(best.avg_speed_mph.toString());

      const currentScore = currentDistance * currentSpeed;
      const bestScore = bestDistance * bestSpeed;

      return currentScore > bestScore ? current : best;
    }, rides[0]);
  };

  const checkGoalAchieved = (goal: ProgressGoal): boolean => {
    const bestRide = getBestRide();
    if (!bestRide) return false;

    const distance = parseFloat(bestRide.distance_miles.toString());
    const speed = parseFloat(bestRide.avg_speed_mph.toString());

    if (goal.id === 'granfondo') {
      return distance >= goal.distanceTarget;
    }

    return distance >= goal.distanceTarget && speed >= goal.speedTarget;
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleWeekChange = async (weekNumber: number) => {
    try {
      if (weeklyProgressId) {
        await supabase
          .from('weekly_progress')
          .update({ current_week: false })
          .eq('id', weeklyProgressId);
      }

      const week = trainingPlan.find((w) => w.weekNumber === weekNumber);
      if (!week) return;

      const { data, error } = await supabase
        .from('weekly_progress')
        .insert([
          {
            week_number: weekNumber,
            phase_name: week.phase,
            completed_workouts: [],
            current_week: true,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setCurrentWeek(weekNumber);
      setCompletedWorkouts([]);
      setWeeklyProgressId(data.id);
    } catch (error) {
      console.error('Error updating week:', error);
    }
  };

  const toggleWorkout = async (workoutIndex: number) => {
    const newCompleted = completedWorkouts.includes(workoutIndex)
      ? completedWorkouts.filter((i) => i !== workoutIndex)
      : [...completedWorkouts, workoutIndex];

    setCompletedWorkouts(newCompleted);

    if (weeklyProgressId) {
      try {
        await supabase
          .from('weekly_progress')
          .update({ completed_workouts: newCompleted, updated_at: new Date().toISOString() })
          .eq('id', weeklyProgressId);
      } catch (error) {
        console.error('Error updating workout:', error);
      }
    }
  };

  const handleWeightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry = {
      date: weightFormData.date,
      weight_lbs: parseFloat(weightFormData.weight_lbs),
    };

    try {
      const { error } = await supabase.from('weight_entries').insert([newEntry]);

      if (error) throw error;

      await fetchWeightEntries();

      setWeightFormData({
        date: new Date().toISOString().split('T')[0],
        weight_lbs: '',
      });
    } catch (error) {
      console.error('Error saving weight:', error);
    }
  };

  const estimateHeartRateZone = (avgHr: number | null): HeartRateZone => {
    if (!avgHr) return 'Z2';
    if (avgHr < 100) return 'Z1';
    if (avgHr < 120) return 'Z2';
    if (avgHr < 133) return 'Z3';
    if (avgHr < 149) return 'Z4';
    return 'Z5';
  };

  const syncStravaActivities = async () => {
    if (!isConnected) return;

    setSyncing(true);
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error('No access token available');
      }

      const response = await fetch('/.netlify/functions/strava-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Strava activities');
      }

      const activities = await response.json() as StravaActivity[];

      for (const activity of activities) {
        const { data: existing } = await supabase
          .from('rides')
          .select('id')
          .eq('strava_id', activity.strava_id)
          .maybeSingle();

        if (existing) {
          continue;
        }

        const newRide = {
          date: activity.date,
          distance_miles: activity.distance_miles,
          duration_minutes: activity.duration_minutes,
          avg_speed_mph: activity.avg_speed_mph,
          avg_heart_rate: activity.avg_heart_rate || 0,
          predominant_zone: estimateHeartRateZone(activity.avg_heart_rate),
          notes: `${activity.name} (${activity.type})`,
          strava_id: activity.strava_id,
          elevation_feet: activity.elevation_feet,
        };

        await supabase.from('rides').insert([newRide]);
      }

      const syncTime = new Date();
      setLastSync(syncTime);
      localStorage.setItem('strava_last_sync', syncTime.toISOString());

      await fetchRides();
    } catch (error) {
      console.error('Error syncing Strava activities:', error);
      alert('Error al sincronizar con Strava. Por favor intenta de nuevo.');
    } finally {
      setSyncing(false);
    }
  };

  const getWeightProgress = () => {
    const startWeight = 194;
    const goalWeight = 184;
    const currentWeight = weightEntries.length > 0 ? weightEntries[weightEntries.length - 1].weight_lbs : startWeight;
    const lostWeight = startWeight - currentWeight;
    const remainingWeight = currentWeight - goalWeight;

    let message = 'Buen comienzo Tommy, sigue así';
    if (lostWeight >= 10) {
      message = 'Meta alcanzada, listo para el Gran Fondo';
    } else if (lostWeight >= 7) {
      message = 'Casi en la meta, el Gran Fondo te espera';
    } else if (lostWeight >= 4) {
      message = 'Excelente progreso, vas por buen camino';
    }

    return { startWeight, goalWeight, currentWeight, lostWeight, remainingWeight, message };
  };

  const getWeightChartData = () => {
    const baseData = [{ date: 'Mar 1', peso: 194 }];
    const entriesData = weightEntries.map((entry) => ({
      date: new Date(entry.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
      peso: parseFloat(entry.weight_lbs.toString()),
    }));
    return [...baseData, ...entriesData];
  };

  const getVelocityChartData = () => {
    return [...rides]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((ride) => ({
        date: new Date(ride.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
        velocidad: parseFloat(ride.avg_speed_mph.toString()),
      }));
  };

  const getDistanceChartData = () => {
    return [...rides]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((ride) => ({
        date: new Date(ride.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
        distancia: parseFloat(ride.distance_miles.toString()),
      }));
  };

  const getZoneDistributionData = () => {
    const ridesWithHR = rides.filter(ride => ride.avg_heart_rate > 0);

    const zoneCounts: Record<HeartRateZone, number> = {
      Z1: 0,
      Z2: 0,
      Z3: 0,
      Z4: 0,
      Z5: 0,
    };

    ridesWithHR.forEach((ride) => {
      zoneCounts[ride.predominant_zone]++;
    });

    const total = ridesWithHR.length;
    if (total === 0) return [];

    return Object.entries(zoneCounts)
      .filter(([, count]) => count > 0)
      .map(([zone, count]) => ({
        name: zone,
        value: Math.round((count / total) * 100),
        color: zoneColors[zone as HeartRateZone].hex,
      }));
  };

  const getDistanceBarColor = (distance: number) => {
    if (distance >= 30) return '#d4af37';
    if (distance >= 25) return '#60a5fa';
    if (distance >= 21) return '#3b82f6';
    return '#1e40af';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-gray-300 text-sm font-semibold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white text-sm">
              {entry.name}: <span className="font-bold">{entry.value}</span>
              {entry.name === 'velocidad' ? ' mph' : entry.name === 'distancia' ? ' mi' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const calculateFitnessScore = (): { score: number; message: string } => {
    let totalScore = 0;

    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    const recentRides = rides.filter(ride => new Date(ride.date) >= fourWeeksAgo);
    const ridesScore = Math.min((recentRides.length / 12) * 40, 40);
    totalScore += ridesScore;

    const last5Rides = [...rides]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    if (last5Rides.length > 0) {
      const avgSpeed = last5Rides.reduce((sum, ride) => sum + parseFloat(ride.avg_speed_mph.toString()), 0) / last5Rides.length;
      const speedScore = Math.min(((avgSpeed - 15) / 6) * 40, 40);
      totalScore += Math.max(speedScore, 0);
    }

    const currentWeekData = trainingPlan.find(w => w.weekNumber === currentWeek);
    if (currentWeekData) {
      const workoutsScore = (completedWorkouts.length / 7) * 20;
      totalScore += workoutsScore;
    }

    const finalScore = Math.round(Math.min(totalScore, 100));
    const message = finalScore >= 70
      ? 'Listo para el Gran Fondo 🏆'
      : 'Sigue pedaleando, Tommy 🚴';

    return { score: finalScore, message };
  };

  const metrics = calculateMetrics();
  const fitnessScore = calculateFitnessScore();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Cargando...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6 flex items-center gap-2">
        <BarChart3 className="w-7 h-7" />
        PROGRESO
      </h2>

      {/* STRAVA CONNECTION */}
      {!isConnected && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FC4C02]/10 mb-4">
                <Activity className="w-8 h-8 text-[#FC4C02]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Conecta con Strava
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Sincroniza tus actividades automáticamente y lleva un mejor control de tu entrenamiento
              </p>
            </div>
            <button
              onClick={connectStrava}
              disabled={stravaLoading}
              className="w-full bg-[#FC4C02] hover:bg-[#FC4C02]/90 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {stravaLoading ? (
                'Conectando...'
              ) : (
                <>
                  Conectar con Strava 🚴
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {isConnected && athleteProfile && (
        <div className="bg-gradient-to-r from-[#FC4C02]/10 to-[#FC4C02]/5 border border-[#FC4C02]/30 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              {athleteProfile.profile_medium ? (
                <img
                  src={athleteProfile.profile_medium}
                  alt={`${athleteProfile.firstname} ${athleteProfile.lastname}`}
                  className="w-20 h-20 rounded-full border-2 border-[#FC4C02]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#FC4C02] flex items-center justify-center">
                  <Activity className="w-10 h-10 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {athleteProfile.firstname} {athleteProfile.lastname}
                </h3>
                {(athleteProfile.city || athleteProfile.country) && (
                  <p className="text-gray-400 text-sm mb-2">
                    {[athleteProfile.city, athleteProfile.state, athleteProfile.country].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>

          {athleteStats?.all_ride_totals && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">
                  {athleteStats.all_ride_totals.count.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Total de Rides Históricos</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">
                  {(athleteStats.all_ride_totals.distance * 0.000621371).toFixed(0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Millas Totales Históricas</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">
                  {(athleteStats.all_ride_totals.elevation_gain * 3.28084).toFixed(0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Elevación Total Histórica (ft)</div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#FC4C02]/20">
            <div className="flex-1 flex items-center gap-2">
              <button
                onClick={syncStravaActivities}
                disabled={syncing}
                className="flex-1 bg-[#FC4C02] hover:bg-[#FC4C02]/90 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Sincronizando...' : 'Sincronizar Actividades'}
              </button>
              {lastSync && (
                <div className="text-xs text-gray-400 text-right">
                Última sincronización:<br />
                {lastSync.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })} a las {lastSync.toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
            </div>
            <button
              onClick={disconnect}
              className="text-sm text-gray-400 hover:text-white transition-colors px-4"
            >
              Desconectar
            </button>
          </div>
        </div>
      )}

      {/* FITNESS SCORE */}
      {isConnected && (
        <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-gold" />
            Fitness Score
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="#374151"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="#d4af37"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(fitnessScore.score / 100) * 502.4} 502.4`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-gold">{fitnessScore.score}</div>
                <div className="text-sm text-gray-400">/ 100</div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-2xl font-bold text-white mb-4">{fitnessScore.message}</p>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold"></div>
                  <span>40% - Rides ultimas 4 semanas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold"></div>
                  <span>40% - Velocidad promedio ultimos 5 rides</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold"></div>
                  <span>20% - Entrenamientos completados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 1: REGISTRO DE RIDES */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gold" />
          Registro de Rides
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Fecha
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <Activity className="w-4 h-4 inline mr-1" />
                Distancia (millas)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.distance_miles}
                onChange={(e) => setFormData({ ...formData, distance_miles: e.target.value })}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="21.5"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Tiempo
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.duration_hours}
                  onChange={(e) => setFormData({ ...formData, duration_hours: e.target.value })}
                  className="w-1/2 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Hrs"
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  required
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                  className="w-1/2 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Min"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Velocidad Promedio (mph)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.avg_speed_mph}
                onChange={(e) => setFormData({ ...formData, avg_speed_mph: e.target.value })}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="17.5"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <Heart className="w-4 h-4 inline mr-1" />
                FC Promedio (bpm)
              </label>
              <input
                type="number"
                required
                value={formData.avg_heart_rate}
                onChange={(e) => setFormData({ ...formData, avg_heart_rate: e.target.value })}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="110"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                <Target className="w-4 h-4 inline mr-1" />
                Zona Predominante
              </label>
              <select
                required
                value={formData.predominant_zone}
                onChange={(e) =>
                  setFormData({ ...formData, predominant_zone: e.target.value as HeartRateZone })
                }
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="Z1">Z1 - Recuperación</option>
                <option value="Z2">Z2 - Aeróbico Base</option>
                <option value="Z3">Z3 - Tempo</option>
                <option value="Z4">Z4 - Umbral</option>
                <option value="Z5">Z5 - VO2 Max</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Notas (opcional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
              rows={2}
              placeholder="Cómo te sentiste, condiciones del clima, etc."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold/90 text-navy-dark font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Guardar Ride
          </button>
        </form>
      </div>

      {/* SECCIÓN 2: MIS MÉTRICAS */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-gold" />
          Estadísticas desde el 9 de Marzo 2026
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{metrics.totalMiles}</div>
            <div className="text-sm text-gray-400">Millas Totales</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{metrics.avgSpeed}</div>
            <div className="text-sm text-gray-400">Velocidad Promedio (mph)</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/30 rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <Target className="w-8 h-8 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{metrics.longestRide}</div>
            <div className="text-sm text-gray-400">Ride Más Largo (mi)</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{metrics.totalElevation.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Elevación Total (ft)</div>
          </div>

          <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <Calendar className="w-8 h-8 text-gold" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{metrics.totalRides}</div>
            <div className="text-sm text-gray-400">Total de Rides</div>
          </div>
        </div>
      </div>

      {/* VISUALIZACIONES */}
      {rides.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* GRÁFICA 1: Velocidad Promedio por Ride */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Velocidad Promedio por Ride</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getVelocityChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'mph', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={17}
                  stroke="#6b7280"
                  strokeDasharray="5 5"
                  label={{ value: 'Baseline', fill: '#9ca3af', fontSize: 12 }}
                />
                <ReferenceLine
                  y={19}
                  stroke="#d4af37"
                  strokeDasharray="5 5"
                  label={{ value: 'Meta Final', fill: '#d4af37', fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="velocidad"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="velocidad"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* GRÁFICA 2: Distancia por Ride */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Distancia por Ride</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getDistanceChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'millas', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={21}
                  stroke="#6b7280"
                  strokeDasharray="5 5"
                  label={{ value: 'Baseline (21 mi)', fill: '#9ca3af', fontSize: 12 }}
                />
                <Bar dataKey="distancia" name="distancia">
                  {getDistanceChartData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getDistanceBarColor(entry.distancia)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* GRÁFICA 3: Distribución de Zonas FC */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">Distribución de Zonas de Frecuencia Cardíaca</h3>
            <div className="mb-4 text-sm text-gray-400">
              <p className="mb-2">Basado en FC Máxima: 166 bpm</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span>Z1: &lt;100 bpm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <span>Z2: 100-120 bpm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-yellow-500"></div>
                  <span>Z3: 120-133 bpm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-orange-500"></div>
                  <span>Z4: 133-149 bpm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500"></div>
                  <span>Z5: &gt;149 bpm</span>
                </div>
              </div>
            </div>
            {getZoneDistributionData().length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getZoneDistributionData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={{ stroke: '#9ca3af' }}
                  >
                    {getZoneDistributionData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-lg">
                            <p className="text-white text-sm">
                              <span className="font-bold">{payload[0].name}</span>: {payload[0].value}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                    wrapperStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No hay datos de frecuencia cardíaca disponibles
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 mb-6 text-center">
          <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">
            Registra tu primer ride para ver tu progreso aquí
          </p>
        </div>
      )}

      {/* SEMANA ACTUAL - Training Checklist */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gold" />
          Semana Actual del Plan
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Selecciona tu semana:
          </label>
          <select
            value={currentWeek}
            onChange={(e) => handleWeekChange(parseInt(e.target.value))}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {trainingPlan.map((week) => (
              <option key={week.weekNumber} value={week.weekNumber}>
                Semana {week.weekNumber} - {week.name} ({week.phase})
              </option>
            ))}
          </select>
        </div>

        {(() => {
          const currentWeekData = trainingPlan.find((w) => w.weekNumber === currentWeek);
          if (!currentWeekData) return null;

          return (
            <div>
              <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-lg p-4 mb-4">
                <h4 className="text-lg font-bold text-gold mb-1">{currentWeekData.name}</h4>
                <p className="text-sm text-gray-400">
                  {currentWeekData.phase} • {currentWeekData.startDate} - {currentWeekData.endDate}
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Progreso Semanal</span>
                    <span className="font-bold text-gold">
                      {completedWorkouts.length} de 7 entrenamientos completados
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gold rounded-full h-2 transition-all duration-300"
                      style={{ width: `${(completedWorkouts.length / 7) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {currentWeekData.workouts.map((workout, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-3 transition-all cursor-pointer hover:bg-gray-900/50 ${
                      completedWorkouts.includes(index)
                        ? 'bg-green-500/10 border-green-500/50'
                        : 'bg-gray-900/30 border-gray-600'
                    }`}
                    onClick={() => toggleWorkout(index)}
                  >
                    <div className="flex items-center gap-3">
                      {completedWorkouts.includes(index) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-gold">{workout.day}</span>
                          <span className="text-white font-semibold">{workout.name}</span>
                          {workout.duration > 0 && (
                            <span className="text-xs text-gray-400">({workout.duration} min)</span>
                          )}
                        </div>
                        {workout.description && (
                          <p className="text-xs text-gray-400">{workout.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {currentWeek < 13 && (
                <button
                  onClick={() => handleWeekChange(currentWeek + 1)}
                  className="w-full mt-4 bg-gold hover:bg-gold/90 text-navy-dark font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Avanzar a Semana {currentWeek + 1}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })()}
      </div>

      {/* PESO Y COMPOSICIÓN */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-gold" />
          Peso y Composición
        </h3>

        <form onSubmit={handleWeightSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Fecha</label>
            <input
              type="date"
              required
              value={weightFormData.date}
              onChange={(e) => setWeightFormData({ ...weightFormData, date: e.target.value })}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Peso (lbs)</label>
            <input
              type="number"
              step="0.1"
              required
              value={weightFormData.weight_lbs}
              onChange={(e) => setWeightFormData({ ...weightFormData, weight_lbs: e.target.value })}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="184.0"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-navy-dark font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>

        {(() => {
          const progress = getWeightProgress();
          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Peso Inicial</div>
                  <div className="text-2xl font-bold text-white">{progress.startWeight} lbs</div>
                  <div className="text-xs text-gray-500">Marzo 2026</div>
                </div>
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Peso Actual</div>
                  <div className="text-2xl font-bold text-gold">{progress.currentWeight} lbs</div>
                  <div className="text-xs text-green-400">
                    -{progress.lostWeight.toFixed(1)} lbs
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Meta</div>
                  <div className="text-2xl font-bold text-white">{progress.goalWeight} lbs</div>
                  <div className="text-xs text-gray-500">Junio 2026</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-lg p-4 mb-6">
                <p className="text-center text-gold font-bold text-lg">{progress.message}</p>
                {progress.remainingWeight > 0 && (
                  <p className="text-center text-gray-400 text-sm mt-1">
                    Faltan {progress.remainingWeight.toFixed(1)} lbs para la meta
                  </p>
                )}
              </div>

              {weightEntries.length > 0 && (
                <div>
                  <h4 className="text-md font-bold text-white mb-3">Progreso del Peso</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={getWeightChartData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                      <YAxis
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                        domain={[180, 200]}
                        label={{ value: 'lbs', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <ReferenceLine
                        y={194}
                        stroke="#6b7280"
                        strokeDasharray="5 5"
                        label={{ value: 'Inicial', fill: '#9ca3af', fontSize: 12 }}
                      />
                      <ReferenceLine
                        y={184}
                        stroke="#4ade80"
                        strokeDasharray="5 5"
                        label={{ value: 'Meta', fill: '#4ade80', fontSize: 12 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="peso"
                        stroke="#d4af37"
                        strokeWidth={3}
                        dot={{ fill: '#d4af37', r: 5 }}
                        activeDot={{ r: 7 }}
                        name="peso"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* SECCIÓN 3: PROGRESO REAL VS METAS DEL PLAN */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-gold" />
          Progreso Real vs Metas del Plan
        </h3>

        {(() => {
          const bestRide = getBestRide();
          return (
            <>
              {bestRide && (
                <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-lg p-4 mb-6">
                  <h4 className="text-sm text-gray-400 mb-2">Mejor Ride Registrado</h4>
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-2xl font-bold text-white">{bestRide.distance_miles} mi</div>
                      <div className="text-xs text-gray-400">Distancia</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{bestRide.avg_speed_mph} mph</div>
                      <div className="text-xs text-gray-400">Velocidad Promedio</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">
                        {new Date(bestRide.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {progressGoals.map((goal) => {
                  const achieved = checkGoalAchieved(goal);
                  const bestDistance = bestRide ? parseFloat(bestRide.distance_miles.toString()) : 0;
                  const bestSpeed = bestRide ? parseFloat(bestRide.avg_speed_mph.toString()) : 0;

                  return (
                    <div
                      key={goal.id}
                      className={`border rounded-lg p-4 transition-all ${
                        achieved
                          ? 'bg-green-500/10 border-green-500/50'
                          : 'bg-gray-900/50 border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {achieved ? (
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                          ) : (
                            <Clock className="w-6 h-6 text-gray-500" />
                          )}
                          <div>
                            <h4 className={`font-bold ${achieved ? 'text-green-400' : 'text-white'}`}>
                              {goal.title}
                            </h4>
                            <p className="text-sm text-gray-400">{goal.description}</p>
                          </div>
                        </div>
                        {achieved ? (
                          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            LOGRADO
                          </span>
                        ) : (
                          <span className="bg-gray-600 text-gray-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            PENDIENTE
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-gray-400 w-20">Distancia:</div>
                          <div className="flex-1 bg-gray-900 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                bestDistance >= goal.distanceTarget ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{
                                width: `${Math.min((bestDistance / goal.distanceTarget) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          <div className="text-xs text-gray-400 w-24 text-right">
                            {bestDistance.toFixed(1)} / {goal.distanceTarget} mi
                          </div>
                        </div>

                        {goal.id !== 'granfondo' && (
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-gray-400 w-20">Velocidad:</div>
                            <div className="flex-1 bg-gray-900 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full transition-all ${
                                  bestSpeed >= goal.speedTarget ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                style={{
                                  width: `${Math.min((bestSpeed / goal.speedTarget) * 100, 100)}%`,
                                }}
                              />
                            </div>
                            <div className="text-xs text-gray-400 w-24 text-right">
                              {bestSpeed.toFixed(1)} / {goal.speedTarget} mph
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}
      </div>

      {/* SECCIÓN 4: HISTORIAL */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gold" />
          Historial de Rides
        </h3>

        {rides.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No hay rides registrados aún. ¡Comienza registrando tu primer ride!
          </div>
        ) : (
          <div className="space-y-4">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className={`border rounded-lg p-4 hover:bg-gray-800/30 transition-all ${
                  ride.strava_id
                    ? 'bg-[#FC4C02]/5 border-[#FC4C02]/30'
                    : 'bg-gray-900/50 border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {ride.strava_id && (
                        <div className="flex items-center gap-1 bg-[#FC4C02] text-white text-xs font-bold px-2 py-0.5 rounded">
                          <Activity className="w-3 h-3" />
                          Strava
                        </div>
                      )}
                      <span className="text-sm text-gray-400">
                        {new Date(ride.date).toLocaleDateString('es-ES', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-lg">
                      {ride.notes && ride.strava_id ? ride.notes : `Ride de ${ride.distance_miles} millas`}
                    </h4>
                  </div>
                  <button
                    onClick={() => handleDelete(ride.id)}
                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                    title="Eliminar ride"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Distancia</div>
                    <div className="text-lg font-bold text-white">{ride.distance_miles} mi</div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Tiempo</div>
                    <div className="text-lg font-bold text-white">{formatDuration(ride.duration_minutes)}</div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Velocidad</div>
                    <div className="text-lg font-bold text-white">{ride.avg_speed_mph} mph</div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">FC Promedio</div>
                    <div className="text-lg font-bold text-white">
                      {ride.avg_heart_rate > 0 ? `${ride.avg_heart_rate} bpm` : '-'}
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Zona</div>
                    <div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${zoneColors[ride.predominant_zone].bg} ${zoneColors[ride.predominant_zone].text} font-semibold`}
                      >
                        {ride.predominant_zone}
                      </span>
                    </div>
                  </div>

                  {ride.elevation_feet && (
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Elevación</div>
                      <div className="text-lg font-bold text-white">{ride.elevation_feet} ft</div>
                    </div>
                  )}
                </div>

                {ride.notes && !ride.strava_id && (
                  <div className="mt-3 text-sm text-gray-400 bg-gray-800/30 rounded px-3 py-2">
                    {ride.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
