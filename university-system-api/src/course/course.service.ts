import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
    getAllCourse():object{
        return[
            {
                message:'All courses fatched',
                data:[],
            }           
        ];
    }
    getCourseById(id: string): object {
        return[
            {
                message: 'Course fetched', 
                id ,
            }
            
        ];
    }
    createCourse(name: string, code:string): object {
        return[
            {
                message:'Course created',
                data:{
                    name,
                    code,
                }
            }
        ];
    }
}
