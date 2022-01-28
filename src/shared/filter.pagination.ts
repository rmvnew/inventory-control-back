import { ApiProperty } from "@nestjs/swagger"



export class FilterPagination {

    @ApiProperty({ required: true, default: 1 })
    page: number

    @ApiProperty({ required: true, default: 10 })
    limit: number

    @ApiProperty({ required: true, default: 'DESC', enum: ['ASC', 'DESC'] })
    sort: string

    @ApiProperty({ required: true, default: 'NAME', enum: ['ID', 'NAME', 'DATE'] })
    orderBy: string
}