import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UseFilters, UseInterceptors } from '@nestjs/common';

import { Room } from './dto/room-schema';
import { RoomID } from './dto/types/room-id.type';
import { RoomGuestName } from './dto/types/room-guest-name.type';
import { RoomService } from './room.service';
import { NewRoomInput } from './dto/inputs/new-room.input';

import { RoomExistsInterceptor } from './interceptors/room-exists.interceptor';

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

  @UseInterceptors(RoomExistsInterceptor)
  @Mutation(() => Room, { name: 'createRoom' })
  createOneRoom(
    @Args('newRoom', { type: () => NewRoomInput }) newRoom: NewRoomInput,
  ) {
    return this.roomService.createOne(newRoom);
  }

  @Mutation(() => Room, { name: 'updateOrBookRoom' })
  updateOneRoom(
    @Args('roomId', { type: () => RoomID }) roomId: string,
    @Args('updateOneRoom', { type: () => NewRoomInput })
    roomToUpdate: NewRoomInput,
  ) {
    return this.roomService.updateOne(roomId, roomToUpdate);
  }

  @Mutation(() => Room, { name: 'removeRoom' })
  @UseFilters()
  removeOneRoom(@Args('roomId', { type: () => RoomID }) roomId: string) {
    return this.roomService.removeOne(roomId);
  }

  // advanced mutations

  @Mutation(() => Room, { name: 'bookRoom' })
  bookOneRoom(
    @Args('roomId', { type: () => RoomID }) roomId: string,
    @Args('guestName', { type: () => RoomGuestName }) guestName: string,
  ) {
    return this.roomService.bookOne(roomId, guestName);
  }

  @Mutation(() => Room, { name: 'cancelRoom' })
  cancelOneRoom(@Args('roomId', { type: () => RoomID }) roomId: string) {
    return this.roomService.cancelOne(roomId);
  }
}
