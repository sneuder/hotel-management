import { Field, InputType } from '@nestjs/graphql';
import { StateRoomEnum } from './state-room.enum';
import { RoomID } from './room-id.type';

@InputType()
export class NewRoomInput {
  @Field(() => RoomID, { nullable: false })
  roomId: string;

  @Field(() => String, { nullable: true })
  guestName: string;

  @Field(() => StateRoomEnum, { nullable: false })
  state: StateRoomEnum;
}
