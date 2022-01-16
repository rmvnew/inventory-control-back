import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { FilterDepartment } from './dto/filter.department.pagination';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {

  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
  ) { }

  async create(createDepartmentDto: CreateDepartmentDto) {

    const department = this.departmentRepository.create(createDepartmentDto)
    department.name = Utils.getInstance().getValidName(department.name)
    department.manager = Utils.getInstance().getValidName(department.manager)

    const isRegistered = await this.findByName(department.name)

    if (isRegistered) {
      throw new BadRequestException('O departamento já esta cadastrado!!')
    }

    department.isActive = true

    return this.departmentRepository.save(department)
  }

  async findAll(filter: FilterDepartment): Promise<Pagination<Department>> {
    const { name, orderBy, sort } = filter
    const queryBuilder = this.departmentRepository.createQueryBuilder('inf')
      // .leftJoinAndSelect('inf.client', 'client')
      .andWhere('inf.isActive = true')

    if (name) {
      return paginate<Department>(
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

    return paginate<Department>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Department> {
    return this.departmentRepository.findOne({ id_department: id })
  }

  async findByName(name: string): Promise<Department> {
    const department = this.departmentRepository.createQueryBuilder('inf')
      .where('inf.name = :name', { name })
      .andWhere('inf.isActive = true')
      .getOne()
    return department
  }

  async findActiveDepartment(id: number) {
    const department = this.departmentRepository.createQueryBuilder('inf')
      .where('inf.id_department = :id_department', { id_department: id })
      .andWhere('inf.isActive = true')
      .getOne()

    return department
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {

    const isRegistered = await this.findActiveDepartment(id)
    if (!isRegistered) {
      throw new NotFoundException('O departamento não foi encontrado!!')
    }

    const department = await this.departmentRepository.preload({
      id_department: id,
      ...updateDepartmentDto
    })

    department.name = Utils.getInstance().getValidName(department.name)
    department.manager = Utils.getInstance().getValidName(department.manager)

    await this.departmentRepository.save(department)

    return this.findOne(id)
  }

  async remove(id: number) {
    const department = await this.findActiveDepartment(id)
    if (!department) {
      throw new NotFoundException('O departamento não foi encontrado!!')
    }
    department.isActive = false
    return this.departmentRepository.save(department)
  }
}
