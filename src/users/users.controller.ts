import { Controller, Post, Res, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserCreate } from 'src/dto/request/userCreate.dto';

@Controller('api/user')
export class UsersController {


    constructor(private readonly userService:UsersService){}



    @Post('/')
    async create(@Res() res:Response, @Body() createUser:UserCreate){
        const user  = this.userService.create(createUser);


        res.json(user);
    }
}
