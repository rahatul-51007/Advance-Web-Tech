import { 
    IsEmail,
    IsNotEmpty, 
    IsNumber, 
    IsString,  
    MinLength, 
    
} from "class-validator"; 
export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    @IsNotEmpty()
    instructor: string;

    
    @IsNumber({}, { message: 'Age must be a number' })
    @IsNotEmpty()
    age: number;
    

    @IsEmail()
    email: string;

}