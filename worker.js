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

                const response = await fetch(airNowUrl.toString());

                if (!response.ok) {
                    throw new Error(`AirNow returned ${response.status}`);
                }

                const rawResponse = await response.text();

                console.log("AirNow response status:", response.status);
                console.log("AirNow content type:",
                    response.headers.get("content-type"));

                if (rawResponse.trimStart().startsWith("<")) {
                    throw new Error(
                        `AirNow returned HTML instead of JSON (HTTP ${response.status})`
                    );
                }

const data = JSON.parse(rawResponse);

                return Response.json(data, {
                    headers: {
                        "Cache-Control": "public, max-age=900"
                    }
                });

            } catch (error) {
                console.error(
                    "DDP AirNow diagnostic:",
                     JSON.stringify({
                         name: error.name,
                        message: error.message,
                         cause: error.cause?.message ?? null
                    })
        );

                return Response.json(
                    {
                        error: "Air quality data unavailable",
                        diagnostic: error.message,
                        type: error.name
                    },
                    {
                        status: 502,
                        headers: {
                            "Cache-Control": "no-store"
                        }
                    }
                );
            }
        }

        // Serve existing website files
        return env.ASSETS.fetch(request);
    }
};