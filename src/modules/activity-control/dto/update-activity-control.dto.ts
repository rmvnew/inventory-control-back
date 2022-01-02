import { PartialType } from '@nestjs/swagger';
import { CreateActivityControlDto } from './create-activity-control.dto';

export class UpdateActivityControlDto extends PartialType(CreateActivityControlDto) {}
