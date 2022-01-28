import { ApiProperty } from "@nestjs/swagger"
import { FilterPagination } from "src/shared/filter.pagination"
// import { IsOptional, IsString } from "class-validator"




export class FilterInvoice extends FilterPagination{
    
    @ApiProperty({ required: false })
    invoice_number: string
    
    @ApiProperty({ required: false })
    issuer_register: string

}