import fs from "fs";

const input = "./components/india-map/india_states.geojson";
const output = "./components/india-map/india-paths.json";

console.log("Reading GeoJSON...");

const geojson = JSON.parse(
  fs.readFileSync(input, "utf8")
);

console.log(`Found ${geojson.features.length} features.`);

// --------------------------------------------------
// Group features by state/UT
// --------------------------------------------------

const grouped = new Map();

for (const feature of geojson.features) {
  const props = feature.properties;

  let id = props.ID;
  let name = props.ST_NM;

  if (!id || !name) continue;

  // Merge the two old UTs into the current single UT
  if (id === "DN" || id === "DD") {
    id = "DAD";
    name = "Dadra and Nagar Haveli and Daman and Diu";
  }

  if (!grouped.has(id)) {
    grouped.set(id, {
      id,
      name,
      geometries: [],
    });
  }

  grouped.get(id).geometries.push(feature.geometry);
}

console.log(`Found ${grouped.size} unique regions.`);

// --------------------------------------------------
// Find coordinate bounds
// --------------------------------------------------

let minLon = Infinity;
let maxLon = -Infinity;
let minLat = Infinity;
let maxLat = -Infinity;

function visitCoordinates(coords) {
  if (
    Array.isArray(coords) &&
    coords.length >= 2 &&
    typeof coords[0] === "number"
  ) {
    const [lon, lat] = coords;

    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);

    return;
  }

  for (const child of coords) {
    visitCoordinates(child);
  }
}

for (const region of grouped.values()) {
  for (const geometry of region.geometries) {
    visitCoordinates(geometry.coordinates);
  }
}

// --------------------------------------------------
// SVG projection
// --------------------------------------------------

const WIDTH = 1000;
const HEIGHT = 1200;
const PADDING = 20;

const lonScale =
  (WIDTH - PADDING * 2) / (maxLon - minLon);

const latScale =
  (HEIGHT - PADDING * 2) / (maxLat - minLat);

const scale = Math.min(lonScale, latScale);

const mapWidth = (maxLon - minLon) * scale;
const mapHeight = (maxLat - minLat) * scale;

const offsetX = (WIDTH - mapWidth) / 2;
const offsetY = (HEIGHT - mapHeight) / 2;

function project([lon, lat]) {
  const x =
    offsetX + (lon - minLon) * scale;

  const y =
    offsetY + (maxLat - lat) * scale;

  return [x, y];
}

// --------------------------------------------------
// Ring → SVG path
// --------------------------------------------------

function ringToPath(ring) {
  if (!ring || ring.length === 0) {
    return "";
  }

  const first = project(ring[0]);

  let path =
    `M ${first[0].toFixed(2)} ${first[1].toFixed(2)}`;

  for (let i = 1; i < ring.length; i++) {
    const point = project(ring[i]);

    path +=
      ` L ${point[0].toFixed(2)} ${point[1].toFixed(2)}`;
  }

  path += " Z";

  return path;
}

// --------------------------------------------------
// Geometry → SVG path
// --------------------------------------------------

function geometryToPath(geometry) {
  if (!geometry) return "";

  if (geometry.type === "Polygon") {
    return geometry.coordinates
      .map(ringToPath)
      .join(" ");
  }

  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates
      .map((polygon) =>
        polygon.map(ringToPath).join(" ")
      )
      .join(" ");
  }

  return "";
}

// --------------------------------------------------
// Build states
// --------------------------------------------------

const states = [];

for (const region of grouped.values()) {
  const paths = region.geometries
    .map(geometryToPath)
    .filter(Boolean);

  states.push({
    id: region.id.toLowerCase(),
    name: region.name,
    d: paths.join(" "),
  });
}

states.sort((a, b) =>
  a.name.localeCompare(b.name)
);

// --------------------------------------------------
// Write JSON
// --------------------------------------------------

const outputData = {
  viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
  states,
};

fs.writeFileSync(
  output,
  JSON.stringify(outputData, null, 2),
  "utf8"
);

console.log("");
console.log("SUCCESS!");
console.log(`Created: ${output}`);
console.log(`Regions: ${states.length}`);

console.log("");
console.log("Regions included:");

for (const state of states) {
  console.log(
    `${state.id.padEnd(6)} ${state.name}`
  );
}