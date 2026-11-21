// Deepwoods Data Project
// Cloudflare Worker
// Secure EPA AirNow API integration

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Handle air quality API requests
        if (url.pathname === "/api/air-quality") {
            try {
                if (!env.AIRNOW_API_KEY) {
                    return Response.json(
                        { error: "AirNow API key not configured" },
                        { status: 503 }
                    );
                }

                const airNowUrl = new URL(
                    "https://www.airnowapi.org/aqi/observation/zipCode/current/"
                );

                airNowUrl.searchParams.set("format", "application/json");
                airNowUrl.searchParams.set("zipCode", "48858");
                airNowUrl.searchParams.set("distance", "50");
                airNowUrl.searchParams.set("API_KEY", env.AIRNOW_API_KEY);

                const response = await fetch(airNowUrl);

                if (!response.ok) {
                    throw new Error(`AirNow returned ${response.status}`);
                }

                const data = await response.json();

                return Response.json(data, {
                    headers: {
                        "Cache-Control": "public, max-age=900"
                    }
                });

            } catch (error) {
                console.error("DDP AirNow error:", {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
    });

                return Response.json(
                    { error: "Air quality data unavailable" },
                    { status: 502 }
                );
            }
        }

        // Serve existing website files
        return env.ASSETS.fetch(request);
    }
};