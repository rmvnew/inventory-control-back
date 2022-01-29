import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { ProductModule } from 'src/modules/product/product.module';
import { ActivityControlModule } from 'src/modules/activity-control/activity-control.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Material]),
    ProductModule,
    ActivityControlModule
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports:[MaterialService]
})
export class MaterialModule {}
