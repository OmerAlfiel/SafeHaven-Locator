import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shelter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  availability: string; // Ensure this matches the type in CreateShelterDto

  @Column('int')
  capacity: number;
}