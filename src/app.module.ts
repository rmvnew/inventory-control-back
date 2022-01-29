import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { OccupationModule } from './modules/occupation/occupation.module';
import { DepartmentModule } from './modules/department/department.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './modules/project/project.module';
import { ClientModule } from './modules/client/client.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { PhoneModule } from './modules/phone/phone.module';
import { ActivityControlModule } from './modules/activity-control/activity-control.module';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    OccupationModule,
    DepartmentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProjectModule,
    ClientModule,
    InvoiceModule,
    ProductModule,
    CategoryModule,
    UserModule,
    PhoneModule,
    ActivityControlModule,
    MaterialModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule { }
