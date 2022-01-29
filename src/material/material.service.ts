import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { ActivityControlService } from 'src/modules/activity-control/activity-control.service';
import { ProductService } from 'src/modules/product/product.service';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { FilterMaterial } from './dto/filter.material';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialService {

  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    private productService: ProductService,
    private activityService: ActivityControlService
  ) { }

  async create(createMaterialDto: CreateMaterialDto) {

    const { activity, id_product, quantity } = createMaterialDto

    const material = this.materialRepository.create(createMaterialDto)
    const product = await this.productService.findOne(id_product)

    material.isActive = true
    material.product = product
    material.activity = await this.activityService.create(activity)

    if (product.quantity < quantity) {
      throw new BadRequestException("quantidade solicitada insuficiente!!")
    }

    const remainingAmount = product.quantity - quantity
    product.quantity = remainingAmount
    this.productService.update(product.id_product, product)

    return this.materialRepository.save(material)

  }

  async findAll(filter: FilterMaterial): Promise<Pagination<Material>> {


    const { id_client, id_product, id_project, orderBy, sort } = filter

    const queryBuilder = this.materialRepository.createQueryBuilder('inf')
      .leftJoinAndSelect('inf.activity', 'activity')
      .leftJoinAndSelect('inf.product', 'product')
      .where('inf.isActive = true')


    if (id_client) {
      return paginate<Material>(
        queryBuilder
          .leftJoinAndSelect('activity.client', 'client')
          .where('client.id_client = :id_client', { id_client })
          .andWhere('inf.isActive = true')
        , filter
      )
    }

    if (id_product) {
      return paginate<Material>(
        queryBuilder
          .where('product.id_product = :id_product', { id_product })
          .andWhere('inf.isActive = true')
        , filter
      )
    }

    if (id_project) {
      return paginate<Material>(
        queryBuilder
          .leftJoinAndSelect('activity.project', 'project')
          .where('project.id_project = :id_project', { id_project })
          .andWhere('inf.isActive = true')
        , filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.id_material', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    } else {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    }

    return paginate<Material>(queryBuilder, filter)



  }

  async findOne(id: number): Promise<Material> {
    return await this.materialRepository.findOne({ id_material: id })
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto): Promise<Material> {

    const isRegistered = await this.findOne(id)

    if (!isRegistered) {
      throw new NotFoundException("Material não encontrado!!")
    }

    const material = await this.materialRepository.preload({
      id_material: id,
      ...updateMaterialDto
    })

    await this.materialRepository.save(material)

    return await this.findOne(id)
  }

  async remove(id: number) {
    const material = await this.findOne(id)

    if (!material) {
      throw new NotFoundException("Material não encontrado!!")
    }

    return this.materialRepository.remove(material)

  }
}
