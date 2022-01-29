import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Repository } from 'typeorm';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { FilterPhone } from './dto/filter.phone';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';

@Injectable()
export class PhoneService {

  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>
  ) { }

  async create(createPhoneDto: CreatePhoneDto) {

    const { phone_number } = createPhoneDto

    const phone = this.phoneRepository.create(createPhoneDto)

    // const isRegistered = this.findByNumber(phone_number)

    // if(isRegistered){
    //   console.log('isRegistered: ',isRegistered)
    //   throw new BadRequestException('Telefone já cadastrado!')
    // }

    phone.isActive = true

    return this.phoneRepository.save(phone)
  }

  async findAll(
    @Query() filter: FilterPhone
  ): Promise<Pagination<Phone>> {

    const { orderBy, sort, phone_number } = filter
    const queryBuilder = this.phoneRepository.createQueryBuilder('inf')
    // .leftJoinAndSelect('inf.user','user')

    if (phone_number) {
      return paginate<Phone>(
        queryBuilder.where('inf.phone_number = :phone_number', { phone_number: phone_number }), filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.iduser', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else {

      queryBuilder.orderBy('inf.phone_number', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    }

    return paginate<Phone>(queryBuilder, filter)
  }

  async findOne(id: number) {
    return this.phoneRepository.findOne({ id_phone: id })
  }

  async findByNumber(number:string){
    return this.phoneRepository.findOne({phone_number:number})
  }

  async update(id: number, updatePhoneDto: UpdatePhoneDto) {

    const isRegistered = this.findOne(id)
    if (!isRegistered) {
      throw new NotFoundException('Telefone não encontrado!')
    }

    const phone = await this.phoneRepository.preload({
      id_phone: id,
      ...updatePhoneDto
    })

    await this.phoneRepository.save(phone)

    return await this.findOne(id)
  }

  async remove(id: number) {

    const phone = await this.findOne(id)
    if (!phone) {
      throw new NotFoundException('Telefone não encontrado!')
    }

    return this.phoneRepository.remove(phone)
  }
}
