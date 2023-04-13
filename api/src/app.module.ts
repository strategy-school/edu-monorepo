import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { UsersController } from './users/users.controller';
import { PassportModule } from '@nestjs/passport';
import { CoursesController } from './courses/courses.controller';
import {FacebookStrategy} from './auth/facebook.strategy';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/strategy-school'),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
  ],
  controllers: [UsersController, CoursesController],
  providers: [AuthService, LocalStrategy, FacebookStrategy],
})
export class AppModule {}
