import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { DepartmentService } from '../department/department.service';
import { OccupationService } from '../occupation/occupation.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FilterClient } from './dto/filter.client';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private departmentService: DepartmentService,
    private occupationService: OccupationService
  ) { }

  async create(createClientDto: CreateClientDto): Promise<Client> {

    const { id_department, id_occupation } = createClientDto

    const client = this.clientRepository.create(createClientDto)
    client.name = Utils.getInstance().getValidName(client.name)

    const isRegistered = await this.findByName(client.name)
    if (isRegistered) {
      throw new BadRequestException('Cliente já cadastrado!!')
    }

    client.department = await this.departmentService.findOne(id_department)
    client.occupation = await this.occupationService.findOne(id_occupation)

    client.isActive = true

    return this.clientRepository.save(client)
  }

  async findAll(filter: FilterClient): Promise<Pagination<Client>> {
    const { name, orderBy, sort } = filter
    const queryBuilder = this.clientRepository.createQueryBuilder('inf')
      .leftJoinAndSelect('inf.department', 'department')
      .leftJoinAndSelect('inf.occupation', 'occupation')
      .where('inf.isActive = true')

    if (name) {
      return paginate<Client>(
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

    return paginate<Client>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Client> {
    return this.clientRepository.findOne({ id_client: id })
  }

  async findByName(name: string): Promise<Client> {

    const client = this.clientRepository.createQueryBuilder('inf')
      .where('inf.name = :name', { name })
      .andWhere('inf.isActive = true')
      .getOne()

    return client
  }

  async findActiveClient(id: number): Promise<Client> {
    const client = this.clientRepository.createQueryBuilder('inf')
      .where('inf.id_client = :id_client', { id_client: id })
      .andWhere('inf.isActive = true')
      .getOne()

    return client
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {

    const isRegistered = await this.findActiveClient(id)
    if (!isRegistered) {
      throw new NotFoundException('Cliente não encontrado!!')
    }

    const client = await this.clientRepository.preload({
      id_client: id,
      ...updateClientDto
    })

    client.name = Utils.getInstance().getValidName(client.name)

    await this.clientRepository.save(client)

    return await this.findOne(id)
  }

  async remove(id: number) {
    const client = await this.findActiveClient(id)
    if (!client) {
      throw new NotFoundException('Cliente não encontrado!!')
    }

    client.isActive = false
    return this.clientRepository.save(client)
  }
}
