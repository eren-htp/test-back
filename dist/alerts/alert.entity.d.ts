import { Plant } from '../plants/plant.entity';
export declare enum AlertType {
    SOIL_MOISTURE = "soil_moisture",
    TEMPERATURE = "temperature",
    LIGHT_LEVEL = "light_level",
    AIR_HUMIDITY = "air_humidity",
    MAINTENANCE = "maintenance"
}
export declare enum AlertStatus {
    ACTIVE = "active",
    RESOLVED = "resolved",
    DISMISSED = "dismissed"
}
export declare class Alert {
    id: number;
    plant: Plant;
    type: AlertType;
    message: string;
    status: AlertStatus;
    createdAt: Date;
    resolvedAt: Date;
}
