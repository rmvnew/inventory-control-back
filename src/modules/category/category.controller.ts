import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilterCategory } from './dto/filter.category.pagination';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@ApiTags('Category')
@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto):Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(
    @Query() filter : FilterCategory
  ):Promise<Pagination<Category>> {
    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.categoryService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
