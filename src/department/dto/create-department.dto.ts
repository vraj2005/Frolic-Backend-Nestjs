import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  departmentName!: string;

  @IsOptional()
  @IsString()
  departmentImage?: string;

  @IsOptional()
  @IsString()
  departmentDescription?: string;

  @IsOptional()
  @IsString()
  instituteId?: string;

  @IsOptional()
  @IsString()
  coOrdinatorId?: string;
}
