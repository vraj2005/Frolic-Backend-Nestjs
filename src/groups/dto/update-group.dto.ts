import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  groupName?: string;

  @IsOptional()
  @IsBoolean()
  isPaymentDone?: boolean;

  @IsOptional()
  @IsBoolean()
  isPresent?: boolean;
}
