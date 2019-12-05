import {
    Controller,
    Post,
    Res,
    Body,
    Get,
    Req,
    BadRequestException,
    UseInterceptors,
    UploadedFile,
    UseGuards,
    Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { UserCreate } from 'src/dto/request/userCreate.dto';
import { AuthenticationRequest } from 'src/dto/request/Authentication.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import {
    UploadedFileMetadata,
    AzureStorageService,
} from '@nestjs/azure-storage';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly azureBlobStorage: AzureStorageService,
    ) {}

    @Post('/')
    @UseInterceptors(FileInterceptor('avatar'))
    async create(
        @Res() res: Response,
        @Body() createUser: UserCreate,
        @UploadedFile() file: UploadedFileMetadata,
    ) {
        file = {
            ...file,
            originalname: `${createUser.username}.jpg`,
        };
        const storageUrl = await this.azureBlobStorage.upload(file);

        const user = await this.userService.create(createUser);

        res.json(user);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async get(@Res() res: Response, @Req() req: Request, @Param() params) {

        const user = await this.userService.findById(params.id);
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
