import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { UserCreate } from '../dto/request/userCreate.dto';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    async create(user: UserCreate): Promise<User> {
        const newUser = new this.userModel(user);

        return await newUser.save();
    }

    async findOne(username: string) {
        return await this.userModel.findOne({ username: username });
    }

    async validateCredentials(username: string, password: string) {
        return await this.authService.validateUser(username, password);
    }

    async findById(id:any){
        return await this.userModel.findOne({_id:id});
    }
}
