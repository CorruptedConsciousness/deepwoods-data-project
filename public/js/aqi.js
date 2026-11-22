// Deepwoods Data Project
// EPA AirNow Air Quality Monitoring

async function updateAirQuality() {
    const status = document.getElementById("aqi-status");
    const display = document.getElementById("aqi-data");

    try {
        const response = await fetch("/api/air-quality");

        if (!response.ok) {
            throw new Error(`AQI request failed: ${response.status}`);
        }

        const observations = await response.json();

        if (!Array.isArray(observations) || observations.length === 0) {
            status.textContent = "No current air quality observations available.";
            return;
        }

        status.textContent = "EPA AirNow — Regional Air Quality Monitoring";

       display.innerHTML = observations.map(observation => `
            <div class="aqi-reading">
                <h3>${observation.parameterName}</h3>
                <p>AQI: ${observation.nowcastAQI ?? "Unavailable"}</p>
                <p>Category: ${observation.aqiCategoryName ?? "Unknown"}</p>
                
                <p>Monitoring Site: ${observation.siteName ?? "Unknown"}</p>
                <p>Observed: ${observation.hourObserved ?? "Unknown"} ${observation.localTimeZone ?? ""}</p>
            </div>
`       ).join("");

    } catch (error) {
        console.error("DDP AQI error:", error);
        status.textContent = "Air quality observations temporarily unavailable.";
    }
}

updateAirQuality();