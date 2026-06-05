import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InstitutesModule } from './institutes/institutes.module';
import { EventsModule } from './events/events.module';
import { GroupsModule } from './groups/groups.module';
import { ParticipantsModule } from './participants/participants.module';
import { WinnersModule } from './winners/winners.module';
import { User } from './users/entities/user.entity';
import { Institute } from './institutes/entities/institute.entity';
import { Department } from './department/entities/department.entity';
import { Winner } from './winners/entities/winner.entity';
import { Participant } from './participants/entities/participant.entity';
import { Group } from './groups/entities/group.entity';
import { DepartmentsModule } from './department/department.module';
import { Event } from './events/entities/event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'password'),
        database: configService.get<string>('DB_NAME', 'frolic'),
        entities: [User, Institute, Department, Event, Group, Participant, Winner],
        synchronize: true,
        logging: false,
      }),
    }),
    AuthModule,
    UsersModule,
    InstitutesModule,
    DepartmentsModule,
    EventsModule,
    GroupsModule,
    ParticipantsModule,
    WinnersModule,
  ],
})
export class AppModule {}
