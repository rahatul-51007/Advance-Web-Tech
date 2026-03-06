import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { PartialUpdateCourseDto } from './dto/partial-update-course.dto';
import { paramDto } from './dto/param.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}
    @Get()
    getAllCourses() {
        return this.courseService.getAllCourses();
    }
    @Get(':id')
    getCourseById(@Param() paramDto: paramDto) {
        return this.courseService.getCourseById(paramDto.id);
    }
    @Post()
    createCourse(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.createCourse(createCourseDto);
    }
    @Put(':id')
    updateCourse(@Param('id') id: string) {
        return this.courseService.updateCourse(id);
    }
    @Patch(':id')
    patchCourse(@Body() PartialUpdateCourseDto: PartialUpdateCourseDto, @Param('id') id: string) {
        return this.courseService.patchCourse(PartialUpdateCourseDto, id);
    }
    @Delete(':id')
    deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }
}
