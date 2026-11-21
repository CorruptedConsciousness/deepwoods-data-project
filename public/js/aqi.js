// Deepwoods Data Project
// Regional Air Quality Monitoring
// Data source: EPA AirNow

const AQI_ENDPOINT = "/api/air-quality";

async function fetchAirQuality() {
    const status = document.getElementById("aqi-status");

    status.textContent =
        "Connecting to EPA AirNow — Mount Pleasant, Michigan";

    // Cloudflare API connection will be added next.
}

fetchAirQuality();