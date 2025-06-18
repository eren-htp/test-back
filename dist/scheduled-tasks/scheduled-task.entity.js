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
exports.ScheduledTask = exports.TaskStatus = exports.TaskType = void 0;
const typeorm_1 = require("typeorm");
const plant_entity_1 = require("../plants/plant.entity");
var TaskType;
(function (TaskType) {
    TaskType["WATERING"] = "watering";
    TaskType["FERTILIZING"] = "fertilizing";
    TaskType["REPOTTING"] = "repotting";
    TaskType["PRUNING"] = "pruning";
    TaskType["CUSTOM"] = "custom";
})(TaskType || (exports.TaskType = TaskType = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "pending";
    TaskStatus["COMPLETED"] = "completed";
    TaskStatus["OVERDUE"] = "overdue";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
let ScheduledTask = class ScheduledTask {
    id;
    plant;
    type;
    title;
    description;
    dueDate;
    status;
    recurring;
    recurringInterval;
    createdAt;
    completedAt;
};
exports.ScheduledTask = ScheduledTask;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ScheduledTask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_entity_1.Plant, plant => plant.scheduledTasks),
    __metadata("design:type", plant_entity_1.Plant)
], ScheduledTask.prototype, "plant", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TaskType,
    }),
    __metadata("design:type", String)
], ScheduledTask.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ScheduledTask.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ScheduledTask.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ScheduledTask.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.PENDING,
    }),
    __metadata("design:type", String)
], ScheduledTask.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ScheduledTask.prototype, "recurring", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ScheduledTask.prototype, "recurringInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ScheduledTask.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ScheduledTask.prototype, "completedAt", void 0);
exports.ScheduledTask = ScheduledTask = __decorate([
    (0, typeorm_1.Entity)()
], ScheduledTask);
//# sourceMappingURL=scheduled-task.entity.js.map