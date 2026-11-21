// Deepwoods Data Project
// Astronomy and Daylight Monitoring
// Calculations powered by SunCalc

const ASTRO_LAT = 43.98;
const ASTRO_LON = -84.49;
const ASTRO_TIMEZONE = "America/Detroit";

function formatAstroTime(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return "Unavailable";
    }

    return date.toLocaleTimeString("en-US", {
        timeZone: ASTRO_TIMEZONE,
        hour: "numeric",
        minute: "2-digit"
    });
}
function createMoonImage(phase, illumination) {
    const waxing = phase < 0.5;
    const radius = 45;

    const terminator = radius * Math.abs(2 * illumination - 1);

    const path = waxing
        ? `M 50 5
           A 45 45 0 0 1 50 95
           A ${terminator} 45 0 0 ${illumination > 0.5 ? 1 : 0} 50 5`
        : `M 50 5
           A 45 45 0 0 0 50 95
           A ${terminator} 45 0 0 ${illumination > 0.5 ? 0 : 1} 50 5`;

    return `
        <svg viewBox="0 0 100 100"
             width="110"
             height="110"
             role="img"
             aria-label="Moon phase">
            <circle cx="50" cy="50" r="45" fill="#20262b"/>
            <path d="${path}" fill="#e8e5d8"/>
            <circle cx="50" cy="50" r="45"
                    fill="none" stroke="#77837c" stroke-width="1"/>
        </svg>
    `;
}
function updateAstronomy() {
    const now = new Date();

    const sun = SunCalc.getTimes(
        now,
        ASTRO_LAT,
        ASTRO_LON
    );

    // Lunar calculations
const moon = SunCalc.getMoonIllumination(now);
const moonTimes = SunCalc.getMoonTimes(
    now,
    ASTRO_LAT,
    ASTRO_LON
);

const illumination = Math.round(moon.fraction * 100);

function getMoonPhase(phase) {
    if (phase < 0.035 || phase >= 0.965) return "New Moon";
    if (phase < 0.215) return "Waxing Crescent";
    if (phase < 0.285) return "First Quarter";
    if (phase < 0.465) return "Waxing Gibbous";
    if (phase < 0.535) return "Full Moon";
    if (phase < 0.715) return "Waning Gibbous";
    if (phase < 0.785) return "Last Quarter";
    return "Waning Crescent";
}

const phaseName = getMoonPhase(moon.phase);
// Generate a visual Moon phase

    const daylightMinutes =
        (sun.sunset - sun.sunrise) / 60000;

    const hours = Math.floor(daylightMinutes / 60);
    const minutes = Math.round(daylightMinutes % 60);

    document.getElementById("astronomy-status").textContent =
        "Solar conditions — Gladwin, Michigan";

    document.getElementById("astronomy-data").innerHTML = `
        <div>Morning Civil Twilight: ${formatAstroTime(sun.dawn)}</div>
        <div>Sunrise: ${formatAstroTime(sun.sunrise)}</div>
        <div>Solar Noon: ${formatAstroTime(sun.solarNoon)}</div>
        <div>Sunset: ${formatAstroTime(sun.sunset)}</div>
        <div>Evening Civil Twilight: ${formatAstroTime(sun.dusk)}</div>
        <div>Daylight Duration: ${hours}h ${minutes}m</div>
        <div>Moon Phase: ${phaseName}</div>
        <div>Moon Illumination: ${illumination}%</div>
        <div>Moonrise: ${formatAstroTime(moonTimes.rise)}</div>
        <div>Moonset: ${formatAstroTime(moonTimes.set)}</div>
        <div class="moon-visual">
            ${createMoonImage(moon.phase, moon.fraction)}
        </div>
 
    `;
}

updateAstronomy();