"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarthquakeService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let EarthquakeService = class EarthquakeService {
    constructor() {
        this.apiUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
    }
    async getClosestEarthquakes(latitude, longitude) {
        const response = await axios_1.default.get(this.apiUrl);
        const earthquakes = response.data.features;
        const uniqueEarthquakeIds = new Set();
        const sortedEarthquakes = earthquakes
            .filter((quake) => {
            const isUnique = !uniqueEarthquakeIds.has(quake.id);
            uniqueEarthquakeIds.add(quake.id);
            return isUnique;
        })
            .map((quake) => {
            const distance = this.calculateDistance(latitude, longitude, quake.geometry.coordinates[1], quake.geometry.coordinates[0]);
            const title = `M ${quake.properties.mag} | ${quake.properties.place}`;
            const coordinates = quake.geometry.coordinates;
            return { title, distance, coordinates };
        })
            .sort((a, b) => a.distance - b.distance);
        return sortedEarthquakes.slice(0, 10);
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const toRad = (value) => value * Math.PI / 180;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return Math.round(distance);
    }
};
exports.EarthquakeService = EarthquakeService;
exports.EarthquakeService = EarthquakeService = __decorate([
    (0, common_1.Injectable)()
], EarthquakeService);
//# sourceMappingURL=earthquake.service.js.map