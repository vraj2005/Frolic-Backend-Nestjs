import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcryptjs.hash(createUserDto.userPassword, 10);
    return this.usersService.create({
      ...createUserDto,
      userPassword: hashedPassword,
    });
  }

  async validateUser(emailAddress: string, password: string) {
    const user = await this.usersService.findByEmail(emailAddress);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordMatches = await bcryptjs.compare(password, user.userPassword);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(emailAddress: string, password: string) {
    const user = await this.validateUser(emailAddress, password);
    return {
      token: this.jwtService.sign({ userId: user.id, isAdmin: user.isAdmin }),
    };
  }
}
