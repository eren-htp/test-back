import { IsString, IsOptional, IsBoolean, IsNumber, IsDateString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreatePlantDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsString()
  @IsOptional()
  family?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  isPetToxic?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => {
    // Si c'est déjà une date valide, la retourner
    if (value instanceof Date) return value;
    // Si c'est une chaîne de caractères, essayer de la parser
    if (typeof value === 'string') {
      // Accepter le format YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
      }
      // Accepter le format ISO 8601
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
        return value.split('T')[0];
      }
    }
    return value;
  })
  plantedDate?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  waterFrequencyDays?: number;

  @IsString()
  @IsOptional()
  sunlightRequirement?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  indoor?: boolean;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minSoilMoisture?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  maxSoilMoisture?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minTemperature?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  maxTemperature?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minLightLevel?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  maxLightLevel?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minAirHumidity?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  maxAirHumidity?: number;
} 