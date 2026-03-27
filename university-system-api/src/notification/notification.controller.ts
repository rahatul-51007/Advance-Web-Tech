import { Body, Controller, Post} from '@nestjs/common';
import { NotificationService } from './notification.service';


@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) {}
    @Post('send')
    sendNotification(@Body() { studentName, message }: { studentName: string; message: string }) {
        return this.notificationService.sendNotification(studentName, message);
    }
    @Post('check')
    checkEnrollmentAndNotify(@Body() { studentName, courseId }: { studentName: string; courseId: string }) {
        return this.notificationService.checkEnrollmentAndNotify(studentName, courseId);
    }
}
