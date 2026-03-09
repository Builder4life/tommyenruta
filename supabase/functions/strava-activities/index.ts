import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { access_token, per_page = 30 } = await req.json();

    if (!access_token) {
      return new Response(
        JSON.stringify({ error: "access_token is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const activitiesResponse = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=${per_page}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!activitiesResponse.ok) {
      const error = await activitiesResponse.text();
      return new Response(
        JSON.stringify({ error: "Failed to fetch activities", details: error }),
        {
          status: activitiesResponse.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const activities = await activitiesResponse.json();

    const rideActivities = activities
      .filter((activity: any) =>
        activity.type === "Ride" || activity.type === "VirtualRide"
      )
      .map((activity: any) => ({
        strava_id: activity.id.toString(),
        name: activity.name,
        date: activity.start_date.split("T")[0],
        distance_miles: Math.round((activity.distance / 1609) * 10) / 10,
        duration_minutes: Math.round(activity.moving_time / 60),
        avg_speed_mph: Math.round((activity.average_speed * 2.237) * 10) / 10,
        avg_heart_rate: activity.average_heartrate ? Math.round(activity.average_heartrate) : null,
        elevation_feet: activity.total_elevation_gain ? Math.round(activity.total_elevation_gain * 3.281) : null,
        type: activity.type,
      }));

    return new Response(
      JSON.stringify({ activities: rideActivities }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
