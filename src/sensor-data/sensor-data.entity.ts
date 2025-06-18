import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Plant } from '../plants/plant.entity';

@Entity()
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plant, plant => plant.sensorData)
  plant: Plant;

  @Column({ type: 'float' })
  soilMoisture: number;

  @Column({ type: 'float' })
  temperature: number;

  @Column({ type: 'float' })
  lightLevel: number;

  @Column({ type: 'float' })
  airHumidity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
} 