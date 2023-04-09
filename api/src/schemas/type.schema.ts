import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TypeDocument = Type & Document;

@Schema()
export class Type {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  duration: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
