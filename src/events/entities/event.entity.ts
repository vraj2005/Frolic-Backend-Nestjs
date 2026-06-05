import { Department } from 'src/department/entities/department.entity';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Winner } from 'src/winners/entities/winner.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  eventName!: string;

  @Column({ nullable: true, type: 'varchar' })
  eventTagline!: string;

  @Column({ nullable: true, type: 'varchar' })
  eventImage!: string;

  @Column({ nullable: true, type: 'text' })
  eventDescription!: string;

  @Column({ nullable: true, type: 'int' })
  groupMinParticipants!: number;

  @Column({ nullable: true, type: 'int' })
  groupMaxParticipants!: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  eventFees!: number;

  @Column({ nullable: true, type: 'varchar' })
  eventFirstPrice!: string;

  @Column({ nullable: true, type: 'varchar' })
  eventSecondPrice!: string;

  @Column({ nullable: true, type: 'varchar' })
  eventThirdPrice!: string;

  @ManyToOne(() => Department, { nullable: true, eager: true })
  department!: Department;

  @ManyToOne(() => User, (user) => user.events, { nullable: true, eager: true })
  coOrdinator!: User;

  @Column({ nullable: true, type: 'varchar' })
  eventMainStudentCoOrdinatorName!: string;

  @Column({ nullable: true, type: 'varchar' })
  eventMainStudentCoOrdinatorPhone!: string;

  @Column({ nullable: true, type: 'varchar' })
  eventMainStudentCoOrdinatorEmail!: string;

  @Column({ nullable: true, type: 'varchar' })
  eventLocation!: string;

  @Column({ nullable: true, type: 'int' })
  maxGroupsAllowed!: number;

  @OneToMany(() => Group, (group) => group.event)
  groups!: Group[];

  @OneToMany(() => Winner, (winner) => winner.event)
  winners!: Winner[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt!: Date;

  @ManyToOne(() => User, { nullable: true, eager: true })
  modifiedBy!: User;
}
