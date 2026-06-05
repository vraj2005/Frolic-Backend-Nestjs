import { Department } from 'src/department/entities/department.entity';
import { Event } from 'src/events/entities/event.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Institute } from 'src/institutes/entities/institute.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { Winner } from 'src/winners/entities/winner.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  userName!: string;

  @Column({ type: 'varchar' })
  userPassword!: string;

  @Column({ unique: true, type: 'varchar' })
  emailAddress!: string;

  @Column({ nullable: true, type: 'varchar' })
  phoneNumber!: string;

  @Column({ type: 'boolean', default: false })
  isAdmin!: boolean;

  @OneToMany(() => Institute, (institute) => institute.coOrdinator)
  institutes!: Institute[];

  @OneToMany(() => Department, (department) => department.coOrdinator)
  departments!: Department[];

  @OneToMany(() => Event, (event)=>event.coOrdinator)
  events!: Event[];

  @OneToMany(() => Group, (group) => group.modifiedBy)
  groupsModified!: Group[];

  @OneToMany(() => Participant, (participant) => participant.modifiedBy)
  participantsModified!: Participant[];

  @OneToMany(() => Winner, (winner) => winner.modifiedBy)
  winnersModified!: Winner[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
