import { join } from 'path';

import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://sneuder:bUXDScN3l7UiJUrL@cms.wkracqo.mongodb.net/?retryWrites=true&w=majority',
    ),
    RoomModule,
  ],
})
export class AppModule {}
