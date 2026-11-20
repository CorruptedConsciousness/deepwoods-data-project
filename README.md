# Deepwoods Data Project (DDP)

**Independent Wildlife Observation | Environmental Monitoring | Computational Ecology**

Deepwoods Data Project is an independent, open-source research and software development initiative based in rural Michigan.

The project explores the intersection of wildlife ecology, environmental data, computer vision, artificial intelligence, and software engineering.

Its purpose is to develop a reproducible system for collecting, processing, analyzing, and presenting wildlife observations alongside environmental conditions.

## Research Objectives

- Observe and document wildlife activity in a natural outdoor environment.
- Collect regional weather and astronomical information.
- Investigate relationships between wildlife behavior and environmental conditions.
- Develop computer vision systems for wildlife detection, classification, and tracking.
- Maintain structured observational datasets for future analysis.
- Publish software, documentation, and research methods openly.

## System Architecture

The project is being developed incrementally using independently maintainable components.

### 1. Public Research Website

**Status:** Initial website deployed

The public website will provide access to environmental information, wildlife camera footage, project documentation, and eventually research findings.

Website: https://deepwoodsdataproject.org

### 2. Environmental Monitoring

**Status:** Planned

Regional environmental data will include:

- Temperature and relative humidity
- Wind speed and direction
- Atmospheric pressure
- Precipitation and forecasts
- Air quality measurements

Cloudflare Workers are planned for retrieving, processing, and caching external data.

### 3. Astronomical Monitoring

**Status:** Planned

Astronomical information will include:

- Sunrise and sunset
- Civil twilight
- Moon phase
- Moonrise and moonset
- Daylight duration

These variables will support future investigations of wildlife activity patterns.

### 4. Wildlife Camera

**Status:** Camera hardware available; public streaming integration planned

The observation system uses a Reolink RLC-810A 4K PoE camera.

Future development will provide a browser-compatible live stream on the public website while supporting local recording and analysis.

### 5. Computer Vision and Wildlife Analysis

**Status:** Planned

The proposed analysis stack includes:

- Python
- OpenCV
- YOLO
- ByteTrack
- SQLite

Development objectives include object detection, tracking, species identification, timestamped observations, and behavioral analysis.

### 6. Research Data

**Status:** Planned

Structured datasets will support reproducible analysis of wildlife observations and associated environmental measurements.

Data collection methods, limitations, and processing procedures will be documented as development progresses.

## Development Principles

DDP emphasizes:

- Open-source software
- Reproducible methods
- Modular system architecture
- Version control
- Testing and validation
- Transparent documentation
- Responsible handling of research data
- Incremental development and continuous improvement

## AI Assistance Disclosure

Artificial intelligence tools are used during portions of this project's development, including software design discussions, code generation, debugging, documentation, and technical research.

The project owner directs development, establishes objectives, makes implementation decisions, integrates components, and is responsible for testing, validating, maintaining, and publishing the resulting work.

AI-assisted or AI-generated code is not represented as independently authored code. Its use is acknowledged transparently as part of the development process.

All published components remain subject to review and validation.

## Project Status

**Active development — November 2026**

Current priorities:

1. Establish the public website repository and deployment workflow.
2. Implement regional weather information.
3. Implement astronomical information.
4. Integrate a public wildlife camera feed.
5. Develop wildlife detection and observation pipelines.
6. Expand research data collection and analysis.

## License

A project license will be selected and added as development progresses.

---

© 2026 Deepwoods Data Project  
*From the deepwoods of Michigan.*