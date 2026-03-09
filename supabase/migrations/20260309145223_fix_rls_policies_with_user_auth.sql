/*
  # Fix RLS Security Policies with Proper User Authentication

  1. Overview
    This migration fixes critical security issues where RLS policies allow unrestricted access
    using `USING (true)` and `WITH CHECK (true)`. We implement proper user-based access control.

  2. Changes Made
    
    a) Add user_id to tables that don't have it:
       - weekly_progress: Add user_id column with foreign key to auth.users
       - weight_entries: Add user_id column with foreign key to auth.users
       - rides: Already has user_id column
    
    b) Replace insecure RLS policies with secure ones:
       - All policies now check auth.uid() = user_id
       - Separate policies for SELECT, INSERT, UPDATE, DELETE
       - Only allow users to access their own data
    
  3. Security Improvements
    - Users can only view, insert, update, and delete their own records
    - Policies use auth.uid() to verify user identity
    - No more unrestricted access with USING (true)
    - Follows principle of least privilege

  4. Important Notes
    - This is a breaking change if the app was relying on unrestricted access
    - All new records must include user_id
    - Existing records without user_id will not be accessible until updated
*/

-- Add user_id to weekly_progress if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'weekly_progress' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE weekly_progress ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add user_id to weight_entries if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'weight_entries' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE weight_entries ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Ensure rides.user_id has proper foreign key constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'rides' AND constraint_name = 'rides_user_id_fkey'
  ) THEN
    ALTER TABLE rides DROP COLUMN IF EXISTS user_id;
    ALTER TABLE rides ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Drop all existing insecure policies for rides
DROP POLICY IF EXISTS "Authenticated users can view all rides" ON rides;
DROP POLICY IF EXISTS "Authenticated users can insert rides" ON rides;
DROP POLICY IF EXISTS "Authenticated users can update rides" ON rides;
DROP POLICY IF EXISTS "Authenticated users can delete rides" ON rides;

-- Create secure policies for rides table
CREATE POLICY "Users can view own rides"
  ON rides
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rides"
  ON rides
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own rides"
  ON rides
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own rides"
  ON rides
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Drop all existing insecure policies for weekly_progress
DROP POLICY IF EXISTS "Users can view weekly progress" ON weekly_progress;
DROP POLICY IF EXISTS "Users can create weekly progress" ON weekly_progress;
DROP POLICY IF EXISTS "Users can update weekly progress" ON weekly_progress;
DROP POLICY IF EXISTS "Users can delete weekly progress" ON weekly_progress;

-- Create secure policies for weekly_progress table
CREATE POLICY "Users can view own weekly progress"
  ON weekly_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own weekly progress"
  ON weekly_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own weekly progress"
  ON weekly_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own weekly progress"
  ON weekly_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Drop all existing insecure policies for weight_entries
DROP POLICY IF EXISTS "Users can view weight entries" ON weight_entries;
DROP POLICY IF EXISTS "Users can create weight entries" ON weight_entries;
DROP POLICY IF EXISTS "Users can update weight entries" ON weight_entries;
DROP POLICY IF EXISTS "Users can delete weight entries" ON weight_entries;

-- Create secure policies for weight_entries table
CREATE POLICY "Users can view own weight entries"
  ON weight_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own weight entries"
  ON weight_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own weight entries"
  ON weight_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own weight entries"
  ON weight_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for user_id lookups
CREATE INDEX IF NOT EXISTS weekly_progress_user_id_idx ON weekly_progress(user_id);
CREATE INDEX IF NOT EXISTS weight_entries_user_id_idx ON weight_entries(user_id);
CREATE INDEX IF NOT EXISTS rides_user_id_idx ON rides(user_id);