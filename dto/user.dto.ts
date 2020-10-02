import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLISODateTime,
} from '@nestjs/graphql';

@ObjectType()
export class UserInfo {
  @Field(() => ID)
  _id?: string;
  @Field()
  name: string;
  @Field(() => Int)
  age: number;
  @Field(() => GraphQLISODateTime)
  createdAt?: Date;
  @Field(() => GraphQLISODateTime)
  updateAt?: Date;
}
