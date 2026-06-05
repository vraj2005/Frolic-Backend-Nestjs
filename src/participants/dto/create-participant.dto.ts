import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  participantName!: string;

  @IsOptional()
  @IsString()
  participantEnrollmentNumber?: string;

  @IsOptional()
  @IsString()
  participantInstituteName?: string;

  @IsOptional()
  @IsString()
  participantCity?: string;

  @IsOptional()
  @IsString()
  participantMobile?: string;

  @IsOptional()
  @IsString()
  participantEmail?: string;

  @IsBoolean()
  @IsOptional()
  isGroupLeader?: boolean;

  @IsString()
  @IsNotEmpty()
  groupId!: string;
}
