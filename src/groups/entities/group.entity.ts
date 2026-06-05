import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Event, (event) => event.groups, { nullable: true, eager: true })
  event!: Event;

  @Column({ type: 'varchar' })
  groupName!: string;

  @Column({ type: 'boolean', default: false })
  isPaymentDone!: boolean;

  @Column({ type: 'boolean', default: false })
  isPresent!: boolean;

  @OneToMany(() => Participant, (participant) => participant.group)
  participants!: Participant[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt!: Date;

  @ManyToOne(() => User, { nullable: true, eager: true })
  modifiedBy!: User;
}
