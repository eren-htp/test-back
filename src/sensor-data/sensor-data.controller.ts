import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DEVELOPER)
  create(@Body() createSensorDataDto: CreateSensorDataDto) {
    return this.sensorDataService.create(createSensorDataDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.sensorDataService.findAll();
  }

  @Get('plant/:id')
  @UseGuards(JwtAuthGuard)
  findByPlantId(@Param('id') id: string) {
    return this.sensorDataService.findByPlantId(+id);
  }

  @Get('plant/:id/latest')
  @UseGuards(JwtAuthGuard)
  findLatestByPlantId(@Param('id') id: string) {
    return this.sensorDataService.findLatestByPlantId(+id);
  }

  @Get('plant/:id/range')
  @UseGuards(JwtAuthGuard)
  findByPlantIdAndDateRange(
    @Param('id') id: string,
    @Query('start') startDate: string,
    @Query('end') endDate: string,
  ) {
    return this.sensorDataService.findByPlantIdAndDateRange(
      +id,
      new Date(startDate),
      new Date(endDate),
    );
  }
} 