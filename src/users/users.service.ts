import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.removePassword(user));
  }

  async findById(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.removePassword(user);
  }

  async findByEmail(emailAddress: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { emailAddress } });
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    if (!createUserDto.userPassword || createUserDto.userPassword.indexOf('$2') !== 0) {
      createUserDto.userPassword = await bcryptjs.hash(createUserDto.userPassword, 10);
    }
    const user = this.userRepository.create(createUserDto as User);
    const saved = await this.userRepository.save(user);
    return this.removePassword(saved);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.userPassword) {
      updateUserDto.userPassword = await bcryptjs.hash(updateUserDto.userPassword, 10);
    }

    Object.assign(existingUser, updateUserDto);
    const saved = await this.userRepository.save(existingUser);
    return this.removePassword(saved);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  private removePassword(user: User): Partial<User> {
    const { userPassword, ...rest } = user;
    return rest;
  }
}
