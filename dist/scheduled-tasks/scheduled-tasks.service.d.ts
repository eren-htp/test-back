import { Repository } from 'typeorm';
import { ScheduledTask } from './scheduled-task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class ScheduledTasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<ScheduledTask>);
    create(data: any): Promise<ScheduledTask>;
    findAll(): Promise<ScheduledTask[]>;
    findAllByUserId(userId: number): Promise<ScheduledTask[]>;
    findByPlantId(plantId: number): Promise<ScheduledTask[]>;
    findPendingByPlantId(plantId: number): Promise<ScheduledTask[]>;
    findOverdue(): Promise<ScheduledTask[]>;
    findById(id: number): Promise<ScheduledTask>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<ScheduledTask>;
    remove(id: number): Promise<void>;
}
