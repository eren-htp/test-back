import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSensorDataDto {
  @IsNotEmpty()
  @IsNumber()
  plantId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  soilMoisture: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  temperature: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100000)
  @Type(() => Number)
  lightLevel: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  airHumidity: number;
} 