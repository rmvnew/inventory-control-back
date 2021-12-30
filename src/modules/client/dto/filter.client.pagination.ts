import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class FilterClient {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: true, default: 1 })
    page: number

    @IsOptional()
    @IsString()
    @ApiProperty({ required: true, default: 10 })
    limit: number

    @IsOptional()
    @IsString()
    @ApiProperty({ required: true, default: 'DESC', enum: ['ASC', 'DESC'] })
    sort: string

    @IsOptional()
    @ApiProperty({ required: true, default: 'NAME', enum: ['ID', 'NAME', 'DATE'] })
    orderBy: string

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    name: string
}