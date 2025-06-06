import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDTO } from 'src/dtos/create-product';

import { ListProductDTO } from 'src/dtos/list-product';
import { ProductRepository } from './product-repository';
import { Pageable } from 'src/utils/pageable';
import { UpdateProductDTO } from 'src/dtos/update-product';

@Controller("products")
export class ProductController {
    constructor(
        private readonly repository: ProductRepository
    ) { }

    @Get()
    async findAll(@Query() params: ListProductDTO) {
        const { page, name, min, max } = params;
        const pageable = new Pageable(page);

        const response = await this.repository.list(pageable, name, min, max);

        return response;
    }

    @Post()
    async createProduct(@Body() body: CreateProductDTO) {
        const { name, description, price, quantity } = body;

        const response = await this.repository.create(name, price, quantity, description);

        return response;
    }

    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDTO) {
        const { name, description, price, quantity } = body;

        const response = await this.repository.update(id, name, price, quantity, description);

        return response;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {

        await this.repository.delete(id);
        return {
            message: "Product deleted successfully."
        };
    }
}
