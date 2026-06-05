import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateWinnerDto {
  @IsOptional()
  @IsString()
  eventId?: string;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  @IsInt()
  sequence?: number;
}
