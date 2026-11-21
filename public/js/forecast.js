// Deepwoods Data Project
// 3-Day Regional Forecast
// Source: NOAA National Weather Service

const FORECAST_BASE_URL = "https://api.weather.gov";

// Approximate reference point for Gladwin, Michigan
const FORECAST_LAT = 43.98;
const FORECAST_LON = -84.49;

async function fetchForecast() {
    const url = `${FORECAST_BASE_URL}/points/${FORECAST_LAT},${FORECAST_LON}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`NWS forecast request failed: ${response.status}`);
        }

        const data = await response.json();

        const forecastUrl = data.properties.forecast;

        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
            throw new Error(
             `NWS forecast retrieval failed: ${forecastResponse.status}`
         );
        }

        const forecastData = await forecastResponse.json();

        console.log(
          "DDP 3-Day Forecast:",
         forecastData.properties.periods
        );
        const periods = forecastData.properties.periods;

// First six NWS forecast periods
        const daytimePeriods = periods
            .filter(period => period.isDaytime)
            .slice(0, 3);

        const threeDayPeriods = daytimePeriods.map(day => {
            const dayIndex = periods.indexOf(day);
            const night = periods[dayIndex + 1];

            return {
                ...day,
                nighttimeLow: night && !night.isDaytime
                    ? night.temperature
                    : null
             };
        });

        document.getElementById("forecast-status").textContent =
         "National Weather Service forecast for Gladwin, Michigan";

        document.getElementById("forecast-data").innerHTML =
            threeDayPeriods.map(period => `
            <div class="forecast-period">
                <h3>${period.name}</h3>
                <img src="${period.icon}" alt="${period.shortForecast}">
                <p class="forecast-temp">${period.temperature}°${period.temperatureUnit}</p>
                <p class="forecast-low">
                    Low: ${period.nighttimeLow !== null
                        ? `${period.nighttimeLow}°${period.temperatureUnit}`
                        : "N/A"}
                </p>
                <p class="forecast-description">${period.shortForecast}</p>
            </div>
            `).join("");
        return forecastData.properties.periods;

    } catch (error) {
        console.error("DDP Forecast Error:", error);

        document.getElementById("forecast-status").textContent =
            "Forecast data currently unavailable.";

        return null;
    }
}

fetchForecast();