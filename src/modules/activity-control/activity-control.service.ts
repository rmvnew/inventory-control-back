import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Repository } from 'typeorm';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { ProjectService } from '../project/project.service';
import { CreateActivityControlDto } from './dto/create-activity-control.dto';
import { FilterActitivityControl } from './dto/filter.ac';
import { UpdateActivityControlDto } from './dto/update-activity-control.dto';
import { ActivityControl } from './entities/activity-control.entity';

@Injectable()
export class ActivityControlService {

  constructor(
    @InjectRepository(ActivityControl)
    private readonly caRepositoty: Repository<ActivityControl>,
    private clientService: ClientService,
    private projectService: ProjectService,
    private productService: ProductService
  ) { }

  async create(createActivityControlDto: CreateActivityControlDto) {

    const { id_client, id_product, id_project } = createActivityControlDto

    const activity = this.caRepositoty.create(createActivityControlDto)

    const isRegistered = this.findByMoviment(activity.moviment)
    if (isRegistered) {
      throw new BadRequestException('Movimento já registrado!!')
    }

    activity.client = await this.clientService.findOne(id_client)
    activity.product = await this.productService.findOne(id_product)
    activity.project = await this.projectService.findOne(id_project)

    activity.isActive = true


    return this.caRepositoty.save(activity)
  }

  async findAll(filter: FilterActitivityControl): Promise<Pagination<ActivityControl>> {
    const { orderBy, sort, moviment } = filter
    const queryBuilder = this.caRepositoty.createQueryBuilder('inf')
      .leftJoinAndSelect('inf.product', 'product')
      .where('inf.isActive = true')


    if (moviment) {
      return paginate<ActivityControl>(
        queryBuilder.where('inf.moviment = :moviment', { moviment: moviment })
          .andWhere('inf.isActive = true'), filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.iduser', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    } else {

      queryBuilder.orderBy('inf.moviment', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    }

    return paginate<ActivityControl>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<ActivityControl> {
    return this.caRepositoty.findOne({ id_activity_control: id })
  }

  async findByMoviment(moviment: number): Promise<ActivityControl> {
    const activity = this.caRepositoty.createQueryBuilder('inf')
      .where('inf.moviment = :moviment', { moviment })
      .andWhere('inf.isActive = true')
      .getOne()
    return activity
  }

  async findActiveActivity(id: number): Promise<ActivityControl> {
    const activity = this.caRepositoty.createQueryBuilder('inf')
      .where('inf.id_activity_control = :id_activity_control', { id_activity_control: id })
      .andWhere('inf.isActive = true')
      .getOne()
    return activity
  }

  async update(id: number, updateActivityControlDto: UpdateActivityControlDto): Promise<ActivityControl> {

    const { id_client, id_product, id_project } = updateActivityControlDto

    const isRegistered = await this.findActiveActivity(id)
    if (!isRegistered) {
      throw new NotFoundException('Movimento não encontrado!')
    }

    const activity = await this.caRepositoty.preload({
      id_activity_control: id,
      ...updateActivityControlDto
    })

    if (id_client) {
      activity.client = await this.clientService.findOne(id_client)
    }
    // if (id_product) {
    //   activity.product = await this.productService.findOne(id_product)
    // }
    if (id_project) {
      activity.project = await this.projectService.findOne(id_project)
    }

    await this.caRepositoty.save(activity)

    return this.findOne(id)
  }

  async remove(id: number) {

    const activity = await this.findActiveActivity(id)
    if (!activity) {
      throw new NotFoundException('Movimento não encontrado!')
    }
    activity.isActive = false
    return this.caRepositoty.save(activity)
  }
}
