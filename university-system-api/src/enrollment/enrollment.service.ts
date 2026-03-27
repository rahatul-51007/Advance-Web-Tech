import { Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { NotificationService } from 'src/notification/notification.service';
import { Inject, forwardRef } from '@nestjs/common';

@Injectable()
export class EnrollmentService {
    constructor(private courseService: CourseService,
        @Inject(forwardRef(() => NotificationService)) 
        private notificationService: NotificationService,
    ) {}
    enrollStudent(studentName: string, courseId: string): object {
        const course = this.courseService.getCourseById(courseId);
        return[
            {
                message: 'Student enrolled successfully',
                data: {
                    studentName,
                    course
                }
            }
        ];
        this.notificationService.sendNotification(studentName, courseId);
    }
    getEnrollments(): object {
        return[
            {
                message: 'All enrollments fetched',
                data: [],
            }
        ];
    }
}
