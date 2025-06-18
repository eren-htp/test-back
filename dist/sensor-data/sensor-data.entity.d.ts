import { Plant } from '../plants/plant.entity';
export declare class SensorData {
    id: number;
    plant: Plant;
    soilMoisture: number;
    temperature: number;
    lightLevel: number;
    airHumidity: number;
    timestamp: Date;
}
