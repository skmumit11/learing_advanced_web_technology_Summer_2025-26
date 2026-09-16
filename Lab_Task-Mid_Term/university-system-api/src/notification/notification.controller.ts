import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  sendNotification(@Body('studentName') studentName: string, @Body('message') message: string){
    const notification= this.notificationService.sendNotification(studentName, message);

    return notification;
  }


  @Post('check')
  checkenrollmentAndNotify(@Body('studenName') studentName: string, @Body('courseId') courseId: string){
    const checkenrollment= this.notificationService.checkenrollmentAndNotify(studentName, courseId);

    return checkenrollment;

  }

}
