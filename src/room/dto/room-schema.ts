import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { StateRoomEnum } from './state-room.enum';
import { RoomID } from './types/room-id.type';
import { RoomGuestName } from './types/room-guest-name.type';

@Schema()
@ObjectType()
export class Room {
  @Prop({ unique: true })
  @Field(() => RoomID)
  roomId: string;

  @Prop({ required: false, type: String })
  @Field(() => RoomGuestName, { nullable: true })
  guestName: string;

  @Prop({ default: () => new Date() })
  @Field(() => GraphQLISODateTime)
  lastChanged: Date;

  @Prop({ required: true, default: StateRoomEnum.FREE })
  @Field(() => StateRoomEnum)
  state: StateRoomEnum;
}

export type RoomDocument = HydratedDocument<Room>;
export const RoomSchema = SchemaFactory.createForClass(Room);
