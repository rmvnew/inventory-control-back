import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { DepartmentService } from '../department/department.service';
import { InvoiceService } from '../invoice/invoice.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProduct } from './dto/filter.product.pagination';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly prodRepository: Repository<Product>,
    private invoiceService: InvoiceService,
    private categoryService: CategoryService,
    private departmentService: DepartmentService
  ) { }

  async create(createProductDto: CreateProductDto) {

    const { id_invoice, id_category, id_department } = createProductDto

    const product = this.prodRepository.create(createProductDto)

    product.name = Utils.getInstance().getValidName(product.name)

    const isRegistered = await this.findByName(product.name)

    if (isRegistered) {
      throw new BadRequestException('O produto já esta cadastrado!!')
    }

    if (id_invoice) {
      product.invoice = await this.invoiceService.findOne(id_invoice)
    }

    if (id_category) {
      product.category = await this.categoryService.findOne(id_category)
    }

    if (id_department) {
      product.department = await this.departmentService.findOne(id_department)
    }

    product.isActive = true

    return this.prodRepository.save(product)
  }

  async findAll(
    @Query() filter: FilterProduct
  ): Promise<Pagination<Product>> {

    const { orderBy, sort, name, barcode } = filter
    const queryBuilder = this.prodRepository.createQueryBuilder('inf')
      .leftJoinAndSelect('inf.invoice', 'invoice')
      .leftJoinAndSelect('inf.category', 'category')
      .leftJoinAndSelect('inf.department', 'department')
      .where('inf.isActive = true')


    if (name) {
      return paginate<Product>(
        queryBuilder.where('inf.name like :name', { name: `%${name}%` })
          .where('inf.isActive = true'), filter
      )
    }

    if (barcode) {
      return paginate<Product>(
        queryBuilder.where('inf.barcode = :barcode', { barcode: barcode })
          .where('inf.isActive = true'), filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.iduser', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    } else {

      queryBuilder.orderBy('inf.name', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    }

    return paginate<Product>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Product> {
    return this.prodRepository.findOne({ id_product: id })
  }

  async findByName(name: string): Promise<Product> {
    const product = this.prodRepository.createQueryBuilder('inf')
      .where('inf.name = :name', { name })
      .andWhere('inf.isActive = true')
      .getOne()

    return product
  }

  async findActiveProduct(id: number): Promise<Product> {
    const product = this.prodRepository.createQueryBuilder('inf')
      .where('inf.id_product = :id_product', { id_product: id })
      .andWhere('inf.isActive = true')
      .getOne()

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {

    const { name, id_invoice, id_category } = updateProductDto

    const isRegistered = this.findActiveProduct(id)
    if (!isRegistered) {
      throw new NotFoundException('Produto não encontrado!!')
    }

    const product = await this.prodRepository.preload({
      id_product: id,
      ...updateProductDto
    })

    if (name) {
      product.name = Utils.getInstance().getValidName(product.name)
    }

    if (id_invoice) {
      product.invoice = await this.invoiceService.findOne(id_invoice)
    }

    if (id_category) {
      product.category = await this.categoryService.findOne(id_category)
    }

    await this.prodRepository.save(product)

    return await this.findOne(id)
  }

  async remove(id: number) {
    const product = await this.findOne(id)
    if (!product) {
      throw new NotFoundException('Produto não encontrado!!')
    }

    product.isActive = true

    return this.prodRepository.save(product)
  }
}
