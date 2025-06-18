import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Plant } from '../plants/plant.entity';

export enum AlertType {
  SOIL_MOISTURE = 'soil_moisture',
  TEMPERATURE = 'temperature',
  LIGHT_LEVEL = 'light_level',
  AIR_HUMIDITY = 'air_humidity',
  MAINTENANCE = 'maintenance',
}

export enum AlertStatus {
  ACTIVE = 'active',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed',
}

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plant, plant => plant.alerts)
  plant: Plant;

  @Column({
    type: 'enum',
    enum: AlertType,
  })
  type: AlertType;

  @Column()
  message: string;

  @Column({
    type: 'enum',
    enum: AlertStatus,
    default: AlertStatus.ACTIVE,
  })
  status: AlertStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date;
} 