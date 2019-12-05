import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstans } from './constans';

@Module({
  imports: [
    forwardRef( ()=>UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstans.secret,
      signOptions: { expiresIn: '360d' },
    }),
  ],
  providers: [AuthService,  JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}