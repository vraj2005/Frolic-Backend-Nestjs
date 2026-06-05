import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { Institute } from './entities/institute.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class InstitutesService {
  constructor(
    @InjectRepository(Institute)
    private readonly instituteRepository: Repository<Institute>,
  ) {}

  async findAll() {
    return this.instituteRepository.find();
  }

  async findById(id: string) {
    const institute = await this.instituteRepository.findOne({ where: { id } });
    if (!institute) {
      throw new NotFoundException('Institute not found');
    }
    return institute;
  }

  async create(createInstituteDto: CreateInstituteDto, userId: string) {
    const institute = this.instituteRepository.create({
      instituteName: createInstituteDto.instituteName,
      instituteImage: createInstituteDto.instituteImage,
      instituteDescription: createInstituteDto.instituteDescription,
      coOrdinator: createInstituteDto.coOrdinatorId ? ({ id: createInstituteDto.coOrdinatorId } as User) : undefined,
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    });
    return this.instituteRepository.save(institute);
  }

  async update(id: string, updateInstituteDto: UpdateInstituteDto, userId: string) {
    const institute = await this.findById(id);
    const updated = {
      ...institute,
      ...updateInstituteDto,
      coOrdinator: updateInstituteDto.coOrdinatorId ? ({ id: updateInstituteDto.coOrdinatorId } as User) : institute.coOrdinator,
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    };
    return this.instituteRepository.save(updated);
  }

  async remove(id: string) {
    const result = await this.instituteRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Institute not found');
    }
  }
}
