import { ApiProperty } from "@nestjs/swagger"
import { FilterPagination } from "src/shared/filter.pagination"
// import { IsOptional, IsString } from "class-validator"





export class FilterProject extends FilterPagination{
    
    @ApiProperty({ required: false })
    name: string
}