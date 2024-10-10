import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  time: Date;

  @IsEnum(['in progress', 'completed'])
  status: string;
}
