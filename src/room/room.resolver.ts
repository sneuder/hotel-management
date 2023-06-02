import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UseFilters, UseInterceptors } from '@nestjs/common';

import { Room } from './dto/room-schema';
import { RoomID } from './dto/room-id.type';
import { RoomService } from './room.service';
import { NewRoomInput } from './dto/new-room.input';
import { RoomCreateInterceptor } from './interceptors/room-create.interceptor';

@Resolver()
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => [Room], { name: 'rooms' })
  getAllRooms(): Promise<Room[]> {
    return this.roomService.getAll();
  }

  @Query(() => Room, { name: 'room' })
  getOneRoom(
    @Args('roomId', { type: () => RoomID }) roomId: string,
  ): Promise<Room> {
    return this.roomService.getOne(roomId);
  }

  @UseInterceptors(RoomCreateInterceptor)
  @Mutation(() => Room, { name: 'createRoom' })
  createOneRoom(
    @Args('newRoom', { type: () => NewRoomInput }) newRoom: NewRoomInput,
  ) {
    return this.roomService.createOne(newRoom);
  }

  @Mutation(() => Room, { name: 'updateOrBookRoom' })
  updateOneRoom(
    @Args('roomId', { type: () => String }) roomId: string,
    @Args('updateOneRoom', { type: () => NewRoomInput })
    roomToUpdate: NewRoomInput,
  ) {
    return this.roomService.updateOne(roomId, roomToUpdate);
  }

  @Mutation(() => Room, { name: 'removeRoom' })
  @UseFilters()
  removeOneRoom(@Args('roomId', { type: () => String }) roomId: string) {
    return this.roomService.removeOne(roomId);
  }

  // advanced mutations
}
