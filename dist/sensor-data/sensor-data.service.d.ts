import { Repository } from 'typeorm';
import { SensorData } from './sensor-data.entity';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';
export declare class SensorDataService {
    private sensorDataRepository;
    constructor(sensorDataRepository: Repository<SensorData>);
    create(createSensorDataDto: CreateSensorDataDto): Promise<SensorData>;
    findAll(): Promise<SensorData[]>;
    findByPlantId(plantId: number): Promise<SensorData[]>;
    findByPlantIdAndDateRange(plantId: number, startDate: Date, endDate: Date): Promise<SensorData[]>;
    findLatestByPlantId(plantId: number): Promise<SensorData>;
}
