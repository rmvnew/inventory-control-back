import { ApiProperty } from "@nestjs/swagger";
import { OperationType } from "src/helper/Enums";
import { CreateActivityControlDto } from "src/modules/activity-control/dto/create-activity-control.dto";

export class CreateMaterialDto {

    @ApiProperty({ required: true, default: 'Consumo', enum: ['Consumo', 'Emprestimo', 'Devolução'] })
    operation_type: OperationType
    
    @ApiProperty()
    activity:CreateActivityControlDto

    @ApiProperty()
    id_product: number

    @ApiProperty()
    quantity: number


}
