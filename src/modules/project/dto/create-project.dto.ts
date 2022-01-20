import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"




export class CreateProjectDto {

    @ApiProperty()
    name: string

    createAt: string

    updateAt: string

}
