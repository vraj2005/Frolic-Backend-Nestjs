import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from 'src/users/entities/user.entity';
import { Department } from 'src/department/entities/department.entity';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {}

  async findAll() {
    return this.eventRepository.find();
  }

  async findById(id: string) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async findByDepartment(departmentId: string) {
    return this.eventRepository.find({ where: { department: { id: departmentId } } });
  }

  async create(createEventDto: CreateEventDto, userId: string) {
    const event = this.eventRepository.create({
      eventName: createEventDto.eventName,
      eventTagline: createEventDto.eventTagline,
      eventImage: createEventDto.eventImage,
      eventDescription: createEventDto.eventDescription,
      groupMinParticipants: createEventDto.groupMinParticipants,
      groupMaxParticipants: createEventDto.groupMaxParticipants,
      eventFees: createEventDto.eventFees,
      eventFirstPrice: createEventDto.eventFirstPrice,
      eventSecondPrice: createEventDto.eventSecondPrice,
      eventThirdPrice: createEventDto.eventThirdPrice,
      department: createEventDto.departmentId ? ({ id: createEventDto.departmentId } as Department) : undefined,
      coOrdinator: createEventDto.coOrdinatorId ? ({ id: createEventDto.coOrdinatorId } as User) : undefined,
      eventMainStudentCoOrdinatorName: createEventDto.eventMainStudentCoOrdinatorName,
      eventMainStudentCoOrdinatorPhone: createEventDto.eventMainStudentCoOrdinatorPhone,
      eventMainStudentCoOrdinatorEmail: createEventDto.eventMainStudentCoOrdinatorEmail,
      eventLocation: createEventDto.eventLocation,
      maxGroupsAllowed: createEventDto.maxGroupsAllowed,
      createdAt: new Date(),
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    });
    return this.eventRepository.save(event);
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    const event = await this.findById(id);
    const updated = {
      ...event,
      ...updateEventDto,
      department: updateEventDto.departmentId ? ({ id: updateEventDto.departmentId } as Department) : event.department,
      coOrdinator: updateEventDto.coOrdinatorId ? ({ id: updateEventDto.coOrdinatorId } as User) : event.coOrdinator,
      modifiedAt: new Date(),
      modifiedBy: { id: userId } as User,
    };
    return this.eventRepository.save(updated);
  }

  async remove(id: string) {
    const result = await this.eventRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Event not found');
    }
  }
}
