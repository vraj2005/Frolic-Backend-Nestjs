import { IsOptional, IsString } from 'class-validator';

export class UpdateInstituteDto {
  @IsOptional()
  @IsString()
  instituteName?: string;

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
