import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { FilterClient } from './dto/filter.client.pagination';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) { }

  async create(createClientDto: CreateClientDto): Promise<Client> {

    const client = this.clientRepository.create(createClientDto)
    client.name = Utils.getInstance().getValidName(client.name)

    const isRegistered = await this.findByName(client.name)
    if (isRegistered) {
      throw new BadRequestException('Cliente já cadastrado!!')
    }

    return this.clientRepository.save(client)
  }

  async findAll(filter: FilterClient): Promise<Pagination<Client>> {
    const { name, orderBy, sort } = filter
    const queryBuilder = this.clientRepository.createQueryBuilder('inf')

    if (name) {
      return paginate<Client>(
        queryBuilder.where('inf.name like :name', { name: `%${name.toUpperCase()}%` }), filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.iduser', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else {

      queryBuilder.orderBy('inf.name', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    }

    return paginate<Client>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Client> {
    return this.clientRepository.findOne({ id_project: id })
  }

  async findByName(name: string): Promise<Client> {
    return this.clientRepository.findOne({ name: name })
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {

    const isRegistered = await this.findOne(id)
    if (!isRegistered) {
      throw new NotFoundException('Cliente não encontrado!!')
    }

    const client = await this.clientRepository.preload({
      id_project: id,
      ...updateClientDto
    })

    await this.clientRepository.save(client)

    return await this.findOne(id)
  }

  async remove(id: number) {
    const client = await this.findOne(id)
    if (!client) {
      throw new NotFoundException('Cliente não encontrado!!')
    }
    return this.clientRepository.remove(client)
  }
}
