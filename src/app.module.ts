import { join } from 'path';

import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

// the mongo-atlas-url is for a fast testing case
dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot(process.env.DB_HOST),
    RoomModule,
  ],
})
export class AppModule {}
