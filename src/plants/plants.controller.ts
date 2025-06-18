import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { Plant } from './plant.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@Controller('plants')
@UseGuards(JwtAuthGuard)
export class PlantsController {
  constructor(
    private readonly plantsService: PlantsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll(@Req() req: RequestWithUser): Promise<Plant[]> {
    const userId = req.user.id;
    return this.plantsService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser): Promise<Plant> {
    const userId = req.user.id;
    return this.plantsService.findOne(+id, userId);
  }

  @Post()
  async create(@Body() createPlantDto: CreatePlantDto, @Req() req: RequestWithUser): Promise<Plant> {
    console.log('Données reçues pour la création de plante:', JSON.stringify(createPlantDto, null, 2));
    const userId = req.user.id;
    const user = await this.usersService.findById(userId);
    return this.plantsService.create(createPlantDto, user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updatePlantDto: UpdatePlantDto, 
    @Req() req: RequestWithUser
  ): Promise<Plant> {
    const userId = req.user.id;
    return this.plantsService.update(+id, updatePlantDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser): Promise<void> {
    const userId = req.user.id;
    return this.plantsService.remove(+id, userId);
  }
} 