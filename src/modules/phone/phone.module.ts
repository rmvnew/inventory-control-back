import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Phone])
  ],
  controllers: [],
  providers: [PhoneService],
  exports: [PhoneService]
})
export class PhoneModule { }
