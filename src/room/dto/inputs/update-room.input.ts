import { Field, InputType } from '@nestjs/graphql';
import { StateRoomEnum } from '../state-room.enum';

import { RoomGuestName } from '../types/room-guest-name.type';

@InputType()
export class UpdateRoomInput {
  @Field(() => RoomGuestName, { nullable: true })
  guestName: string;

  @Field(() => StateRoomEnum, { nullable: false })
  state: StateRoomEnum;
}
