import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

export type UserDocument = User & Document;

enum Role {
  User = 'user',
  Teacher = 'teacher',
  Admin = 'admin',
}

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  token: string;

  @Prop({
    required: true,
    unique: true,
  })
  phoneNumber: string;

  @Prop({ required: true, enum: Role, default: Role.User })
  role: string;

  @Prop()
  avatar: string;

  @Prop()
  googleId: string;

  @Prop({ required: true, default: false })
  isBanned: boolean;

  @Prop([{ type: String, ref: 'Course' }])
  courses: string[];

  checkPassword: (password: string) => Promise<boolean>;
  generateToken: () => void;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.generateToken = function () {
  this.token = crypto.randomUUID();
};

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
