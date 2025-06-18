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
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const alert_entity_1 = require("./alert.entity");
let AlertsService = class AlertsService {
    alertsRepository;
    constructor(alertsRepository) {
        this.alertsRepository = alertsRepository;
    }
    async create(data) {
        const alert = this.alertsRepository.create({
            type: data.type,
            message: data.message,
            plant: data.plant || { id: data.plantId },
        });
        return this.alertsRepository.save(alert);
    }
    async findAll() {
        return this.alertsRepository.find({
            relations: ['plant'],
        });
    }
    async findAllByUserId(userId) {
        return this.alertsRepository.find({
            where: { plant: { user: { id: userId } } },
            relations: ['plant', 'plant.user'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByPlantId(plantId) {
        return this.alertsRepository.find({
            where: { plant: { id: plantId } },
            relations: ['plant'],
            order: { createdAt: 'DESC' },
        });
    }
    async findActiveByPlantId(plantId) {
        return this.alertsRepository.find({
            where: {
                plant: { id: plantId },
                status: alert_entity_1.AlertStatus.ACTIVE
            },
            relations: ['plant'],
            order: { createdAt: 'DESC' },
        });
    }
    async findById(id) {
        const alert = await this.alertsRepository.findOne({
            where: { id },
            relations: ['plant'],
        });
        if (!alert) {
            throw new common_1.NotFoundException(`Alert with ID ${id} not found`);
        }
        return alert;
    }
    async update(id, updateAlertDto) {
        const alert = await this.findById(id);
        if (updateAlertDto.status === alert_entity_1.AlertStatus.RESOLVED && !alert.resolvedAt) {
            updateAlertDto.resolvedAt = new Date();
        }
        await this.alertsRepository.update(id, {
            ...updateAlertDto,
            plant: updateAlertDto.plantId ? { id: updateAlertDto.plantId } : alert.plant,
        });
        return this.findById(id);
    }
    async remove(id) {
        const result = await this.alertsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Alert with ID ${id} not found`);
        }
    }
};
exports.AlertsService = AlertsService;
exports.AlertsService = AlertsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alert_entity_1.Alert)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map