import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CreateOccupationDto } from './dto/create-occupation.dto';
import { FilterOccupation } from './dto/filter.occupation';
import { UpdateOccupationDto } from './dto/update-occupation.dto';
import { Occupation } from './entities/occupation.entity';

@Injectable()
export class OccupationService {

  constructor(
    @InjectRepository(Occupation)
    private readonly occRepository: Repository<Occupation>
  ) { }

  async create(createOccupationDto: CreateOccupationDto): Promise<Occupation> {

    const occupation = this.occRepository.create(createOccupationDto)

    occupation.name = Utils.getInstance().getValidName(occupation.name)

    const isRegistered = await this.findByName(occupation.name)

    if (isRegistered) {
      throw new BadRequestException('Ocupação já cadastrada!!')
    }

    occupation.isActive = true

    return this.occRepository.save(occupation)
  }

  async findAll(filter: FilterOccupation): Promise<Pagination<Occupation>> {
    const { name, orderBy, sort } = filter
    const queryBuilder = this.occRepository.createQueryBuilder('inf')
    .andWhere('inf.isActive = true')

    if (name) {
      return paginate<Occupation>(
        queryBuilder.where('inf.name like :name', { name: `%${name.toUpperCase()}%` })
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

      queryBuilder.orderBy('inf.name', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
      .where('inf.isActive = true')

    }

    return paginate<Occupation>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Occupation> {
    return this.occRepository.findOne({ id_occupation: id })
  }

  async findByName(name: string): Promise<Occupation> {

    const occ = this.occRepository.createQueryBuilder('inf')
    .where('inf.name = :name',{name})
    .andWhere('inf.isActive = true')
    .getOne()

    return occ
  }

  async findActiveOccupation(id:number):Promise<Occupation>{

    const occ = this.occRepository.createQueryBuilder('inf')
    .where('inf.id_occupation = :id_occupation',{id_occupation:id})
    .andWhere('inf.isActive = true')
    .getOne()

    return occ

  }

  async update(id: number, updateOccupationDto: UpdateOccupationDto): Promise<Occupation> {


    const occ = await this.findActiveOccupation(id)
    if (!occ) {
      throw new NotFoundException('Ocupação não encontrada!')
    }

    const occupation = await this.occRepository.preload({
      id_occupation: id,
      ...updateOccupationDto
    })

    occupation.name = Utils.getInstance().getValidName(occupation.name)

    await this.occRepository.save(occupation)

    return this.findOne(id)
  }

  async remove(id: number) {
    const occ = await this.findActiveOccupation(id)
    if (!occ) {
      throw new NotFoundException('Ocupação não encontrada!')
    }

    occ.isActive = false
    return this.occRepository.save(occ)
  }
}
