import { Module, forwardRef } from '@nestjs/common';

import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

import {  AzureStorageModule} from "@nestjs/azure-storage";

import {  config} from "dotenv";
config();
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        forwardRef( ()=>AuthModule),
        AzureStorageModule.withConfig({
            sasKey: process.env.AZURE_STORAGE_SAS_KEY,
            accountName: process.env.AZURE_STORAGE_ACCOUNT,
            containerName:'avatarimages'
        })
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports:[UsersService]
})
export class UsersModule {
    constructor(private readonly userService: UsersService) {}
}
