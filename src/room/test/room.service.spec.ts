import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from '../room.service';
import { getModelToken } from '@nestjs/mongoose';
import { Room, RoomDocument } from '../dto/room-schema';
import { StateRoomEnum } from '../dto/state-room.enum';
import { NotFoundException } from '@nestjs/common';

describe('RoomService', () => {
  let service: RoomService;
  let roomModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getModelToken(Room.name),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
    roomModel = module.get<Room>(getModelToken(Room.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of rooms', async () => {
      const mockRooms: RoomDocument[] = [
        {
          roomId: 'C212',
          guestName: 'Guest One',
          lastChanged: new Date(),
          state: StateRoomEnum.FREE,
        } as RoomDocument,
        {
          roomId: 'T234',
          guestName: 'Guest Two',
          lastChanged: new Date(),
          state: StateRoomEnum.OCCUPIED,
        } as RoomDocument,
      ];
      jest.spyOn(roomModel, 'find').mockResolvedValue(mockRooms);

      const result = await service.getAll();

      expect(result).toEqual(mockRooms);
      expect(roomModel.find).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a single room', async () => {
      const roomId = 'C212';
      const mockRoom: RoomDocument = {
        roomId,
        guestName: 'Guest One',
        lastChanged: new Date(),
        state: StateRoomEnum.FREE,
      } as RoomDocument;
      jest.spyOn(roomModel, 'findOne').mockResolvedValue(mockRoom);

      const result = await service.getOne(roomId);

      expect(result).toEqual(mockRoom);
      expect(roomModel.findOne).toHaveBeenCalledWith({ roomId });
    });

    it('should throw NotFoundException when room is not found', async () => {
      const roomId = 'T679';
      jest.spyOn(roomModel, 'findOne').mockResolvedValue(null);

      await expect(service.getOne(roomId)).rejects.toThrow(NotFoundException);
      expect(roomModel.findOne).toHaveBeenCalledWith({ roomId });
    });
  });
});
