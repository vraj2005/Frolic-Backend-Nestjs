import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createGroupDto: CreateGroupDto, userId: string) {
    const event = await this.eventRepository.findOne({ where: { id: createGroupDto.eventId } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const totalGroups = await this.groupRepository.count({ where: { event: { id: createGroupDto.eventId } } });
    if (event.maxGroupsAllowed && totalGroups >= event.maxGroupsAllowed) {
      throw new BadRequestException('Group limit reached for this event');
    }

    const group = this.groupRepository.create({
      groupName: createGroupDto.groupName,
      event: { id: createGroupDto.eventId } as Event,
      isPaymentDone: createGroupDto.isPaymentDone ?? false,
      isPresent: createGroupDto.isPresent ?? false,
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    });
    return this.groupRepository.save(group);
  }

  async findByEvent(eventId: string) {
    return this.groupRepository.find({ where: { event: { id: eventId } } });
  }

  async update(id: string, updateGroupDto: UpdateGroupDto, userId: string) {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const updated = {
      ...group,
      ...updateGroupDto,
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    };
    return this.groupRepository.save(updated);
  }

  async remove(id: string) {
    const result = await this.groupRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Group not found');
    }
  }
}
