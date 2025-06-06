import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDTO } from 'src/dtos/create-product';

import { ListProductDTO } from 'src/dtos/list-product';
import { ProductRepository } from './product-repository';
import { Pageable } from 'src/utils/pageable';

@Controller("products")
export class ProductController {
  constructor(
    private readonly repository: ProductRepository
  ) {}

  @Get()
  async findAll(@Query() params: ListProductDTO){
    const { page, name, min, max} = params;
    const pageable = new Pageable(page);

    const response = await this.repository.list(pageable, name, min, max);

    return response;
  }

  @Post()
  createProduct(@Body() body: CreateProductDTO){
    const { name, description, price} = body;
  }
}
