// Deepwoods Data Project
// Regional Weather Monitoring
// Source: NOAA National Weather Service

const NWS_BASE_URL = "https://api.weather.gov";
const NWS_STATION = "KGLR"; // Gaylord, Michigan
function toFahrenheit(value) {
    return value != null
        ? `${(value * 9 / 5 + 32).toFixed(1)}°F`
        : "N/A";
}

function toMph(value) {
    return value != null
        ? `${(value * 0.621371).toFixed(1)} mph`
        : "N/A";
}

function toMiles(value) {
    return value != null
        ? `${(value / 1609.344).toFixed(1)} miles`
        : "N/A";
}

function formatCloudLayers(layers) {
    if (!Array.isArray(layers) || layers.length === 0) {
        return "N/A";
    }

    return layers.map(layer => {
        const coverage = layer.amount || "Unknown";
        const height = layer.base?.value;

        return height != null
            ? `${coverage} at ${Math.round(height * 3.28084)} ft`
            : coverage;
    }).join(", ");
}
async function fetchWeather() {
    const url = `${NWS_BASE_URL}/stations/${NWS_STATION}/observations/latest`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`NWS request failed: ${response.status}`);
        }

        const data = await response.json();

        console.log("DDP NWS Weather Data:", data);

        const weather = data.properties;

        const temperature = weather.temperature.value;
        const humidity = weather.relativeHumidity.value;
        const conditions = weather.textDescription;
        
        
        
        
        const visibility = weather.visibility.value;
        const cloudLayers = weather.cloudLayers;
        const pressure = weather.barometricPressure.value;
        const dewpoint = weather.dewpoint.value;
        const observationTime = weather.timestamp;
        const temperatureF = temperature !== null
         ? (temperature * 9 / 5 + 32).toFixed(1)
            : "Unavailable";

        const humidityPercent = humidity !== null
          ? humidity.toFixed(1)
            : "Unavailable";

        document.getElementById("weather-status").textContent =
         "Live observations from Gaylord Regional Airport";

        document.getElementById("weather-data").innerHTML = `
            <p>Temperature: ${toFahrenheit(temperature)}</p>
            <p>Humidity: ${humidityPercent}%</p>
            <p>Conditions: ${conditions || "N/A"}</p>
            <p>Barometric Pressure: ${pressure != null ? (pressure / 100).toFixed(1) + " hPa" : "N/A"}</p>
            <p>Dew Point: ${toFahrenheit(dewpoint)}</p>
            
            
            
            
            <p>Visibility: ${toMiles(visibility)}</p>
            <p>Cloud Layers: ${formatCloudLayers(cloudLayers)}</p>
            <p>Observed: ${new Date(observationTime).toLocaleString("en-US", {
                timeZone: "America/Detroit",
                dateStyle: "medium",
                timeStyle: "short"
            })}</p>
`;
        return data;

    } catch (error) {
        console.error("DDP Weather Error:", error);
        return null;
    }
}

fetchWeather();