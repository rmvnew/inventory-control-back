import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Timestamp } from "typeorm";




export class CreateInvoiceDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    invoice_number: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    invoice_date: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    invoice_issuer:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    issuer_register:string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsOptional()
    @IsString()
    createAt: string

    @IsOptional()
    @IsString()
    updateAt: string

}
