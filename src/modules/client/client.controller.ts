import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FilterClient } from './dto/filter.client';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { JwtAuthGuard } from '../../auth/shared/jwt-auth.guard'

@ApiTags('Client')
@Controller('api/v1/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  findAll(
    @Query() filter: FilterClient
  ): Promise<Pagination<Client>> {
    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.clientService.findAll(filter);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto): Promise<Client> {
    return this.clientService.update(+id, updateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
