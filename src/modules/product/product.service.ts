import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
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
    private categoryService: CategoryService
  ) { }

  async create(createProductDto: CreateProductDto) {

    const { id_invoice, id_category } = createProductDto

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

    return this.prodRepository.save(product)
  }

  async findAll(
    @Query() filter: FilterProduct
  ): Promise<Pagination<Product>> {

    const { orderBy, sort, name, barcode } = filter
    const queryBuilder = this.prodRepository.createQueryBuilder('inf')
      .leftJoinAndSelect('inf.invoice', 'invoice')
      .leftJoinAndSelect('inf.category','category')


    if (name) {
      return paginate<Product>(
        queryBuilder.where('inf.name like :name', {name: `%${name}%`} ), filter
      )
    }

    if (barcode) {
      return paginate<Product>(
        queryBuilder.where('inf.barcode = :barcode', { barcode: barcode }), filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.iduser', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else {

      queryBuilder.orderBy('inf.name', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    }

    return paginate<Product>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Product> {
    return this.prodRepository.findOne({ id_product: id })
  }

  async findByName(name: string): Promise<Product> {
    return this.prodRepository.findOne({ name: name })
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {

    const { name, id_invoice, id_category } = updateProductDto

    const isRegistered = this.findOne(id)
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

    return this.prodRepository.remove(product)
  }
}
