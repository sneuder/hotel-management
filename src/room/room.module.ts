import { Module } from '@nestjs/common';

import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './dto/room-schema';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { RoomCreateInterceptor } from './interceptors/room-create.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
    ]),
  ],
  providers: [
    RoomResolver,
    RoomService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RoomCreateInterceptor,
    },
  ],
})
export class RoomModule {}
