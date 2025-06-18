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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorData = void 0;
const typeorm_1 = require("typeorm");
const plant_entity_1 = require("../plants/plant.entity");
let SensorData = class SensorData {
    id;
    plant;
    soilMoisture;
    temperature;
    lightLevel;
    airHumidity;
    timestamp;
};
exports.SensorData = SensorData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SensorData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_entity_1.Plant, plant => plant.sensorData),
    __metadata("design:type", plant_entity_1.Plant)
], SensorData.prototype, "plant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], SensorData.prototype, "soilMoisture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], SensorData.prototype, "temperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], SensorData.prototype, "lightLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], SensorData.prototype, "airHumidity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SensorData.prototype, "timestamp", void 0);
exports.SensorData = SensorData = __decorate([
    (0, typeorm_1.Entity)()
], SensorData);
//# sourceMappingURL=sensor-data.entity.js.map