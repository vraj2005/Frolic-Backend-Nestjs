import { Event } from 'src/events/entities/event.entity';
import { Institute } from 'src/institutes/entities/institute.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  departmentName!: string;

  @Column({ nullable: true, type: 'varchar' })
  departmentImage!: string;

  @Column({ nullable: true, type: 'text' })
  departmentDescription!: string;

  @ManyToOne(() => Institute, (institute) => institute.departments, { nullable: true, eager: true })
  institute!: Institute;

  @ManyToOne(() => User, (user) => user.departments, { nullable: true, eager: true })
  coOrdinator!: User;

  @OneToMany(() => Event, (event) => event.department)
  events!: Event[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt!: Date;

  @ManyToOne(() => User, { nullable: true, eager: true })
  modifiedBy!: User;
}
