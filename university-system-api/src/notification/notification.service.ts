import { Injectable } from '@nestjs/common';
import { EnrollmentService } from 'src/enrollment/enrollment.service';
import { Inject, forwardRef } from '@nestjs/common';

@Injectable()
export class NotificationService {
    constructor( 
        @Inject(forwardRef(() => EnrollmentService)) 
        private enrollmentService: EnrollmentService, 
    ) {} 
    sendNotification(studentName: string, message: string): object {
        return [
            {
                message: 'Notification sent successfully',
                data: {
                    studentName,
                    message,
                },
            },
        ];
    }
    checkEnrollmentAndNotify(studentName: string, courseId: string): object {
        const enrollment = this.enrollmentService.getEnrollments();
        return[
            {
                enrollment,
            },
            
        ];
    }

}
