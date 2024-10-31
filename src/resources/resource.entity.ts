import { ShelterReport } from 'src/reports/entities/shelter-report.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';


@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShelterReport, shelter => shelter.id)
  shelter_id: number;

  @Column()
  resource_type: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;
}