export type HeartRateZone = 'Z1' | 'Z2' | 'Z3' | 'Z4' | 'Z5';

export interface Ride {
  id: string;
  user_id: string;
  date: string;
  distance_miles: number;
  duration_minutes: number;
  avg_speed_mph: number;
  avg_heart_rate: number;
  predominant_zone: HeartRateZone;
  notes: string;
  created_at: string;
  strava_id?: string | null;
  elevation_feet?: number | null;
}

export interface StravaActivity {
  strava_id: string;
  name: string;
  date: string;
  distance_miles: number;
  duration_minutes: number;
  avg_speed_mph: number;
  avg_heart_rate: number | null;
  elevation_feet: number | null;
  type: string;
}

export interface RideFormData {
  date: string;
  distance_miles: string;
  duration_hours: string;
  duration_minutes: string;
  avg_speed_mph: string;
  avg_heart_rate: string;
  predominant_zone: HeartRateZone;
  notes: string;
}

export interface RideMetrics {
  totalMiles: number;
  avgSpeed: number;
  longestRide: number;
  totalRides: number;
}

export interface ProgressGoal {
  id: string;
  title: string;
  distanceTarget: number;
  speedTarget: number;
  description: string;
}
