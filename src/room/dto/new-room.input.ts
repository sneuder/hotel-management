import { Field, InputType } from '@nestjs/graphql';
import { StateRoomEnum } from './state-room.enum';

@InputType()
export class NewRoomInput {
  @Field({ nullable: true })
  guestName: string;

  @Field(() => StateRoomEnum, { nullable: false })
  state: StateRoomEnum;
}
