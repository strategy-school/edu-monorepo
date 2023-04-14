import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { Profile } from 'passport-google-oauth20';
import { User, UserDocument } from '../schemas/user.schema';

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

  async validateGoogleUser(userProfile: Profile) {
    const {
      email,
      given_name: firstName,
      family_name: lastName,
      sub: googleId,
      picture: avatar,
    } = userProfile._json;

    const user = await this.userModel.findOne({
      email,
    });

    if (user) return user;

    const newUser = new this.userModel({
      email,
      firstName,
      lastName,
      avatar,
      googleId,
      password: randomUUID(),
    });

    newUser.generateToken();
    await newUser.save();
    return newUser;
  }

  async findUser(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }
}
