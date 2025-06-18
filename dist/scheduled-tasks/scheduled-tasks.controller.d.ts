import { ScheduledTasksService } from './scheduled-tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request } from 'express';
import { PlantsService } from '../plants/plants.service';
interface RequestWithUser extends Request {
    user: {
        id: number;
        email: string;
        role: string;
    };
}
export declare class ScheduledTasksController {
    private readonly tasksService;
    private readonly plantsService;
    constructor(tasksService: ScheduledTasksService, plantsService: PlantsService);
    create(createTaskDto: CreateTaskDto, req: RequestWithUser): Promise<import("./scheduled-task.entity").ScheduledTask>;
    findAll(req: RequestWithUser): Promise<import("./scheduled-task.entity").ScheduledTask[]>;
    findOverdue(): Promise<import("./scheduled-task.entity").ScheduledTask[]>;
    findByPlantId(id: string, req: RequestWithUser): Promise<import("./scheduled-task.entity").ScheduledTask[]>;
    findPendingByPlantId(id: string, req: RequestWithUser): Promise<import("./scheduled-task.entity").ScheduledTask[]>;
    findOne(id: string, req: RequestWithUser): Promise<import("./scheduled-task.entity").ScheduledTask>;
    update(id: string, updateTaskDto: UpdateTaskDto, req: RequestWithUser): Promise<import("./scheduled-task.entity").ScheduledTask>;
    remove(id: string, req: RequestWithUser): Promise<void>;
}
export {};
