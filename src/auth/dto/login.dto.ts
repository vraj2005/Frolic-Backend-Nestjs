import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  emailAddress!: string;

  @IsString()
  @IsNotEmpty()
  userPassword!: string;
}
