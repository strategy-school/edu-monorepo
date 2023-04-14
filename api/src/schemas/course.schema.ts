import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CourseDocument = Course & Document;

enum Type {
  Seminar = 'seminar',
  Training = 'training',
  CourseType = 'course',
  MiniMBA = 'miniMBA',
}

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: Type })
  type: string;

  @Prop({ required: true })
  duration: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
