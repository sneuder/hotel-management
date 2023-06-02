import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from '../dto/room-schema';

import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RoomCreateInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const gqlContext = GqlExecutionContext.create(context);

    const roomId = gqlContext.getArgs().newRoom.roomId;
    const roomExists = this.roomModel.exists({ roomId });

    if (roomExists)
      throw new ConflictException(`This roomId (${roomId}) already exists.`);
    return next.handle();
  }
}
