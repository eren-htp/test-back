import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Request } from 'express';
import { PlantsService } from '../plants/plants.service';
interface RequestWithUser extends Request {
    user: {
        id: number;
        email: string;
        role: string;
    };
}
export declare class AlertsController {
    private readonly alertsService;
    private readonly plantsService;
    constructor(alertsService: AlertsService, plantsService: PlantsService);
    create(createAlertDto: CreateAlertDto, req: RequestWithUser): Promise<import("./alert.entity").Alert>;
    findAll(req: RequestWithUser): Promise<import("./alert.entity").Alert[]>;
    findByPlantId(id: string, req: RequestWithUser): Promise<import("./alert.entity").Alert[]>;
    findActiveByPlantId(id: string, req: RequestWithUser): Promise<import("./alert.entity").Alert[]>;
    findOne(id: string, req: RequestWithUser): Promise<import("./alert.entity").Alert>;
    update(id: string, updateAlertDto: UpdateAlertDto, req: RequestWithUser): Promise<import("./alert.entity").Alert>;
    remove(id: string): Promise<void>;
}
export {};
