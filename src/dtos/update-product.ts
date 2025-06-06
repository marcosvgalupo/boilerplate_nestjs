import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Length } from "class-validator";

export class UpdateProductDTO{

        @IsOptional()
        @Length(5, 100)
        name: string;
    
        @IsOptional()
        description: string
    
        @Type(() => Number)
        @IsOptional()
        @IsNumber({}, { message: 'The price must be a number.' })
        @IsPositive({ message: 'The price must be a positive number.' })
        price: number
    
        @Type(() => Number)
        @IsOptional()
        @IsNumber({}, { message: 'The quantity must be a number.' })
        @IsPositive({ message: 'The quantity must be a positive number.' })
        quantity: number
}