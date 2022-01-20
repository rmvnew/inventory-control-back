import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Timestamp } from "typeorm";




export class CreateInvoiceDto {

    @ApiProperty()
    invoice_number: string
    
    @ApiProperty()
    invoice_date: string

    @ApiProperty()
    invoice_issuer:string

    @ApiProperty()
    issuer_register:string

    @ApiProperty()
    value: number;

    createAt: string

    updateAt: string

}
