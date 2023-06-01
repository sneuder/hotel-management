import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StateRoomEnum } from './dto/state-room.enum';

@Schema()
@ObjectType()
export class Room {
  @Prop({ required: true })
  @Field()
  roomId: string;

  @Prop()
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
