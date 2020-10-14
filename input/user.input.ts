import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  email: string
  @Field()
  name: string;
  @Field()
  password: string;
  @Field(() => Int)
  age?: number;
}

@InputType()
export class UserUpdate {
  @Field(() => Int)
  age: number;
}
