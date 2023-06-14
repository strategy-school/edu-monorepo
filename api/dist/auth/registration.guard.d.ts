import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
export declare class RegistrationGuard implements CanActivate {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
