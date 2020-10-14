import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
  ],
  providers: [AuthResolver, AuthService]
})
export class AuthModule {}
