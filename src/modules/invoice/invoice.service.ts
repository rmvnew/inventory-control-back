import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    const { invoice_date, invoice_number } = createInvoiceDto

    const isRegistered = await this.findByNumber(invoice_number)

    if (isRegistered) {
      throw new BadRequestException('Nota fiscal já cadastrada!!')
    }

    const invoice = this.invoiceRepository.create(createInvoiceDto)

    invoice.invoice_date = Utils.getInstance().getFormatedUsDate(invoice_date)

    invoice.invoice_issuer = Utils.getInstance().getValidName(invoice.invoice_issuer)

    invoice.isActive = true


    return this.invoiceRepository.save(invoice)
  }

  async findAll(filter: FilterInvoice): Promise<Pagination<Invoice>> {
    const { orderBy, sort, invoice_number, issuer_register } = filter
    const queryBuilder = this.invoiceRepository.createQueryBuilder('inf')
      .leftJoinAndSelect('inf.product', 'product')
      .where('inf.isActive = true')


    if (invoice_number) {
      return paginate<Invoice>(
        queryBuilder.where('inf.invoice_number = :invoice_number', { invoice_number: invoice_number })
          .where('inf.isActive = true'), filter
      )
    }

    if (issuer_register) {
      return paginate<Invoice>(
        queryBuilder.where('inf.issuer_register = :issuer_register', { issuer_register: issuer_register })
          .where('inf.isActive = true'), filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.iduser', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    } else {

      queryBuilder.orderBy('inf.invoice_number', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
        .where('inf.isActive = true')

    }

    return paginate<Invoice>(queryBuilder, filter)
  }


  async findOne(id: number): Promise<Invoice> {
    return this.invoiceRepository.findOne({ id_invoice: id })
  }

  async findByNumber(invoice_number: string): Promise<Invoice> {
    const invoice = this.invoiceRepository.createQueryBuilder('inf')
      .where('inf.invoice_number = :invoice_number', { invoice_number })
      .andWhere('inf.isActive = true')
      .getOne()

    return invoice
  }

  async findActiveInvoice(id: number): Promise<Invoice> {
    const invoice = this.invoiceRepository.createQueryBuilder('inf')
      .where('inf.id_invoice = :id_invoice', { id_invoice: id })
      .andWhere('inf.isActive = true')
      .getOne()

    return invoice
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {

    const { invoice_date, invoice_issuer } = updateInvoiceDto

    const isRegistered = this.findActiveInvoice(id)
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
    const invoice = await this.findActiveInvoice(id)
    if (!invoice) {
      throw new NotFoundException('Nota fiscal não encontrada!!')
    }

    invoice.isActive = false

    return this.invoiceRepository.save(invoice)
  }
}
