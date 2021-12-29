import { Module } from '@nestjs/common';
import { OccupationModule } from './modules/occupation/occupation.module';
import { DepartmentModule } from './modules/department/department.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
  ],
    
  controllers: [],
  providers: [],
})
export class AppModule { }
