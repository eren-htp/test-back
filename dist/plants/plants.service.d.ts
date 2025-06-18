import { Repository } from 'typeorm';
import { Plant } from './plant.entity';
import { User } from '../users/user.entity';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
export declare class PlantsService {
    private plantsRepository;
    constructor(plantsRepository: Repository<Plant>);
    findAll(userId: number): Promise<Plant[]>;
    findOne(id: number, userId: number): Promise<Plant>;
    create(createPlantDto: CreatePlantDto, user: User): Promise<Plant>;
    update(id: number, updatePlantDto: UpdatePlantDto, userId: number): Promise<Plant>;
    remove(id: number, userId: number): Promise<void>;
}
