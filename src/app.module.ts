import { Module } from '@nestjs/common';
import { OccupationModule } from './modules/occupation/occupation.module';
import { DepartmentModule } from './modules/department/department.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './modules/project/project.module';
import { ClientModule } from './modules/client/client.module';

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
    ProjectModule,
    ClientModule,
  ],
    
  controllers: [],
  providers: [],
})
export class AppModule { }
