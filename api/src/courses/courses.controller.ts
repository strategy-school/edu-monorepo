import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from '../schemas/course.schema';
import { Model } from 'mongoose';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { PermitGuard } from '../auth/permit.guard';
import { CreateCourseDto } from './create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  @Get()
  getAll() {
    return this.courseModel.find({}, 'title duration');
  }

  @Get(':id')
  async getOneCourse(@Param('id') id: string) {
    const course = await this.courseModel.findById(id);

    if (!course) {
      throw new NotFoundException();
    }

    return course;
  }

  @UseGuards(TokenAuthGuard, PermitGuard)
  @Post()
  async createCourse(@Body() courseData: CreateCourseDto) {
    const course = new this.courseModel({
      title: courseData.title,
      description: courseData.description,
      price: parseFloat(courseData.price),
      type: courseData.type,
      duration: courseData.duration,
    });

    return course.save();
  }
}
