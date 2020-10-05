import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CompanyInput {
  @Field()
  name: string;
}

@InputType()
export class CompanyUpdate {
  @Field()
  name: string;
}
