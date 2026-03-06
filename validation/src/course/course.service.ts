import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { PartialUpdateCourseDto } from './dto/partial-update-course.dto';

@Injectable()
export class CourseService {
    getAllCourses() {
        return 'Get All Courses - from Service ';
    }
    getCourseById(id: number) {
        return `Get Course By Id ${id} - from Service `;
    }
    createCourse(createCourseDto: CreateCourseDto) {
        return 'Create Course - from Service ';
    }
    updateCourse(id: string) {
        return `Update Course ${id} - from Service `;
    }

    patchCourse(PartialUpdateCourseDto: PartialUpdateCourseDto, id: string) {
        return `Patch Course ${id} - from Service `;
    }
    deleteCourse(id: string) {
        return `Delete Course ${id} - from Service `;
    }
}
