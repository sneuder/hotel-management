import { Field, InputType } from '@nestjs/graphql';
import { StateRoomEnum } from '../state-room.enum';

import { RoomID } from '../types/room-id.type';
import { RoomGuestName } from '../types/room-guest-name.type';

@InputType()
export class NewRoomInput {
  @Field(() => RoomID, { nullable: false })
  roomId: string;

  @Field(() => RoomGuestName, { nullable: true })
  guestName: string;

  @Field(() => StateRoomEnum, { nullable: false })
  state: StateRoomEnum;
}
