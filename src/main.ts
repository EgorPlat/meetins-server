import {NestFactory} from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import {AppModule} from "./app.module";


const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create<NestExpressApplication>(AppModule);
        app.useStaticAssets(join(__dirname, '../../server/dist'));
        
        const config = new DocumentBuilder()
        .setTitle('Meetins Server')
        .setDescription('Meetins Documentation')
        .setVersion('1.0.0')
        .addTag('Egor Platonov')
        .build()
        const swagger = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup('/api/docs', app, swagger);
        
        await app.listen(PORT, () => {
            console.log('Server started');
        })
    }
    catch(error){
        console.log(error);
    }
}

start();