import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { config } from 'dotenv';
config();
describe('UsersService', () => {
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
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
