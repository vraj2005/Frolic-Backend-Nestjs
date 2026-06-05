import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  eventName?: string;

  @IsOptional()
  @IsString()
  eventTagline?: string;

  @IsOptional()
  @IsString()
  eventImage?: string;

  @IsOptional()
  @IsString()
  eventDescription?: string;

  @IsOptional()
  @IsNumber()
  groupMinParticipants?: number;

  @IsOptional()
  @IsNumber()
  groupMaxParticipants?: number;

  @IsOptional()
  @IsNumber()
  eventFees?: number;

  @IsOptional()
  @IsString()
  eventFirstPrice?: string;

  @IsOptional()
  @IsString()
  eventSecondPrice?: string;

  @IsOptional()
  @IsString()
  eventThirdPrice?: string;

  @IsOptional()
  @IsString()
  departmentId?: string;

  @IsOptional()
  @IsString()
  coOrdinatorId?: string;

  @IsOptional()
  @IsString()
  eventMainStudentCoOrdinatorName?: string;

  @IsOptional()
  @IsString()
  eventMainStudentCoOrdinatorPhone?: string;

  @IsOptional()
  @IsString()
  eventMainStudentCoOrdinatorEmail?: string;

  @IsOptional()
  @IsString()
  eventLocation?: string;

  @IsOptional()
  @IsNumber()
  maxGroupsAllowed?: number;
}
