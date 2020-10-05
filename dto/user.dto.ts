import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { CompanyInfo } from './company.dto';

@ObjectType()
export class UserInfo {
  @Field(() => ID)
  _id?: string;
  @Field()
  name: string;
  @Field(() => Int)
  age: number;
  @Field(() => CompanyInfo, { nullable: true })
  company?: CompanyInfo;
  @Field({ defaultValue: false })
  deleted?: boolean;
  @Field(() => GraphQLISODateTime)
  createdAt?: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt?: Date;
}
