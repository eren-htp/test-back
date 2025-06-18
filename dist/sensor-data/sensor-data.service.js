"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sensor_data_entity_1 = require("./sensor-data.entity");
let SensorDataService = class SensorDataService {
    sensorDataRepository;
    constructor(sensorDataRepository) {
        this.sensorDataRepository = sensorDataRepository;
    }
    async create(createSensorDataDto) {
        const sensorData = this.sensorDataRepository.create({
            soilMoisture: createSensorDataDto.soilMoisture,
            temperature: createSensorDataDto.temperature,
            lightLevel: createSensorDataDto.lightLevel,
            airHumidity: createSensorDataDto.airHumidity,
            plant: { id: createSensorDataDto.plantId }
        });
        return this.sensorDataRepository.save(sensorData);
    }
    async findAll() {
        return this.sensorDataRepository.find({
            relations: ['plant'],
        });
    }
    async findByPlantId(plantId) {
        return this.sensorDataRepository.find({
            where: { plant: { id: plantId } },
            relations: ['plant'],
            order: { timestamp: 'DESC' },
        });
    }
    async findByPlantIdAndDateRange(plantId, startDate, endDate) {
        return this.sensorDataRepository.find({
            where: {
                plant: { id: plantId },
                timestamp: (0, typeorm_2.Between)(startDate, endDate),
            },
            relations: ['plant'],
            order: { timestamp: 'ASC' },
        });
    }
    async findLatestByPlantId(plantId) {
        const data = await this.sensorDataRepository.find({
            where: { plant: { id: plantId } },
            relations: ['plant'],
            order: { timestamp: 'DESC' },
            take: 1,
        });
        if (data.length === 0) {
            throw new common_1.NotFoundException(`No sensor data found for plant with ID ${plantId}`);
        }
        return data[0];
    }
};
exports.SensorDataService = SensorDataService;
exports.SensorDataService = SensorDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensor_data_entity_1.SensorData)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SensorDataService);
//# sourceMappingURL=sensor-data.service.js.map