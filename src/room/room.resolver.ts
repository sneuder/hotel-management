import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { Room } from './room-schema';
import { NewRoomInput } from './dto/new-room.input';
@Resolver()
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => [Room], { name: 'rooms' })
  getAllRooms(): Promise<Room[]> {
    return this.roomService.getAll();
  }

  @Query(() => Room, { name: 'room' })
  getOneRoom(
    @Args('roomId', { type: () => String }) roomId: string,
  ): Promise<Room> {
    return this.roomService.getOne(roomId);
  }

  @Mutation(() => Room, { name: 'createRoom' })
  createOneRoom(
    @Args('newRoom', { type: () => NewRoomInput }) newRoom: NewRoomInput,
  ) {
    return this.roomService.createOne(newRoom);
  }

  @Mutation(() => Room, { name: 'updateOrBookRoom' })
  updateOrBookOneRoom(
    @Args('roomId', { type: () => String }) roomId: string,
    @Args('updateBookRoom', { type: () => NewRoomInput })
    updateBookRoom: NewRoomInput,
  ) {
    return this.roomService.updateOne(roomId, updateBookRoom);
  }

  @Mutation(() => Room, { name: 'removeRoom' })
  removeOneRoom(@Args('roomId', { type: () => String }) roomId: string) {
    return this.roomService.removeOne(roomId);
  }
}
