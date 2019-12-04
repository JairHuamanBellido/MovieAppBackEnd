import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';

config();
@Module({
    imports: [
        MongooseModule.forRoot(`${process.env.MONGO_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        }),UsersModule, AuthModule, MoviesModule
        
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
