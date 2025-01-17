import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './Student';
import { Advisor } from './Advisor';
import { Coordinator } from './Coordinator';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'date_start', type: 'date' })
  dateStart: Date;

  @Column({ name: 'date_end', type: 'date' })
  dateEnd: Date;

  @ManyToOne(() => Advisor, { nullable: false })
  @JoinColumn({ name: 'advisor_id' })
  advisorId: Advisor;

  @ManyToOne(() => Student, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  studentId: Student;

  @Column({ default: 0 })
  status: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Coordinator, { nullable: true })
  @JoinColumn({ name: 'coordinator_id' })
  coordinatorId: Coordinator;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;
}
