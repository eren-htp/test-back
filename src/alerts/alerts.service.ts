import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert, AlertStatus, AlertType } from './alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Plant } from '../plants/plant.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertsRepository: Repository<Alert>,
  ) {}

  async create(data: CreateAlertDto & { plant?: Plant }): Promise<Alert> {
    const alert = this.alertsRepository.create({
      type: data.type,
      message: data.message,
      plant: data.plant || { id: data.plantId },
    });
    return this.alertsRepository.save(alert);
  }

  async findAll(): Promise<Alert[]> {
    return this.alertsRepository.find({
      relations: ['plant'],
    });
  }
  
  async findAllByUserId(userId: number): Promise<Alert[]> {
    return this.alertsRepository.find({
      where: { plant: { user: { id: userId } } },
      relations: ['plant', 'plant.user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByPlantId(plantId: number): Promise<Alert[]> {
    return this.alertsRepository.find({
      where: { plant: { id: plantId } },
      relations: ['plant'],
      order: { createdAt: 'DESC' },
    });
  }

  async findActiveByPlantId(plantId: number): Promise<Alert[]> {
    return this.alertsRepository.find({
      where: { 
        plant: { id: plantId },
        status: AlertStatus.ACTIVE
      },
      relations: ['plant'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<Alert> {
    const alert = await this.alertsRepository.findOne({
      where: { id },
      relations: ['plant'],
    });
    
    if (!alert) {
      throw new NotFoundException(`Alert with ID ${id} not found`);
    }
    
    return alert;
  }

  async update(id: number, updateAlertDto: UpdateAlertDto): Promise<Alert> {
    const alert = await this.findById(id);
    
    if (updateAlertDto.status === AlertStatus.RESOLVED && !alert.resolvedAt) {
      updateAlertDto.resolvedAt = new Date();
    }
    
    await this.alertsRepository.update(id, {
      ...updateAlertDto,
      plant: updateAlertDto.plantId ? { id: updateAlertDto.plantId } : alert.plant,
    });
    
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.alertsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Alert with ID ${id} not found`);
    }
  }
} 