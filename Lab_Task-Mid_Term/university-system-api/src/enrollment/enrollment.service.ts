import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { NotificationService } from 'src/notification/notification.service';
@Injectable()
export class EnrollmentService {
    constructor(
        private readonly courseService: CourseService, 
        @Inject(forwardRef(()=> NotificationService)) private readonly notificationService: NotificationService
    ){}
    getEnrollments(){
        const enrollments={
            message: 'All enrollemnts showed',
            data: [],
        };
        return enrollments;
    }

    enrollStudent(studentName: string, courseId: string){
        const course= this.courseService.getCourseById(courseId);
        const notification= this.notificationService.sendNotification(studentName, 'Enrolled Successfully');

        const enroll={
            message: 'Student Enrolled Successfully',
            student: studentName,
            course,
            notification,
        };
        return enroll;

    }


}
