import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AuthInput {
  @Field()
  email: string
  @Field()
  password: string;
}
