import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  time: string;

  @IsEnum(['in progress', 'completed'])
  status: string;
}
