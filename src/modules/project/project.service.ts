import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { FilterProject } from './dto/filter.project';
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

    project.isActive = true

    return this.projectRepository.save(project)
  }

  async findAll(filter: FilterProject): Promise<Pagination<Project>> {
    const { name, orderBy, sort } = filter
    const queryBuilder = this.projectRepository.createQueryBuilder('inf')

    if (name) {
      return paginate<Project>(
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

    return paginate<Project>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({ id_project: id })
  }

  async findByName(name: string): Promise<Project> {
    const project = this.projectRepository.createQueryBuilder('inf')
      .where('inf.name = :name', { name })
      .andWhere('inf.isActive = true')
      .getOne()
    return project
  }

  async findActiveProject(id: number): Promise<Project> {
    const project = this.projectRepository.createQueryBuilder('inf')
      .where('inf.id_project = :id_project', { id_project: id })
      .andWhere('inf.isActive = true')
      .getOne()
    return project
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {

    const isRegistered = await this.findActiveProject(id)
    if (!isRegistered) {
      throw new NotFoundException('Projeto não foi encontrado!!')
    }

    const project = await this.projectRepository.preload({
      id_project: id,
      ...updateProjectDto
    })

    project.name = Utils.getInstance().getValidName(project.name)

    await this.projectRepository.save(project)
    return this.findOne(id)
  }

  async remove(id: number) {
    const project = await this.findActiveProject(id)
    if (!project) {
      throw new NotFoundException('Projeto não foi encontrado!!')
    }

    project.isActive = false

    return this.projectRepository.save(project)
  }
}
