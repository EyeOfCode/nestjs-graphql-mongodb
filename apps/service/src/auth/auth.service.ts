import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthToken } from 'dto/auth.dto';
import { AuthInput } from 'input/auth.input';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,

        private readonly jwtService: JwtService
      ) {}

      async login(input: AuthInput): Promise<AuthToken> {
        const user = await this.userService.findEmail(input.email)
        if(!user){
           throw new Error('email not found');
        }

        const isPasswordMatch = await bcrypt.compare(input.password, user.password);
        if(!isPasswordMatch){
            throw new Error('password not math')
        }

        const accessToken = await this.jwtService.sign(
            {
              iss: "S1cbz61TePB8qidcQ5lft35bWapnMkc5", //key gateway
              sub: user._id,
              name: user.name
            }
          );
        return {token: accessToken}
      }
}
