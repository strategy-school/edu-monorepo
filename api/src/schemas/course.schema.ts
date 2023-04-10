import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CourseDocument = Course & Document;

enum Status {
  NotStarted = 'notStarted',
  Ongoing = 'ongoing',
  Finished = 'finished',
}

// Будут ли все курсы на Ру и Кырг? Или некоторые только на одном языке?
enum Language {
  Ru = 'ru',
  Kg = 'kg',
}

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ ref: 'Type', required: true })
  type: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: Status, default: Status.NotStarted })
  status: string;

  @Prop({ required: true, enum: Status, default: Language.Ru })
  language: string;

  @Prop([{ type: String, ref: 'User' }])
  teacher: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
