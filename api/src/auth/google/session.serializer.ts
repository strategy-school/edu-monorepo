import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDocument } from 'src/schemas/user.schema';
import { AuthService } from '../auth.service';
import { VerifyCallback } from 'passport-google-oauth20';

export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: UserDocument, done: VerifyCallback) {
    done(null, user);
  }

  async deserializeUser(payload: UserDocument, done: VerifyCallback) {
    const user = await this.authService.findUser(payload._id);
    return user ? done(null, user) : done(null, null);
  }
}
