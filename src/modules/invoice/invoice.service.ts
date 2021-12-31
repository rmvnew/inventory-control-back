import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { FilterInvoice } from './dto/filter.invoice.pagination';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {

  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>
  ) { }

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {

    const { invoice_date } = createInvoiceDto

    const invoice = this.invoiceRepository.create(createInvoiceDto)

    invoice.invoice_date = Utils.getInstance().getFormatedUsDate(invoice_date)

    invoice.invoice_issuer = Utils.getInstance().getValidName(invoice.invoice_issuer)


    return this.invoiceRepository.save(invoice)
  }

  async findAll(filter: FilterInvoice): Promise<Pagination<Invoice>> {
    const { orderBy, sort, invoice_number, issuer_register } = filter
    const queryBuilder = this.invoiceRepository.createQueryBuilder('inf')


    if (invoice_number) {
      return paginate<Invoice>(
        queryBuilder.where('inf.invoice_number = :invoice_number', { invoice_number: invoice_number }), filter
      )
    }

    if (issuer_register) {
      return paginate<Invoice>(
        queryBuilder.where('inf.issuer_register = :issuer_register', { issuer_register: issuer_register }), filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.iduser', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else {

      queryBuilder.orderBy('inf.invoice_number', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    }

    return paginate<Invoice>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Invoice> {
    return this.invoiceRepository.findOne({ id_invoice: id })
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {

    const { invoice_date, invoice_issuer } = updateInvoiceDto

    const isRegistered = this.findOne(id)
    if (!isRegistered) {
      throw new NotFoundException('Nota fiscal não encontrada!!')
    }
    const invoice = await this.invoiceRepository.preload({
      id_invoice: id,
      ...updateInvoiceDto
    })

    if (invoice_date) {
      invoice.invoice_date = Utils.getInstance().getFormatedUsDate(invoice_date)
    }

    if (invoice_issuer) {
      invoice.invoice_issuer = Utils.getInstance().getValidName(invoice.invoice_issuer)
    }
    
    await this.invoiceRepository.save(invoice)

    return this.findOne(id)
  }

  async remove(id: number) {
    const invoice = await this.findOne(id)
    if (!invoice) {
      throw new NotFoundException('Nota fiscal não encontrada!!')
    }
    return this.invoiceRepository.remove(invoice)
  }
}
