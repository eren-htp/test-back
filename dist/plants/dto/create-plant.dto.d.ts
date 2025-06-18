export declare class CreatePlantDto {
    name: string;
    species: string;
    family?: string;
    type?: string;
    location?: string;
    isPetToxic?: boolean;
    description?: string;
    plantedDate?: string;
    waterFrequencyDays?: number;
    sunlightRequirement?: string;
    indoor?: boolean;
    imageUrl?: string;
    minSoilMoisture?: number;
    maxSoilMoisture?: number;
    minTemperature?: number;
    maxTemperature?: number;
    minLightLevel?: number;
    maxLightLevel?: number;
    minAirHumidity?: number;
    maxAirHumidity?: number;
}
