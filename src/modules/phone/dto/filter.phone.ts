import { ApiProperty } from "@nestjs/swagger"
import { FilterPagination } from "src/shared/filter.pagination"
// import { IsOptional, IsString } from "class-validator"


export class FilterPhone extends FilterPagination{

    @ApiProperty({ required: false })
    phone_number: string


}