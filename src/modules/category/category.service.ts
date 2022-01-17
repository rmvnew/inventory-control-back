import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategory } from './dto/filter.category.pagination';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {

    const { name } = createCategoryDto

    const category = this.categoryRepository.create(createCategoryDto)

    category.name = Utils.getInstance().getValidName(name)

    const isRegistered = await this.findByName(name)

    console.log(isRegistered)

    if (isRegistered) {
      throw new BadRequestException('Categoria já cadastrada!!')
    }

    category.isActive = true

    return this.categoryRepository.save(category)
  }

  async findAll(filter: FilterCategory): Promise<Pagination<Category>> {
    const { orderBy, sort, name } = filter
    const queryBuilder = this.categoryRepository.createQueryBuilder('inf')
      // .leftJoinAndSelect('inf.product', 'product')
      .where('inf.isActive = true')


    if (name) {
      return paginate<Category>(
        queryBuilder.where('inf.name like :name', { name: `%${name}%` })
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

    return paginate<Category>(queryBuilder, filter)
  }

  async findAllCategory(): Promise<Category[]> {
    const all = this.categoryRepository.createQueryBuilder('inf')
      .where('inf.isActive = true')
      .getMany()
    return all
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ id_category: id })
  }

  async findByName(name: string): Promise<Category> {

    const category = this.categoryRepository.createQueryBuilder('inf')
      .where('inf.name = :name', { name: name })
      .andWhere('inf.isActive = true')
      .getOne()
    return category
  }

  async findActiveCategory(id: number): Promise<Category> {
    const category = this.categoryRepository.createQueryBuilder('inf')
      .where('inf.id_category = :id_category', { id_category: id })
      .andWhere('inf.isActive = true')
      .getOne()
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {

    const isRegistered = await this.findActiveCategory(id)
    if (!isRegistered) {
      throw new NotFoundException('Nenhuma categoria encontrada!')
    }

    const category = await this.categoryRepository.preload({
      id_category: id,
      ...updateCategoryDto
    })

    category.name = Utils.getInstance().getValidName(category.name)

    await this.categoryRepository.save(category)

    return this.findOne(id)
  }

  async remove(id: number) {
    const category = await this.findActiveCategory(id)
    if (!category) {
      throw new NotFoundException('Nenhuma categoria encontrada!')
    }
    category.isActive = false
    return this.categoryRepository.save(category)
  }
}
