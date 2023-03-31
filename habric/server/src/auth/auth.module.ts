import { UsersModule } from './../users/users.module';
import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {expiresIn: '24h'}
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
  exports: [JwtModule]
})
export class AuthModule {}
