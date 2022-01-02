import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { OccupationModule } from '../occupation/occupation.module';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Client]),
    OccupationModule,
    DepartmentModule
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports:[ClientService]
})
export class ClientModule {}
