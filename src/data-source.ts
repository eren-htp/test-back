import { DataSource } from 'typeorm';
import { Plant } from './plants/plant.entity';
import { User } from './users/user.entity';
import { SensorData } from './sensor-data/sensor-data.entity';
import { Alert } from './alerts/alert.entity';
import { ScheduledTask } from './scheduled-tasks/scheduled-task.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'trolley.proxy.rlwy.net',
  port: 21885,
  username: 'root',
  password: 'hYllEtzLcUPECmKrvxevGxNNvIzKwFzw',
  database: 'railway',
  entities: [Plant, User, SensorData, Alert, ScheduledTask],
  migrations: [__dirname + '/migrations/**/*.{js,ts}'],
  synchronize: false,
  connectTimeout: 60000,
});

export default AppDataSource; 