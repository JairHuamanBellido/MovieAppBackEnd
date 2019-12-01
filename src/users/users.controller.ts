import { Controller, Post, Res, Body, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { UserCreate } from 'src/dto/request/userCreate.dto';

@Controller('api/user')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('/')
    async create(@Res() res: Response, @Body() createUser: UserCreate) {
        const user = await this.userService.create(createUser);
        console.log(user);
        res.json(user);
    }

    @Get('/')
    async get(@Res() res: Response, @Req() req: Request) {
        res.json({ ga: 'asd' });
    }
}
