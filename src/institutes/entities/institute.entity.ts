import { Department } from 'src/department/entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('institutes')
export class Institute {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  instituteName!: string;

  @Column({ nullable: true, type: 'varchar' })
  instituteImage!: string;

  @Column({ nullable: true, type: 'text' })
  instituteDescription!: string;

  @ManyToOne(() => User, (user) => user.institutes, { nullable: true, eager: true })
  coOrdinator!: User;

  @OneToMany(() => Department, (department) => department.institute)
  departments!: Department[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt!: Date;

  @ManyToOne(() => User, { nullable: true, eager: true })
  modifiedBy!: User;
}
