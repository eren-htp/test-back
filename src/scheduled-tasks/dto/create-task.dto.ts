import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TaskType } from '../scheduled-task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  plantId: number;

  @IsNotEmpty()
  @IsEnum(TaskType)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Gérer le cas spécial de "other" -> "custom"
      if (value.toLowerCase() === 'other') {
        return TaskType.CUSTOM;
      }
      // Vérifier si la valeur est une clé valide de TaskType
      const normalizedValue = value.toLowerCase();
      if (Object.values(TaskType).includes(normalizedValue as TaskType)) {
        return normalizedValue;
      }
    }
    return value;
  })
  type: TaskType;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()  // Simplement une chaîne au lieu d'un objet Date
  dueDate: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true')
  recurring?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  recurringInterval?: number;
} 