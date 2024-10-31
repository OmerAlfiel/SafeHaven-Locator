import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { ShelterReport } from './shelter-report.entity';



@Entity()
export class ReviewRating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShelterReport, shelter => shelter.id)
  shelter_id: number;

  @Column()
  user_id: number;

  @Column()
  rating: number;

  @Column()
  review: string;

  @CreateDateColumn()
  created_at: Date;
}