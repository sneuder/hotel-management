import { Field, InputType } from '@nestjs/graphql';
import { RoomID } from '../types/room-id.type';
import { UpdateRoomInput } from './update-room.input';

@InputType()
export class NewRoomInput extends UpdateRoomInput {
  @Field(() => RoomID, { nullable: false })
  roomId: string;
}
