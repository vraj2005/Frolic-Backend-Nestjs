import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CurrentUser } from 'src/auth/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { DepartmentsService } from './department.service';

@Controller('api/departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.departmentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.departmentsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('institute/:instituteId')
  async findByInstitute(@Param('instituteId') instituteId: string) {
    return this.departmentsService.findByInstitute(instituteId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto, @CurrentUser() user: any) {
    return this.departmentsService.create(createDepartmentDto, user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @CurrentUser() user: any,
  ) {
    return this.departmentsService.update(id, updateDepartmentDto, user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
