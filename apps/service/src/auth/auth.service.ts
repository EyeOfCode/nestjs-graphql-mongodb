import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthToken } from 'dto/auth.dto';
import { AuthInput } from 'input/auth.input';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
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

        const exp = 10080
        const accessToken = await jwt.sign(
            {
              id: user._id,
            },
            'service',
            { expiresIn: exp },
          );
        return {token: accessToken}
      }
}
