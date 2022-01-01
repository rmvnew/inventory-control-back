import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { UserProfile } from "src/helper/Enums"



export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(5)
    name:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(10)
    email:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    register:string

    @ApiProperty()
    @IsOptional()
    @IsEnum(UserProfile)
    @IsNotEmpty()
    permission: UserProfile

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean

    @IsOptional()
    @IsString()
    createAt: string

    @IsOptional()
    @IsString()
    updateAt: string

}
