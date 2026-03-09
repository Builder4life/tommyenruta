/*
  # Add Strava Integration to Rides Table

  1. Changes
    - Add `strava_id` column to `rides` table to store unique Strava activity ID
    - Add `elevation_feet` column to store elevation gain
    - Add unique constraint on `strava_id` to prevent duplicate imports
    - Add index on `strava_id` for faster lookups

  2. Important Notes
    - The `strava_id` is nullable to support both manually entered rides and Strava imports
    - Unique constraint ensures we don't import the same Strava activity twice
    - Existing rides will have NULL strava_id (manually entered)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rides' AND column_name = 'strava_id'
  ) THEN
    ALTER TABLE rides ADD COLUMN strava_id text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rides' AND column_name = 'elevation_feet'
  ) THEN
    ALTER TABLE rides ADD COLUMN elevation_feet integer;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'rides_strava_id_key'
  ) THEN
    ALTER TABLE rides ADD CONSTRAINT rides_strava_id_key UNIQUE (strava_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS rides_strava_id_idx ON rides (strava_id);
