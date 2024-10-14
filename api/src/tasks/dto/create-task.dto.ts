import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Name can not be empty.' })
  name: string;

  @IsString()
  description: string;

  @IsString()
  time: Date;

  @IsEnum(['in progress', 'completed'])
  status: string;
}
