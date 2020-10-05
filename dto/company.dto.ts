import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class CompanyInfo {
  @Field(() => ID)
  _id?: string;
  @Field()
  name: string;
  @Field({ defaultValue: false })
  deleted?: boolean;
  @Field(() => GraphQLISODateTime)
  createdAt?: Date;
  @Field(() => GraphQLISODateTime)
  updatedAt?: Date;
}
