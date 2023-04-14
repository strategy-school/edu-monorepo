import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/form/local.strategy';
import { UsersController } from './users/users.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth/google/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { SessionSerializer } from './auth/google/session.serializer';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/strategy-school'),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ],
  controllers: [UsersController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, SessionSerializer],
})
export class AppModule {}
