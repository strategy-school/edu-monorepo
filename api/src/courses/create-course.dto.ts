import {IsNotEmpty} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  duration: string;
}
