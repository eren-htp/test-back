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
exports.PlantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const plant_entity_1 = require("./plant.entity");
let PlantsService = class PlantsService {
    plantsRepository;
    constructor(plantsRepository) {
        this.plantsRepository = plantsRepository;
    }
    async findAll(userId) {
        return this.plantsRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    }
    async findOne(id, userId) {
        const plant = await this.plantsRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!plant) {
            throw new common_1.NotFoundException(`Plant with ID ${id} not found`);
        }
        if (plant.user.id !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to access this plant');
        }
        return plant;
    }
    async create(createPlantDto, user) {
        const newPlant = this.plantsRepository.create(createPlantDto);
        newPlant.user = user;
        return this.plantsRepository.save(newPlant);
    }
    async update(id, updatePlantDto, userId) {
        const plant = await this.findOne(id, userId);
        Object.assign(plant, updatePlantDto);
        plant.user = { id: userId };
        await this.plantsRepository.save(plant);
        return this.findOne(id, userId);
    }
    async remove(id, userId) {
        const plant = await this.findOne(id, userId);
        const result = await this.plantsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Plant with ID ${id} not found`);
        }
    }
};
exports.PlantsService = PlantsService;
exports.PlantsService = PlantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plant_entity_1.Plant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlantsService);
//# sourceMappingURL=plants.service.js.map