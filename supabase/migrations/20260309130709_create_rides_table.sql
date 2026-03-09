/*
  # Create Rides Tracking Table

  1. New Tables
    - `rides`
      - `id` (uuid, primary key) - Unique identifier for each ride
      - `user_id` (uuid) - User who logged the ride (for future multi-user support)
      - `date` (date) - Date of the ride
      - `distance_miles` (decimal) - Distance covered in miles
      - `duration_minutes` (integer) - Total duration in minutes
      - `avg_speed_mph` (decimal) - Average speed in mph
      - `avg_heart_rate` (integer) - Average heart rate in bpm
      - `predominant_zone` (text) - Predominant heart rate zone (Z1-Z5)
      - `notes` (text, optional) - Optional notes about the ride
      - `created_at` (timestamptz) - Timestamp when record was created
      
  2. Security
    - Enable RLS on `rides` table
    - Add policy for authenticated users to manage their own rides
    - Add policy for anonymous users (since auth is not implemented yet)
*/

CREATE TABLE IF NOT EXISTS rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT gen_random_uuid(),
  date date NOT NULL DEFAULT CURRENT_DATE,
  distance_miles decimal(6,2) NOT NULL,
  duration_minutes integer NOT NULL,
  avg_speed_mph decimal(5,2) NOT NULL,
  avg_heart_rate integer NOT NULL,
  predominant_zone text NOT NULL CHECK (predominant_zone IN ('Z1', 'Z2', 'Z3', 'Z4', 'Z5')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rides ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (since we don't have auth implemented)
-- In production with auth, this would check auth.uid()
CREATE POLICY "Allow all operations on rides"
  ON rides
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS rides_date_idx ON rides(date DESC);
CREATE INDEX IF NOT EXISTS rides_created_at_idx ON rides(created_at DESC);