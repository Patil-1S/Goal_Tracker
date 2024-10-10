import { IsMobilePhone, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsMobilePhone()
  @IsNotEmpty()
  mobile: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}
