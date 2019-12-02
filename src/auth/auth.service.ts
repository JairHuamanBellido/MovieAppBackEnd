import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {  JwtModule, JwtService} from "@nestjs/jwt";
@Injectable()
export class AuthService {


    constructor(
        @Inject(forwardRef( ()=>UsersService))
        private readonly userService:UsersService,
        private readonly jwtService:JwtService
    ){}



    async validateUser(username:string,password:string):Promise<any>{
        const user =  await this.userService.findOne(username);

        if(user && user.password ===password){
            
            const payload = {username:user.username,_id:user._id};
            return {user,access_token:this.jwtService.sign(payload)};
            
        }
        return null;
    }


    async login(user:any){
        const payload = {username:user.username,id:user._id};
        
        return{
            access_token: this.jwtService.sign(payload)
        };
    }
}
