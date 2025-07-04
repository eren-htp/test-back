"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorDataModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sensor_data_entity_1 = require("./sensor-data.entity");
const sensor_data_service_1 = require("./sensor-data.service");
const sensor_data_controller_1 = require("./sensor-data.controller");
let SensorDataModule = class SensorDataModule {
};
exports.SensorDataModule = SensorDataModule;
exports.SensorDataModule = SensorDataModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sensor_data_entity_1.SensorData])],
        providers: [sensor_data_service_1.SensorDataService],
        controllers: [sensor_data_controller_1.SensorDataController],
        exports: [sensor_data_service_1.SensorDataService],
    })
], SensorDataModule);
//# sourceMappingURL=sensor-data.module.js.map