import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { SensorData } from '../sensor-data/sensor-data.entity';
import { User } from '../users/user.entity';
import { Alert } from '../alerts/alert.entity';
import { ScheduledTask } from '../scheduled-tasks/scheduled-task.entity';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column({ nullable: true })
  family: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: false })
  isPetToxic: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  plantedDate: Date;

  @Column({ default: 0 })
  waterFrequencyDays: number;

  @Column({ nullable: true })
  sunlightRequirement: string;

  @Column({ default: false })
  indoor: boolean;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ type: 'float', nullable: true })
  minSoilMoisture: number;

  @Column({ type: 'float', nullable: true })
  maxSoilMoisture: number;

  @Column({ type: 'float', nullable: true })
  minTemperature: number;

  @Column({ type: 'float', nullable: true })
  maxTemperature: number;

  @Column({ type: 'float', nullable: true })
  minLightLevel: number;

  @Column({ type: 'float', nullable: true })
  maxLightLevel: number;

  @Column({ type: 'float', nullable: true })
  minAirHumidity: number;

  @Column({ type: 'float', nullable: true })
  maxAirHumidity: number;

  @ManyToOne(() => User, user => user.plants)
  user: User;

  @OneToMany(() => SensorData, sensorData => sensorData.plant)
  sensorData: SensorData[];

  @OneToMany(() => Alert, alert => alert.plant)
  alerts: Alert[];

  @OneToMany(() => ScheduledTask, task => task.plant)
  scheduledTasks: ScheduledTask[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 