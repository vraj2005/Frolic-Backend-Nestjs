import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateWinnerDto } from './dto/create-winner.dto';
import { UpdateWinnerDto } from './dto/update-winner.dto';
import { WinnersService } from './winners.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CurrentUser } from 'src/auth/user.decorator';

@Controller('api/winners')
export class WinnersController {
  constructor(private readonly winnersService: WinnersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('event/:eventId')
  async findByEvent(@Param('eventId') eventId: string) {
    return this.winnersService.findByEvent(eventId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() createWinnerDto: CreateWinnerDto, @CurrentUser() user: any) {
    return this.winnersService.create(createWinnerDto, user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateWinnerDto: UpdateWinnerDto, @CurrentUser() user: any) {
    return this.winnersService.update(id, updateWinnerDto, user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.winnersService.remove(id);
  }
}
