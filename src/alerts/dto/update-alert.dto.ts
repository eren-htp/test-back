import { IsEnum, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { AlertType, AlertStatus } from '../alert.entity';
import { Type } from 'class-transformer';

export class UpdateAlertDto {
  @IsOptional()
  @IsNumber()
  plantId?: number;

  @IsOptional()
  @IsEnum(AlertType)
  type?: AlertType;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsEnum(AlertStatus)
  status?: AlertStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  resolvedAt?: Date;
} 