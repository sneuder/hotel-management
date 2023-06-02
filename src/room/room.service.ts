import { Injectable } from '@nestjs/common';

import { Room } from './dto/room-schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StateRoomEnum } from './dto/state-room.enum';
import { NewRoomInput } from './dto/new-room.input';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  getAll(): Promise<Room[]> {
    return this.roomModel.find();
  }

  getOne(roomId: string): Promise<Room> {
    return this.roomModel.findOne({ roomId });
  }

  createOne(newRoom: NewRoomInput) {
    if (!newRoom.guestName) return this.roomModel.create(newRoom);
    newRoom.state = StateRoomEnum.OCCUPIED;
    return this.roomModel.create(newRoom);
  }

  updateOne(roomId: string, updateBookRoom: NewRoomInput) {
    return this.roomModel.findOneAndUpdate({ roomId }, updateBookRoom);
  }

  removeOne(roomId: string) {
    return this.roomModel.findOneAndRemove({ roomId });
  }
}
