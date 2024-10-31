import { IsString, IsNotEmpty } from 'class-validator';

export class CreateShelterReportDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  details: string;
}