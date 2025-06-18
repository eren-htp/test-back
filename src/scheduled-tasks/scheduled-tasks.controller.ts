import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ScheduledTasksService } from './scheduled-tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { Request } from 'express';
import { PlantsService } from '../plants/plants.service';
import { TaskType } from './scheduled-task.entity';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class ScheduledTasksController {
  constructor(
    private readonly tasksService: ScheduledTasksService,
    private readonly plantsService: PlantsService,
  ) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: RequestWithUser) {
    console.log('Données brutes reçues:', req.body);
    console.log('Données reçues pour créer une tâche après validation:', JSON.stringify(createTaskDto, null, 2));
    console.log('Types de tâches valides:', Object.values(TaskType));
    
    try {
      // Vérifier si l'utilisateur a le droit d'accéder à cette plante
      const userId = req.user.id;
      const plant = await this.plantsService.findOne(createTaskDto.plantId, userId);
      
      // Formatage explicite de la date
      let dueDate = new Date();
      try {
        dueDate = new Date(createTaskDto.dueDate);
        
        // Vérifier si la date est valide
        if (isNaN(dueDate.getTime())) {
          throw new Error('Date invalide: ' + createTaskDto.dueDate);
        }
      } catch (error) {
        console.error('Erreur lors de la conversion de la date:', error);
        throw new Error('Format de date invalide: ' + createTaskDto.dueDate);
      }
      
      console.log('Date formatée:', dueDate);
      
      // Conversion manuelle des données pour s'assurer que les types sont corrects
      const data = {
        title: createTaskDto.title,
        description: createTaskDto.description,
        type: createTaskDto.type,
        dueDate: dueDate, // Date formatée
        recurring: createTaskDto.recurring || false,
        recurringInterval: createTaskDto.recurringInterval,
        plant
      };
      
      console.log('Données transformées:', JSON.stringify(data, null, 2));
      
      return this.tasksService.create(data);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      throw error;
    }
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.tasksService.findAllByUserId(userId);
  }

  @Get('overdue')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findOverdue() {
    return this.tasksService.findOverdue();
  }

  @Get('plant/:id')
  async findByPlantId(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    // Vérifier si l'utilisateur a le droit d'accéder à cette plante
    await this.plantsService.findOne(+id, userId);
    
    return this.tasksService.findByPlantId(+id);
  }

  @Get('plant/:id/pending')
  async findPendingByPlantId(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    // Vérifier si l'utilisateur a le droit d'accéder à cette plante
    await this.plantsService.findOne(+id, userId);
    
    return this.tasksService.findPendingByPlantId(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const task = await this.tasksService.findById(+id);
    const userId = req.user.id;
    
    // Vérifier si l'utilisateur a le droit d'accéder à cette plante
    await this.plantsService.findOne(task.plant.id, userId);
    
    return task;
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: RequestWithUser
  ) {
    const task = await this.tasksService.findById(+id);
    const userId = req.user.id;
    
    // Vérifier si l'utilisateur a le droit d'accéder à cette plante
    await this.plantsService.findOne(task.plant.id, userId);
    
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const task = await this.tasksService.findById(+id);
    const userId = req.user.id;
    
    // Vérifier si l'utilisateur a le droit d'accéder à cette plante
    await this.plantsService.findOne(task.plant.id, userId);
    
    return this.tasksService.remove(+id);
  }
} 