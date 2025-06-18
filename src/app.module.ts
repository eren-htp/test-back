import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsModule } from './plants/plants.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { AlertsModule } from './alerts/alerts.module';
import { ScheduledTasksModule } from './scheduled-tasks/scheduled-tasks.module';

// Entities
import { Plant } from './plants/plant.entity';
import { User } from './users/user.entity';
import { SensorData } from './sensor-data/sensor-data.entity';
import { Alert } from './alerts/alert.entity';
import { ScheduledTask } from './scheduled-tasks/scheduled-task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'trolley.proxy.rlwy.net',
      port: 21885,
      username: 'root',
      password: 'hYllEtzLcUPECmKrvxevGxNNvIzKwFzw',
      database: 'railway',
      entities: [Plant, User, SensorData, Alert, ScheduledTask],
      migrations: [__dirname + '/migrations/**/*.{js,ts}'],
      migrationsRun: true,
      synchronize: false,
      connectTimeout: 60000,
      extra: {
        connectionLimit: 5
      }
    }),
    PlantsModule,
    UsersModule,
    AuthModule,
    SensorDataModule,
    AlertsModule,
    ScheduledTasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
