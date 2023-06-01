import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './room-schema';
import { Model } from 'mongoose';
import { NewRoomInput } from './dto/new-room.input';
import { StateRoomEnum } from './dto/state-room.enum';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  getAll(): Promise<Room[]> {
    return this.roomModel.find();
  }

  getOne(roomId: string): Promise<Room> {
    return this.roomModel.findById(roomId);
  }

  createOne(newRoom: NewRoomInput) {
    if (!newRoom.guestName) this.roomModel.create(newRoom);
    newRoom.state = StateRoomEnum.OCCUPIED;
    return this.roomModel.create(newRoom);
  }

  updateOne(roomId: string, updateBookRoom: NewRoomInput) {
    return this.roomModel.findOneAndUpdate({ roomId }, updateBookRoom);
  }

  // updateAsAdmin() {}

  removeOne(roomId: string) {
    return this.roomModel.findOneAndRemove({ roomId });
  }
}
