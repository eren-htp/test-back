import { TaskType } from '../scheduled-task.entity';
export declare class CreateTaskDto {
    plantId: number;
    type: TaskType;
    title: string;
    description?: string;
    dueDate: string;
    recurring?: boolean;
    recurringInterval?: number;
}
