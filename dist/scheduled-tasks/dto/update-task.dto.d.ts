import { TaskType, TaskStatus } from '../scheduled-task.entity';
export declare class UpdateTaskDto {
    plantId?: number;
    type?: TaskType;
    title?: string;
    description?: string;
    dueDate?: Date;
    status?: TaskStatus;
    recurring?: boolean;
    recurringInterval?: number;
    completedAt?: Date;
}
