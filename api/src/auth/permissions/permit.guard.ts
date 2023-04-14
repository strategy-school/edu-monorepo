import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class PermitGuard implements CanActivate {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const user = request.user as UserDocument | undefined;
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.role !== 'admin') {
      throw new ForbiddenException({
        message: 'Your role do not have access!',
      });
    }

    return true;
  }
}
