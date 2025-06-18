import { IsBoolean, IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskType, TaskStatus } from '../scheduled-task.entity';

export class UpdateTaskDto {
  @IsOptional()
  @IsNumber()
  plantId?: number;

  @IsOptional()
  @IsEnum(TaskType)
  type?: TaskType;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Date)
  dueDate?: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsBoolean()
  recurring?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  recurringInterval?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  completedAt?: Date;
} 