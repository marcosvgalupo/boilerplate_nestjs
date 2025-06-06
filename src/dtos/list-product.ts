import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class ListProductDTO {
  @Type(() => Number)
  @IsNotEmpty({ message: 'The page must be provided for listing the products.' })
  @IsNumber({}, { message: 'The page must be a number.' })
  @IsPositive({ message: 'The page must be a positive number.' })
  page: number;

  @IsOptional()
  @IsString({ message: 'If provided, the name must be a string.' })
  name?: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'If provided, the min must be a number.' })
  @IsPositive({ message: 'The min must be a positive number.' })
  min?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: 'If provided, the max must be a number.' })
  @IsPositive({ message: 'The max must be a positive number.' })
  max?: number;
}
