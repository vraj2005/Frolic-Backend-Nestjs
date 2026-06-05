import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInstituteDto {
  @IsString()
  @IsNotEmpty()
  instituteName!: string;

  @IsOptional()
  @IsString()
  instituteImage?: string;

  @IsOptional()
  @IsString()
  instituteDescription?: string;

  @IsOptional()
  @IsString()
  coOrdinatorId?: string;
}
