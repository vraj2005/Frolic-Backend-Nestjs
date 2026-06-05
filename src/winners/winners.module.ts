import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinnersController } from './winners.controller';
import { WinnersService } from './winners.service';
import { Winner } from './entities/winner.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Event } from 'src/events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Winner, Event, Group])],
  controllers: [WinnersController],
  providers: [WinnersService],
})
export class WinnersModule {}
