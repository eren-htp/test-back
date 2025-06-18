import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plant } from './plant.entity';
import { User } from '../users/user.entity';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private plantsRepository: Repository<Plant>,
  ) {}

  async findAll(userId: number): Promise<Plant[]> {
    return this.plantsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOne(id: number, userId: number): Promise<Plant> {
    const plant = await this.plantsRepository.findOne({ 
      where: { id },
      relations: ['user'],
    });
    
    if (!plant) {
      throw new NotFoundException(`Plant with ID ${id} not found`);
    }
    
    if (plant.user.id !== userId) {
      throw new ForbiddenException('You do not have permission to access this plant');
    }
    
    return plant;
  }

  async create(createPlantDto: CreatePlantDto, user: User): Promise<Plant> {
    const newPlant = this.plantsRepository.create(createPlantDto);
    newPlant.user = user;
    return this.plantsRepository.save(newPlant);
  }

  async update(id: number, updatePlantDto: UpdatePlantDto, userId: number): Promise<Plant> {
    const plant = await this.findOne(id, userId);
    
    // Apply updates to the plant object
    Object.assign(plant, updatePlantDto);
    // Make sure user can't change ownership
    plant.user = { id: userId } as User;
    
    await this.plantsRepository.save(plant);
    return this.findOne(id, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    const plant = await this.findOne(id, userId);
    const result = await this.plantsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Plant with ID ${id} not found`);
    }
  }
} 