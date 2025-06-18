import { PlantsService } from './plants.service';
import { Plant } from './plant.entity';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
interface RequestWithUser extends Request {
    user: {
        id: number;
        email: string;
        role: string;
    };
}
export declare class PlantsController {
    private readonly plantsService;
    private readonly usersService;
    constructor(plantsService: PlantsService, usersService: UsersService);
    findAll(req: RequestWithUser): Promise<Plant[]>;
    findOne(id: string, req: RequestWithUser): Promise<Plant>;
    create(createPlantDto: CreatePlantDto, req: RequestWithUser): Promise<Plant>;
    update(id: string, updatePlantDto: UpdatePlantDto, req: RequestWithUser): Promise<Plant>;
    remove(id: string, req: RequestWithUser): Promise<void>;
}
export {};
