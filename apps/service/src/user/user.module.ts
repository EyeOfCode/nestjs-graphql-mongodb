import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from 'schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => CompanyModule),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
