import { ApiProperty } from "@nestjs/swagger"



export class CreateProductDto {

    
    @ApiProperty()
    id_category: number
    
    @ApiProperty()
    id_department: number
   
    @ApiProperty()
    invoice_number: string

    @ApiProperty()
    name: string

    @ApiProperty()
    barcode: string

    @ApiProperty()
    part_number: string

    @ApiProperty()
    model: string

    @ApiProperty()
    condition: string

    @ApiProperty()
    quantity: number

    @ApiProperty()
    minimum_quantity: number

    @ApiProperty()
    value: number

    @ApiProperty()
    responsible: string

    @ApiProperty()
    location: string

    @ApiProperty()
    institute_code: string

    createAt: string

    updateAt: string



}
