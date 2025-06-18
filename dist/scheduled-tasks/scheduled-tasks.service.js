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
exports.ScheduledTasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const scheduled_task_entity_1 = require("./scheduled-task.entity");
let ScheduledTasksService = class ScheduledTasksService {
    tasksRepository;
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async create(data) {
        console.log('Service - Données reçues pour création:', JSON.stringify(data, null, 2));
        try {
            const taskData = {
                title: data.title,
                description: data.description || undefined,
                type: data.type,
                dueDate: data.dueDate,
                recurring: data.recurring || false,
                recurringInterval: data.recurringInterval || undefined,
                status: scheduled_task_entity_1.TaskStatus.PENDING,
                plant: data.plant || { id: data.plantId }
            };
            console.log('Service - Données transformées:', JSON.stringify(taskData, null, 2));
            const task = this.tasksRepository.create(taskData);
            console.log('Service - Tâche créée:', JSON.stringify(task, null, 2));
            const savedTask = await this.tasksRepository.save(task);
            return savedTask;
        }
        catch (error) {
            console.error('Service - Erreur lors de la création de la tâche:', error);
            throw error;
        }
    }
    async findAll() {
        return this.tasksRepository.find({
            relations: ['plant'],
        });
    }
    async findAllByUserId(userId) {
        return this.tasksRepository.find({
            where: { plant: { user: { id: userId } } },
            relations: ['plant', 'plant.user'],
            order: { dueDate: 'ASC' },
        });
    }
    async findByPlantId(plantId) {
        return this.tasksRepository.find({
            where: { plant: { id: plantId } },
            relations: ['plant'],
            order: { dueDate: 'ASC' },
        });
    }
    async findPendingByPlantId(plantId) {
        return this.tasksRepository.find({
            where: {
                plant: { id: plantId },
                status: scheduled_task_entity_1.TaskStatus.PENDING
            },
            relations: ['plant'],
            order: { dueDate: 'ASC' },
        });
    }
    async findOverdue() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.tasksRepository.find({
            where: {
                dueDate: (0, typeorm_2.LessThan)(today),
                status: scheduled_task_entity_1.TaskStatus.PENDING
            },
            relations: ['plant'],
            order: { dueDate: 'ASC' },
        });
    }
    async findById(id) {
        const task = await this.tasksRepository.findOne({
            where: { id },
            relations: ['plant'],
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
        const task = await this.findById(id);
        if (updateTaskDto.status === scheduled_task_entity_1.TaskStatus.COMPLETED && !task.completedAt) {
            updateTaskDto.completedAt = new Date();
        }
        await this.tasksRepository.update(id, {
            ...updateTaskDto,
            plant: updateTaskDto.plantId ? { id: updateTaskDto.plantId } : task.plant,
        });
        return this.findById(id);
    }
    async remove(id) {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
    }
};
exports.ScheduledTasksService = ScheduledTasksService;
exports.ScheduledTasksService = ScheduledTasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(scheduled_task_entity_1.ScheduledTask)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ScheduledTasksService);
//# sourceMappingURL=scheduled-tasks.service.js.map