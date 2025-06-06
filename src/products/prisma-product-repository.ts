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
                lastPage: Math.ceil(total / pageable.size),
            },
        };

    }
}   