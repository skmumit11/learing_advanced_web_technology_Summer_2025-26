import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService } from 'src/enrollment/enrollment.service';

@Injectable()
export class NotificationService {

    constructor(@Inject(forwardRef(()=> EnrollmentService)) private readonly enrollmentService: EnrollmentService){}
    sendNotification(studentName: string, message: string){
        const sendnotifi={
            message:'Notification Sent successfully',
            student: studentName,
            notification: message,
        };
        return sendnotifi;
    }

    checkenrollmentAndNotify(studentName: string, courseId: string){
        const enrollemnts= this.enrollmentService.getEnrollments;

        const checkNotification={
            message: 'Notification Sent Successfully',
            student: studentName,
            courseId,
            enrollemntStatus: enrollemnts,
        };

        return checkNotification;
    }
}
