import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Model } from 'mongoose';
import { Room } from '../dto/room-schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomExistsInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<CallHandler>> {
    const gqlContext = GqlExecutionContext.create(context);

    const roomId = gqlContext.getArgs().newRoom.roomId;
    const roomExists = await this.roomModel.exists({ roomId });

    if (roomExists) return next.handle();
    throw new ConflictException(
      `The room with roomId (${roomId}) does not exists.`,
    );
  }
}
