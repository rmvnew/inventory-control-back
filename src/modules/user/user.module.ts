import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PhoneModule } from '../phone/phone.module';
import { OccupationModule } from '../occupation/occupation.module';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PhoneModule,
    OccupationModule,
    DepartmentModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
