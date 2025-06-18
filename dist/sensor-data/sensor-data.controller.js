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
exports.SensorDataController = void 0;
const common_1 = require("@nestjs/common");
const sensor_data_service_1 = require("./sensor-data.service");
const create_sensor_data_dto_1 = require("./dto/create-sensor-data.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/user.entity");
let SensorDataController = class SensorDataController {
    sensorDataService;
    constructor(sensorDataService) {
        this.sensorDataService = sensorDataService;
    }
    create(createSensorDataDto) {
        return this.sensorDataService.create(createSensorDataDto);
    }
    findAll() {
        return this.sensorDataService.findAll();
    }
    findByPlantId(id) {
        return this.sensorDataService.findByPlantId(+id);
    }
    findLatestByPlantId(id) {
        return this.sensorDataService.findLatestByPlantId(+id);
    }
    findByPlantIdAndDateRange(id, startDate, endDate) {
        return this.sensorDataService.findByPlantIdAndDateRange(+id, new Date(startDate), new Date(endDate));
    }
};
exports.SensorDataController = SensorDataController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.DEVELOPER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sensor_data_dto_1.CreateSensorDataDto]),
    __metadata("design:returntype", void 0)
], SensorDataController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SensorDataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('plant/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorDataController.prototype, "findByPlantId", null);
__decorate([
    (0, common_1.Get)('plant/:id/latest'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorDataController.prototype, "findLatestByPlantId", null);
__decorate([
    (0, common_1.Get)('plant/:id/range'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('start')),
    __param(2, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], SensorDataController.prototype, "findByPlantIdAndDateRange", null);
exports.SensorDataController = SensorDataController = __decorate([
    (0, common_1.Controller)('sensor-data'),
    __metadata("design:paramtypes", [sensor_data_service_1.SensorDataService])
], SensorDataController);
//# sourceMappingURL=sensor-data.controller.js.map