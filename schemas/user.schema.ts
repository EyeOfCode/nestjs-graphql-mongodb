import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';
import { Company } from './company.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({required: true, unique: true})
  email: string

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string

  @Prop()
  age?: number;

  @Prop({
    type: mSchema.Types.ObjectId,
    ref: 'Company',
  })
  company?: Company;
}

export const UserSchema = SchemaFactory.createForClass(User)