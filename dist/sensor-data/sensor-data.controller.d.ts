import { SensorDataService } from './sensor-data.service';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';
export declare class SensorDataController {
    private readonly sensorDataService;
    constructor(sensorDataService: SensorDataService);
    create(createSensorDataDto: CreateSensorDataDto): Promise<import("./sensor-data.entity").SensorData>;
    findAll(): Promise<import("./sensor-data.entity").SensorData[]>;
    findByPlantId(id: string): Promise<import("./sensor-data.entity").SensorData[]>;
    findLatestByPlantId(id: string): Promise<import("./sensor-data.entity").SensorData>;
    findByPlantIdAndDateRange(id: string, startDate: string, endDate: string): Promise<import("./sensor-data.entity").SensorData[]>;
}
