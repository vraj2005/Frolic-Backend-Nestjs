import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';
import { CurrentUser } from 'src/auth/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createGroupDto: CreateGroupDto, @CurrentUser() user: any) {
    return this.groupsService.create(createGroupDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('event/:eventId')
  async findByEvent(@Param('eventId') eventId: string) {
    return this.groupsService.findByEvent(eventId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto, @CurrentUser() user: any) {
    return this.groupsService.update(id, updateGroupDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
