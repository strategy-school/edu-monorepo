/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUsersDto } from './create-users.dto';
import { Request } from 'express';
export declare class UsersController {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    registerUser(file: Express.Multer.File, userDto: CreateUsersDto): Promise<import("mongoose").Document<unknown, {}, UserDocument> & Omit<User & Document & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    login(req: Request): {
        message: string;
        user: UserDocument;
    };
    logout(req: Request): Promise<{
        message: string;
    }>;
}
