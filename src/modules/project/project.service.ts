import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { FilterProject } from './dto/filter.project.pagination';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) { }

  async create(createProjectDto: CreateProjectDto) {

    const project = this.projectRepository.create(createProjectDto)
    project.name = Utils.getInstance().getValidName(project.name)

    const isRegistered = await this.findByName(project.name)

    if (isRegistered) {
      throw new BadRequestException('Projeto já cadastrado!!!')
    }

    return this.projectRepository.save(project)
  }

  async findAll(filter: FilterProject): Promise<Pagination<Project>> {
    const { name, orderBy, sort } = filter
    const queryBuilder = this.projectRepository.createQueryBuilder('inf')

    if (name) {
      return paginate<Project>(
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

    return paginate<Project>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({ id_project: id })
  }

  async findByName(name: string): Promise<Project> {
    return this.projectRepository.findOne({ name: name })
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {

    const isRegistered = await this.findOne(id)
    if (!isRegistered) {
      throw new NotFoundException('Projeto não foi encontrado!!')
    }

    const project = await this.projectRepository.preload({
      id_project: id,
      ...updateProjectDto
    })

    await this.projectRepository.save(project)
    return this.findOne(id)
  }

  async remove(id: number) {
    const project = await this.findOne(id)
    if (!project) {
      throw new NotFoundException('Projeto não foi encontrado!!')
    }
    return this.projectRepository.remove(project)
  }
}
