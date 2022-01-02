import { Module } from '@nestjs/common';
import { ActivityControlService } from './activity-control.service';
import { ActivityControlController } from './activity-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { ProjectModule } from '../project/project.module';
import { ProductModule } from '../product/product.module';
import { ActivityControl } from './entities/activity-control.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ActivityControl]),
    ClientModule,
    ProjectModule,
    ProductModule
  ],
  controllers: [ActivityControlController],
  providers: [ActivityControlService]
})
export class ActivityControlModule {}
