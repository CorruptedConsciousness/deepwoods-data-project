// Deepwoods Data Project
// Regional Weather Radar
// Interactive map powered by Leaflet

const RADAR_LAT = 43.98;
const RADAR_LON = -84.49;

// Create map centered on Gladwin, Michigan
const radarMap = L.map("radar-map").setView(
    [RADAR_LAT, RADAR_LON],
    8
);

// Add geographic map tiles
L.tileLayer(
    "https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
        attribution: '&copy; OpenStreetMap contributors, HOT',
        maxZoom: 18
    }
).addTo(radarMap);

// Radar animation state
let radarFrames = [];
let radarLayer = null;
let radarFrameIndex = 0;
let radarTimer = null;
let radarHost = "";
// RainViewer precipitation radar overlay

async function loadRadar() {
    try {
        const response = await fetch(
            "https://api.rainviewer.com/public/weather-maps.json"
        );

        if (!response.ok) {
            throw new Error(`Radar API error: ${response.status}`);
        }

        const data = await response.json();

        const frames = data.radar.past;
        const latestFrame = frames[frames.length - 1];
        radarFrames = frames;
        radarHost = data.host;
        radarFrameIndex = frames.length - 1;

        radarLayer = L.tileLayer(
            `${data.host}${latestFrame.path}/256/{z}/{x}/{y}/2/1_1.png`,
            {
                opacity: 0.7,
                maxNativeZoom: 7,
                maxZoom: 18,
                attribution: "Radar data: RainViewer"
            }
        ).addTo(radarMap);

        const radarTime = new Date(latestFrame.time * 1000);

        document.getElementById("radar-status").textContent =
            `Latest radar observation: ${radarTime.toLocaleTimeString(
                "en-US",
                { timeZone: "America/Detroit" }
            )} Michigan time`;

    } catch (error) {
        console.error("DDP radar error:", error);

        document.getElementById("radar-status").textContent =
            "Radar imagery temporarily unavailable.";
    }
}

loadRadar();
// Mark the research area
L.circleMarker([RADAR_LAT, RADAR_LON], {
    radius: 6,
    color: "#b6d5a7",
    fillColor: "#42634b",
    fillOpacity: 1
})
.addTo(radarMap)
.bindPopup("Deepwoods Data Project — Gladwin, Michigan");

// Update status
document.getElementById("radar-status").textContent =
    "Interactive regional map loaded.";

    // Display a specific radar frame
function showRadarFrame(index) {
    if (!radarFrames.length) return;

    const frame = radarFrames[index];

    // Remove the previous radar overlay
    if (radarLayer) {
        radarMap.removeLayer(radarLayer);
    }

    // Display the selected radar frame
    radarLayer = L.tileLayer(
        `${radarHost}${frame.path}/256/{z}/{x}/{y}/2/1_1.png`,
        {
            opacity: 0.7,
            maxNativeZoom: 7,
            maxZoom: 18,
            attribution: "Radar data: RainViewer"
        }
    ).addTo(radarMap);

    // Display the observation time
    const frameTime = new Date(frame.time * 1000);

    document.getElementById("radar-frame-time").textContent =
        frameTime.toLocaleTimeString("en-US", {
            timeZone: "America/Detroit",
            hour: "numeric",
            minute: "2-digit"
        });
}

// Play or pause radar animation
document.getElementById("radar-play").addEventListener("click", function () {
    const button = this;

    if (radarTimer !== null) {
        clearInterval(radarTimer);
        radarTimer = null;
        button.textContent = "▶ Play Radar";
        return;
    }

    if (!radarFrames.length) return;

    radarFrameIndex = 0;
    showRadarFrame(radarFrameIndex);

    button.textContent = "⏸ Pause Radar";

    radarTimer = setInterval(() => {
        radarFrameIndex =
            (radarFrameIndex + 1) % radarFrames.length;

        showRadarFrame(radarFrameIndex);
    }, 800);
});