import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUsersDto } from './create-users.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', { dest: './public/uploads/avatars' }),
  )
  registerUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() userDto: CreateUsersDto,
  ) {
    const user = new this.userModel({
      email: userDto.email,
      password: userDto.password,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      phoneNumber: userDto.phoneNumber,
      courses: [],
      avatar: file ? '/uploads/avatars/' + file.filename : null,
    });
    user.generateToken();
    return user.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  login(@Req() req: Request) {
    const user = req.user as UserDocument;
    return { message: 'Login successfully', user };
  }

  @Delete('sessions')
  async logout(@Req() req: Request) {
    const token = req.get('Authorization');
    const success = { message: 'OK' };

    if (!token) {
      return success;
    }

    const user = await this.userModel.findOne({ token });

    if (!user) {
      return success;
    }
    user.generateToken();
    await user.save();
    return { message: 'Logged out successfully' };
  }
}
