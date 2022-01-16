import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"



export class CreateActivityControlDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_client: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_project: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_product: number

    @ApiProperty()
    @IsNumber()
    moviment: number

    @ApiProperty()
    @IsNumber()
    quantity: number

    @ApiProperty()
    @IsString()
    date_of_withdrawal: string

    @ApiProperty()
    @IsString()
    return_date: string

    @IsOptional()
    @IsString()
    createAt: string

    @IsOptional()
    @IsString()
    updateAt: string

}
