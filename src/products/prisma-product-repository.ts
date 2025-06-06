import { PrismaService } from "src/database/prisma.service";
import { ProductRepository } from "./product-repository";
import { Pageable } from "src/utils/pageable";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaProductRepository implements ProductRepository {

    constructor(private prisma: PrismaService) { }

    async list(pageable: Pageable, name?: string, min?: number, max?: number): Promise<Object> {


        const where: any = {};

        if (name) {
            where.name = {
                contains: name,
                mode: 'insensitive',
            };
        }

        if (min !== undefined || max !== undefined) {
            where.price = {};

            if (min !== undefined) {
                where.price.gte = min;
            }

            if (max !== undefined) {
                where.price.lte = max;
            }
        }
        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip: pageable.offset(),
                take: pageable.size,
                orderBy: { creationDate: 'desc' },
            }),
            this.prisma.product.count({ where }),
        ]);

        return {
            data,
            meta: {
                page: pageable.page,
                size: pageable.size,
                total,
                lastPage: total == 0 ? 1 : Math.ceil(total / pageable.size),
            },
        };

    }

    async create(name: string, price: number, quantity: number, description?: string): Promise<Object> {

        const data: any = {
            name,
            price,
            quantity,
        };

        if (description !== undefined) {
            data.description = description;
        }

        const product = await this.prisma.product.create({
            data,
        });

        return product;
    }

    async update(id: string, name?: string, price?: number, quantity?: number, description?: string): Promise<Object> {
        
        const updateData = {
            ...(name !== undefined && { name }),
            ...(price !== undefined && { price }),
            ...(quantity !== undefined && { quantity }),
            ...(description !== undefined && { description }),
        };

        const product = await this.prisma.product.update({
            data: {
                ...updateData
            },
            where: {
                id
            }
        });

        return product;
    }

    async delete(id: string): Promise<void>
    {   
        await this.prisma.product.delete({
            where: {
                id
            }
        })
    }


}   