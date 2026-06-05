import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';;
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from 'src/users/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const expiresIn: any = configService.get<string>('JWT_EXPIRATION', '1h');
        return {
          secret: configService.get<string>('JWT_SECRET', 'secret'),
          signOptions: { expiresIn },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
