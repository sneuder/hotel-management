import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getOne(roomId: string): Promise<Room> {
    const foundRoom = await this.roomModel.findOne({ roomId });
    return this.roomExists(foundRoom);
  }

  async createOne(newRoom: NewRoomInput) {
    return this.roomModel.create(newRoom);
  }

  async updateOne(roomId: string, updateRoom: NewRoomInput) {
    const updatedRoom = await this.roomModel.findOneAndUpdate(
      { roomId },
      { lastChanged: new Date(), ...updateRoom },
      { new: true },
    );

    return this.roomExists(updatedRoom);
  }

  async removeOne(roomId: string) {
    const removedRoom = await this.roomModel.findOneAndRemove({ roomId });
    return this.roomExists(removedRoom);
  }

  // advanced services

  async bookOne(roomId: string, guestName: string): Promise<Room> {
    const bookedRoom = await this.roomModel.findOneAndUpdate(
      { roomId },
      {
        guestName,
        state: StateRoomEnum.OCCUPIED,
        lastChanged: new Date(),
      },
      { new: true },
    );

    return this.roomExists(bookedRoom);
  }

  async cancelOne(roomId: string) {
    const cancelRoom = await this.roomModel.findOneAndUpdate(
      { roomId },
      { guestName: null, state: StateRoomEnum.FREE, lastChanged: new Date() },
      { new: true },
    );

    return this.roomExists(cancelRoom);
  }

  // handler exception
  roomExists(room: Room): Room {
    if (room) return room;
    throw new NotFoundException('This room was not found');
  }
}
