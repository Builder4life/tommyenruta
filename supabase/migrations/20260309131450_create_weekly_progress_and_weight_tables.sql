/*
  # Weekly Progress and Weight Tracking Tables

  1. New Tables
    - `weekly_progress`
      - `id` (uuid, primary key)
      - `week_number` (integer) - Week number in the training plan (1-12)
      - `phase_name` (text) - Name of the training phase
      - `completed_workouts` (jsonb) - Array of completed workout indices [0-6]
      - `current_week` (boolean) - Whether this is the active week
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `weight_entries`
      - `id` (uuid, primary key)
      - `date` (date) - Date of weight measurement
      - `weight_lbs` (decimal) - Weight in pounds
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public access for read/write operations (single user app)

  3. Important Notes
    - weekly_progress stores training checklist state
    - weight_entries tracks body weight over time
    - Both tables use RLS but allow public access as this is a personal training app
*/

-- Create weekly_progress table
CREATE TABLE IF NOT EXISTS weekly_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_number integer NOT NULL,
  phase_name text NOT NULL,
  completed_workouts jsonb DEFAULT '[]'::jsonb,
  current_week boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create weight_entries table
CREATE TABLE IF NOT EXISTS weight_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  weight_lbs decimal(5,1) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE weekly_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for weekly_progress
CREATE POLICY "Allow public read access to weekly_progress"
  ON weekly_progress
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert to weekly_progress"
  ON weekly_progress
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update to weekly_progress"
  ON weekly_progress
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from weekly_progress"
  ON weekly_progress
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create policies for weight_entries
CREATE POLICY "Allow public read access to weight_entries"
  ON weight_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert to weight_entries"
  ON weight_entries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update to weight_entries"
  ON weight_entries
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete from weight_entries"
  ON weight_entries
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_weekly_progress_week_number ON weekly_progress(week_number);
CREATE INDEX IF NOT EXISTS idx_weight_entries_date ON weight_entries(date DESC);