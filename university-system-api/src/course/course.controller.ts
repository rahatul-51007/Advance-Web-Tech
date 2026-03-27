import { Controller,Get,Post,Body } from '@nestjs/common';
import { CourseService } from './course.service';


@Controller('course')
export class CourseController {
    constructor(private readonly courseService:CourseService){}

    @Get()
    getAllCourse():object{
        return this.courseService.getAllCourse();
    }
    @Get(':id')
    getCourseById(id: string): object {
        return this.courseService.getCourseById(id);
    }
    @Post()
    createCourse(@Body() { name, code }: { name: string; code: string }): object {
        return this.courseService.createCourse(name, code);
    }
}
