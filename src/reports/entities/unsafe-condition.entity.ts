import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { ShelterReport } from './shelter-report.entity';



@Entity()
export class UnsafeCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShelterReport, shelter => shelter.id)
  shelter_id: number;

  @Column()
  description: string;

  @Column()
  severity: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}