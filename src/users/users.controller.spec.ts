import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { config } from 'dotenv';
config();
describe('Users Controller', () => {
    let controller: UsersController;
    let service: UsersService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(`${process.env.MONGO_URL}`, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }),
                MongooseModule.forFeature([
                    { name: 'User', schema: UserSchema },
                ]),
            ],
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
