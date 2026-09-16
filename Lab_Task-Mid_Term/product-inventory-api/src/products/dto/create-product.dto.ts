import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";


export class CreateProductDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @Type(()=> Number)
    @IsNumber()
    @IsPositive()
    price: number;

    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;

    @IsString()
    @IsNotEmpty()
    category: string;


    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

}