import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { InvoiceModule } from '../invoice/invoice.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    InvoiceModule,
    CategoryModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductService]
})
export class ProductModule { }
