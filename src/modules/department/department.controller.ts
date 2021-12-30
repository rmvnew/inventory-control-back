import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { FilterDepartment } from './dto/filter.department.pagination';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';


@ApiTags('Department')
@Controller('api/v1/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  async findAll(
    @Query() filter: FilterDepartment
  ) {
    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.departmentService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Department> {
    return this.departmentService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
