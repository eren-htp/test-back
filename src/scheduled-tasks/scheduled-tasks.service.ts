import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ScheduledTask, TaskStatus } from './scheduled-task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Plant } from '../plants/plant.entity';

@Injectable()
export class ScheduledTasksService {
  constructor(
    @InjectRepository(ScheduledTask)
    private tasksRepository: Repository<ScheduledTask>,
  ) {}

  async create(data: any): Promise<ScheduledTask> {
    console.log('Service - Données reçues pour création:', JSON.stringify(data, null, 2));
    
    try {
      // Créer un objet propre pour éviter les problèmes de validation
      const taskData = {
        title: data.title,
        description: data.description || undefined,
        type: data.type,
        dueDate: data.dueDate,
        recurring: data.recurring || false,
        recurringInterval: data.recurringInterval || undefined,
        status: TaskStatus.PENDING,
        plant: data.plant || { id: data.plantId }
      };
      
      console.log('Service - Données transformées:', JSON.stringify(taskData, null, 2));
      
      const task = this.tasksRepository.create(taskData);
      console.log('Service - Tâche créée:', JSON.stringify(task, null, 2));
      
      const savedTask = await this.tasksRepository.save(task);
      return savedTask;
    } catch (error) {
      console.error('Service - Erreur lors de la création de la tâche:', error);
      throw error;
    }
  }

  async findAll(): Promise<ScheduledTask[]> {
    return this.tasksRepository.find({
      relations: ['plant'],
    });
  }
  
  async findAllByUserId(userId: number): Promise<ScheduledTask[]> {
    return this.tasksRepository.find({
      where: { plant: { user: { id: userId } } },
      relations: ['plant', 'plant.user'],
      order: { dueDate: 'ASC' },
    });
  }

  async findByPlantId(plantId: number): Promise<ScheduledTask[]> {
    return this.tasksRepository.find({
      where: { plant: { id: plantId } },
      relations: ['plant'],
      order: { dueDate: 'ASC' },
    });
  }

  async findPendingByPlantId(plantId: number): Promise<ScheduledTask[]> {
    return this.tasksRepository.find({
      where: { 
        plant: { id: plantId },
        status: TaskStatus.PENDING
      },
      relations: ['plant'],
      order: { dueDate: 'ASC' },
    });
  }

  async findOverdue(): Promise<ScheduledTask[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.tasksRepository.find({
      where: { 
        dueDate: LessThan(today),
        status: TaskStatus.PENDING
      },
      relations: ['plant'],
      order: { dueDate: 'ASC' },
    });
  }

  async findById(id: number): Promise<ScheduledTask> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['plant'],
    });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<ScheduledTask> {
    const task = await this.findById(id);
    
    if (updateTaskDto.status === TaskStatus.COMPLETED && !task.completedAt) {
      updateTaskDto.completedAt = new Date();
    }
    
    await this.tasksRepository.update(id, {
      ...updateTaskDto,
      plant: updateTaskDto.plantId ? { id: updateTaskDto.plantId } : task.plant,
    });
    
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
} 