import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Department } from 'src/department/entities/department.entity';
import { Event } from './entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Department])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
