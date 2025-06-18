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
exports.Alert = exports.AlertStatus = exports.AlertType = void 0;
const typeorm_1 = require("typeorm");
const plant_entity_1 = require("../plants/plant.entity");
var AlertType;
(function (AlertType) {
    AlertType["SOIL_MOISTURE"] = "soil_moisture";
    AlertType["TEMPERATURE"] = "temperature";
    AlertType["LIGHT_LEVEL"] = "light_level";
    AlertType["AIR_HUMIDITY"] = "air_humidity";
    AlertType["MAINTENANCE"] = "maintenance";
})(AlertType || (exports.AlertType = AlertType = {}));
var AlertStatus;
(function (AlertStatus) {
    AlertStatus["ACTIVE"] = "active";
    AlertStatus["RESOLVED"] = "resolved";
    AlertStatus["DISMISSED"] = "dismissed";
})(AlertStatus || (exports.AlertStatus = AlertStatus = {}));
let Alert = class Alert {
    id;
    plant;
    type;
    message;
    status;
    createdAt;
    resolvedAt;
};
exports.Alert = Alert;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Alert.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_entity_1.Plant, plant => plant.alerts),
    __metadata("design:type", plant_entity_1.Plant)
], Alert.prototype, "plant", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AlertType,
    }),
    __metadata("design:type", String)
], Alert.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Alert.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AlertStatus,
        default: AlertStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Alert.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Alert.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Alert.prototype, "resolvedAt", void 0);
exports.Alert = Alert = __decorate([
    (0, typeorm_1.Entity)()
], Alert);
//# sourceMappingURL=alert.entity.js.map