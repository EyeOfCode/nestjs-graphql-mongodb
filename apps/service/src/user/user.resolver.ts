import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInfo } from 'dto/user.dto';
import { UserInput } from 'input/user.input';

@Resolver()
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

  @Mutation(() => UserInfo)
  async createUser(@Args('input') input: UserInput): Promise<UserInfo> {
    return this.userService.create(input);
  }
}
