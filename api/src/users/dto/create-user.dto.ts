import {
  IsString,
  IsEmail,
  IsMobilePhone,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name can not be empty.' })
  name: string;

  @IsMobilePhone()
  @IsNotEmpty({ message: 'Mobile cannot be empty.' })
  mobile: number;

  @IsEnum(['Male', 'Female', 'Other'])
  gender: string;

  @IsString()
  country: string;

  @IsString()
  hobbies: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password: string;
}
