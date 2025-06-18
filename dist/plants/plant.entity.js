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
exports.Plant = void 0;
const typeorm_1 = require("typeorm");
const sensor_data_entity_1 = require("../sensor-data/sensor-data.entity");
const user_entity_1 = require("../users/user.entity");
const alert_entity_1 = require("../alerts/alert.entity");
const scheduled_task_entity_1 = require("../scheduled-tasks/scheduled-task.entity");
let Plant = class Plant {
    id;
    name;
    species;
    family;
    type;
    location;
    isPetToxic;
    description;
    plantedDate;
    waterFrequencyDays;
    sunlightRequirement;
    indoor;
    imageUrl;
    minSoilMoisture;
    maxSoilMoisture;
    minTemperature;
    maxTemperature;
    minLightLevel;
    maxLightLevel;
    minAirHumidity;
    maxAirHumidity;
    user;
    sensorData;
    alerts;
    scheduledTasks;
    createdAt;
    updatedAt;
};
exports.Plant = Plant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Plant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Plant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Plant.prototype, "species", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Plant.prototype, "family", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Plant.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Plant.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Plant.prototype, "isPetToxic", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Plant.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Plant.prototype, "plantedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Plant.prototype, "waterFrequencyDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Plant.prototype, "sunlightRequirement", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Plant.prototype, "indoor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Plant.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Plant.prototype, "minSoilMoisture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Plant.prototype, "maxSoilMoisture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Plant.prototype, "minTemperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Plant.prototype, "maxTemperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Plant.prototype, "minLightLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Plant.prototype, "maxLightLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Plant.prototype, "minAirHumidity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Plant.prototype, "maxAirHumidity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.plants),
    __metadata("design:type", user_entity_1.User)
], Plant.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sensor_data_entity_1.SensorData, sensorData => sensorData.plant),
    __metadata("design:type", Array)
], Plant.prototype, "sensorData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => alert_entity_1.Alert, alert => alert.plant),
    __metadata("design:type", Array)
], Plant.prototype, "alerts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => scheduled_task_entity_1.ScheduledTask, task => task.plant),
    __metadata("design:type", Array)
], Plant.prototype, "scheduledTasks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Plant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Plant.prototype, "updatedAt", void 0);
exports.Plant = Plant = __decorate([
    (0, typeorm_1.Entity)()
], Plant);
//# sourceMappingURL=plant.entity.js.map