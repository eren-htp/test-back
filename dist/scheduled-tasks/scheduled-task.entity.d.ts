import { Plant } from '../plants/plant.entity';
export declare enum TaskType {
    WATERING = "watering",
    FERTILIZING = "fertilizing",
    REPOTTING = "repotting",
    PRUNING = "pruning",
    CUSTOM = "custom"
}
export declare enum TaskStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    OVERDUE = "overdue"
}
export declare class ScheduledTask {
    id: number;
    plant: Plant;
    type: TaskType;
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    recurring: boolean;
    recurringInterval: number;
    createdAt: Date;
    completedAt: Date;
}
