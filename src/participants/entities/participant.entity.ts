import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  participantName!: string;

  @Column({ nullable: true, type: 'varchar' })
  participantEnrollmentNumber!: string;

  @Column({ nullable: true, type: 'varchar' })
  participantInstituteName!: string;

  @Column({ nullable: true, type: 'varchar' })
  participantCity!: string;

  @Column({ nullable: true, type: 'varchar' })
  participantMobile!: string;

  @Column({ nullable: true, type: 'varchar' })
  participantEmail!: string;

  @Column({ default: false })
  isGroupLeader!: boolean;

  @ManyToOne(() => Group, (group) => group.participants, { nullable: true, eager: true })
  group!: Group;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt!: Date;

  @ManyToOne(() => User, { nullable: true, eager: true })
  modifiedBy!: User;
}
