import { Test, TestingModule } from '@nestjs/testing';
import { RoomResolver } from '../room.resolver';
import { RoomService } from '../room.service';
import { getModelToken } from '@nestjs/mongoose';
import { Room, RoomDocument } from '../dto/room-schema';
import { StateRoomEnum } from '../dto/state-room.enum';

describe('RoomResolver', () => {
  let resolver: RoomResolver;
  let roomService: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomResolver,
        RoomService,
        {
          provide: getModelToken(Room.name),
          useValue: Room,
        },
      ],
    }).compile();

    resolver = module.get<RoomResolver>(RoomResolver);
    roomService = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getAllRooms', () => {
    it('should return an array of rooms', async () => {
      const mockRooms: RoomDocument[] = [
        {
          roomId: 'T120',
          guestName: 'Guest One',
          lastChanged: new Date(),
          state: StateRoomEnum.FREE,
        } as RoomDocument,
        {
          roomId: 'V230',
          guestName: 'Guest Two',
          lastChanged: new Date(),
          state: StateRoomEnum.OCCUPIED,
        } as RoomDocument,
      ];
      jest.spyOn(roomService, 'getAll').mockResolvedValue(mockRooms);

      const result = await resolver.getAllRooms();

      expect(result).toEqual(mockRooms);
      expect(roomService.getAll).toHaveBeenCalled();
    });
  });

  describe('getOneRoom', () => {
    it('should return a single room', async () => {
      const roomId = 'T120';
      const mockRoom: RoomDocument = {
        roomId,
        guestName: 'Gues Test',
        lastChanged: new Date(),
        state: StateRoomEnum.FREE,
      } as RoomDocument;
      jest.spyOn(roomService, 'getOne').mockResolvedValue(mockRoom);

      const result = await resolver.getOneRoom(roomId);

      expect(result).toEqual(mockRoom);
      expect(roomService.getOne).toHaveBeenCalledWith(roomId);
    });
  });
});
