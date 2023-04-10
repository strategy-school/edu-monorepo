import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { Type, TypeSchema } from './schemas/type.schema';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { UsersController } from './users/users.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/strategy-school'),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
  ],
  controllers: [UsersController],
  providers: [AuthService, LocalStrategy],
})
export class AppModule {}
