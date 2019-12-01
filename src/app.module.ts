import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

config();
@Module({
    imports: [
        MongooseModule.forRoot(`${process.env.MONGO_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        }),
        
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
