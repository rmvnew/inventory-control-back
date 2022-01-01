import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"




export class CreateCategoryDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(5)
    name: string

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
