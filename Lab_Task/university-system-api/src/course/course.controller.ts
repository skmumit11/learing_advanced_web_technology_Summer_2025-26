import { Get, Post, Body, Controller, Param, } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllcourse(){
    const allcourses= this.courseService.getAllCourses();
    return allcourses;
  }

  @Get(':id')
  getCourseById(@Param('id') id: string){
    const courseId= this.courseService.getCourseById(id);
    return courseId;
  }

  @Post()
  createCourse(@Body('name') name: string, @Body('code') code: string){
    const create=this.courseService.createCourse(name, code);
    return create;
  }


}
