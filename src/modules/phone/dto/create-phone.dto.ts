import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"



export class CreatePhoneDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone_number: string

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean

    @IsString()
    @IsOptional()
    createAt: string

    @IsString()
    @IsOptional()
    updateAt: string

}
