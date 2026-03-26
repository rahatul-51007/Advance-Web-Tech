import { Body, Controller, Delete, Get, Param, Patch, Post, Put,Query ,UseInterceptors, UploadedFile, BadRequestException,Res} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}
    @Get()
    getAllCourses() {
        return this.courseService.getAllCourses();
    }

    @Get(':id')
    getCourseById(@Param('id') id: string) {
        return this.courseService.getCourseById(id);
    }

    @Post()
    createCourse(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.createCourse(createCourseDto);
    }
    @Put(':id')
    updateCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.updateCourse(id, updateCourseDto);
    }
    @Patch(':id')
    patchCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.patchCourse(id, updateCourseDto);
    }
    @Delete(':id')
    deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }
    @Post(':id/upload')
      @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const filename = Date.now() + '-' + file.originalname;
            cb(null, filename);
          },
        }),
    
        fileFilter: (req, file, cb) => {
          if (file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
            cb(null, true);
          } else {
            cb(new BadRequestException('Only image and PDF files are allowed!'), false);
          }
        },
    
        limits: {
          fileSize: 2 * 1024 * 1024, 
        }
    
      }))
      uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
          message: 'File uploaded successfully',
          filename: file.filename,
          path: file.path,
        };
        
      }
      @Get('getFiles')
        getFiles(@Query('filename') filename, @Res() res)
        {
          res.sendFile(filename,{root:'./uploads'});
        }
}
