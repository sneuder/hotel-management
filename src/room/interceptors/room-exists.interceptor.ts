import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Model } from 'mongoose';
import { Room } from '../dto/room-schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomExistsInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { roomId } = context.getArgByIndex(2); // Obtén los argumentos de la solicitud GraphQL
    const roomExists = this.roomModel.exists({ roomId });

    if (roomExists) throw new ConflictException('roomId already used');

    return next.handle();
  }
}
