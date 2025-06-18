import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { Request } from 'express';
import { PlantsService } from '../plants/plants.service';
import { AlertType } from './alert.entity';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@Controller('alerts')
@UseGuards(JwtAuthGuard)
export class AlertsController {
  constructor(
    private readonly alertsService: AlertsService,
    private readonly plantsService: PlantsService,
  ) {}

  @Post()
  async create(@Body() createAlertDto: CreateAlertDto, @Req() req: RequestWithUser) {
    console.log('Données reçues pour créer une alerte:', JSON.stringify(createAlertDto, null, 2));
    console.log('Types d\'alertes valides:', Object.values(AlertType));
    
    try {
      // Vérifier si l'utilisateur a le droit d'accéder à cette plante
      const userId = req.user.id;
      const plant = await this.plantsService.findOne(createAlertDto.plantId, userId);
      
      return this.alertsService.create({
        ...createAlertDto,
        plant
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'alerte:', error);
      throw error;
    }
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.alertsService.findAllByUserId(userId);
  }

  @Get('plant/:id')
  async findByPlantId(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    // Vérifier si l'utilisateur a le droit d'accéder à cette plante
    await this.plantsService.findOne(+id, userId);
    
    return this.alertsService.findByPlantId(+id);
  }

  @Get('plant/:id/active')
  async findActiveByPlantId(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    // Vérifier si l'utilisateur a le droit d'accéder à cette plante
    await this.plantsService.findOne(+id, userId);
    
    return this.alertsService.findActiveByPlantId(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const alert = await this.alertsService.findById(+id);
    const userId = req.user.id;
    
    // Vérifier si l'utilisateur a le droit d'accéder à cette plante
    await this.plantsService.findOne(alert.plant.id, userId);
    
    return alert;
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateAlertDto: UpdateAlertDto,
    @Req() req: RequestWithUser
  ) {
    const alert = await this.alertsService.findById(+id);
    const userId = req.user.id;
    
    // Vérifier si l'utilisateur a le droit d'accéder à cette plante
    await this.plantsService.findOne(alert.plant.id, userId);
    
    return this.alertsService.update(+id, updateAlertDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.DEVELOPER)
  remove(@Param('id') id: string) {
    return this.alertsService.remove(+id);
  }
} 