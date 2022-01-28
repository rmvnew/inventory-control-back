import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { OccupationService } from './occupation.service';
import { CreateOccupationDto } from './dto/create-occupation.dto';
import { UpdateOccupationDto } from './dto/update-occupation.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterOccupation } from './dto/filter.occupation';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Occupation } from './entities/occupation.entity';

@ApiTags('Occupation')
@Controller('api/v1/occupation')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) { }

  @Post()
  async create(@Body() createOccupationDto: CreateOccupationDto):Promise<Occupation> {
    return this.occupationService.create(createOccupationDto);
  }

  @Get()
  async findAll(
    @Query() filter: FilterOccupation
  ): Promise<Pagination<Occupation>> {
    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.occupationService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Occupation> {
    return this.occupationService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOccupationDto: UpdateOccupationDto):Promise<Occupation> {
    return this.occupationService.update(+id, updateOccupationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.occupationService.remove(+id);
  }
}
