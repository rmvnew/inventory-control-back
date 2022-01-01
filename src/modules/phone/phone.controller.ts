import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';
import { FilterPhone } from './dto/filter.phone.pagination';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Phone')
@Controller('api/v1/phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post()
  async create(@Body() createPhoneDto: CreatePhoneDto):Promise<Phone> {
    return this.phoneService.create(createPhoneDto);
  }

  @Get()
  async findAll(
    @Query() filter : FilterPhone
  ):Promise<Pagination<Phone>> {

    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.phoneService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Phone> {
    return this.phoneService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePhoneDto: UpdatePhoneDto):Promise<Phone> {
    return this.phoneService.update(+id, updatePhoneDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.phoneService.remove(+id);
  }
}
