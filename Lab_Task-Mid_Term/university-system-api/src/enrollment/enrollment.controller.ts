import { Controller, Body, Post, Get } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  getEnrollments(){
    const enrollments= this.enrollmentService.getEnrollments();
    return enrollments;

  }

  @Post()
  enrollStudent(@Body('studentName') studentName: string, @Body('courseId') courseId: string){
    const students= this.enrollmentService.enrollStudent(studentName, courseId);
    return students;
  }


}
