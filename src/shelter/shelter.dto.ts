import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShelterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  availability: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}