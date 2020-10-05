import { InputType, Field, Int } from '@nestjs/graphql';
import { Company } from 'schemas/company.schema';

@InputType()
export class UserInput {
  @Field()
  name: string;
  @Field(() => Int)
  age: number;
  @Field(() => Company)
  company: Company;
}

@InputType()
export class UserUpdate {
  @Field(() => Int)
  age: number;
}
