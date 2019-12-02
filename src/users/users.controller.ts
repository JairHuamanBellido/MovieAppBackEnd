import {
    Controller,
    Post,
    Res,
    Body,
    Get,
    Req,
    Inject,
    forwardRef,
    BadRequestException,
    HttpCode,
    Redirect,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { UserCreate } from 'src/dto/request/userCreate.dto';
import { AuthenticationRequest } from 'src/dto/request/Authentication.dto';
import { AuthService } from 'src/auth/auth.service';
import passport = require('passport');

@Controller('api/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('/')
    async create(@Res() res: Response, @Body() createUser: UserCreate) {
        const user = await this.userService.create(createUser);

        res.json(user);
    }

    @Get('/')
    async get(@Res() res: Response, @Req() req: Request) {
        // test
        const user = await this.userService.findOne('jairxx20');
        res.json(user);
    }

    @Post('/auth')
    
    async authenticate( 
        @Res() res: Response,
        @Body() credentials: AuthenticationRequest,
    ) {
        const user = await this.userService.validateCredentials(
            credentials.username,
            credentials.password,
        );
        if (user === null) {
            throw new BadRequestException('Invalid User');
        }
        
        
        res.json(user);
    }
}
