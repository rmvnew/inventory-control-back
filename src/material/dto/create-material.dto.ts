import { ApiProperty } from "@nestjs/swagger";
import { CreateActivityControlDto } from "src/modules/activity-control/dto/create-activity-control.dto";
import { Product } from "src/modules/product/entities/product.entity";

export class CreateMaterialDto {

    @ApiProperty()
    activity:CreateActivityControlDto

    @ApiProperty()
    id_product: number

    @ApiProperty()
    quantity: number

}
