import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoryDocument = Story & Document;

@Schema()
export class Story {
  @Prop()
  createdAt: Date;

  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  author: string;

  @Prop()
  active: number;
}

export const StorySchema = SchemaFactory.createForClass(Story);
