import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"
import { FilterPagination } from "src/shared/filter.pagination"




export class FilterProduct extends FilterPagination {
   
    @ApiProperty({ required: false })
    name: string

    @ApiProperty({ required: false })
    barcode: string


}