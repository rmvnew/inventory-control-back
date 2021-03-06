import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterMaterial } from './dto/filter.material';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Material } from './entities/material.entity';
import { FilterLoan } from './dto/filter.loan';

@ApiTags('Material')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) { }

  @Post()
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }

  @Get()
  async findAll(
    @Query() filter: FilterMaterial
  ): Promise<Pagination<Material>> {
    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.materialService.findAll(filter);
  }

  @Get('/loan')
  async findAllLoan(
    @Query() filter: FilterLoan
  ): Promise<Pagination<Material>> {
    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.materialService.getAllLoan(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.materialService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
