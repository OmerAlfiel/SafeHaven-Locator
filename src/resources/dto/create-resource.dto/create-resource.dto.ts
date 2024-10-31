import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResourceDto {
  @IsNumber()
  @IsNotEmpty()
  shelter_id: number;

  @IsString()
  @IsNotEmpty()
  resource_type: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}