import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  groupName!: string;

  @IsString()
  @IsNotEmpty()
  eventId!: string;

  @IsOptional()
  @IsBoolean()
  isPaymentDone?: boolean;

  @IsOptional()
  @IsBoolean()
  isPresent?: boolean;
}
