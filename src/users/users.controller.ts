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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { UserCreate } from 'src/dto/request/userCreate.dto';
import { AuthenticationRequest } from 'src/dto/request/Authentication.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('api/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('/')
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    return cb(null, `${file.originalname}`);
                },
            }),
        }),
    )
    async create(
        @Res() res: Response,
        @Body() createUser: UserCreate,
        @UploadedFile() file,
    ) {
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
