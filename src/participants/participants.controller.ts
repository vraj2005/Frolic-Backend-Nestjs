import { Controller, Delete, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsService } from './participants.service';
import { CurrentUser } from 'src/auth/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async add(@Body() createParticipantDto: CreateParticipantDto, @CurrentUser() user: any) {
    return this.participantsService.add(createParticipantDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('group/:groupId')
  async findByGroup(@Param('groupId') groupId: string) {
    return this.participantsService.findByGroup(groupId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.participantsService.remove(id);
  }
}
