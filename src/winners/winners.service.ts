import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWinnerDto } from './dto/create-winner.dto';
import { UpdateWinnerDto } from './dto/update-winner.dto';
import { Winner } from './entities/winner.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WinnersService {
  constructor(
    @InjectRepository(Winner)
    private readonly winnerRepository: Repository<Winner>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async findByEvent(eventId: string) {
    return this.winnerRepository.find({ where: { event: { id: eventId } }, order: { sequence: 'ASC' } });
  }

  async create(createWinnerDto: CreateWinnerDto, userId: string) {
    const event = await this.eventRepository.findOne({ where: { id: createWinnerDto.eventId } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const group = await this.groupRepository.findOne({ where: { id: createWinnerDto.groupId } });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const existing = await this.winnerRepository.findOne({ where: { event: { id: createWinnerDto.eventId }, sequence: createWinnerDto.sequence } });
    if (existing) {
      throw new BadRequestException('Winner already declared for this position');
    }

    const winner = this.winnerRepository.create({
      event: { id: createWinnerDto.eventId } as Event,
      group: { id: createWinnerDto.groupId } as Group,
      sequence: createWinnerDto.sequence,
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    });

    return this.winnerRepository.save(winner);
  }

  async update(id: string, updateWinnerDto: UpdateWinnerDto, userId: string) {
    const winner = await this.winnerRepository.findOne({ where: { id } });
    if (!winner) {
      throw new NotFoundException('Winner not found');
    }

    const updated = {
      ...winner,
      ...updateWinnerDto,
      event: updateWinnerDto.eventId ? ({ id: updateWinnerDto.eventId } as Event) : winner.event,
      group: updateWinnerDto.groupId ? ({ id: updateWinnerDto.groupId } as Group) : winner.group,
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    };

    return this.winnerRepository.save(updated);
  }

  async remove(id: string) {
    const result = await this.winnerRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Winner not found');
    }
  }
}
