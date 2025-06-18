import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { SensorData } from './sensor-data.entity';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectRepository(SensorData)
    private sensorDataRepository: Repository<SensorData>,
  ) {}

  async create(createSensorDataDto: CreateSensorDataDto): Promise<SensorData> {
    const sensorData = this.sensorDataRepository.create({
      soilMoisture: createSensorDataDto.soilMoisture,
      temperature: createSensorDataDto.temperature,
      lightLevel: createSensorDataDto.lightLevel,
      airHumidity: createSensorDataDto.airHumidity,
      plant: { id: createSensorDataDto.plantId }
    });
    return this.sensorDataRepository.save(sensorData);
  }

  async findAll(): Promise<SensorData[]> {
    return this.sensorDataRepository.find({
      relations: ['plant'],
    });
  }

  async findByPlantId(plantId: number): Promise<SensorData[]> {
    return this.sensorDataRepository.find({
      where: { plant: { id: plantId } },
      relations: ['plant'],
      order: { timestamp: 'DESC' },
    });
  }

  async findByPlantIdAndDateRange(
    plantId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<SensorData[]> {
    return this.sensorDataRepository.find({
      where: {
        plant: { id: plantId },
        timestamp: Between(startDate, endDate),
      },
      relations: ['plant'],
      order: { timestamp: 'ASC' },
    });
  }

  async findLatestByPlantId(plantId: number): Promise<SensorData> {
    const data = await this.sensorDataRepository.find({
      where: { plant: { id: plantId } },
      relations: ['plant'],
      order: { timestamp: 'DESC' },
      take: 1,
    });

    if (data.length === 0) {
      throw new NotFoundException(`No sensor data found for plant with ID ${plantId}`);
    }

    return data[0];
  }
} 