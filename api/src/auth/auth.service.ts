import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async validateUser(email: string, pass: string) {
    const user = await this.userModel.findOne({ email });

    if (user && (await user.checkPassword(pass))) {
      user.generateToken();
      await user.save();
      return user;
    }
    return null;
  }
}
