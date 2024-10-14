import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Mobile can not be empty.' })
  mobile: string;

  @IsNotEmpty({ message: 'Password can not be empty.' })
  @IsString()
  password: string;
}
