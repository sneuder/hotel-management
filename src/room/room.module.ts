import { Module } from '@nestjs/common';

import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './dto/room-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
    ]),
  ],
  providers: [RoomResolver, RoomService],
})
export class RoomModule {}
