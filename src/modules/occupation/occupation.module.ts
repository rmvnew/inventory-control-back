import { Module } from '@nestjs/common';
import { OccupationService } from './occupation.service';
import { OccupationController } from './occupation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occupation } from './entities/occupation.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Occupation])
  ],
  controllers: [OccupationController],
  providers: [OccupationService],
  exports:[OccupationService]
})
export class OccupationModule {}
