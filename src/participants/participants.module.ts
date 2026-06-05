import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { Participant } from './entities/participant.entity';
import { Group } from 'src/groups/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participant, Group])],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantsModule {}
