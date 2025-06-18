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
exports.AlertsController = void 0;
const common_1 = require("@nestjs/common");
const alerts_service_1 = require("./alerts.service");
const create_alert_dto_1 = require("./dto/create-alert.dto");
const update_alert_dto_1 = require("./dto/update-alert.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/user.entity");
const plants_service_1 = require("../plants/plants.service");
const alert_entity_1 = require("./alert.entity");
let AlertsController = class AlertsController {
    alertsService;
    plantsService;
    constructor(alertsService, plantsService) {
        this.alertsService = alertsService;
        this.plantsService = plantsService;
    }
    async create(createAlertDto, req) {
        console.log('Données reçues pour créer une alerte:', JSON.stringify(createAlertDto, null, 2));
        console.log('Types d\'alertes valides:', Object.values(alert_entity_1.AlertType));
        try {
            const userId = req.user.id;
            const plant = await this.plantsService.findOne(createAlertDto.plantId, userId);
            return this.alertsService.create({
                ...createAlertDto,
                plant
            });
        }
        catch (error) {
            console.error('Erreur lors de la création de l\'alerte:', error);
            throw error;
        }
    }
    async findAll(req) {
        const userId = req.user.id;
        return this.alertsService.findAllByUserId(userId);
    }
    async findByPlantId(id, req) {
        const userId = req.user.id;
        await this.plantsService.findOne(+id, userId);
        return this.alertsService.findByPlantId(+id);
    }
    async findActiveByPlantId(id, req) {
        const userId = req.user.id;
        await this.plantsService.findOne(+id, userId);
        return this.alertsService.findActiveByPlantId(+id);
    }
    async findOne(id, req) {
        const alert = await this.alertsService.findById(+id);
        const userId = req.user.id;
        await this.plantsService.findOne(alert.plant.id, userId);
        return alert;
    }
    async update(id, updateAlertDto, req) {
        const alert = await this.alertsService.findById(+id);
        const userId = req.user.id;
        await this.plantsService.findOne(alert.plant.id, userId);
        return this.alertsService.update(+id, updateAlertDto);
    }
    remove(id) {
        return this.alertsService.remove(+id);
    }
};
exports.AlertsController = AlertsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_alert_dto_1.CreateAlertDto, Object]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('plant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "findByPlantId", null);
__decorate([
    (0, common_1.Get)('plant/:id/active'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "findActiveByPlantId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alert_dto_1.UpdateAlertDto, Object]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.DEVELOPER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlertsController.prototype, "remove", null);
exports.AlertsController = AlertsController = __decorate([
    (0, common_1.Controller)('alerts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [alerts_service_1.AlertsService,
        plants_service_1.PlantsService])
], AlertsController);
//# sourceMappingURL=alerts.controller.js.map