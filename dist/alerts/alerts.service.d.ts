import { Repository } from 'typeorm';
import { Alert } from './alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Plant } from '../plants/plant.entity';
export declare class AlertsService {
    private alertsRepository;
    constructor(alertsRepository: Repository<Alert>);
    create(data: CreateAlertDto & {
        plant?: Plant;
    }): Promise<Alert>;
    findAll(): Promise<Alert[]>;
    findAllByUserId(userId: number): Promise<Alert[]>;
    findByPlantId(plantId: number): Promise<Alert[]>;
    findActiveByPlantId(plantId: number): Promise<Alert[]>;
    findById(id: number): Promise<Alert>;
    update(id: number, updateAlertDto: UpdateAlertDto): Promise<Alert>;
    remove(id: number): Promise<void>;
}
