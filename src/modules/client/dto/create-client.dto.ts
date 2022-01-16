import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"



export class CreateClientDto {
    

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(5)
    name: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(5)
    register: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_occupation: number
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_department: number

    @IsOptional()
    @IsString()
    createAt: string

    @IsOptional()
    @IsString()
    updateAt: string

}
