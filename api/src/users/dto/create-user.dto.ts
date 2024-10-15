import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name can not be empty.' })
  name: string;

  @IsPhoneNumber()
  @IsNotEmpty({ message: 'Mobile cannot be empty.' })
  mobile: string;

  @IsEnum(['Male', 'Female', 'Other'])
  gender: string;

  @IsEnum(['India', 'SriLanka', 'Japan'])
  country: string;

  @IsEnum(['Music', 'Sports', 'Painting'])
  hobbies: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password: string;
}
