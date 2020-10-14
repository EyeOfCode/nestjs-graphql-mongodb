import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthToken } from 'dto/auth.dto';
import { AuthInput } from 'input/auth.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthToken)
    async login(
        @Args('input') input: AuthInput,
    ): Promise<AuthToken> {
        return this.authService.login(input);
    }
}
