import { ApiProperty } from "@nestjs/swagger"
import { FilterPagination } from "src/shared/filter.pagination"
// import { IsOptional, IsString } from "class-validator"



export class FilterActitivityControl extends FilterPagination{
 
    @ApiProperty({ required: false })
    moviment: string

}