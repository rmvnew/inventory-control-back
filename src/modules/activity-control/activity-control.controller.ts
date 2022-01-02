import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ActivityControlService } from './activity-control.service';
import { CreateActivityControlDto } from './dto/create-activity-control.dto';
import { FilterActitivityControl } from './dto/filter.ac.pagination';
import { UpdateActivityControlDto } from './dto/update-activity-control.dto';
import { ActivityControl } from './entities/activity-control.entity';

@ApiTags('Activity')
@Controller('api/v1/activity-control')
export class ActivityControlController {
  constructor(private readonly activityControlService: ActivityControlService) { }

  @Post()
  async create(@Body() createActivityControlDto: CreateActivityControlDto): Promise<ActivityControl> {
    return this.activityControlService.create(createActivityControlDto);
  }

  @Get()
  async findAll(
    @Query() filter: FilterActitivityControl
  ): Promise<Pagination<ActivityControl>> {
    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.activityControlService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ActivityControl> {
    return this.activityControlService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateActivityControlDto: UpdateActivityControlDto): Promise<ActivityControl> {
    return this.activityControlService.update(+id, updateActivityControlDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.activityControlService.remove(+id);
  }
}
