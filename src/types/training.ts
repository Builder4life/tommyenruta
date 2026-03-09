export type WorkoutType = 'rest' | 'ride' | 'strength' | 'long' | 'recovery' | 'travel' | 'race';
export type HeartRateZone = 'Z1' | 'Z2' | 'Z3' | 'Z4' | 'Z5';

export interface ZoneInterval {
  zone: HeartRateZone;
  duration: number;
}

export interface Workout {
  day: string;
  type: WorkoutType;
  name: string;
  duration: number;
  zones: ZoneInterval[];
  description?: string;
}

export interface Week {
  weekNumber: number;
  phase: string;
  name: string;
  startDate: string;
  endDate: string;
  tss: number;
  volume: number;
  isRecovery?: boolean;
  isTravel?: boolean;
  isEvent?: boolean;
  workouts: Workout[];
}
