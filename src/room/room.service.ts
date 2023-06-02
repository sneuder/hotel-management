import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

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

  async getOne(roomId: string): Promise<Room> {
    const room = await this.roomModel.findOne({ roomId });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async createOne(newRoom: NewRoomInput) {
    return this.roomModel.create(newRoom);
  }

  updateOne(roomId: string, updateRoom: NewRoomInput) {
    return this.roomModel.findOneAndUpdate({ roomId }, updateRoom);
  }

  removeOne(roomId: string) {
    return this.roomModel.findOneAndRemove({ roomId });
  }
}
