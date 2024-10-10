import {
  IsString,
  IsEmail,
  IsMobilePhone,
  IsEnum,
  IsArray,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile: number;

  @IsEnum(['Male', 'Female', 'Other'])
  gender: string;

  @IsString()
  country: string;

  @IsArray()
  hobbies: string[];

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}
