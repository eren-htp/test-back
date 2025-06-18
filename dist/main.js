"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(bodyParser.json({ limit: '1mb' }));
    app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
    console.log('Body parser configuré avec une limite de 1MB');
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        exceptionFactory: (errors) => {
            console.log('Erreurs de validation:', JSON.stringify(errors, null, 2));
            const messages = errors.map(error => {
                return {
                    property: error.property,
                    value: error.value,
                    constraints: error.constraints
                };
            });
            console.log('Messages d\'erreur:', JSON.stringify(messages, null, 2));
            return new common_1.BadRequestException(messages);
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('PlantNet API')
        .setDescription('The PlantNet API for connected plant management')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(process.env.PORT ?? 3006);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map