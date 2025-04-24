import { PhoneNumberValidator } from '../../utils/phone-number.validator';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  name!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString()
  countryCode!: string;

  @IsString()
  @IsOptional()
  @Validate(PhoneNumberValidator, ['countryCode'])
  phoneNumber!: string;
}
