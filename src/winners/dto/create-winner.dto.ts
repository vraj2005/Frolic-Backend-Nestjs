import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWinnerDto {
  @IsString()
  @IsNotEmpty()
  eventId!: string;

  @IsString()
  @IsNotEmpty()
  groupId!: string;

  @IsInt()
  sequence!: number;

  @IsOptional()
  @IsString()
  modifiedById?: string;
}
