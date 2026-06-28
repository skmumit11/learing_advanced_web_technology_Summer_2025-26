import { Controller, Get, Param, Patch, Post, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllCourses(): string{
    const allcourse= this.courseService.getAllCourses();
    return allcourse;
  }

  @Get(':id')
  getCourseById(@Param('id') id: string): string {
    const courseById= this.courseService.getCourseByID(id);
    return courseById;
  }

  @Post()
  createCourse(): string{
    let create= this.courseService.createCourse();
    return create;
  }

  @Put(':id')
  updateCourse(@Param('id') id:string): string{
    let update= this.courseService.updateCourse(id);
    return update;
  }

  @Patch(':id')
  patchCourse(@Param('id') id:string): string{
    let patchC= this.courseService.patchCourse(id);
    return patchC;
  }

  @Delete(':id')
  deleteCourse(@Param('id') id:string): string{
    let deleteC= this.courseService.deleteCourse(id);
    return deleteC;
  }


}
