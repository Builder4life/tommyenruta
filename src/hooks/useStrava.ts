import { useState, useEffect } from 'react';

export interface StravaAthlete {
  id: number;
  firstname: string;
  lastname: string;
  profile_medium?: string;
  profile?: string;
  city?: string;
  state?: string;
  country?: string;
  sex?: string;
  premium?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface StravaAthleteStats {
  recent_ride_totals?: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
  all_ride_totals?: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
}

interface StravaTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete?: StravaAthlete;
}

const STRAVA_TOKENS_KEY = 'strava_tokens';

export function useStrava() {
  const [tokens, setTokens] = useState<StravaTokens | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [athleteProfile, setAthleteProfile] = useState<StravaAthlete | null>(null);
  const [athleteStats, setAthleteStats] = useState<StravaAthleteStats | null>(null);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Load tokens from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STRAVA_TOKENS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTokens(parsed);
        // Check if token needs refresh
        if (parsed.expires_at && Date.now() / 1000 > parsed.expires_at) {
          refreshToken(parsed.refresh_token);
        }
      } catch (err) {
        console.error('Failed to parse stored tokens:', err);
        localStorage.removeItem(STRAVA_TOKENS_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');

    if (code && scope?.includes('activity:read_all')) {
      exchangeToken(code);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const getRedirectUri = () => {
    return 'https://tommyenruta.netlify.app';
  };

  const connectStrava = async () => {
    try {
      setLoading(true);
      setError(null);

      const redirectUri = getRedirectUri();
      const apiUrl = `${supabaseUrl}/functions/v1/strava-auth?action=authorize&redirect_uri=${encodeURIComponent(redirectUri)}`;

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get authorization URL');
      }

      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Strava');
      setLoading(false);
    }
  };

  const exchangeToken = async (code: string) => {
    try {
      setLoading(true);
      setError(null);

      const redirectUri = getRedirectUri();
      const apiUrl = `${supabaseUrl}/functions/v1/strava-auth?action=token`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange token');
      }

      const data = await response.json();
      const tokenData: StravaTokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: data.expires_at,
        athlete: data.athlete,
      };

      localStorage.setItem(STRAVA_TOKENS_KEY, JSON.stringify(tokenData));
      setTokens(tokenData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to exchange token');
      setLoading(false);
    }
  };

  const refreshToken = async (refresh_token: string) => {
    try {
      const apiUrl = `${supabaseUrl}/functions/v1/strava-auth?action=refresh`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      const tokenData: StravaTokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: data.expires_at,
        athlete: tokens?.athlete,
      };

      localStorage.setItem(STRAVA_TOKENS_KEY, JSON.stringify(tokenData));
      setTokens(tokenData);
    } catch (err) {
      console.error('Failed to refresh token:', err);
      // If refresh fails, clear tokens and require re-authentication
      disconnect();
    }
  };

  const disconnect = () => {
    localStorage.removeItem(STRAVA_TOKENS_KEY);
    setTokens(null);
  };

  const getAccessToken = async (): Promise<string | null> => {
    if (!tokens) return null;

    // Check if token is expired or will expire in the next 5 minutes
    if (tokens.expires_at && Date.now() / 1000 > tokens.expires_at - 300) {
      await refreshToken(tokens.refresh_token);
      const updated = JSON.parse(localStorage.getItem(STRAVA_TOKENS_KEY) || 'null');
      return updated?.access_token || null;
    }

    return tokens.access_token;
  };

  const fetchAthleteProfile = async () => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) return;

      const response = await fetch('https://www.strava.com/api/v3/athlete', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch athlete profile');
      }

      const profile = await response.json();
      setAthleteProfile(profile);
    } catch (err) {
      console.error('Failed to fetch athlete profile:', err);
    }
  };

  const fetchAthleteStats = async () => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken || !tokens?.athlete?.id) return;

      const response = await fetch(
        `https://www.strava.com/api/v3/athletes/${tokens.athlete.id}/stats`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch athlete stats');
      }

      const stats = await response.json();
      setAthleteStats(stats);
    } catch (err) {
      console.error('Failed to fetch athlete stats:', err);
    }
  };

  useEffect(() => {
    if (tokens) {
      fetchAthleteProfile();
      fetchAthleteStats();
    }
  }, [tokens]);

  return {
    isConnected: !!tokens,
    athlete: tokens?.athlete,
    athleteProfile,
    athleteStats,
    loading,
    error,
    connectStrava,
    disconnect,
    getAccessToken,
    refetchProfile: fetchAthleteProfile,
    refetchStats: fetchAthleteStats,
  };
}
