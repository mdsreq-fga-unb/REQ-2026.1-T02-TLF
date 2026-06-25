"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    const bodyLimit = process.env.HTTP_BODY_LIMIT;
    app.use((0, express_1.json)({ limit: bodyLimit }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: bodyLimit }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('tlt API')
        .setDescription('API inicial')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'supabase-jwt')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.warn(`App rodando em: http://localhost:${port}`);
    console.warn(`Swagger em:     http://localhost:${port}/api/v1/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map