import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Plant } from '../plants/plant.entity';

export enum TaskType {
  WATERING = 'watering',
  FERTILIZING = 'fertilizing',
  REPOTTING = 'repotting',
  PRUNING = 'pruning',
  CUSTOM = 'custom',
}

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
}

@Entity()
export class ScheduledTask {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plant, plant => plant.scheduledTasks)
  plant: Plant;

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  type: TaskType;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({ type: 'boolean', default: false })
  recurring: boolean;

  @Column({ type: 'int', nullable: true })
  recurringInterval: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;
} 