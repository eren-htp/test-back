"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const plant_entity_1 = require("./plants/plant.entity");
const user_entity_1 = require("./users/user.entity");
const sensor_data_entity_1 = require("./sensor-data/sensor-data.entity");
const alert_entity_1 = require("./alerts/alert.entity");
const scheduled_task_entity_1 = require("./scheduled-tasks/scheduled-task.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'trolley.proxy.rlwy.net',
    port: 21885,
    username: 'root',
    password: 'hYllEtzLcUPECmKrvxevGxNNvIzKwFzw',
    database: 'railway',
    entities: [plant_entity_1.Plant, user_entity_1.User, sensor_data_entity_1.SensorData, alert_entity_1.Alert, scheduled_task_entity_1.ScheduledTask],
    migrations: [__dirname + '/migrations/**/*.{js,ts}'],
    synchronize: false,
    connectTimeout: 60000,
});
exports.default = exports.AppDataSource;
//# sourceMappingURL=data-source.js.map