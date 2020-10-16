import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { MicroModule } from './micro/micro.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      debug: true,
      playground: true,
    }),
    MongooseModule.forRoot('mongodb://mongo:27017/nestjs', {
      connectionFactory: connection => {
        connection.plugin(require('mongoose-autopopulate'));
        connection.plugin(require('mongoose-delete'), {
          overrideMethods: ['findById', 'findOne'],
        });
        return connection;
      },
    }),
    UserModule,
    CompanyModule,
    MicroModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
