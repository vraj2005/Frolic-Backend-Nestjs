import { Event } from 'src/events/entities/event.entity';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity('winners')
export class Winner {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Event, (event) => event.winners, { nullable: true, eager: true })
  event!: Event;

  @ManyToOne(() => Group, { nullable: true, eager: true })
  group!: Group;

  @Column({ type: 'int' })
  sequence!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt!: Date;

  @ManyToOne(() => User, { nullable: true, eager: true })
  modifiedBy!: User;
}
