import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';
import { Company } from './company.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop({
    required: false,
    type: mSchema.Types.ObjectId,
    ref: 'CompanySchema',
  })
  company: Company;
}

export const UserSchema = SchemaFactory.createForClass(User);
