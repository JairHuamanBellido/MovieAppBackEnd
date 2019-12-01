import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { UserCreate } from '../dto/request/userCreate.dto';
@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async create(user: UserCreate): Promise<User> {
        const newUser = new this.userModel(user);

        return newUser.save();
    }
}
