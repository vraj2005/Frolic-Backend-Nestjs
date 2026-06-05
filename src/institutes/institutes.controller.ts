import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { InstitutesService } from './institutes.service';
import { CurrentUser } from 'src/auth/user.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/institutes')
export class InstitutesController {
  constructor(private readonly institutesService: InstitutesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.institutesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.institutesService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() createInstituteDto: CreateInstituteDto, @CurrentUser() user: any) {
    return this.institutesService.create(createInstituteDto, user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInstituteDto: UpdateInstituteDto,
    @CurrentUser() user: any,
  ) {
    return this.institutesService.update(id, updateInstituteDto, user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.institutesService.remove(id);
  }
}
