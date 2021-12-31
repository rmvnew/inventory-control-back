import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { FilterInvoice } from './dto/filter.invoice.pagination';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Invoice')
@Controller('api/v1/invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  async findAll(
    @Query() filter: FilterInvoice
  ): Promise<Pagination<Invoice>> {
    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.invoiceService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Invoice> {
    return this.invoiceService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
