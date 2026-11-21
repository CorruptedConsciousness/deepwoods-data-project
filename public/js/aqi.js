// Deepwoods Data Project
// Regional Air Quality Monitoring
// Data source: EPA AirNow

const AQI_ENDPOINT = "/api/air-quality";

async function fetchAirQuality() {
    const status = document.getElementById("aqi-status");
    const container = document.getElementById("aqi-data");

    status.textContent = "Retrieving EPA AirNow observations...";

    try {
        const response = await fetch(AQI_ENDPOINT);

        if (!response.ok) {
            throw new Error(`AQI request failed: ${response.status}`);
        }

        const observations = await response.json();

        if (!Array.isArray(observations) || observations.length === 0) {
            status.textContent =
                "No current AirNow observations available.";
            container.innerHTML = "";
            return;
        }

        status.textContent =
            "EPA AirNow — Mount Pleasant regional observations";

        container.innerHTML = observations.map(observation => `
            <div>
                <strong>${observation.ParameterName}</strong>
                <p>AQI: ${observation.AQI ?? "Unavailable"}</p>
                <p>Category: ${observation.Category?.Name ?? "Unknown"}</p>
                <p>Reporting Area: ${observation.ReportingArea ?? "Unknown"}</p>
                <p>Observed: ${observation.DateObserved ?? "Unknown"}
                    ${observation.HourObserved ?? ""}:00
                    ${observation.LocalTimeZone ?? ""}
                </p>
            </div>
        `).join("");

    } catch (error) {
        console.error("DDP Air Quality Error:", error);

        status.textContent =
            "Air quality observations temporarily unavailable.";
    }
}

fetchAirQuality();