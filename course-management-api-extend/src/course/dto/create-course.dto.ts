import { Type } from "class-transformer";
import { 
    IsNotEmpty, 
    IsNumber, 
    IsOptional, 
    IsString,  
    Max,  
    Min,    
} from "class-validator"; 
export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code:string;

    @IsString()
    @IsNotEmpty()
    instructor: string;

    
    @IsNumber({}, { message: 'Credits must be a number' })
    @IsNotEmpty()
    @Min(1, { message: 'Credits must be at least 1' })
    @Max(6, { message: 'Credits must be at most 6' })
    @Type(() => Number) 
    credits: number;
    

    @IsString()
    @IsOptional()
    description: string;

}