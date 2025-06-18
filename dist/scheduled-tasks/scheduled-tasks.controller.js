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
exports.ScheduledTasksController = void 0;
const common_1 = require("@nestjs/common");
const scheduled_tasks_service_1 = require("./scheduled-tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/user.entity");
const plants_service_1 = require("../plants/plants.service");
const scheduled_task_entity_1 = require("./scheduled-task.entity");
let ScheduledTasksController = class ScheduledTasksController {
    tasksService;
    plantsService;
    constructor(tasksService, plantsService) {
        this.tasksService = tasksService;
        this.plantsService = plantsService;
    }
    async create(createTaskDto, req) {
        console.log('Données brutes reçues:', req.body);
        console.log('Données reçues pour créer une tâche après validation:', JSON.stringify(createTaskDto, null, 2));
        console.log('Types de tâches valides:', Object.values(scheduled_task_entity_1.TaskType));
        try {
            const userId = req.user.id;
            const plant = await this.plantsService.findOne(createTaskDto.plantId, userId);
            let dueDate = new Date();
            try {
                dueDate = new Date(createTaskDto.dueDate);
                if (isNaN(dueDate.getTime())) {
                    throw new Error('Date invalide: ' + createTaskDto.dueDate);
                }
            }
            catch (error) {
                console.error('Erreur lors de la conversion de la date:', error);
                throw new Error('Format de date invalide: ' + createTaskDto.dueDate);
            }
            console.log('Date formatée:', dueDate);
            const data = {
                title: createTaskDto.title,
                description: createTaskDto.description,
                type: createTaskDto.type,
                dueDate: dueDate,
                recurring: createTaskDto.recurring || false,
                recurringInterval: createTaskDto.recurringInterval,
                plant
            };
            console.log('Données transformées:', JSON.stringify(data, null, 2));
            return this.tasksService.create(data);
        }
        catch (error) {
            console.error('Erreur lors de la création de la tâche:', error);
            throw error;
        }
    }
    async findAll(req) {
        const userId = req.user.id;
        return this.tasksService.findAllByUserId(userId);
    }
    findOverdue() {
        return this.tasksService.findOverdue();
    }
    async findByPlantId(id, req) {
        const userId = req.user.id;
        await this.plantsService.findOne(+id, userId);
        return this.tasksService.findByPlantId(+id);
    }
    async findPendingByPlantId(id, req) {
        const userId = req.user.id;
        await this.plantsService.findOne(+id, userId);
        return this.tasksService.findPendingByPlantId(+id);
    }
    async findOne(id, req) {
        const task = await this.tasksService.findById(+id);
        const userId = req.user.id;
        await this.plantsService.findOne(task.plant.id, userId);
        return task;
    }
    async update(id, updateTaskDto, req) {
        const task = await this.tasksService.findById(+id);
        const userId = req.user.id;
        await this.plantsService.findOne(task.plant.id, userId);
        return this.tasksService.update(+id, updateTaskDto);
    }
    async remove(id, req) {
        const task = await this.tasksService.findById(+id);
        const userId = req.user.id;
        await this.plantsService.findOne(task.plant.id, userId);
        return this.tasksService.remove(+id);
    }
};
exports.ScheduledTasksController = ScheduledTasksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], ScheduledTasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScheduledTasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('overdue'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScheduledTasksController.prototype, "findOverdue", null);
__decorate([
    (0, common_1.Get)('plant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduledTasksController.prototype, "findByPlantId", null);
__decorate([
    (0, common_1.Get)('plant/:id/pending'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduledTasksController.prototype, "findPendingByPlantId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduledTasksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], ScheduledTasksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduledTasksController.prototype, "remove", null);
exports.ScheduledTasksController = ScheduledTasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [scheduled_tasks_service_1.ScheduledTasksService,
        plants_service_1.PlantsService])
], ScheduledTasksController);
//# sourceMappingURL=scheduled-tasks.controller.js.map