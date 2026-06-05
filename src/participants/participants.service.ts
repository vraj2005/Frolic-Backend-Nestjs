import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { Participant } from './entities/participant.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Event as EventEntity } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async add(createParticipantDto: CreateParticipantDto, userId: string) {
    const group = await this.groupRepository.findOne({ where: { id: createParticipantDto.groupId }, relations:{event:true} });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const event = group.event as EventEntity;
    const participantCount = await this.participantRepository.count({ where: { group: { id: createParticipantDto.groupId } } });
    if (event?.groupMaxParticipants && participantCount >= event.groupMaxParticipants) {
      throw new BadRequestException('Max participants limit reached');
    }

    const participant = this.participantRepository.create({
      participantName: createParticipantDto.participantName,
      participantEnrollmentNumber: createParticipantDto.participantEnrollmentNumber,
      participantInstituteName: createParticipantDto.participantInstituteName,
      participantCity: createParticipantDto.participantCity,
      participantMobile: createParticipantDto.participantMobile,
      participantEmail: createParticipantDto.participantEmail,
      isGroupLeader: createParticipantDto.isGroupLeader ?? false,
      group: { id: createParticipantDto.groupId } as Group,
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    });

    return this.participantRepository.save(participant);
  }

  async findByGroup(groupId: string) {
    return this.participantRepository.find({ where: { group: { id: groupId } } });
  }

  async remove(id: string) {
    const result = await this.participantRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Participant not found');
    }
  }
}
