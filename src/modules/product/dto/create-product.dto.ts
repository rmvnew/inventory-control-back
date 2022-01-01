import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, maxLength, MinLength } from "class-validator"



export class CreateProductDto {

    @ApiProperty()
    @IsNumber()
    id_invoice: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(5)
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    barcode: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    part_number: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    model: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    condition: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    minimum_quantity: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    value: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    responsible: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    location: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    institute_code: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    isActive: boolean

    @IsString()
    @IsOptional()
    createAt: string

    @IsString()
    @IsOptional()
    updateAt: string



}
