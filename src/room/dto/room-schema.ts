import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { StateRoomEnum } from './state-room.enum';
import { RoomID } from './room-id.type';

@Schema()
@ObjectType()
export class Room {
  @Prop()
  @Field(() => RoomID)
  roomId: string;

  @Prop({ type: String })
  @Field()
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

// RoomSchema.pre<Room>('save', function (next) {
//   if (this.roomId) next();
//   this.roomId = 'asas';
// });
