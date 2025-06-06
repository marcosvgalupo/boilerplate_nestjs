import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, Length } from "class-validator";

export class CreateProductDTO{

    @IsNotEmpty({
        message: "The product name should not be empty."
    })
    @Length(5, 100)
    name: string;

    @IsOptional()
    description: string

    @Type(() => Number)
    @IsNotEmpty({
        message: "The product price should not be empty."
    })
    @IsNumber({}, { message: 'The price must be a number.' })
    @IsPositive({ message: 'The price must be a positive number.' })
    price: number

    @Type(() => Number)
    @IsNotEmpty({
        message: "The product quantity should not be empty."
    })
    @IsNumber({}, { message: 'The quantity must be a number.' })
    @IsPositive({ message: 'The quantity must be a positive number.' })
    quantity: number
}