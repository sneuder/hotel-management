import { Injectable } from '@nestjs/common';
import { Room } from './dto/room-schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StateRoomEnum } from './dto/state-room.enum';
import { NewRoomInput } from './dto/inputs/new-room.input';

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

  async createOne(newRoom: NewRoomInput) {
    return this.roomModel.create(newRoom);
  }

  updateOne(roomId: string, updateRoom: NewRoomInput) {
    return this.roomModel.findOneAndUpdate(
      { roomId },
      { lastChanged: new Date(), ...updateRoom },
      { new: true },
    );
  }

  removeOne(roomId: string) {
    return this.roomModel.findOneAndRemove({ roomId });
  }

  // advanced services

  bookOne(roomId: string, guestName: string): Promise<Room> {
    return this.roomModel.findOneAndUpdate(
      { roomId },
      {
        guestName,
        state: StateRoomEnum.OCCUPIED,
        lastChanged: new Date(),
      },
      { new: true },
    );
  }

  cancelOne(roomId: string) {
    return this.roomModel.findOneAndUpdate(
      { roomId },
      { guestName: null, state: StateRoomEnum.FREE, lastChanged: new Date() },
      { new: true },
    );
  }
}
