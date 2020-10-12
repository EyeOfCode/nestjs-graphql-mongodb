import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInfo } from 'dto/user.dto';
import { CompanyInfo } from 'dto/company.dto';
import { UserInput, UserUpdate } from 'input/user.input';

@Resolver(() => UserInfo)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserInfo])
  async users(): Promise<UserInfo[]> {
    return this.userService.find();
  }

  @Query(() => UserInfo)
  async user(@Args('id') id: string): Promise<UserInfo> {
    return this.userService.findById(id);
  }

  @ResolveField('company', _type => CompanyInfo, { nullable: true })
  async company(@Parent() user: UserInfo): Promise<CompanyInfo | null> {
    const id = user.company?._id;
    return this.userService.getCompanyData(id);
  }

  @Mutation(() => UserInfo)
  async createUser(
    @Args('companyId', { type: () => String }) companyId: string,
    @Args('input') input: UserInput,
  ): Promise<UserInfo> {
    return this.userService.create(companyId, input);
  }

  @Mutation(() => UserInfo)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UserUpdate,
  ): Promise<UserInfo> {
    return this.userService.update(id, input);
  }

  @Mutation(() => String)
  async softDeleteUser(@Args('id') id: string): Promise<string> {
    await this.userService.softDelete(id);
    return 'success to soft delete';
  }

  @Mutation(() => String)
  async deleteUser(@Args('id') id: string): Promise<string> {
    await this.userService.delete(id);
    return 'success delete';
  }
}
