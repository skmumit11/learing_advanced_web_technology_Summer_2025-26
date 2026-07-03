import { Type } from "class-transformer";
import{ IsNotEmpty, IsString,IsNumber, Min, Max, IsOptional, } from 'class-validator';

export class CreateCourseDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    instructor: string;

    @Type(()=> Number)
    @IsNumber()
    @Min(1)
    @Max(3)
    credits: number;

    @IsOptional()
    @IsString()
    description: string;

}