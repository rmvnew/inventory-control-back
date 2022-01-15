import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"



export class CreateDepartmentDto {


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
    manager: string

    @IsOptional()
    @IsString()
    createAt: string

    @IsOptional()
    @IsString()
    updateAt: string


}
