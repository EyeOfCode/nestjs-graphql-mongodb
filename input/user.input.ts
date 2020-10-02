import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  name: string;
  @Field(() => Int)
  age: number;
}
