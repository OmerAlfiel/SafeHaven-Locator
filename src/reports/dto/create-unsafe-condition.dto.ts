import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUnsafeConditionDto {
  @IsNumber()
  @IsNotEmpty()
  shelter_id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  severity: string;
}