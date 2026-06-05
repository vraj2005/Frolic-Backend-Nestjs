import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { Institute } from 'src/institutes/entities/institute.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async findAll() {
    return this.departmentRepository.find();
  }

  async findById(id: string) {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  async findByInstitute(instituteId: string) {
    return this.departmentRepository.find({ where: { institute: { id: instituteId } } });
  }

  async create(createDepartmentDto: CreateDepartmentDto, userId: string) {
    const department = this.departmentRepository.create({
      departmentName: createDepartmentDto.departmentName,
      departmentImage: createDepartmentDto.departmentImage,
      departmentDescription: createDepartmentDto.departmentDescription,
      institute: createDepartmentDto.instituteId ? ({ id: createDepartmentDto.instituteId } as Institute) : undefined,
      coOrdinator: createDepartmentDto.coOrdinatorId ? ({ id: createDepartmentDto.coOrdinatorId } as User) : undefined,
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    });
    return this.departmentRepository.save(department);
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto, userId: string) {
    const department = await this.findById(id);
    const updated = {
      ...department,
      ...updateDepartmentDto,
      institute: updateDepartmentDto.instituteId ? ({ id: updateDepartmentDto.instituteId } as Institute) : department.institute,
      coOrdinator: updateDepartmentDto.coOrdinatorId ? ({ id: updateDepartmentDto.coOrdinatorId } as User) : department.coOrdinator,
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    };
    return this.departmentRepository.save(updated);
  }

  async remove(id: string) {
    const result = await this.departmentRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Department not found');
    }
  }
}
