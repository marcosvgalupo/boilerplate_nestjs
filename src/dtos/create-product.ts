import { Optional } from "@nestjs/common";
import { IsNotEmpty, Length } from "class-validator";

export class CreateProductDTO{

    @IsNotEmpty({
        message: "The product name should not be empty."
    })
    @Length(5, 100)
    name: String;

    @Optional()
    description: String

    @IsNotEmpty({
        message: "The product price should not be empty."
    })
    price: Number
}