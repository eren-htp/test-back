import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { AlertType } from '../alert.entity';

export class CreateAlertDto {
  @IsNotEmpty()
  @IsNumber()
  plantId: number;

  @IsNotEmpty()
  @IsEnum(AlertType)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Convertir les valeurs en majuscules vers le format attendu
      const normalizedValue = value.toLowerCase();
      if (Object.values(AlertType).includes(normalizedValue as AlertType)) {
        return normalizedValue;
      }
    }
    return value;
  })
  type: AlertType;

  @IsNotEmpty()
  @IsString()
  message: string;
} 