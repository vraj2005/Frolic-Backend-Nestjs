import { IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  departmentName?: string;

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
