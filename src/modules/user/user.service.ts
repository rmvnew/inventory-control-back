import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUser } from './dto/filter.user.pagination';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const user = this.userRepository.create(createUserDto)

    user.name = Utils.getInstance().getValidName(user.name)

    const isRegistered = await this.findByName(user.name)

    if (isRegistered) {
      throw new BadRequestException('Usuário já registrado!')
    }

    user.password = await Utils.getInstance().encryptPassword(user.password)

    return this.userRepository.save(user)
  }

  async findAll(filter: FilterUser): Promise<Pagination<User>> {
    const { name, orderBy, sort } = filter
    const queryBuilder = this.userRepository.createQueryBuilder('inf')

    if (name) {
      return paginate<User>(
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

    return paginate<User>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ id_user: id })
  }

  async findByName(name: string): Promise<User> {
    return this.userRepository.findOne({ name: name })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    const { password } = updateUserDto

    const isRegistered = await this.findOne(id)
    if (!isRegistered) {
      throw new NotFoundException('Usuário não encontrado!!')
    }

    const user = await this.userRepository.preload({
      id_user: id,
      ...updateUserDto
    })

    user.name = Utils.getInstance().getValidName(user.name)
    if (password) {
      user.password = await Utils.getInstance().encryptPassword(password)
    }

    await this.userRepository.save(user)

    return this.findOne(id)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!!')
    }
    return this.userRepository.remove(user)
  }
}
