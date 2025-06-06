import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ProductController } from './products/product.controller';
import { ProductRepository } from './products/product-repository';
import { PrismaProductRepository } from './products/prisma-product-repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository
    }
  ],
})
export class AppModule {}
