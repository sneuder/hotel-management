import { registerEnumType } from '@nestjs/graphql';

export enum StateRoomEnum {
  OCCUPIED = 'OCCUPIED',
  FREE = 'FREE',
}

registerEnumType(StateRoomEnum, {
  name: 'StateRoomEnum',
});
