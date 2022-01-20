import { ApiProperty } from "@nestjs/swagger"



export class CreateActivityControlDto {

    @ApiProperty()
    id_client: number

    @ApiProperty()
    id_project: number

    @ApiProperty()
    id_product: number

    @ApiProperty()
    moviment: number

    @ApiProperty()
    quantity: number

    @ApiProperty()
    date_of_withdrawal: string

    @ApiProperty()
    return_date: string

    createAt: string

    updateAt: string

}
